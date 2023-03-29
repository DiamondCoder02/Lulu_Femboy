const { EmbedBuilder } = require("discord.js");
require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardReady",
	execute(id, unavailableGuilds, client) {
		if (debug_level >= 3) {
			console.log(`[\`${new Date().toLocaleString("hu-HU")}\`] --- shardReady Test ---`);
			console.log(client);
			console.log(unavailableGuilds);
			console.log(id);
			// Client.connect();
		}
	}
};