const { toWebp } = require('../../../storage/lib/sticker.js');
const { sticker } = require('../../../setting.js');

exports.cmd = {
    name: ['sticker'],
    command: ['sticker', 's'],
    category: ['convert'],
    detail: {
        desc: 'Mengonversi gambar/video/gif menjadi stiker.',
        use: 'media'
    },
    async start({ msg }) {
        let q = msg.quoted ? msg.quoted : msg;
        if (!/(image\/(?!webp))|video/.test(q.media?.mimetype)) {
            return msg.reply('*🚩 Respon terhadap gambar, video, atau gif untuk mengonversinya menjadi stiker.*');
        }
        
        let opts = {
            ...sticker,
            emojis: ['🧶', '🐈'],
            isFull: true,
            other: {
                'is-ai-sticker': 1
            }
        };
        
        let media = await q.download();
        let buffer = await toWebp(media, opts);
        await msg.reply({ sticker: buffer });
    }
};
