exports.cmd = {
    name: ['self'],
    command: ['self'],
    category: ['setting'],
    detail: {
        desc: 'Nonaktifkan bot.'
    },
    setting: {
        isOwner: true
    },
    async start({ msg, sock, isGroup, db }) {
        const config = db.settings.get(sock.user.jid);
        if (config.mode === 'self') {
            return msg.reply('*🚩 Bot sudah dinonaktifkan.*');
        }
        config.mode = 'self';
        await db.save();
        await msg.reply('*🚩 Bot telah dinonaktifkan dengan sukses.*\n\n*🍟 Catatan* ;\n- Sekarang bot tidak akan menjawab perintah sampai diaktifkan kembali.');
    }
};
