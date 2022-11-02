const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = {
	name: 'shardDisconnect',
	execute(event, id, client) {
		if (config.debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardDisconnect Test ---`);
			console.log(client)
			console.log(event);
			console.log(id);
			//client.connect();
		}
        
	}
};