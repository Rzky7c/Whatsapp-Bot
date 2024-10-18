exports.cmd = {
    name: ['view'],
    command: ['view'],
    category: ['convert'],
    detail: {
        desc: 'Mengonversi pesan ViewOnce/Dokumen/Ptv menjadi multimedia atau teks yang sesuai.',
        use: 'media',
    },
    async start({ msg }) {
        const q = msg?.quoted ? msg?.quoted : msg;
        const isType = q?.media?.viewOnce ||
            (q?.typeV2 || q?.type) === 'documentMessage' && /image|video|text|json|javascript/.test(q?.media?.mimetype) ||
            q?.type === 'ptvMessage';

        if (!isType) return msg?.reply('Tandai pesan ViewOnce/Dokumen/Ptv.');

        const media = await q?.download();
        const isText = /text|json|javascript/.test(q?.media?.mimetype);

        await msg?.reply(isText ? media?.toString() : q?.text, { media: isText ? null : media, mentions: q?.mentions });
    },
};
