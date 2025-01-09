const { formatTime } = require('../../../storage/lib/func.js');
const { owner } = require('../../../setting.js');
const PhoneNumber = require('awesome-phonenumber');

exports.cmd = {
    name: ['profile'],
    command: ['profile'],
    category: ['information'],
    detail: {
        desc: 'Menampilkan profilmu atau profil pengguna lain.',
        use: 'user'
    },
    async start({ msg, prefix, sock, db }) {
        let who = msg.quoted 
            ? msg.quoted.sender 
            : (msg.mentions && msg.mentions[0]) 
                ? msg.mentions[0] 
                : msg.fromMe 
                    ? sock.user.jid 
                    : msg.sender;

        let pp = await sock.profilePictureUrl(who, 'image').catch(() => global.img.avatar);
        let phone = PhoneNumber('+' + who.replace('@s.whatsapp.net', ''));
        let about = (await sock.fetchStatus(who).catch(() => {}))?.status || '–';
        let user = db.users.get(who);
        
        let userType = [...owner.map(([number]) => number)]
            .map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(who) ? 'Pemilik (🐈)' 
            : who === sock.user.jid ? 'Bot (🤖)' 
            : user?.premium?.status ? 'Premium (👑)' 
            : 'Pengguna (👤)';

        let teks = '—  *PROFIL*  〤  *PENGGUNA*' + '\n\n'
            + '- *Tag* ∙ @' + who.replace(/@.+/, '') + '\n'
            + '- *Tentang* ∙ ' + about + '\n'
            + '- *No* ∙ ' + phone.getNumber('international') + '\n'
            + '- *Api* ∙ Wa.me/' + who.split('@')[0] + '\n\n'
            + '- *Tipe* ∙ ' + userType + '\n\n';

        if (db.users.exist(who)) {
            teks += '  🍟 *Info Registrasi* ;' + '\n\n'
                + '- *Pengguna* ∙ ' + user.name + '\n'
                + '- *ID* ∙ \`#' + user.id + '\`\n'
                + '- *Tanggal* ∙ ' + formatTime('date', user.timestamp) + '\n'
                + '- *Waktu* ∙ ' + formatTime('hour', user.timestamp) + '\n\n';
        }

        teks += '> ʜᴇᴀᴠʏ ᴄʀᴀꜰᴛ';

        await msg.reply(teks, { image: pp, mentions: [who] });
    }
};
