require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardReady",
	execute(id, unavailableGuilds, client) {
		if (debug_level >= 3) {
			console.debug("--- shardReady Test ---");
			console.debug(client);
			console.debug(unavailableGuilds);
			console.debug(id);
			console.debug("--- shardReady Test ---");
			// Client.connect();
		}
	}
};