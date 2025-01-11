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
    name: ['play'],
    command: ['play'],
    category: ['download'],
    detail: {
        desc: 'Download Music from YouTube audio.',
        use: 'url'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan query music YouTube untuk mengunduh music.`);
        }
        await msg.reply(`🕓 Tunggu sebentar file sedang dikirim.`);
        const apiUrl = `${website.web}/api/download/ytplay?query=${text}&apikey=${website.apikey}`;

        try {
            const response = await axios.get(apiUrl);

            const result = response.data.result;
            
            await msg.reply({
                audio: result, 
                mimetype: 'audio/mpeg', 
                fileName: result.filename 
            });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
