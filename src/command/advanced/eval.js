const { inspect } = require('util');
const store = require('../../../storage/lib/store.js');
const func = require('../../../storage/lib/func.js');
const setting = require('../../../setting.js');

exports.cmd = {
    name: ['eval'],
    command: ['eval'],
    category: ['advanced'],
    detail: {
        desc: 'Menjalankan kode JavaScript.',
        use: 'kode'
    },
    setting: {
        isOwner: true
    },
    async start(context) {
        const { msg, text } = context;
        if (!text) return;
        
        let result;
        try {
            let evaled = await (async () => {
                with ({ ...context, ...store, func, setting }) {
                    return eval(`(async () => { ${text} })()`);
                }
            })();
            if (typeof evaled !== 'string') evaled = inspect(evaled);
            result = evaled;
        } catch (e) {
            result = e;
            console.log(e);
        }
        await msg.reply(String(result));
    }
};
