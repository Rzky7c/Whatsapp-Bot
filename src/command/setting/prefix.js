const { defaultPrefix } = require('../../../setting.js');

exports.cmd = {
    name: ['prefix'],
    command: ['prefix'],
    category: ['pengaturan'],
    detail: {
        desc: 'Kelola prefiks bot.',
        use: 'opts',
    },
    setting: {
        isOwner: true
    },
    async start({ msg, sock, args, text, prefix, command, db }) {
        if (!text) {
            return msg.reply(
                `*🚩 Harap berikan opsi.* (Ketik *${prefix + command} help* untuk bantuan lebih lanjut)`
            );
        }

        const action = args[0].toLowerCase();
        const setting = db.settings.get(sock.user.jid);

        const formatPrefix = (p) => (p.trim() === '' ? '`­ ­` (spasi)' : p);
        const prefixExists = (arr, p) =>
            arr.some(
                (item) =>
                    item === p ||
                    (p === '' && item === '') ||
                    (p.trim() === '' && item.trim() === '')
            );

        switch (action) {
            case 'help': {
                const helpText = 
                    `*🚩 Berikut adalah panduan tentang cara mengelola prefiks bot.*\n\n` +
                    `*🍟 Opsi* ;\n\n` +
                    `- *add*: Tambahkan prefiks.\n` +
                    `- *del*: Hapus prefiks yang ada.\n` +
                    `- *set*: Tetapkan prefiks.\n` +
                    `- *default*: Kembalikan ke prefiks default.\n` +
                    `- *list*: Tampilkan prefiks saat ini.\n\n` +
                    `*🍟 Contoh Penggunaan* ;\n\n` +
                    `- ${prefix + command} < opts > [ prefix ]\n` +
                    `- ${prefix + command} add #`;
                return msg.reply(helpText);
            }

            case 'list': {
                const listPrefixes = setting.prefix
                    .map((p) => `- ${formatPrefix(p)}`)
                    .join('\n');
                return msg.reply(`*🚩 Prefiks saat ini* :\n\n${listPrefixes}`);
            }

            case 'add': {
                if (!args[1]) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks untuk ditambahkan.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }

                const prefixes = args
                    .slice(1)
                    .join(' ')
                    .split('|')
                    .map(p => p.trim())
                    .filter(p => p !== '')
                    .map(p => p === '\\t' ? '' : p);

                if (prefixes.length === 0) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks yang valid untuk ditambahkan.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }

                const processed = { success: [], failed: [] };
                prefixes.forEach((p) => {
                    if (!prefixExists(setting.prefix, p)) {
                        setting.prefix.push(p);
                        processed.success.push(p);
                    } else {
                        processed.failed.push(p);
                    }
                });

                let addText = `*🚩 Daftar prefiks.* [ TAMBAH ]`;
                if (processed.success.length) {
                    addText += '\n\n • *Ditambahkan*:\n' +
                        processed.success
                            .map((p) => `- ${formatPrefix(p)}`)
                            .join('\n');
                }
                if (processed.failed.length) {
                    addText += '\n\n • *Sudah Ada*:\n' +
                        processed.failed
                            .map((p) => `- ${formatPrefix(p)}`)
                            .join('\n');
                }
                await db.save();
                return msg.reply(addText);
            }

            case 'del': {
                if (!args[1]) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks untuk dihapus.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }

                const prefixes = args
                    .slice(1)
                    .join(' ')
                    .split('|')
                    .map(p => p.trim())
                    .filter(p => p !== '')
                    .map(p => p === '\\t' ? '' : p);

                if (prefixes.length === 0) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks yang valid untuk dihapus.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }

                const processed = { success: [], failed: [] };
                prefixes.forEach((p) => {
                    if (prefixExists(setting.prefix, p)) {
                        setting.prefix = setting.prefix.filter(
                            (prefix) => prefix !== p && prefix.trim() !== p.trim()
                        );
                        processed.success.push(p);
                    } else {
                        processed.failed.push(p);
                    }
                });

                let delText = `*🚩 Daftar prefiks.* [ HAPUS ]`;
                if (processed.success.length) {
                    delText += '\n\n • *Dihapus*:\n' +
                        processed.success
                            .map((p) => `- ${formatPrefix(p)}`)
                            .join('\n');
                }
                if (processed.failed.length) {
                    delText += '\n\n • *Tidak Ditemukan*:\n' +
                        processed.failed
                            .map((p) => `- ${formatPrefix(p)}`)
                            .join('\n');
                }
                await db.save();
                return msg.reply(delText);
            }

            case 'set': {
                if (!args[1]) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks untuk ditetapkan.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }

                const prefixes = args
                    .slice(1)
                    .join(' ')
                    .split('|')
                    .map(p => p.trim())
                    .filter(p => p !== '')
                    .map(p => p === '\\t' ? '' : p);
                
                if (prefixes.length === 0) {
                    return msg.reply(
                        `*🚩 Harap berikan satu atau beberapa prefiks yang valid untuk ditetapkan.* (Jika banyak, gunakan “ *|* ” untuk memisahkannya)`
                    );
                }
                
                setting.prefix = prefixes;
                await db.save();
                return msg.reply(
                    `*🚩 Prefiks diubah* :\n\n${prefixes
                        .map((p) => `- ${formatPrefix(p)}`)
                        .join('\n')}`
                );
            }

            case 'default': {
                setting.prefix = defaultPrefix;
                await db.save();
                return msg.reply('*🚩 Prefiks telah diubah ke nilai default.*');
            }

            default: {
                return msg.reply(
                    `*🚩 Opsi tidak valid.* (Ketik *${prefix + command} help* untuk bantuan lebih lanjut)`
                );
            }
        }
    },
};
