/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/

const axios = require('axios');
const { website } = require('../../../setting.js');


exports.cmd = {
    name: ['searchsong'],
    command: ['searchsong'],
    category: ['search'],
    detail: {
        desc: 'Search music.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan judul lagu untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/search/searchmp3?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Pencarian Lagu*:\n\n`;
            result.forEach((item, index) => {
                replyMessage += `${index + 1}. *${item.title}*\n`;
                replyMessage += `🔗 Link: ${item.url}\n`;
                replyMessage += `🖼️ Gambar: ${item.thumb}\n`;
                replyMessage += `📋 Deskripsi: ${item.desc}\n\n`;
            });

            await msg.reply(replyMessage, { parse_mode: 'Markdown' });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
