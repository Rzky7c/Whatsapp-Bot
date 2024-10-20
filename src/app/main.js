/**

   * @project_name : Heavy-Craft
   * @authors : Rizky Maulana
   * @instagram : rizkymaulanasidikk
   * @description : HeavyCraft ,A Multi-functional whatsapp user bot.
   * @version 1.3.6b

   * Created By Rizky Maulana.
   * © 2025  Heavy-Craft.
*/


process.on('uncaughtException', console.error);

const { logger, displayTitle } = require('../../storage/lib/print.js');
const { loadPlugins } = require('../../storage/lib/plugins.js');
// const clearTmp = require('../storage/lib/clearTmp.js');
const connectSock = require('../../storage/lib/connection.js');

displayTitle();

async function start() {
    logger.info('Loaded Plugins..');
    await loadPlugins({ table: true });

    // Clear Tmp: 1 min.
    // setInterval(async () => {
    //    await clearTmp();
    // }, 1 * 60 * 1000);

    await connectSock()
        .catch(e => console.log(e));
}

start();
