module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		if (message.author.bot) return;
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;
        if (!message.mentions.has(client.user)) return;
		//if (message.mentions.users.first() === undefined ) return
        if (message.mentions.users.first().id === client.user.id && message.content === "<@" + client.user.id + ">") { return message.channel.send(`
Here's how to use the bot. 
Please open the link for full instructions: 
https://imgur.com/a/dStRp6Y`); }
	}
};