const { jidDecode, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sizeFormatter } = require('human-readable');
const PhoneNumber = require('awesome-phonenumber');
const Jimp = require('jimp');
const moment = require('moment-timezone');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const FileType = require('file-type');
const crypto = require('crypto');

const store = require('./store.js');
const { timeZone } = require('../../setting.js');

function decodeJid(jid) {
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + '@' + decode.server || jid).trim();
    } else {
        return jid.trim();
    }
}

function formatDuration(ms) {
    const units = [
        { label: 'a', factor: 365 * 86400 },
        { label: 'm', factor: 30 * 86400 },
        { label: 'sem.', factor: 7 * 86400 },
        { label: 'd', factor: 86400 },
        { label: 'h', factor: 3600 },
        { label: 'min.', factor: 60 },
        { label: 's', factor: 1 }
    ];

    let s = Math.floor(ms / 1000);
    let time = [];

    for (let { label, factor } of units) {
        let value = Math.floor(s / factor);
        s %= factor;
        if (value > 0) {
            time.push(`${value}${label}`);
        }
    }

    return time.slice(0, 3).join(', ') || '0s';
}

function getRandom(type) {
    return (type instanceof Array || type instanceof String) 
        ? type[Math.floor(Math.random() * type.length)] 
        : Math.floor(Math.random() * type);
}

function formatTime(type, ms) {
    const time = ms ? moment.tz(ms, timeZone) : moment.tz(timeZone);

    if (type === 'hour') {
        return time.format('hh:mm a');
    } else if (type === 'date') {
        return time.format('ddd, D MMM YYYY').replace(/^\w/, (c) => c.toUpperCase());
    }
    return null;
}

function getName(jid) {
    if (jid === '0@s.whatsapp.net') {
        return 'WhatsApp';
    }

    for (const chatKey in store.messages) {
        if (store.messages.hasOwnProperty(chatKey)) {
            const usersArray = store.messages[chatKey].array;
            const userMsgs = usersArray.filter(m => m.sender === jid && m?.pushName);
            if (userMsgs.length !== 0) {
                return userMsgs[userMsgs.length - 1].pushName;
            }
        }
    }

    return PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
}

async function downloadMediaMessage(media) {
    let type = Object.keys(media)[0];
    let msg = media[type];

    if (!msg || !(msg.url || msg.directPath)) {
        return null;
    }

    let stream = await downloadContentFromMessage(msg, type.replace(/Message/i, ''));
    let buffers = [];

    for await (let chunk of stream) {
        buffers.push(chunk);
    }

    buffers = Buffer.concat(buffers);
    stream.destroy();

    return buffers;
}

async function getFile(PATH) {
    let res = null, filename;
    let buffer = Buffer.isBuffer(PATH)
        ? PATH
        : /^data:.*?\/.*?;base64,/i.test(PATH)
            ? Buffer.from(PATH.split(',')[1], 'base64')
            : /^https?:\/\//.test(PATH)
                ? Buffer.from(res = await fetchBuffer(PATH), 'binary')
                : fs.existsSync(PATH)
                    ? (filename = PATH, fs.readFileSync(PATH))
                    : typeof PATH === 'string'
                        ? PATH
                        : Buffer.alloc(0);

    if (!Buffer.isBuffer(buffer)) throw new TypeError('Result is not a buffer.');

    let type = await FileType.fromBuffer(buffer) || {
        mime: 'application/octet-stream',
        ext: '.bin'
    };

    return {
        res,
        ...type,
        buffer
    };
}

async function fetchBuffer(url) {
    try {
        const axiosResponse = await axios.get(url, { responseType: 'arraybuffer' });
        const axiosBuffer = axiosResponse.data;

        if (axiosBuffer.byteLength > 0) {
            return axiosBuffer;
        }

        throw new Error('Axios returned an empty buffer.');
    } catch (axiosError) {
        try {
            const fetchResponse = await fetch(url);

            if (!fetchResponse.ok) {
                throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
            }

            const fetchBuffer = await fetchResponse.arrayBuffer();

            if (fetchBuffer.byteLength > 0) {
                return fetchBuffer;
            }

            throw new Error('Fetch returned an empty buffer.');
        } catch (fetchError) {
            throw fetchError;
        }
    }
}

function formatSize(size) {
    return sizeFormatter({
        std: 'JEDEC',
        decimalPlaces: 2,
        keepTrailingZeroes: false,
        render: (literal, symbol) => `${literal} ${symbol}B`,
    })(size);
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

async function resizeImage(buffer, resolution) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await Jimp.read(buffer);
            const { width, height } = image.bitmap;
            const ratio = width / height;
            const optimalWidth = ratio > 1 ? resolution : Math.round(resolution * ratio);
            const optimalHeight = ratio < 1 ? resolution : Math.round(resolution / ratio);
            const resizedBuffer = await image.resize(optimalWidth, optimalHeight).getBufferAsync(Jimp.MIME_JPEG);
            resolve(resizedBuffer);
        } catch (e) {
            reject(e);
        }
    });
}

function generateCode(length = 7) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const bytes = crypto.randomBytes(length);
    let result = '';

    for (let i = 0; i < length; i++) {
        const index = bytes[i] % characters.length;
        result += characters.charAt(index);
    }

    return result;
}

module.exports = {
    decodeJid,
    formatDuration,
    formatTime,
    getRandom,
    getName,
    downloadMediaMessage,
    getFile,
    fetchBuffer,
    formatSize,
    formatNumber,
    resizeImage,
    generateCode
};
