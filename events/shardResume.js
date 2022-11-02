const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = {
	name: 'shardResume',
	execute(id, replayedEvents, client) {
		if (config.debug_level >= 3) { 
			console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardResume Test ---`);
			console.log(client)
			console.log(replayedEvents);
			console.log(id);
			//client.connect();
		}
	}
};