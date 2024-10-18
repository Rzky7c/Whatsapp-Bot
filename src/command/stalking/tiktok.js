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

            const replyMessage = `👤 Username: ${result.username}
🧑‍🤝‍🧑 Nickname: ${result.nickname || 'Not specified'}
📝 Description: ${result.description || 'None'}
✔️ Verified: ${result.isVerify ? 'Yes' : 'No'}
🔒 Private: ${result.isPrivate ? 'Yes' : 'No'}
💼 User Commerce: ${result.isUserCommerce ? 'Yes' : 'No'}
🌍 Region: ${result.region}
📈 Followers: ${result.followers}
📉 Following: ${result.following}
👥 Friends: ${result.friends}
❤️ Total Likes: ${result.totalLikes}
🎥 Total Videos: ${result.totalVideos}`;

            await msg.reply({ caption: replyMessage, image: result.pp_thumbnail });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
