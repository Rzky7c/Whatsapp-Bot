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
    name: ['distance'],
    command: ['distance'],
    category: ['information'],
    detail: {
        desc: 'Information Distance Location.',
        use: 'text text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const args = text.split(' '); 

            if (args.length < 2) {
                return msg.reply(`✘ Harap masukkan dua lokasi yang valid.`);
            }

            const res = await axios.get(`${website.web}/api/info/distance?from=${args[0]}&to=${args[1]}&apikey=${website.apikey}`);
            const result = res.data.result;

            let replyMessage = `🔍 *Hasil Information Distance*:\n\n`;

            const distance = result.distance || "❓ Tidak diketahui";
            const description = result.description ? result.description.replace(/\n/g, '\n') : "🔒 #";
            replyMessage += `📍 Location: ${args[0]} > ${args[1]}\n`;
            replyMessage += `🌐 Distance: ${distance}\n`;
            replyMessage += `🔌 Description: ${description}\n`;

            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};

