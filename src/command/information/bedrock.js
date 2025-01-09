/**

   * @project_name : Beforelife
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : Beforelife ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Beforelife.
*/

const axios = require('axios');
const { website, menu } = require('../../../setting.js');

exports.cmd = {
    name: ['bedrock'],
    command: ['bedrock'],
    category: ['information'],
    detail: {
        desc: 'Information Server from Minecraft Bedrock.',
        use: 'ip'
    },
    setting: {
        error_react: true
    },
    async start({ msg, text }) {
        if (!text) {
            return msg.reply(`✘ Masukkan IP untuk memulai pencarian.`);
        }

        await msg.reply(`🕓 Tunggu sebentar, sedang diproses.`);

        try {
            const res = await axios.get(`${website.web}/api/info/bedrock?query=${encodeURIComponent(text)}&apikey=${website.apikey}`);
            const result = res.data.result;

            if (!result || result.length === 0) {
                return msg.reply(`✘ Tidak ada hasil yang ditemukan.`);
            }

            let replyMessage = `🔍 *Hasil Information Minecraft Bedrock*:\n\n`;
            if (typeof result === 'object' && result !== null) {
                const ip = result.ip || "❓ Tidak diketahui";
                const port = result.port || "🔒 #";
                const gamemode = result.gamemode || "🚫 0";
                const server_id = result.server_id || "❓ Tidak diketahui";
                const plugin = result.plugin || "❓ Tidak diketahui";
                const nameplugin = plugin.name || "❓ Tidak diketahui";
                const versionplugin = plugin.version || "❓ Tidak diketahui";
                const versionserver = result.version || "❓ Tidak diketahui";
                const online = result.online || "❓ Tidak diketahui";
                const max = result.max || "❓ Tidak diketahui";

                replyMessage += `🌐 IP: ${ip}\n`;
                replyMessage += `🔌 Port: ${port}\n`;
                replyMessage += `🎮 Gamemode: ${gamemode}\n`;
                replyMessage += `🆔 Server ID: ${server_id}\n`;
                replyMessage += `🔌 Nama Plugin: ${nameplugin}\n`;
                replyMessage += `🔧 Versi Plugin: ${versionplugin}\n`;
                replyMessage += `📦 Versi Server: ${versionserver}\n`;
                replyMessage += `🔵 Online: ${online}\n`;
                replyMessage += `🔝 Max: ${max}`;
            } else {
                replyMessage += "❌ Kesalahan: Data tidak valid. Tidak dapat mengambil informasi dari API.\n";
            }
            
            await msg.reply(replyMessage, { image: menu.bedrock });
            await msg.react('✅');
        } catch (error) {
            console.error("Kesalahan saat mengambil data dari API:", error);
            await msg.reply(`✘ Terjadi kesalahan. Coba lagi nanti.`);
        }
    }
};
