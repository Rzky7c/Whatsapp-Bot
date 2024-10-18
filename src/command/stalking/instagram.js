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
    name: ['ig'],
    command: ['ig'],
    category: ['stalker'],
    detail: {
        desc: 'Stalking user from Instagram.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan username Instagram untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/stalk/igstalk?username=${text}&apikey=${website.apikey}`);

            const result = res.data.result;

            const replyMessage = `👤 Username: ${result.username}
🧑‍🤝‍🧑 Full Name: ${result.fullName}
📈 Followers: ${result.followers}
📉 Following: ${result.following}
🏳️ Pronouns: ${result.pronouns || 'Not specified'}
✔️ Verified: ${result.verified ? 'Yes' : 'No'}
🔒 Private: ${result.private ? 'Yes' : 'No'}
📸 Total Posts: ${result.totalPosts}
📝 Bio: ${result.bio}
🔗 External URL: ${result.externalUrl || 'None'}
🌐 Profile URL: ${result.urlAcc}
🆔 PK ID: ${result.pkId}`;

            await msg.reply({ caption: replyMessage, image: result.profilePic});
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
