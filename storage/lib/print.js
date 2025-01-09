const PhoneNumber = require('awesome-phonenumber');
const moment = require('moment-timezone');
const chalk = require('chalk');
const pino = require('pino');
const pretty = require('pino-pretty');
const cfonts = require('cfonts');

const { getName } = require('./func.js');
const { timeZone } = require('../../setting.js');

const stream = pretty({
    colorize: true
});

const logger = pino({ level: 'trace' }, stream);

async function printLog(context) {
    const { msg, sock, args, command, groupName, isGroup, isCommand } = context;

    if (!isCommand) return;
    
    let number = (await PhoneNumber('+' + msg.sender.split('@')[0])).getNumber('international');
    let text = msg.text
        .replace(/\*(.*?)\*/g, (match, p1) => chalk.bold(p1))
        .replace(/_(.*?)_/g, (match, p1) => chalk.italic(p1))
        .replace(/~(.*?)~/g, (match, p1) => chalk.strikethrough(p1))
        .replace(/```([^`]*)```/g, (match, p1) => chalk.whiteBright(p1.split('').join(' ')))
        .replace(/@(\d+)/g, (match, p1) => chalk.green(
            msg.mentions.includes(p1 + '@s.whatsapp.net') 
            ? '@' + getName(p1 + '@s.whatsapp.net') 
            : '@' + p1
        ))
        .replace(/(https?:\/\/[^\s]+)/g, (match, p1) => chalk.blue.underline(p1));

    let header = chalk.bold.bgGreen.hex('#000000')(` ${isGroup ? groupName : 'Private Message'} `);
    let userInfo = `${chalk.bold.rgb(255, 153, 0)('@' + (sock.user.jid === msg.sender ? (sock.user?.name || 'bot') : msg.pushName))} (${chalk.green.bold(number)})`;
    let commandInfo = `${chalk.magenta.bold(command)} [${chalk.yellow.bold(args.length)}]`;
    let separator = chalk.gray('━'.repeat(50));

    let log = '\n'
        + separator + '\n'
        + ` ${chalk.cyan.bold('Message From :')} ${header}` + '\n'
        + ` ${chalk.cyan.bold('From :')} ${userInfo}` + '\n'
        + ` ${chalk.cyan.bold('Time :')} ${chalk.dim(moment().tz(timeZone).format('YYYY-MM-DD HH:mm') + ` (${timeZone})`)}` + '\n'
        + ` ${chalk.cyan.bold('Command :')} ${isCommand ? commandInfo : chalk.yellow('false')}` + '\n' 
        + ` ${chalk.cyan.bold('Text :')} ${chalk.whiteBright(text)}` + '\n' 
        + ` ${chalk.cyan.bold('Message Type :')} ${chalk.black(chalk.bgYellow(msg.type))}` + '\n' 
        + separator;

    console.log(log);
}

module.exports = { logger, printLog };
