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
    name: ['google'],
    command: ['google'],
    category: ['search'],
    detail: {
        desc: 'Search from google or other platforms.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply('✘ Masukkan judul untuk memulai pencarian.');
        }

        await msg.reply('🕓 Tunggu sebentar, sedang memproses...');

        try {
            let res = await axios.get(`${website.web}/api/search/image?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const results = res.data.result;

            if (!results || results.length === 0) {
                return msg.reply('✘ Tidak ada hasil yang ditemukan.');
            }
            
            const randomImage = results[Math.floor(Math.random() * results.length)];

            if (!randomImage.url) {
                return msg.reply('✘ Tidak ditemukan gambar valid.');
            }

            await msg.reply({
                caption: randomImage.title,
                image: randomImage.url,
            });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error.message || error);
            await msg.reply('✘ Terjadi kesalahan. Coba lagi nanti.');
        }
    }
};
