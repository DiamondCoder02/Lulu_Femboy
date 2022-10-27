const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'shardReconnecting',
	execute(id, client) {
		console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardReconnecting Test ---`);
        console.log(client)
		console.log(id);
        //client.connect();
	}
};