const { EmbedBuilder } = require('discord.js');
const config = require('../botConfigs/config.json');
module.exports = {
	name: 'shardError',
	execute(error, shardId, client) {
		if (config.debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardError Test ---`);
			console.log(client)
			console.log(error);
			console.log(shardId);
			//client.connect();
		}
	}
};