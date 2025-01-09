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
    name: ['igdl'],
    command: ['igdl'],
    category: ['download'],
    detail: {
        desc: 'Download Video from Instagram Video.',
        use: 'url'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan URL video Instagram untuk mengunduh video.`);
        }
        if (!text.match(/instagram\.com/g)) {
            return msg.reply(`✘ Invalid url, masukkan url Instagram dengan benar`);
        }
        await msg.reply(`🕓 Tunggu sebentar file sedang dikirim.`);
        const start = Date.now();
        const apiUrl = `${website.web}/api/download/instagram?url=${text}&apikey=${website.apikey}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Kesalahan HTTP! Status: ${response.status}`);
            }

            const contentLength = response.headers.get('content-length');
            const fileSizeInMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : 0; // Mengubah byte menjadi MB

            if (fileSizeInMB > 10) {
                return await msg.reply("✘ Ukuran file melebihi 10 MB. Silakan coba video lain.");
            }

            const videoBuffer = await response.buffer();

            const end = Date.now();

            await msg.reply({ caption: `🍟 *Scraping* · ${(end - start).toFixed(2)} ms`, video: videoBuffer, mimetype: 'video/mp4' });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
