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
    name: ['wattpad'],
    command: ['wattpad'],
    category: ['search'],
    detail: {
        desc: 'Search for a wattpad.',
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
            const res = await axios.get(`${website.web}/api/search/wattpad?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            const randomGame = result[Math.floor(Math.random() * result.length)];
            const randomImage = randomGame.cover;

            let replyMessage = `🔍 *Hasil Pencarian Wattpad*:\n\n`;
            result.forEach((item, index) => {
                const nama = item.title || "Tidak diketahui";
                const url = item.url || "#";
                const user = item.user?.name || "Pengembang tidak diketahui";
                const numParts = item.numParts || "Belum ada rating";
                const lastPublishedPart = item.lastPublishedPart?.createDate || "#";
                const voteCount = item.voteCount || "#";
                const readCount = item.readCount || "#";
                const commentCount = item.commentCount || "#";
                const cover = item.cover || "#";
                const description = item.description || "";
            
                replyMessage += `${index + 1}. *${nama}*\n`;
                replyMessage += `👨‍💻 Developer: ${user}\n`;
                replyMessage += `🔗 Link: ${url}\n`;
                replyMessage += `📝 Deskripsi: ${description}\n`;
                replyMessage += `📊 Jumlah Bagian: ${numParts}\n`;
                replyMessage += `🗓️ Terbit Terakhir: ${lastPublishedPart}\n`;
                replyMessage += `👍 Jumlah Suara: ${voteCount}\n`;
                replyMessage += `📚 Jumlah Bacaan: ${readCount}\n`;
                replyMessage += `💬 Jumlah Komentar: ${commentCount}\n`;
                replyMessage += `🖼️ Sampul: ${cover}\n\n`; 
            });            

            await msg.reply(replyMessage, { image: randomImage });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
