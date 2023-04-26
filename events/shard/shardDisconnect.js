require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardDisconnect",
	execute(event, id, client) {
		if (debug_level >= 5) {
			console.debug("--- shardDisconnect Test ---");
			console.debug(client);
			console.debug(event);
			console.debug(id);
			console.debug("--- shardDisconnect Test ---");
			// Client.connect();
		}
	}
};