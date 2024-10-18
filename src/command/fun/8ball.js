const { getRandom } = require('../../../storage/lib/func.js');

exports.cmd = {
    name: ['8ball'],
    command: ['8ball'],
    category: ['fun'],
    detail: {
        desc: 'Ajukan pertanyaan kepada bola 8 ajaib.',
        use: 'teks'
    },
    async start({ text, msg }) {
        if (!text) {
            return msg.reply('*🚩 Masukkan pertanyaan untuk bola 8 ajaib.*');
        }

        const teks = getRandom(responses);
        await msg.reply(`(🎱) : *${teks}*`);
    }
};

const responses = [
    "Ya.",
    "Tidak.",
    "Mungkin.",
    "Pasti.",
    "Jangan berharap akan hal itu.",
    "Tanya lagi nanti.",
    "Aman.",
    "Sumber saya mengatakan tidak.",
    "Diragukan.",
    "Tanpa keraguan."
];
