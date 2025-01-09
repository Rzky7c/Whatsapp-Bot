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
    name: ['recipes'],
    command: ['recipes'],
    category: ['search'],
    detail: {
        desc: 'Search recipes from google or other platforms.',
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
            let res = await axios.get(`${website.web}/api/search/recipes?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const results = res.data.result;

            if (!results || results.length === 0) {
                return msg.reply('✘ Tidak ada hasil yang ditemukan.');
            }
            const toNumberedList = (text) => {
                return text
                    .split('\n') 
                    .filter(line => line.trim() !== '') 
                    .map((line, index) => `${index + 1}. ${line.trim()}`) 
                    .join('\n'); 
            };

            const numberedIngredients = toNumberedList(results.ingredient);
            const numberedSteps = toNumberedList(results.step);

            await msg.reply({
                caption: `🍽️ *${results.title}*
            
⏳ *Waktu*: ${results.timer}  
🍛 *Porsi*: ${results.portion}
📋 *Tingkat Kesulitan*: ${results.level}

🛒 *Bahan-Bahan*:  
${numberedIngredients}
            
👨‍🍳 *Langkah-Langkah*:  
${numberedSteps}
            
Selamat memasak! 🎉`,
                image: results.thumbnail,
            });
            
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error.message || error);
            await msg.reply('✘ Terjadi kesalahan. Coba lagi nanti.');
        }
    }
};
