/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/


const fetch = require("node-fetch");
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['ttmusic'],
    command: ['ttmusic'],
    category: ['download'],
    detail: {
        desc: 'Download audio from Tiktok video.',
        use: 'url'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan URL Video Tiktok untuk mengunduh audio.`);
        }
        await msg.reply(`🕓 Tunggu sebentar file sedang dikirim.`);
        const apiUrl = `${website.web}/api/download/tiktok/music?url=${text}&apikey=${website.apikey}`;

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

            await msg.reply({ audio: videoBuffer, mimetype: 'audio/mpeg' });

            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil API:", error);
            await msg.reply("✘ Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.");
            await msg.react('✖');
        }
    }
};
