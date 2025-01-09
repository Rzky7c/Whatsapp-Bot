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
    name: ['twtrending'],
    command: ['twtrending'],
    category: ['information'],
    detail: {
        desc: 'Information Trending Twitter.',
        use: 'negara'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {

        if (!text) {
            return msg.reply(`✘ Masukkan negara untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/info/trend/twitter?country=${text}&apikey=${website.apikey}`);
            const result = res.data.result.data;
            const message = res.data.result.message;
            const updated_at = res.data.result.updated_at;

            const formattedResults = result.map((item) => ({
                ...item,
                caption: item.trending_number
            }));

            let replyMessage = `🔍 *Information Trending Twitter*:\n\n📝 Message: ${message}\n🕒 Update At: ${updated_at}\n\n`;

            formattedResults.forEach((item, index) => {
                replyMessage += `${index + 1}. Trending: *${item.trending_number}*\n`;
                replyMessage += `📈 Hashtag: ${item.hastag}\n`; 
                replyMessage += `🔁 Tweet Count: ${item.tweet_count}\n`;
                replyMessage += `🔗 URL: ${item.url}\n\n`; 
            });

            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API...", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
