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
    name: ['pinterest'],
    command: ['pinterest'],
    category: ['search'],
    detail: {
        desc: 'Search from pinterest or other platforms.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan Title untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang memproses...`);

        try {
            let res = await axios.get(`${website.web}/api/search/pinterest?query=${text}&apikey=${website.apikey}`);
            const results = res.data.result;

            if (!results || results.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            const randomImage = results[Math.floor(Math.random() * results.length)]

            await msg.reply({ caption: 'Nih kak!', image: randomImage });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
