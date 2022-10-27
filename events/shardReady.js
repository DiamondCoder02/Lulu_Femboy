const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'shardReady',
	execute(id, unavailableGuilds, client) {
		console.log(`[\`${new Date().toLocaleString('hu-HU')}\`] --- shardReady Test ---`);
        console.log(client)
		console.log(unavailableGuilds);
		console.log(id);
        //client.connect();
	}
};