const simpleGit = require('simple-git');
const git = simpleGit();

exports.cmd = {
    name: ['update'],
    command: ['update', 'fix', 'gitpull'],
    category: ['administrasi'],
    detail: {
        desc: 'Memperbarui bot ke versi terbaru.',
    },
    setting: {
        isOwner: true
    },
    async start({ msg }) {
        await git.fetch();
        const commits = await git.log(['main..origin/main']);

        if (commits.total === 0) {
            return msg.reply('*🚩 Sudah diperbarui.*');
        }

        const result = await git.pull('origin', 'main');
        const { created, deleted, files, deletions, insertions, summary } = result;

        let teks = '*Hasil Git pull.* 🍟\n\n';

        [created, deleted, files].forEach((list, index) => {
            const titles = ['dibuat', 'dihapus', 'file'];
            if (list.length > 0) {
                teks += ` • ${titles[index].replace(/^\w/, c => c.toUpperCase())}:\n${list.map(item => `- ${item}`).join('\n')}\n\n`;
            }
        });

        ['deletions', 'insertions'].forEach(key => {
            if (Object.keys(result[key]).length > 0) {
                teks += ` • ${key.replace(/^\w/, c => c.toUpperCase())}:\n${Object.entries(result[key]).map(([file, count]) => `- ${file} | ${count}`).join('\n')}\n\n`;
            }
        });

        teks += ` • Ringkasan:\n- ${summary.changes} perubahan\n- ${summary.insertions} penambahan (+)\n- ${summary.deletions} penghapusan (-)`;

        await msg.reply(teks);
    }
};
