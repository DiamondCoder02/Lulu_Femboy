const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); var debug_level = process.env.debug_level;
module.exports = {
	name: 'shardReconnecting',
	execute(id, client) {
		if (debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardReconnecting Test ---`);
			console.log(client)
			console.log(id);
			//client.connect();
		}
	}
};