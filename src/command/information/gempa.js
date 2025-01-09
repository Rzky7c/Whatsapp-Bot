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
const { website, menu } = require('../../../setting.js');

exports.cmd = {
    name: ['infogempa'],
    command: ['infogempa'],
    category: ['information'],
    detail: {
        desc: 'Information Gempa.'
    },
    setting: {
        error_react: true
    },
    async start({ msg }) {
    
        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/info/gempa?apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Information Gempa*:\n\n`;
            if (typeof result === 'object' && result !== null) {
                const title      = result.title      || "❓ Tidak diketahui";
                const waktu      = result.waktu      || "🔒 #";
                const magnitude   = result.magnitude   || "🚫 0";
                const koordinat   = result.koordinat   || "❓ Tidak diketahui";
                const lokasi      = result.lokasi      || "❓ Tidak diketahui";
                const dirasakan   = result.dirasakan    || "❓ Tidak diketahui";

                replyMessage += `📝 *Judul*: ${title}\n`;
                replyMessage += `⏰ *Waktu*: ${waktu}\n`;
                replyMessage += `📊 *Magnitude*: ${magnitude}\n`;
                replyMessage += `📍 *Koordinat*: ${koordinat}\n`;
                replyMessage += `📍 *Lokasi*: ${lokasi}\n`;
                replyMessage += `🧑‍🤝‍🧑 *Dirasakan oleh*: ${dirasakan}\n`;
            } else {
                replyMessage += "❌ *Kesalahan*: Data tidak valid. Tidak dapat mengambil informasi dari API.\n";
            }
            
            
            await msg.reply(replyMessage, { image: result.thumbnail });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
