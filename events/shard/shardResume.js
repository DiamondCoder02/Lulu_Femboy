const { EmbedBuilder } = require("discord.js");
require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardResume",
	execute(id, replayedEvents, client) {
		if (debug_level >= 3) {
			console.log(`[\`${new Date().toLocaleString("hu-HU")}\`] --- shardResume Test ---`);
			console.log(client);
			console.log(replayedEvents);
			console.log(id);
			// Client.connect();
		}
	}
};