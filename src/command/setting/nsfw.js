exports.cmd = {
    name: ['nsfw'],
    command: ['nsfw'],
    category: ['pengaturan'],
    detail: {
        desc: 'Aktifkan atau nonaktifkan NSFW di grup.',
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
            if (group.nsfw === enable) {
                return msg.reply(`*🚩 Fungsi NSFW sudah ${enable ? 'diaktifkan' : 'dinonaktifkan'} di grup ini.*`);
            }
            group.nsfw = enable;
            await db.save();
            return msg.reply(`*🚩 Fungsi NSFW telah ${enable ? 'diaktifkan' : 'dinonaktifkan'} dengan sukses untuk grup ini.*`);
        }

        await msg.reply('*🚩 Untuk mengatur Fungsi NSFW, cukup tulis "on" untuk mengaktifkannya atau "off" untuk menonaktifkannya.*');
    }
};
