const { EmbedBuilder } = require('discord.js');
const config = require('../botConfigs/config.json');
module.exports = {
	name: 'shardReconnecting',
	execute(id, client) {
		if (config.debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardReconnecting Test ---`);
			console.log(client)
			console.log(id);
			//client.connect();
		}
	}
};