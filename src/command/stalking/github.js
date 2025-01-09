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
    name: ['github'],
    command: ['github'],
    category: ['stalker'],
    detail: {
        desc: 'Stalking user from github.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan username github untuk memulai.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/stalk/github?username=${text}&apikey=${website.apikey}`);

            // Access the result from the response
            const result = res.data.result;

            // Construct the reply message with the new fields
            const replyMessage = `👤 Username: ${result.username}
📝 Name: ${result.name || 'Not specified'}
🏢 Company: ${result.company || 'None'}
📍  Location: ${result.location || 'Not specified'}
📝 Bio: ${result.bio || 'None'}
📈 Followers: ${result.followers}
📉 Following: ${result.following}
📦 Repository Count: ${result.repository_count}
📅 Created At: ${result.created_at}
🔄 Updated At: ${result.update_at}`;

            await msg.reply({ caption: replyMessage, image: result.profile_url });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
