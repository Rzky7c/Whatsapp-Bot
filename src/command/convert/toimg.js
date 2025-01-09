const { WebpToImg } = require('../../../storage/lib/converter.js');

exports.cmd = {
    name: ['toimg'],
    command: ['toimg', 'toimage'],
    category: ['convert'],
    detail: {
        desc: 'Mengonversi stiker menjadi gambar.',
        use: 'stiker.'
    },
    async start({ msg }) {
        let q = msg.quoted ? msg.quoted : msg;

        if (!/sticker/.test(q.type)) {
            return msg.reply('*🚩 Respon terhadap stiker yang ingin kamu konversi menjadi gambar.* (Stiker tidak boleh animasi)');
        }

        if (q.isAnimated) {
            return msg.reply('*🚩 Stiker tidak boleh animasi.*');
        }

        let media = await q.download();
        let buffer = await WebpToImg(media);
        await msg.reply({ image: buffer });
    }
};
