const { groupParticipantsUpdate } = require('../../../storage/lib/event/group.js');

exports.cmd = {
    name: ['simulate'],
    command: ['simulate'],
    category: ['administrasi'],
    detail: {
        desc: 'Mensimulasikan acara.',
        use: 'acara'
    },
    setting: {
        isOwner: true,
        isGroup: true
    },
    async start({ msg, sock, args, prefix, command }) {
        if (!args[0]) {
            return msg.reply(`*🚩 Silakan masukkan acara yang ingin disimulasikan.* (Ketik *${prefix + command} list* untuk melihat daftar)`);
        }

        if (args[0] === 'list') {
            return msg.reply(`*🚩 Acara yang tersedia*:\n\n- selamat datang`);
        }

        const event = args[0].toLowerCase();

        const who = msg.quoted 
            ? [msg.quoted.sender]
            : (msg.mentions && msg.mentions.length > 0) 
                ? msg.mentions 
                : [msg.sender];

        switch (event) {
            case 'selamat datang': {
                const data = {
                    id: msg.from,
                    author: msg.sender,
                    participants: who,
                    action: 'add',
                    simulate: true
                };
                await groupParticipantsUpdate(data, sock);
                break;
            }
            default: {
                msg.reply(`*🚩 Acara yang ditentukan tidak ada.* (Ketik *${prefix + command} list* untuk melihat daftar)`);
                break;
            }
        }
    }
};
