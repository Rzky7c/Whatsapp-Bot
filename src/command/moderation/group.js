exports.cmd = {
    name: ['group'],
    command: ['group'],
    category: ['moderation'],
    detail: {
        desc: 'Membuka atau menutup grup.',
        use: 'open/close',
    },
    setting: {
        isGroup: true,
        isBotAdmin: true,
        isAdmin: true
    },
    async start({ msg, sock, args, groupMetadata }) {
        let group = groupMetadata;
        if (args[0] === 'open') {
            if (!group.announce) {
                return msg.reply('Grup sudah *dibuka*.');
            }
            await sock.groupSettingUpdate(msg.from, 'not_announcement');
            await msg.reply('🔓 Grup *berhasil dibuka.*');
        } else if (args[0] === 'close') {
            if (group.announce) {
                return msg.reply('Grup sudah *ditutup*.');
            }
            await sock.groupSettingUpdate(msg.from, 'announcement');
            await msg.reply('🔐 Grup *berhasil ditutup.*');
        } else {
            await msg.reply('Untuk *mengatur* grup, tulis *open* / *close*.\n\n- [ *Open* ] ➠ Membuka grup.\n- [ *Close* ] ➠ Menutup grup.');
        }
    }
};
