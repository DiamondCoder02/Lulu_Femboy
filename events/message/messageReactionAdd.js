const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "messageReactionAdd",
	async execute(reaction, user, client) {
		if (user.bot) { return }
		if (reaction.partial) {
			try { await reaction.fetch() }
			catch (error) { return console.error("Something went wrong when fetching the message:", error) }
		}
		try {
			const u = await reaction.users.fetch(), us = u.map(u => u.id);
			if (reaction.emoji.name === "red_cross" && reaction.emoji.id === "1008725354296389723" && reaction.count === 2 && reaction.message.author.id === client.user.id && us.includes(client.user.id)) {
				reaction.message.delete();
			}
		} catch (error) { console.error("messageReactionAdd error", error) }

	}
};