exports.cmd = {
    name: ['kick'],
    command: ['kick'],
    category: ['moderation'],
    detail: {
        desc: 'Mengeluarkan pengguna dari grup.',
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
            return msg.reply('*🚩 Sebutkan atau balas pesan pengguna yang ingin kamu keluarkan.*');
        }
        let member = participants.find(u => u.id === who);
        if (!member) {
            return msg.reply('*🚩 Pengguna tidak ada di grup.*');
        }
        await sock.groupParticipantsUpdate(msg.from, [who], 'remove');
        await msg.reply(`*🚩 Pengguna @${who.split('@')[0]} telah berhasil dikeluarkan.*`, { mentions: [who] });
    }
};
