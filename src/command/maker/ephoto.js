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
const { website, menu } = require('../../../setting.js');;

exports.cmd = {
    name: ['american', 'crank', 'buoys', 'heated', 'scholes', 'writestatus', 'water', 'tiger', 'leafgraphy', 'hallowen', 'pig', 'cake', 'sunlight', 'horror', 'anonymous'],
    command:  ['american', 'crank', 'buoys', 'heated', 'scholes', 'writestatus', 'water', 'tiger', 'leafgraphy', 'hallowen', 'pig', 'cake', 'sunlight', 'horror', 'anonymous'],
    category: ['ephoto'],
    detail: {
        desc: 'Create custom image from EPhoto360!.',
        use: 'text'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text, command }) {
        const dates = new Date(); 
        const timestamp = dates.getTime();     
        const date = new Date(timestamp);
        const hour = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");    
        const formattedTime = hour + ":" + minutes + ":" + seconds;

        if (command == 'horror') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/horror?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'sunlight') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/sunlight?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'cake') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/cake?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'pig') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/pig?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'hallowen') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/hallowen?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'leafgraphy') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/leafgraphy?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'tiger') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/tiger?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { video: hasil, mimetype: 'image/gif' });
        }
        if (command == 'water') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/water?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'writestatus') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/writestatus?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'scholes') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            const parts = text.split(' ');
            if (parts.length < 2) {
                return msg.reply(`✘ Harap masukkan 2 kalimat contoh: .scholes txt number`);
            }
            const txt = parts[0];
            const number = parts[1];
            let hasil = await (await fetch(`${website.web}/api/api/ephoto/scholes?text=${txt}&number=${number}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'heated') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            const parts = text.split(' ');
            if (parts.length < 2) {
                return msg.reply(`✘ Harap masukkan 3 kalimat contoh: .heated txt text2`);
            }
            const txt = parts[0];
            const txt2 = parts[1];
            let hasil = await (await fetch(`${website.web}/api/ephoto/heated?text=${txt}&text2=${txt2}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'buoys') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            const parts = text.split(' ');
            if (parts.length < 2) {
                return msg.reply(`✘ Harap masukkan 3 kalimat contoh: .buoys txt txt2`);
            }
            const txt = parts[0];
            const txt2 = parts[1];
            let hasil = await (await fetch(`${website.web}/api/ephoto/buoys?text=${txt}&text2=${txt2}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'crank') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/crank?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { video: hasil, mimetype: 'image/gif' });
        }
        if (command == 'american') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/american?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
        if (command == 'anonymous') {
            if (!text) {
                return msg.reply(`✘ Masukkan Lokasi untuk memulai pencarian.`);
            }
            let hasil = await (await fetch(`${website.web}/api/ephoto/anonymous?text=${text}&apikey=${website.apikey}`)).buffer()
            await msg.reply('Nih kak sudah jadi!', { image: hasil });
        }
    }
};
