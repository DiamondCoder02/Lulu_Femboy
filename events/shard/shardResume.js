require("dotenv").config(); let debug_level = process.env.debug_level;
module.exports = {
	name: "shardResume",
	execute(id, replayedEvents, client) {
		if (debug_level >= 5) {
			console.debug("--- shardResume Test ---");
			console.debug(client);
			console.debug(replayedEvents);
			console.debug(id);
			console.debug("--- shardResume Test ---");
			// Client.connect();
		}
	}
};