exports.cmd = {
    name: ['public'],
    command: ['public'],
    category: ['setting'],
    detail: {
        desc: 'Aktifkan bot.'
    },
    setting: {
        isOwner: true
    },
    async start({ msg, sock, isGroup, db }) {
        const config = db.settings.get(sock.user.jid);
        if (config.mode === 'public') {
            return msg.reply('*🚩 Bot sudah diaktifkan.*');
        }
        config.mode = 'public';
        await db.save();
        await msg.reply('*🚩 Bot telah diaktifkan dengan sukses.*\n\n*🍟 Catatan* ;\n- Sekarang bot akan menjawab semua perintah.');
    }
};
