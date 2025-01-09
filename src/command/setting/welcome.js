exports.cmd = {
    name: ['welcome'],
    command: ['welcome'],
    category: ['setting'],
    detail: {
        desc: 'Mengatur sambutan grup.',
        use: 'opts'
    },
    setting: {
        isGroup: true,
        isAdmin: true
    },
    async start({ msg, args, text, prefix, command, db }) {
        const group = db.groups.get(msg.from).setting;
        const mode = args[0]?.toLowerCase();

        if (mode === 'set') {
            if (args[1] === 'default') {
                group.welcome.msg = '';
                await db.save();
                return msg.reply('*🚩 Pesan sambutan telah direset ke default.*');
            }
            console.log(text)
            const welcomeText = text.replace('set', '').trim()
            if (!welcomeText) {
                return msg.reply('*🚩 Silakan berikan teks sambutan.* (*default* untuk mengembalikan ke default)\n\n*🍟 Opsi* ;\n\n- *@users*: Tag pengguna.\n- *@group*: Nama grup.\n- *@desc*: Deskripsi grup.\n\n*🍟 Contoh* ;\n\n*Halo*, selamat datang di grup *@group*.\n\n@users');
            }
            group.welcome.msg = welcomeText;
            await db.save();
            return msg.reply(`*🚩 Teks sambutan telah diatur menjadi*:\n\n${welcomeText}`);
        }

        if (mode === 'help') {
            return msg.reply(`*🚩 Berikut adalah panduan tentang cara mengatur sambutan.*\n\n*🍟 Opsi* ;\n\n- *set*: Mengatur pesan sambutan. (*default* untuk mengembalikan ke default)\n- *msg*: Menampilkan pesan sambutan saat ini.\n\n- *on*: Mengaktifkan sambutan.\n- *off*: Menonaktifkan sambutan.\n\n*🍟 Contoh Penggunaan* ;\n\n1. ${prefix + command} < opts > [ msg ]\n2. ${prefix + command} on`);
        }

        if (mode === 'msg') {
            if (group.welcome.msg === '') {
                return msg.reply('*🚩 Pesan sambutan default.*');
            }
            return msg.reply(`*🚩 Pesan sambutan saat ini:*\n\n${group.welcome.msg}`);
        }

        if (mode === 'on' || mode === 'off') {
            const enable = mode === 'on';
            if (group.welcome.status === enable) {
                return msg.reply(`*🚩 Sambutan sudah ${enable ? 'diaktifkan' : 'dinonaktifkan'} di grup ini.*`);
            }
            group.welcome.status = enable;
            await db.save();
            return msg.reply(`*🚩 Fitur sambutan telah ${enable ? 'diaktifkan' : 'dinonaktifkan'} dengan sukses untuk grup ini.*`);
        }

        return msg.reply(`*🚩 Berikan opsi.* (Ketik *${prefix + command} help* untuk bantuan lebih lanjut)`);
    }
};
