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
    name: ['soundcloud'],
    command: ['soundcloud'],
    category: ['search'],
    detail: {
        desc: 'Search song from soundcloud.',
        use: 'lagu'
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
            const res = await axios.get(`${website.web}/api/search/scsearch?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }
            const randomGame = result[Math.floor(Math.random() * result.length)];
            const randomImage = randomGame.img;

            let replyMessage = `🔍 *Hasil Pencarian Lagu di Soundcloud*:\n\n`;
            result.forEach((item, index) => {
                const judul = item.judul || "Tidak diketahui";
                const link = item.link || "#";

                replyMessage += `${index + 1}. *${judul}*\n`;
                replyMessage += `🔗 Link :${link}\n\n`;
            });

            await msg.reply(replyMessage, { image: menu.soundcloud });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};

