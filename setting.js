/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/

const { watchFile, unwatchFile, readFileSync } = require('fs');
const moment = require('moment-timezone');
const path = require('path');
const timeZone = 'Asia/Jakarta';
const tempName = 'temp';
moment.locale('es');

const website = {
    web: 'https://beforelife.me',
    apikey: 'xxxxxxx' // ambil apikey nya di website https://beforelife.me
}

const owner = [
    ['6281281872699', 'ʜᴇᴀᴠʏ ᴄʀᴀꜰᴛ'],
];

const menu = {
    playstore: readFileSync('././storage/media/media/playstore.jpg'),
    soundcloud: readFileSync('././storage/media/media/soundcloud.png'),
    steam: readFileSync('././storage/media/media/steam.png'),
    pornhub: readFileSync('././storage/media/media/pornhub.png'),
    bedrock: readFileSync('././storage/media/media/bedrock.png'),
    xnxx: readFileSync('././storage/media/media/xnxx.png'),
    xvideos: readFileSync('././storage/media/media/xvideos.png')
}

const sticker = {
    author: '© Beforelife',
    name: 'Sticker by'
}

const defaultPrefix = ['/', '!', '#', '.', '-', 's!', '', '🪶'];

global.tempDir = path.resolve(`./${tempName}`);

global.img = {
    avatar: readFileSync('././storage/media/image/avatar.jpg'),
    cover: readFileSync('././storage/media/image/cover.jpg')
}


module.exports = { timeZone, owner, website, defaultPrefix, menu, sticker };
