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
    name: ['npm'],
    command: ['npm'],
    category: ['stalker'],
    detail: {
        desc: 'Stalking user from NPM.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        const args = text.split(' ');

        if (args.length < 2) {
            return msg.reply(`✘ Masukkan username NPM dan hostname untuk memulai.`);
        }

        const username = args[0]; 
        const host = args[1];

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            let res = await axios.get(`${website.web}/api/stalk/npm?query=${username}&hostname=${host}&apikey=${website.apikey}`);

            const result = res.data.result;

            const replyMessage = `🔑 ID: ${result._id}
📝 Name: ${result.name}
📅 Created At: ${new Date(result.time.created).toLocaleString()}
🔄 Modified At: ${new Date(result.time.modified).toLocaleString()}
📅 Version 1.0.0 Time: ${new Date(result.time['1.0.0']).toLocaleString()}
📅 Version 1.1.0 Time: ${new Date(result.time['1.1.0']).toLocaleString()}
📅 Unpublished Version Time: ${new Date(result.time.unpublished.time).toLocaleString()}
📦 Unpublished Versions: ${result.time.unpublished.versions.join(', ')}`;

            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
