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
    name: ['yttrend'],
    command: ['yttrend'],
    category: ['information'],
    detail: {
        desc: 'Information Trending Youtube.',
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
            let res = await axios.get(`${website.web}/api/info/trend/youtube?country=${text}&apikey=${website.apikey}`);
            const result = res.data.result;

            const formattedResults = result.map((item) => ({
                ...item,
                caption: item.trending_number
            }));

            let replyMessage = `🔍 *Information Trending Youtube*:\n\n`;

            formattedResults.forEach((item, index) => {
                replyMessage += `${index + 1}. *${item.title}*\n`;
                replyMessage += `📸 Thumbnail: ${item.thumbnail}\n`; 
                replyMessage += `🔗 URL: ${item.url}\n`;
                replyMessage += `📺 Channel: ${item.channel}\n`; 
                replyMessage += `📅 Uploaded At: ${item.uploaded_at}\n`; 
                replyMessage += `👁️ Viewers: ${item.viewers}\n`;
                replyMessage += `👍 Likes: ${item.likes}\n`; 
                replyMessage += `📝 Description: ${item.description}\n\n`;
            });            

            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API...", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
