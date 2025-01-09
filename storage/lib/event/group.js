const fakeQuoted = require('../fakeQuoted.js');
const db = require('../database.js');
const { formatTime } = require('../func.js');

const avatar = 'https://i.ibb.co/fp6t21w/avatar.jpg';

async function groupParticipantsUpdate(data, sock) {
    const { id, author = null, participants, action, simulate = null } = data;
    const group = db.groups.get(id).setting || {};
    const groupMetadata = await sock.groupMetadata(id);
}

module.exports = {
    groupParticipantsUpdate
};