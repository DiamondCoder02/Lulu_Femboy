const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'shardError',
	execute(error, shardId, client) {
		console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardError Test ---`);
        console.log(client)
		console.log(error);
		console.log(shardId);
        //client.connect();
	}
};