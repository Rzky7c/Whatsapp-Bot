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
    name: ['infocuaca'],
    command: ['infocuaca'],
    category: ['information'],
    detail: {
        desc: 'Information Cuaca.',
        use: 'lokasi'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text}) {

        if (!text) {
            return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
        }
    
        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/info/cuaca?query=${text}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Information Cuaca*:\n\n`;
            if (typeof result === 'object' && result !== null) {
                const name        = result.Name         || "❓ Tidak diketahui";
                const longitude   = result.Longitude    || "❓ Tidak diketahui";
                const latitude    = result.Latitude     || "❓ Tidak diketahui";
                const sunrise     = result.sunrise      || "🔒 #";
                const sunset      = result.sunset       || "🔒 #";
                const suhu        = result.Suhu         || "🚫 Tidak diketahui";
                const angin       = result.Angin        || "🚫 Tidak diketahui";
                const kelembaban   = result.Kelembaban   || "🚫 Tidak diketahui";
                const cuaca       = result.Cuaca        || "❓ Tidak diketahui";
                const keterangan   = result.Keterangan    || "❓ Tidak diketahui";
                const udara       = result.Udara        || "🚫 Tidak diketahui";
            
                replyMessage += `🌍 *Lokasi*: ${name}\n`;
                replyMessage += `📍 *Koordinat*: ${latitude}, ${longitude}\n`;
                replyMessage += `🌅 *Sunrise*: ${sunrise}\n`;
                replyMessage += `🌇 *Sunset*: ${sunset}\n`;
                replyMessage += `🌡️ *Suhu*: ${suhu}\n`;
                replyMessage += `💨 *Angin*: ${angin}\n`;
                replyMessage += `💧 *Kelembaban*: ${kelembaban}\n`;
                replyMessage += `🌦️ *Cuaca*: ${cuaca}\n`;
                replyMessage += `📝 *Keterangan*: ${keterangan}\n`;
                replyMessage += `🌬️ *Tekanan Udara*: ${udara}`;
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
