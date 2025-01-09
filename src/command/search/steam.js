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
    name: ['searchsteam'],
    command: ['searchsteam'],
    category: ['search'],
    detail: {
        desc: 'Search for a game on Steam.',
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
            const res = await axios.get(`${website.web}/api/search/steam?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }
            const randomGame = result[Math.floor(Math.random() * result.length)];
            const randomImage = randomGame.img;

            let replyMessage = `🔍 *Hasil Pencarian Game di Steam*:\n\n`;
            result.forEach((item, index) => {
                const judul = item.judul || "Tidak diketahui";
                const rilis = item.rilis.trim() || "Tanggal rilis tidak diketahui";
                const harga = item.harga !== "no price" ? item.harga : "Gratis / Tidak tersedia";
                const rating = item.rating !== "no ratings undefined" ? item.rating : "Belum ada rating";
                const link = item.link || "#";
                const gambar = item.img || "";

                replyMessage += `${index + 1}. *${judul}*\n`;
                replyMessage += `🗓️ Rilis: ${rilis}\n`;
                replyMessage += `💲 Harga: ${harga}\n`;
                replyMessage += `⭐ Rating: ${rating}\n`;
                replyMessage += `🔗 Link :${link}\n\n`;
            });

            await msg.reply(replyMessage, { image: menu.steam });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};

