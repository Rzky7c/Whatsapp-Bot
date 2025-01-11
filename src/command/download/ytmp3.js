/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/


const axios = require("axios");
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['ytmp3'],
    command: ['ytmp3'],
    category: ['download'],
    detail: {
        desc: 'Download Music from YouTube audio.',
        use: 'url'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan URL video YouTube untuk mengunduh Music.`);
        }
        if (!text.match(/youtube\.com|youtu\.be/g)) {
            return msg.reply(`✘ Invalid url, masukkan url youtube dengan benar`);
        }
        await msg.reply(`🕓 Tunggu sebentar file sedang dikirim.`);
        const apiUrl = `${website.web}/api/download/ytmp3?url=${text}&apikey=${website.apikey}`;

        try {
            const response = await axios.get(apiUrl);

            const result = response.data.result;

            const caption = `🎥 *Music Details* 🎥
=========================
📌 *Title:* ${result.title}
📝 *Description:* ${result.description || 'No description available'}
⏰ *Timestamp:* ${result.timestamp || 'N/A'}
📅 *Uploaded Ago:* ${result.ago || 'Unknown'}
👀 *Views:* ${result.views || 'N/A'}
👤 *Author:* ${result.author?.name || 'Unknown'} ${result.author?.url || 'No URL'}
📂 *Filename:* ${result.filename || 'Unknown'}
🔗 *Video URL:* ${result.url || 'No URL available'}
=========================`
            await msg.reply({ 
                caption: caption, 
                audio: result.url, // URL atau path file audio
                mimetype: 'audio/mpeg', // MIME type untuk file MP3
                fileName: result.filename // Nama file opsional
            });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
