const upload = require('../../../storage/lib/scraper/upload.js');

exports.cmd = {
    name: ['setcover'],
    command: ['setcover', 'setthumb'],
    category: ['setting'],
    detail: {
        desc: 'Ubah thumbnail menu bot.',
        use: 'gambar'
    },
    setting: {
        isOwner: true
    },
    async start({ msg, sock, args, db }) {
        const setting = db.settings.get(sock.user.jid);

        if (args[0] === '--default') {
            setting.cover = '';
            return msg.reply('*🚩 Thumbnail menu telah berhasil diubah ke default.*');
        }

        const q = msg.quoted || msg;
        if (!/image/.test(q.type)) {
            return msg.reply('*🚩 Balas gambar untuk mengubah thumbnail menu.*');
        }

        const buffer = await q.download();
        const { status, result } = await upload.image(buffer);
        
        if (!status) {
            return msg.reply('*🚩 Tidak dapat mengubah thumbnail. Coba lagi.*');
        }

        setting.cover = result.url;
        await db.save();
        await msg.reply('*🚩 Thumbnail menu telah berhasil diubah.*');
    }
};
