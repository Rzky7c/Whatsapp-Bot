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
    name: ['grok-2m'],
    command: ['grok-2m'],
    category: ['ai'],
    detail: {
        desc: 'Grok-2-Mini',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan text untuk untuk memulai.`);
        }
    
        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);
    
        try {
            let res = await axios.get(`${website.web}/api/ai/grok-2-mini?query=${text}&apikey=${website.apikey}`);
    
            let resultText = res.data.result;
    
            let formattedText = resultText.replace(/\\n/g, '\n');
    
            await msg.reply(`${formattedText}`);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
    
};
