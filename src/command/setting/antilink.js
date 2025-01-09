exports.cmd = {
    name: ['antilink'],
    command: ['antilink'],
    category: ['pengaturan'],
    detail: {
        desc: 'Aktifkan atau nonaktifkan anti tautan di grup.',
        use: 'on/off'
    },
    setting: {
        isGroup: true,
        isAdmin: true
    },
    async start({ msg, args, db }) {
        const group = db.groups.get(msg.from).setting;
        const mode = args[0]?.toLowerCase();

        if (mode === 'on' || mode === 'off') {
            const enable = mode === 'on';
            if (group.antilink === enable) {
                return msg.reply(`*🚩 Fungsi Anti Tautan sudah ${enable ? 'diaktifkan' : 'dinonaktifkan'} di grup ini.*`);
            }
            group.antilink = enable;
            await db.save();
            return msg.reply(`*🚩 Fungsi Anti Tautan telah ${enable ? 'diaktifkan' : 'dinonaktifkan'} dengan sukses untuk grup ini.*`);
        }

        await msg.reply('*🚩 Untuk mengatur Fungsi Anti Tautan, cukup tulis "on" untuk mengaktifkannya atau "off" untuk menonaktifkannya.*');
    }
};
