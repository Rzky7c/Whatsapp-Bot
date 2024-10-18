/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/

const fetch = require("node-fetch");
const { website, menu } = require('../../../setting.js');
const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

async function Images(buffer) {
    try {
        const { ext, mime } = await fromBuffer(buffer) || {};
        
        const form = new FormData();
        form.append("files[]", buffer, { 
            filename: `tmp.${ext}`, 
            contentType: mime 
        });

        const response = await axios.post(
            "https://pomf.lain.la/upload.php", 
            form, { headers: form.getHeaders() }
        );
        
        const file = response.data.files[0];
        
        return {
            status: true,
            result: {
                url: file.url,
                size: file.size,
            }
        };
    } catch (e) {
        return { 
            status: false, 
            msg: e.message 
        };
    }
}

exports.cmd = {
    name:  ['meme','affect','darkness','gay','delete','greyscale','invert', 'spotifymaker'],
    command:  ['meme','affect','darkness','gay','delete','greyscale','invert', 'spotifymaker'],
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
          let url = await Images(media)
          let hasil = await (await fetch(`${website.web}/api/maker/invert?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
          await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'greyscale') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/greyscale?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'delete') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/delete?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'gay') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/gay?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'darkness') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/darkness?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'affect') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/affect?url=${url.result.url}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'meme') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            const args = text.split(' '); 
            if (args.length < 2) {
                return msg.reply(`✘ Harap masukkan 2 kalimat contoh: .meme rizky maulana`);
            }
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/meme?url=${url.result.url}&text=${args[0]}&text2=${args[1]}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'spotifymaker') {
            let who = msg.mentionedJid && msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.fromMe ? sock.user.jid : msg.sender
            let q = msg.quoted ? msg.quoted : msg;
            if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
            }
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            const parts = text.split(' ');
            if (parts.length < 2) {
                return msg.reply(`✘ Harap masukkan 3 kalimat contoh: .meme title author album`);
            }
            const title = parts[0];
            const album = parts[1];
            let media = await q.download()
            let url = await Images(media)
            let hasil = await (await fetch(`${website.web}/api/maker/spotify?image=${url.result.url}&title=${title}&author=HeavyCraft&album=${album}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
    }
};
