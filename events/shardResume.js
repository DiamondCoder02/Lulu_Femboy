const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'shardResume',
	execute(id, replayedEvents, client) {
		console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardResume Test ---`);
        console.log(client)
		console.log(replayedEvents);
		console.log(id);
        //client.connect();
	}
};