/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/


const { plugins } = require('../../storage/lib/plugins.js');
const { owner, defaultPrefix, website } = require('../../setting.js');
const { decodeJid } = require('../../storage/lib/func.js');
const { printLog } = require('../../storage/lib/print.js');
const db = require('../../storage/lib/database.js');
const fetch = require("node-fetch");
let isAntiSpamEnabled = true
const commandLimit = 10000;
const lastCommandTime = new Map();

async function toggleAntiSpam(isEnabled) {
    isAntiSpamEnabled = isEnabled;
    return `Anti-spam has been ${isEnabled ? 'enabled' : 'disabled'}.`;
}


const handler = async (msg, sock) => {
    try {
        const setting = db.settings.get(sock.user.jid);
        const prefixList = (setting && setting.prefix.length) ? setting.prefix : defaultPrefix;

        let prefix = false;
        for (const p of prefixList) {
            const trimmedPrefix = p.trim();
            if (trimmedPrefix === '' || msg.text.startsWith(trimmedPrefix)) {
                prefix = trimmedPrefix;
                break;
            }
        }

        const trimText = prefix !== false ? msg.text.slice(prefix.length).trim() : msg.text.trim();
        const [rawCommand, ...args] = prefix !== false ? (trimText ? trimText.split(/\s+/) : ['']) : [false, ...trimText.split(/\s+/)];
        const command = rawCommand ? rawCommand.toLowerCase() : rawCommand;
        const text = command ? trimText.slice(rawCommand.length).trim() : trimText;

        const isGroup = msg.from.endsWith('@g.us');
        const isPrivate = msg.from.endsWith('@s.whatsapp.net');
        const isBroadcast = msg.from === 'status@broadcast';
        const isOwner = [sock.user.jid, ...owner.map(([number]) => number.replace(/[^0-9]/g, '') + '@s.whatsapp.net')].includes(msg.sender);
        const isRegistered = db.users.exist(msg.sender);
        const isNsfw = isGroup ? db.groups.get(msg.from).setting?.nsfw : true;
        const isBaileys = msg.id.startsWith('3EB0');

        const groupMetadata = isGroup ? await sock.groupMetadata(msg.from) : {};
        const groupName = groupMetadata.subject || '';
        const participants = groupMetadata.participants || [];

        const user = isGroup ? participants.find(u => decodeJid(u.id) === msg.sender) : {};
        const bot = isGroup ? participants.find(b => decodeJid(b.id) === sock.user.jid) : {};
        const isSuperAdmin = user?.admin === 'superadmin' || false;
        const isAdmin = isSuperAdmin || user?.admin === 'admin' || false;
        const isBotAdmin = bot?.admin === 'admin' || false;
    

        let isCommand = false;

        if (!db.groups.exist(msg.from) && isGroup) {
            await db.groups.add(msg.from);
            await db.save();
        }

        if (db.groups.exist(msg.from) && isRegistered) {
            const group = db.groups.get(msg.from);
            await group.users.add(msg.sender);
            await db.save();
        }

        if (setting.mode === 'public' || (setting.mode === 'self' && isOwner)) {
            for (const before of plugins.befores) {
                const name = Object.keys(before)[0];
                try {
                    await before[name].start({
                        msg, sock, text, args, status,
                        isGroup, isPrivate, isBroadcast, isOwner, isRegistered, isSuperAdmin, isAdmin, isBotAdmin, isBaileys,
                        groupMetadata, groupName, participants, db, plugins
                    });
                } catch (e) {
                    console.error(e);
                    if (e.name) {
                        if (before[name].setting?.error_react) await msg.react('❌');
                        await msg.reply(`*${e.name}* : ${e.message}`);
                    }
                }
            }

            if (!isBaileys && !isBroadcast) {
                const stickerCommand = (msg.type === 'stickerMessage'
                    ? db.stickers.get(Buffer.from(msg.message[msg.type].fileSha256).toString('base64'))?.command
                    : ''
                );

                const commands = plugins.commands
                    .map(plugin => Object.values(plugin)[0])
                    .filter(commandObj => commandObj.command.some(cmd =>
                        cmd.toLowerCase() === stickerCommand || cmd.toLowerCase() === command
                    ));

                if (commands.length > 0) {
                    if (isAntiSpamEnabled) {
                        const userId = msg.from.id;
                        const currentTime = Date.now();

                        if (lastCommandTime.has(userId)) {
                            const lastTime = lastCommandTime.get(userId);
                            if (currentTime - lastTime < commandLimit) {
                                return;
                            }
                        }

                        lastCommandTime.set(userId, currentTime);
                    }

                    for (const cmd of commands) {
                        const setting = {
                            isRegister: false,
                            isNsfw: false,
                            isGroup: false,
                            isPrivate: false,
                            isOwner: false,
                            isSuperAdmin: false,
                            isAdmin: false,
                            isBotAdmin: false,
                            ...cmd.setting
                        };

                        if (setting.isRegister && !isRegistered) {
                            await status({ type: 'isRegister', msg, prefix });
                            continue;
                        }
                        if (setting.isNsfw && !isNsfw) {
                            await status({ type: 'isNsfw', msg });
                            continue;
                        }
                        if (setting.isGroup && !isGroup) {
                            await status({ type: 'isGroup', msg });
                            continue;
                        }
                        if (setting.isPrivate && !isPrivate) {
                            await status({ type: 'isPrivate', msg });
                            continue;
                        }
                        if (setting.isOwner && !isOwner) {
                            await status({ type: 'isOwner', msg });
                            continue;
                        }
                        if (setting.isAdmin && !isAdmin) {
                            await status({ type: 'isAdmin', msg });
                            continue;
                        }
                        if (setting.isBotAdmin && !isBotAdmin) {
                            await status({ type: 'isBotAdmin', msg });
                            continue;
                        }

                        try {
                            await cmd.start({
                                msg, sock, text, args, prefix, command, status,
                                isGroup, isPrivate, isOwner, isRegistered, isSuperAdmin, isAdmin, isBotAdmin,
                                groupMetadata, groupName, participants, db, plugins
                            });
                        } catch (e) {
                            console.error(e);
                            if (e.name) {
                                if (cmd.setting?.error_react) await msg.react('❌');
                                await msg.reply(`*${e.name}* : ${e.message}`);
                            }
                        }
                    }
                }
            }
        }

        await printLog({ msg, sock, args, command, groupName, isGroup, isCommand });
    } catch (e) {
        console.error(e);
    }
};

const status = ({ type, msg, prefix = '' }) => {
    const texts = {
        isRegister: `✘ *Silahkan untuk register telebih dahulu.*\n\n*🍟Contoh :* ;\n\n1. ${prefix}reg <username>\n2. ${prefix}reg rzkymlna`,
        isNsfw: '*✘ Fitur NSFW tidak bisa digunakan di dalam group.*',
        isOwner: '*✘ Maaf fitur ini hanya bisa di gunakan oleh owner.*',
        isGroup: '*✘ Fitur ini hanya bisa di gunakan di dalam group.*',
        isPrivate: '*✘ Fitur ini hanya bisa di gunakan di private chat.*',
        isAdmin: '*✘ Maaf fitur ini hanya bisa di akses oleh admin group*',
        isBotAdmin: '*✘ Maaf untuk akses fitur ini jadikan saya admin terlebih dahulu.*'
    };

    const text = texts[type];
    if (text) return msg.reply(text);
};

module.exports = handler;