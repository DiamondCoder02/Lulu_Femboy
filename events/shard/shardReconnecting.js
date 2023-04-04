require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardReconnecting",
	execute(id, client) {
		if (debug_level >= 3) {
			console.debug("--- shardReconnecting Test ---");
			console.debug(client);
			console.debug(id);
			console.debug("--- shardReconnecting Test ---");
			// Client.connect();
		}
	}
};