module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		if (message.author.bot) return;
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;
        if (!message.mentions.has(client.user)) return;
        if (message.content.split(/ +/).length === 1) { return message.channel.send(`Here's how to use the bot. \nPlease open the link for full instructions: \nhttps://imgur.com/a/dStRp6Y`); }
	}
};