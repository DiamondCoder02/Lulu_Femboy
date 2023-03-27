const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); var debug_level = process.env.debug_level;
module.exports = {
	name: 'shardDisconnect',
	execute(event, id, client) {
		if (debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardDisconnect Test ---`);
			console.log(client)
			console.log(event);
			console.log(id);
			//client.connect();
		}
        
	}
};