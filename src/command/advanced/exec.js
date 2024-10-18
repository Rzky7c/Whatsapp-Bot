const { exec } = require('child_process');

exports.cmd = {
    name: ['exec'],
    command: ['exec'],
    category: ['lanjutan'],
    detail: {
        desc: 'Menjalankan fungsi di terminal.',
        use: 'fungsi.'
    },
    setting: {
        isOwner: true
    },
    async start({ msg, text }) {
        if (!text) return;
        exec(text, (err, stdout) => {
            if (err) return msg.reply(String(err));
            if (stdout) return msg.reply(stdout.trim());
        });
    }
};
