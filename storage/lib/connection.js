const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    DisconnectReason,
    Browsers,
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');

const { groupParticipantsUpdate } = require('./event/group.js');
const { logger } = require('./print.js');
const { decodeJid } = require('./func.js');
const store = require('./store.js');
const serialize = require('./serialize.js');
const handler = require('../../src/app/handler.js');
const db = require('./database.js');

const processedMessages = new Set();
const usePairingCode = process.argv.includes('--use-pairing-code');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const jsonFilePath = './storage/database/message_count.json';

function loadFromJson() {
    if (fs.existsSync(jsonFilePath)) {
        const rawData = fs.readFileSync(jsonFilePath);
        return JSON.parse(rawData);
    }
    return {};
}

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

function saveToJson(data) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
}
let groupMessageCount = loadFromJson();

async function connectSock() {
    const { state, saveCreds } = await useMultiFileAuthState('session', pino({ level: 'fatal' }));
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: 'fatal' }),
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' })),
        },
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: 0,
        markOnlineOnConnect: true,
        getMessage: async (key) =>
            (await store.loadMessage(key.remoteJid, key.id) ||
                (await store.loadMessage(key.id)) || {}).message || undefined,
    });

    if (usePairingCode && !sock.authState.creds.registered) {
        setTimeout(async () => {
            rl.question(
                `${chalk.bold.whiteBright('\nEnter the WhatsApp phone number where the bot will be.')}\n${chalk.bold.whiteBright('Nro')}: `,
                async function (phoneNumber) {
                    await sock.waitForConnectionUpdate((update) => !!update.qr);
                    let code = await sock.requestPairingCode(phoneNumber.replace(/\D/g, ''));
                    console.log(`\n${chalk.bold.greenBright('Code')} : ${code.match(/.{1,4}/g)?.join('-')}\n`);
                    rl.close();
                }
            );
        }, 3000);
    }

    sock.ev.on('creds.update', await saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        let m = messages[messages.length - 1];
        if (!m.message) return;

        try {
            if (processedMessages.has(m.key.id)) return;
            processedMessages.add(m.key.id);

            const msg = serialize(m, sock);
            handler(msg, sock);

            if (msg && msg.key.fromMe === false) {
                const groupId = msg.key.remoteJid; 
                const senderId = msg.key.participant; 

                if (!groupMessageCount[groupId]) {
                    groupMessageCount[groupId] = {};
                }

                if (senderId && senderId !== 'undefined') {
                    if (groupMessageCount[groupId][senderId]) {
                        groupMessageCount[groupId][senderId]++;
                    } else {
                        groupMessageCount[groupId][senderId] = 1;
                    }
                    saveToJson(groupMessageCount);
                } else {
                    console.warn(`Sender ID is undefined for message in group ${groupId}`);
                }
            }

            setTimeout(() => processedMessages.delete(m.key.id), 420000);
        } catch (e) {
            console.error(e);
        }
    });

    store.bind(sock.ev);

    sock.ev.on('connection.update', async (update) => {
        const { lastDisconnect, connection } = update;

        if (!usePairingCode && update.qr) {
            logger.info('Scan the QR, expired in 60 seconds.');
        }

        if (connection === 'connecting') {
            logger.info('Connect..');
        }

        if (connection === 'open') {
            logger.info('Connected');
            sock.user.jid = decodeJid(sock.user.id);

            if (!db.settings.exist(sock.user.jid)) {
                await db.settings.add(sock.user.jid);
                await db.save();
            }
        }

        if (connection === 'close') {
            logger.warn({ error: update }, 'Disconnect');
            const shouldReconnect =
                lastDisconnect.error instanceof Boom
                    ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                    : true;

            if (shouldReconnect) {
                logger.info('Reconnect..');
                connectSock();
            }
        }
    });

    sock.ev.on('group-participants.update', async (data) => await groupParticipantsUpdate(data, sock));
    return sock;
}

module.exports = connectSock;