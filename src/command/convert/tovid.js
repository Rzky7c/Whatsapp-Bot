const { webpToVideo } = require('../../../storage/lib/scraper/ezgif.js');

exports.cmd = {
    name: ['tovid'],
    command: ['tovid', 'tovideo'],
    category: ['convert'],
    detail: {
        desc: 'Mengonversi stiker animasi menjadi video.',
        use: 'stiker.'
    },
    async start({ msg }) {
        let q = msg.quoted ? msg.quoted : msg;

        if (!/sticker/.test(q.type)) {
            return msg.reply('*🚩 Respon terhadap stiker yang ingin kamu konversi menjadi video.* (Stiker harus animasi)');
        }

        if (!q.media.isAnimated) {
            return msg.reply('*🚩 Stiker harus animasi.*');
        }

        let media = await q.download();
        let { status, result } = await webpToVideo(media);

        if (!status) {
            return msg.reply('*📛 | Terjadi kesalahan saat mendapatkan hasil.*');
        }

        await msg.reply({ video: result.url });
    }
};
