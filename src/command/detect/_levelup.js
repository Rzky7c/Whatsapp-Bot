const { xpRange } = require('../../../storage/lib/levelling.js');

exports.before = {
    async start({ msg, sock, isGroup, isRegistered, isBaileys, db }) {
        if (!isGroup || !isRegistered || isBaileys)
            return true;

        let group = db.groups.get(msg.from);
        let user = group.users.get(msg.sender);

        if (user.level >= 103)
            return;

        let beforeLevel = user.level;

        while (canLevelUp(user)) {
            user.level++;
            let { xp } = xpRange(user.level);
            user.exp -= xp;
        }

        await db.save();

        if (beforeLevel !== user.level) {
            let teks = '*Selamat* 🎉! Anda telah naik *level*.\n\n'
                + `- *Tag* ∙ @${msg.sender.split('@')[0]}\n`
                + `- *Level* ∙ [ *${beforeLevel}* ] ➠ [ *${user.level}* ]`;
            await msg.reply(teks, { mentions: [msg.sender] });
        }
    }
};

function canLevelUp(user) {
    let nextLevel = user.level + 1;
    let { xp } = xpRange(nextLevel);
    return user.exp >= xp;
}
