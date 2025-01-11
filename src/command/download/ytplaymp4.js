/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/


const axios = require("axios");
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['playmp4'],
    command: ['playmp4'],
    category: ['download'],
    detail: {
        desc: 'Play Video from YouTube.',
        use: 'url'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan Judul video YouTube untuk mengunduh video.`);
        }
        await msg.reply(`🕓 Tunggu sebentar file sedang dikirim.`);
        const apiUrl = `${website.web}/api/download/ytplaymp4?query=${text}&apikey=${website.apikey}`;

        try {
            const response = await axios.get(apiUrl);

            const result = response.data.result;

            await msg.reply({ caption: 'Nih kak sudah jadi!', video: result, mimetype: 'video/mp4' });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};