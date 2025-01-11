/**
   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b
   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/

const fetch = require("node-fetch");
const { website, menu } = require('../../../setting.js');
const fs = require('fs');
const path = require('path');
const { toWebp } = require('../../../storage/lib/sticker.js');
const { sticker } = require('../../../setting.js');
const axios = require('axios');
const mime = require('mime-types');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const { Blob } = require('buffer');

const tempDir = path.join(__dirname, 'temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

async function BLCdn(buffer) {
    try {
        const { ext, mime } = await fromBuffer(buffer) || {};

        if (!ext || !mime) {
            return null;
        }

        const formData = new FormData();
        formData.append('fileInput', buffer, { filename: `file.${ext}`, contentType: mime });

        const response = await fetch('https://cdn.beforelife.me/upload', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            return null;
        }
        try {
            const fileUrl = await response.json();
            return fileUrl;
        } catch (e) {
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

exports.cmd = {
    name: ['nsfwdetec'],
    command: ['nsfwdetec'],
    category: ['tools'],
    detail: {
        desc: 'For checking nsfw image!',
        use: ''
    },
    setting: {
        error_react: true
    },
    async start({ msg, text, command }) {
        const dates = new Date(); 
        const timestamp = dates.getTime();     
        const date = new Date(timestamp);
        const hour = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");    
        const formattedTime = hour + ":" + minutes + ":" + seconds;
  
        if (command === 'nsfwdetec') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender;
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
                return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengecek NSFW.*');
            }
            let media = await q.download();
            let url = await BLCdn(media);
            if (!url || !url.url_response) {
                return msg.reply('*❌ Gagal mengunggah file ke CDN.*');
            }

            try {
                const apiResponse = await fetch(`https://beforelife.me/api/tools/nsfw-detector?url=${url.url_response}&apikey=${website.apikey}`);
                const result = await apiResponse.json();

                if (result && result.result) {
                    const resultString = result.result.join('\n');
                    await msg.reply(`*🚩 Hasil Deteksi NSFW:*

${resultString}`);
                } else {
                    return msg.reply('*❌ Tidak ada hasil yang valid dari API.*');
                }

            } catch (err) {
                console.error('Error:', err);
                return msg.reply('*❌ Gagal memproses gambar.*');
            }
        }
    }
};
