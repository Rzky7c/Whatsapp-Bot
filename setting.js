/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/

const { watchFile, unwatchFile, readFileSync } = require('fs');
const moment = require('moment-timezone');
const path = require('path');
const timeZone = 'Asia/Jakarta';
const tempName = 'temp';
moment.locale('es');

const website = {
    web: 'https://beforelife.my.id',
    apikey: 'xxxx' // ambil apikey nya di website https://api.rzky.my.id
}

const toko = {
    merchantid: 'xxxxxxx', // ambil merchantid nya di website tokopay.id
    secret: 'xxxxxx' // ambil secret key nya di website tokopay.id
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
    author: '© ʜᴇᴀᴠʏ ᴄʀᴀꜰᴛ',
    name: 'Sticker by'
}

const defaultPrefix = ['/', '!', '#', '.', '-', 's!', '', '🪶'];

global.tempDir = path.resolve(`./${tempName}`);

global.img = {
    avatar: readFileSync('././storage/media/image/avatar.jpg'),
    cover: readFileSync('././storage/media/image/cover.jpg')
}


module.exports = { timeZone, owner, website, defaultPrefix, menu, toko, sticker };
