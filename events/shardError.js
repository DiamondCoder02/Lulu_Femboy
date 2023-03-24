const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); var debug_level = process.env.debug_level;
module.exports = {
	name: 'shardError',
	execute(error, shardId, client) {
		if (debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardError Test ---`);
			console.log(client)
			console.log(error);
			console.log(shardId);
			//client.connect();
		}
	}
};