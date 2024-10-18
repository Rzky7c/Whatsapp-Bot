/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/

const axios = require('axios');
const { website, menu } = require('../../../setting.js');

exports.cmd = {
    name: ['playstore'],
    command: ['playstore'],
    category: ['search'],
    detail: {
        desc: 'Search for a game on Google Play Store.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan judul game untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/search/playstore?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            const randomGame = result[Math.floor(Math.random() * result.length)];
            const randomImage = randomGame.img;

            let replyMessage = `🔍 *Hasil Pencarian Game di Google Play Store*:\n\n`;
            result.forEach((item, index) => {
                const nama = item.nama || "Tidak diketahui";
                const developer = item.developer || "Pengembang tidak diketahui";
                const rating = item.rate2 || "Belum ada rating";
                const link = item.link || "#";
                const linkDev = item.link_dev || "#";
                const gambar = item.img || "";

                replyMessage += `${index + 1}. *${nama}*\n`;
                replyMessage += `👨‍💻 Developer: ${developer}\n`;
                replyMessage += `👨‍💻 Link Developer: ${linkDev}\n`;
                replyMessage += `⭐ Rating: ${rating}\n`;
                replyMessage += `🔗 Link: ${link})\n\n`;
            });

            await msg.reply(replyMessage, { image: menu.playstore });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
