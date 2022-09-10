module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		//console.log(message);
		try { if (message.author.bot) return } catch { return console.log("Bot is null, messageCreate, WHAT THE FUCK?"); }
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;

		//random funny respons (Needs more?)
		if (message.content.toLowerCase() === "nya") { message.channel.send("https://cdn.discordapp.com/attachments/657545944136417280/920902875364864090/nya.mp4"); }
		if ((message.content.toLowerCase().includes("political view") && message.content.toLowerCase().includes("bot")) || (message.content.toLowerCase().includes("politikai nézet") && message.content.toLowerCase().includes("botnak"))) { message.channel.send("Me and my creator/master hates politics. So I don't have any opinion."); }
		if (message.content.toLowerCase().includes("cock and ball torture") || message.content.toLowerCase().includes("cbt")) { message.channel.send("https://en.wikipedia.org/wiki/Cock_and_ball_torture"); message.channel.send("https://www.youtube.com/watch?v=nOPIu7isD3s"); }
		if (message.content.toLowerCase().includes("can i fuck") && message.content.toLowerCase().includes("bot") ) { message.react('<:what_how:961926449806315530>'); } 
		if (message.content.toLowerCase().includes("suck my horse cock") ) { message.channel.send('<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse4:973550361505824778>') }
		if (message.content.toLowerCase().includes("suck my giant horse cock") ) { message.channel.send('<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse4:973550361505824778>') }
		
		//Must last as I'm lazy
        if (!message.mentions.has(client.user)) return;
        if (message.mentions.users.first().id === client.user.id && message.content === "<@" + client.user.id + ">") { return message.channel.send(`
Here's how to use the bot. 
Please open the link for full instructions: 
https://imgur.com/a/dStRp6Y`); }
	}
};