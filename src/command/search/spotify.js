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
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['spotifysearch'],
    command: ['spotifysearch'],
    category: ['search'],
    detail: {
        desc: 'Search from Spotify or other platforms.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan Title untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang memproses...`);

        try {
            let res = await axios.get(`${website.web}/api/search/spotify?query=${text}&apikey=${website.apikey}`);
            const results = res.data.result;

            if (!results || results.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Pencarian*:\n\n`;

            results.forEach((item, index) => {
                replyMessage += `${index + 1}. *${item.title}*\n`;
                replyMessage += `📊 Popularitas: ${item.popularity}\n`;
                replyMessage += `🔗 Link : ${item.url}\n`;
                if (item.preview) {
                    replyMessage += `🎧 Preview : ${item.preview}\n`;
                }
                replyMessage += `\n`;
            });

            await msg.reply(replyMessage.trim());
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
