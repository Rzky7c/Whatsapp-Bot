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
    name: ['ytsearch'],
    command: ['ytsearch'],
    category: ['search'],
    detail: {
        desc: 'Search from Youtube.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {

        if (!text) {
            return msg.reply(`✘ Masukkan Title Youtube untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/search/ytsearch?query=${text}&apikey=${website.apikey}`);
            const result = res.data.result;

            const formattedResults = result.map((item) => ({
                ...item,
                caption: item.title
            }));

            let replyMessage = `🔍 *Search Results*:\n\n`;
            formattedResults.forEach((item, index) => {
                replyMessage += `${index + 1}. *${item.caption}*\n`;
                replyMessage += `🔗 Link: ${item.url}\n`;
                replyMessage += `🕒 Duration: ${item.duration}\n`;
                replyMessage += `⏰ Uploaded: ${item.uploaded}\n`;
                replyMessage += `👁️ Views: ${item.views}\n\n`;
            });

            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API...", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
