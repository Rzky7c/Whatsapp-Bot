/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/


const fetch = require("node-fetch");
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['tiktoksearch'],
    command: ['tiktoksearch'],
    category: ['search'],
    detail: {
        desc: 'Search Video from TikTok.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan URL video TikTok untuk mengunduh video.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, file sedang dikirim.`);
        const start = Date.now();
        const apiUrl = `${website.web}/api/search/tiktoksearch?query=${text}&apikey=${website.apikey}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Kesalahan HTTP! Status: ${response.status}`);
            }

            const data = await response.json(); 
            const videoUrl = data.result.no_watermark;
            const title = data.result.title;
            
            if (!videoUrl) {
                return msg.reply("✘ Tidak dapat menemukan URL video tanpa watermark.");
            }

            const videoResponse = await fetch(videoUrl);

            if (!videoResponse.ok) {
                throw new Error(`Kesalahan saat mengunduh video! Status: ${videoResponse.status}`);
            }

            const contentLength = videoResponse.headers.get('content-length');
            const fileSizeInMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : 0; 

            if (fileSizeInMB > 10) {
                return await msg.reply("✘ Ukuran file melebihi 10 MB. Silakan coba video lain.");
            }

            const videoBuffer = await videoResponse.buffer();

            await msg.reply({ caption: `${title}`, video: videoBuffer, mimetype: 'video/mp4' });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
