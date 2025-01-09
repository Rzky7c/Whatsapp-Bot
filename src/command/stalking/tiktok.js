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
    name: ['tiktok'],
    command: ['tiktok'],
    category: ['stalker'],
    detail: {
        desc: 'Stalking user from Tiktok.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan username Tiktok untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/stalk/tiktok?username=${text}&apikey=${website.apikey}`);

            const result = res.data.result;

          const replyMessage = `👤 Username: ${result.uniqueId || 'Not specified'}
🧑‍🤝‍🧑 Nickname: ${result.nickname || 'Not specified'}
📝 Bio: ${result.bioLink || 'None'}
✔️ Verified: ${result.verified ? 'Yes' : 'No'}
🔒 Private Account: ${result.privateAccount ? 'Yes' : 'No'}
📈 Followers: ${result.followers}
📉 Following: ${result.following}
❤️ Total Hearts: ${result.hearts}
🎥 Total Videos: ${result.videos}
🖼 Avatar: ${result.avatar}`;

            await msg.reply({ caption: replyMessage, image: result.avatar });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
