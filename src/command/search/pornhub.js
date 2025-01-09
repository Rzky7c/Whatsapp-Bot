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
const { website, menu } = require('../../../setting.js');

exports.cmd = {
    name: ['pornhub'],
    command: ['pornhub'],
    category: ['search'],
    detail: {
        desc: 'Search Film from PornHub.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan judul lagu untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/search/pornhub?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }
            const randomGame = result[Math.floor(Math.random() * result.length)];
            const randomImage = randomGame.img;

            let replyMessage = `🔍 *Hasil Pencarian Film di PornHub*:\n\n`;
            result.forEach((item, index) => {
                const judul = item.title || "Tidak diketahui";
                const link = item.url || "#";
                const viewers = item.viewers || "0";
                const rating = item.rating || "0";
                const published = item.published || "0";
            
                replyMessage += `${index + 1}. 🎬 *${judul}*\n`; 
                replyMessage += `👁️‍🗨️ Viewers: ${viewers}\n`; 
                replyMessage += `⭐ Rating: ${rating}\n`; 
                replyMessage += `📅 Published: ${published}\n`;
                replyMessage += `🔗 Link: ${link}\n\n`;
            });
            

            await msg.reply(replyMessage, { image: menu.pornhub });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
