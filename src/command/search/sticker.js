const { toWebp } = require('../../../storage/lib/sticker.js');
const { sticker } = require('../../../setting.js');
const fetch = require('node-fetch');

exports.cmd = {
    name: ['stickersearch'],
    command: ['stickersearch'],
    category: ['search'],
    detail: {
        desc: 'Mencari sticker.',
        use: 'text'
    },
    async start({ msg, text}) {
        if (!text) {
            return msg.reply(`✘ Masukkan judul sticker untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);
        
        try {
            const response = await fetch(`${website.web}/api/search/sticker?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const data = await response.json();
            
            const stickers = data.result;
            if (stickers && stickers.length > 0) {
                const randomStickerUrl = stickers[Math.floor(Math.random() * stickers.length)].url;

                let opts = {
                    ...sticker,
                    emojis: ['🧶', '🐈'],
                    isFull: true,
                    other: {
                        'is-ai-sticker': 1
                    }
                };

                const media = await fetch(randomStickerUrl).then(res => res.buffer());
                const buffer = await toWebp(media, opts);

                await msg.reply({ sticker: buffer });
            } else {
                await msg.reply('*🚩 Tidak ada sticker ditemukan.*');
            }
        } catch (error) {
            console.error('Error fetching sticker:', error);
            await msg.reply('*🚩 Terjadi kesalahan saat mencari sticker.*');
        }
    }
};