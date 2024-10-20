/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/

const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const { formatTime, resizeImage } = require('../../../storage/lib/func.js');
const { social, timeZone, website } = require('../../../setting.js');
const db = require('../../../storage/lib/database.js');
const moment = require('moment-timezone');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const tags = {
    'administration': {
        emoji: '🔧',
        name: 'Administration'
    },
    'main': {
        emoji: '🏠',
        name: 'Main' 
    },
    'setting': {
        emoji: '⚙️',
        name: 'Configuration'
    },
    'moderation': {
        emoji: '🛡️',
        name: 'Moderation'
    },
    'information': {
        emoji: '🕊️',
        name: 'Information'
    },
    'download': {
        emoji: '📥',
        name: 'Downloader'
    },
    'fun': {
        emoji: '🪅',
        name: 'Fun'
    },
    'search': {
        emoji: '🔍',
        name: 'Searching'
    },
    'advanced': {
        emoji: '🧩',
        name: 'Advanced'
    },
    'stalker': {
        emoji: '🔍',
        name: 'Stalker'
    },
    'maker': {
        emoji: '✍️',
        name: 'Maker'
    },
    'ephoto': {
        emoji: '📸',
        name: 'Ephoto360'
    },
};

exports.cmd = {
    name: ['menu'],
    command: ['menu', 'commands', 'help'],
    category: ['main'],
    detail: {
        desc: 'Menampilkan daftar semua perintah yang tersedia.',
    },
    async start({ msg, sock, prefix, db, plugins }) {
        const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../', 'package.json'), 'utf8'));
        let teks = 'Sistem otomatis (*WhatsApp Bot*) yang membantu Anda melakukan berbagai tugas langsung melalui *@0*. 🪶' + '\n\n'
        + '\t◦ *Tanggal* · ' + formatTime('date') + '\n'
        + '\t◦ *Waktu* · ' + formatTime('hour') + '\n'

        for (const tag in tags) {
            teks += `\n*${tags[tag].name.toUpperCase()}*\n`;
        
            const filteredCommands = plugins.commands
                .map(c => Object.values(c)[0])
                .filter(cmd => (cmd.category || []).includes(tag));
        
            filteredCommands.forEach((cmd, index) => {
                const isFirst = index === 0;
                const isLast = index === filteredCommands.length - 1;
        
                // Iterate through each name in cmd.name
                cmd.name.forEach((name, nameIndex) => {
                    teks += `メ ${prefix + name}${cmd.detail?.use ? ` < *${cmd.detail.use}* >` : ''}${cmd.setting?.isNsfw ? `  (*+18*)` : ''}\n`;
                });
            });
        }        

        let documentMessage = {
            url: 'https://mmg.whatsapp.net/v/t62.7119-24/32511132_500473132560305_5925723291063172577_n.enc?ccb=11-4&oh=01_Q5AaIKnXNmUWgmxyNn_1uxfEnGyiI-eCZ-BMRZdX3O2jhQq2&oe=66BE7A32&_nc_sid=5e03e0&mms3=true',
            mimetype: 'application/vnd.ms-excel',
            fileSha256: 'FikZgFEcHv5jpyU1PhL10sPCmtsmcqnWUKaxot10tUU=',
            fileLength: 1e14,
            mediaKey: 'RZ3iF3NexfIjD1MB9EfJhMo/xcBZnbEZ/gVSuxlrHWE=',
            fileName: 'Heavy Craft',
            fileEncSha256: 'K+Bkh4AGLJTffSvs63DuMZumwquU014W8XsaWvfakPM=',
            directPath: '/v/t62.7119-24/32511132_500473132560305_5925723291063172577_n.enc?ccb=11-4&oh=01_Q5AaIKnXNmUWgmxyNn_1uxfEnGyiI-eCZ-BMRZdX3O2jhQq2&oe=66BE7A32&_nc_sid=5e03e0',
        };

        const setting = db.settings.get(sock.user.jid);
        async function getCoverImage() {
            try {
                const response = await fetch(`${website.web}/api/anime/loli?apikey=${website.apikey}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil gambar: ' + response.statusText);
                }
                const imageBuffer = await response.buffer();
                return imageBuffer;
            } catch (error) {
                console.error('Error fetching cover image:', error);
                throw error;
            }
        }
        
        
        // Kode untuk membuat pesan interaktif
        const cover = setting.cover === '' ? await getCoverImage() : setting.cover; // Mengambil cover dari API jika kosong
        

        let message = generateWAMessageFromContent(msg.from, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: ['0@s.whatsapp.net'],
                            expiration: msg.expiration,
                            externalAdReply: {
                                mediaType: 1,
                                previewType: 0,
                                renderLargerThumbnail: true,
                                thumbnail: await resizeImage(cover, 500),
                                thumbnailUrl: msg.id,
                                title: `Hai ! «@${msg.pushName}» 👋🏻`,
                                body: greeting()
                            }
                        },
                        body: { text: teks },
                        footer: { text: '© Heavy Craft | v' + version },
                        header: {
                            hasMediaAttachment: true,
                            documentMessage,
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'cta_url',
                                    buttonParamsJson: JSON.stringify({
                                        display_text: 'Rest API 🍟',
                                        url: website.web,
                                        merchant_url: website.web
                                    })
                                }
                            ],
                            messageParamsJson: '',
                        },
                    },
                },
            }
        }, { userJid: sock.user.jid, quoted: msg });

        await sock.relayMessage(msg.from, message.message, {});
    }
};

function greeting() {
    const time = moment().tz(timeZone).hour();
    const greetings = {
        midnight: 'Selamat Tengah Malam 🌌',
        morning: 'Selamat Pagi🌄',
        noon: 'Selamat Siang 🌤',
        afternoon: 'Selamat Sore 🌇',
        night: 'Selamat Malam 🎑'
    };

    if (time === 0) {
        return greetings.midnight;
    } else if (time >= 6 && time < 12) {
        return greetings.morning;
    } else if (time === 12) {
        return greetings.noon;
    } else if (time >= 13 && time < 19) {
        return greetings.afternoon;
    } else {
        return greetings.night;
    }
}
