require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardError",
	execute(error, shardId, client) {
		if (debug_level >= 5) {
			console.debug("--- shardError Test ---");
			console.debug(client);
			console.debug(error);
			console.debug(shardId);
			console.debug("--- shardError Test ---");
			// Client.connect();
		}
	}
};