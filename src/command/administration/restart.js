exports.cmd = {
    name: ['restart'],
    command: ['restart', 'reset'],
    category: ['administrasi'],
    detail: {
        desc: 'Restart bot.'
    },
    setting: {
        isOwner: true
    },
    async start({ msg }) {
        await msg.reply('♻ Restarting..');
        setTimeout(async () => {
            process.send('restart');
        }, 5000);
    }
};
