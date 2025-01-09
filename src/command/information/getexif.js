const { Image } = require('node-webpmux');

exports.cmd = {
    name: ['getexif'],
    command: ['getexif', 'getmeta'],
    category: ['information'],
    detail: {
        desc: 'Mengambil metadata dari sebuah stiker.',
        use: 'media'
    },
    async start({ msg, args }) {
        const q = msg.quoted ? msg.quoted : msg;

        if (!/sticker/.test(q.type)) {
            return msg.reply('Silakan pilih sebuah stiker untuk mengambil metadata.');
        }

        const img = new Image();
        await img.load(await q.download());
        const exif = JSON.parse(img.exif.slice(22).toString());

        if (args[0] === '--json') {
            return msg.reply(JSON.stringify(exif, null, 4));
        }

        let teks = '—  *STIKER*  〤  *EXIF*' + '\n\n'
            + `- *Nama* ∙ ${exif['sticker-pack-name'] || '–'}\n`
            + `- *Penulis* ∙ ${exif['sticker-pack-publisher'] || '–'}\n`
            + `- *ID* ∙ ${exif['sticker-pack-id'] || '–'}\n\n`
            + `- *Toko Android* ∙ ${exif['android-app-store-link'] || '–'}\n`
            + `- *Toko iOS* ∙ ${exif['ios-app-store-link'] || '–'}\n\n`
            + `- *Emojis* ∙ ${Array.isArray(exif.emojis) ? exif.emojis.join(', ') : exif?.emojis?.length ? exif.emojis : '–'}\n`;

        const otherKeys = Object.keys(exif).filter(key =>
            !['sticker-pack-name', 'sticker-pack-publisher', 'sticker-pack-id', 'android-app-store-link', 'ios-app-store-link', 'emojis'].includes(key)
        );

        if (otherKeys.length > 0) {
            teks += '\n  *🍟 Lainnya* ;\n\n' + otherKeys.map(key => {
                const formattedKey = key.replace('sticker-pack-', '')
                    .replace(/-/g, ' ')
                    .replace(/^\w/, c => c.toUpperCase());
                const value = typeof exif[key] === 'object' ? JSON.stringify(exif[key]) : exif[key];
                return `- *${formattedKey}* ∙ ${value}`;
            }).join('\n');
        }

        await msg.reply(teks);
    }
};
