const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'shardDisconnect',
	execute(event, id, client) {
        console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardDisconnect Test ---`);
        console.log(client)
		console.log(event);
		console.log(id);
        //client.connect();
	}
};