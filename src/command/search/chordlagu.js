/**
 * @project_name : Heavy-Craft
 * @authors : Rizky Maulana
 * @instagram : rizkymaulanasidikk
 * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
 * @version 1.3.6b
 * Created By Rizky Maulana.
 * © 2025  Heavy-Craft.
 */

const axios = require('axios');
const { website } = require('../../../setting.js');

exports.cmd = {
    name: ['chordlagu'],
    command: ['chordlagu'],
    category: ['search'],
    detail: {
        desc: 'Search for a chordlagu.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan judul game untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/search/chordlagu?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Pencarian Chordlagu*:\n\n`;

            // Tambahkan chord
            const chord = result.chord || "Tidak ada chord.";
            replyMessage += `🎶 *Chord*:\n${chord.replace(/\n/g, ' 1 2 3 ')}\n\n`;

    
            await msg.reply(replyMessage);
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
