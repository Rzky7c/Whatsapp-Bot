const fs = require('fs');

const jsonFilePath = './storage/database/message_count.json';

function loadFromJson() {
    if (fs.existsSync(jsonFilePath)) {
        const rawData = fs.readFileSync(jsonFilePath);
        return JSON.parse(rawData);
    }
    return {};
}


exports.cmd = {
    name: ['totalpesan'],
    command: ['totalpesan'],
    category: ['administrasi'],
    detail: {
        desc: 'Menampilkan total pesan anggota grup.'
    },
    setting: {
        isOwner: true,
        isGroup: true,
    },
    async start({ msg, participants }) {
        const groupId = msg.key.remoteJid; // ID grup
        const groupMessageCount = loadFromJson(jsonFilePath); // Load pesan dari JSON
        const response = await generateMessageCountText(participants, groupMessageCount, groupId);
        await msg.reply({ text: response });
    }
};

async function generateMessageCountText(participants, groupMessageCount, groupId) {
    let result = '📊 *Total Pesan Anggota Grup:*\n';
    let totalMessages = 0; 
    let hasMessages = false;

    if (groupMessageCount[groupId]) {
        for (const member of participants) {
            const memberId = member.id;
            const count = groupMessageCount[groupId][memberId] || 0; 

            if (count > 0) {
                result += `- ${memberId.split('@')[0]}: ${count} pesan\n`;
                totalMessages += count;
                hasMessages = true; 
            }
        }
        if (!hasMessages) {
            result = 'Tidak ada pesan yang terdaftar untuk anggota grup.';
        }
    } else {
        result = 'Grup tidak ditemukan atau tidak ada pesan yang terdaftar.';
    }

    result += `\n*Total Seluruh Pesan: ${totalMessages} pesan*`;

    return result;
}
