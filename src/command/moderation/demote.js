exports.cmd = {
    name: ['demote'],
    command: ['demote'],
    category: ['moderation'],
    detail: {
        desc: 'Menurunkan status pengguna dari admin menjadi anggota.',
        use: 'user'
    },
    setting: {
        isGroup: true,
        isAdmin: true,
        isBotAdmin: true
    },
    async start({ msg, participants, sock }) {
        let who = msg.quoted ? msg.quoted.sender : msg.mentions[0];
        if (!who) {
            return msg.reply('*🚩 Sebutkan atau balas pesan pengguna yang ingin Anda turunkan statusnya menjadi anggota.*');
        }
        let member = participants.find(u => u.id === who);
        if (!member) {
            return msg.reply('*🚩 Pengguna tidak ada dalam grup.*');
        }
        await sock.groupParticipantsUpdate(msg.from, [who], 'demote');
        await msg.reply(`*🚩 Pengguna @${who.split('@')[0]} telah diturunkan statusnya menjadi anggota.*`, { mentions: [who] });
    }
};
