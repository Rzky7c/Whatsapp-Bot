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
    name:  ['meme','affect','darkness','gay','delete','greyscale','invert', 'spotifymaker','brat', 'dislike', 'drakeposting', 'alert'],
    command:  ['meme','affect','darkness','gay','delete','greyscale','invert', 'spotifymaker', 'brat', 'dislike', 'drakeposting', 'alert'],
    category: ['maker'],
    detail: {
        desc: 'Create custom image!.',
        use: 'text'
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
  
        if (command == 'invert') {
          let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
          let q = msg.quoted ? msg.quoted : msg;
          if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
          }
          let media = await q.download()
          let url = await BLCdn(media)
          let hasil = await (await fetch(`${website.web}/api/maker/invert?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
          await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'greyscale') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/greyscale?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'delete') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/delete?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'gay') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/gay?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'darkness') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/darkness?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'affect') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/affect?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'meme') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            if (!text) {
                return msg.reply(`✘ Masukkan text untuk memulai.`);
            }
            const args = text.split(' '); 
            if (args.length < 2) {
                return msg.reply(`✘ Harap masukkan 2 kalimat contoh: .meme rizky maulana`);
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/meme?url=${url.url_response}&text=${args[0]}&text2=${args[1]}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'spotifymaker') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            if (!text) {
                return msg.reply(`✘ Masukkan text untuk memulai.`);
            }
            const parts = text.split(' ');
            if (parts.length < 2) {
                return msg.reply(`✘ Harap masukkan 3 kalimat contoh: .spotifymaker title author album`);
            }
            const title = parts[0];
            const album = parts[1];
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/spotify?image=${url.url_response}&title=${title}&author=HeavyCraft&album=${album}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        
        if (command == 'dislike') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await BLCdn(media)
            let hasil = await (await fetch(`${website.web}/api/maker/dislike?url=${url.url_response}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'drakeposting') {
           
            if (!text) {
                return msg.reply(`✘ Masukkan text untuk memulai.`);
            }
            const args = text.split(' ');
            if (args.length < 2) {
                return msg.reply(`✘ Harap masukkan 2 kalimat contoh: .drakeposting rizky maulana`);
            }
            let hasil = await (await fetch(`${website.web}/api/maker/drakeposting?text=${args[0]}&text2=${args[1]}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        
        if (command == 'alert') {
           
            if (!text) {
                return msg.reply(`✘ Masukkan text untuk memulai.`);
            }
            const args = text.split(' ');
            if (args.length < 1) {
                return msg.reply(`✘ Harap masukkan 1 kalimat contoh: .alert rizky`);
            }
            let hasil = await (await fetch(`${website.web}/api/maker/alert?query=${args[0]}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'brat') {
            if (!text) {
                return msg.reply(`✘ Masukkan text untuk memulai.`);
            }
            const query = text.replace(/\s+/g, '+');
        
            try {
                let hasil = await (await fetch(`${website.web}/api/maker/brat?query=${query}&apikey=${website.apikey}`)).buffer();
    
                let opts = {
                    ...sticker,
                    emojis: ['🧶', '🐈'],
                    isFull: true,
                    other: {
                        'is-ai-sticker': 1
                    }
                };
        
                let buffer = await toWebp(hasil, opts);
                await msg.reply({ sticker: buffer });
            } catch (error) {
                // Handle errors gracefully
                console.error(error);
                return msg.reply(`✘ Terjadi kesalahan saat membuat sticker.`);
            }
        }        
    }
};
