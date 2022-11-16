const { EmbedBuilder } = require('discord.js');
const config = require('../botConfigs/config.json');
module.exports = {
	name: 'shardReady',
	execute(id, unavailableGuilds, client) {
		if (config.debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardReady Test ---`);
			console.log(client)
			console.log(unavailableGuilds);
			console.log(id);
			//client.connect();
		}
	}
};