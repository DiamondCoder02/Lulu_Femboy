module.exports = {
	name: 'messageCreate',
	execute(message, client) {
		//console.log(message);
		try { if (message.author.bot) return } catch { return console.log("Bot is null, messageCreate, WHAT THE FUCK?"); }
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;

		//random funny respons (Needs more?)
		if (message.content.toLowerCase() === "nya") { return message.channel.send("https://cdn.discordapp.com/attachments/657545944136417280/920902875364864090/nya.mp4"); }
		if (message.content.toLowerCase().includes("cock and ball torture") || message.content.toLowerCase().includes("cbt")) { message.channel.send("https://en.wikipedia.org/wiki/Cock_and_ball_torture"); return message.channel.send("https://www.youtube.com/watch?v=nOPIu7isD3s"); }
		if (message.content.toLowerCase().includes("can i fuck") && message.content.toLowerCase().includes("bot") ) { return message.react('<:what_how:961926449806315530>'); } 
		if (message.content.toLowerCase().includes("suck my horse cock") ) { return message.channel.send('<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse4:973550361505824778>') }
		if (message.content.toLowerCase().includes("suck my giant horse cock") ) { return message.channel.send('<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse4:973550361505824778>') }
		// Guild specific reply (Mainly inside jokes)
		if (message.guildId === "953982453436018748") { 
			if (message.content === "🥛" || message.content.toLowerCase() === "milk" || message.content.toLowerCase() === "tej" ) { return message.channel.send("🥛 for President!"); }
			if (message.content.toLowerCase().includes("bargo")) { return message.channel.send("https://cdn.discordapp.com/attachments/1003357797804691596/1010658560759300196/Screenshot_20220820_231521.jpg"); }
			if (message.content.toLowerCase() === "tea" ) { return message.react('🍵'); }
			if (message.content.toLowerCase() === '🍵' ) { return message.channel.send('https://tenor.com/view/ggeezy-ggiorno-coffee-morning-gif-13580806'); }
			if (message.content.toLowerCase().includes("uwu") ) { return message.react('<:uwu:957683216393855006>'); }
			if (message.content.toLowerCase().includes("owo") ) { return message.react('<a:cute_uwu:968533677560717403>'); }
			if (message.content.toLowerCase().includes("faszom java") || message.content.toLowerCase() === "katsumi" ) { return message.channel.send({stickers: ['998944167071846510']}) } 
			if (message.content.toLowerCase().includes("három") || message.content.toLowerCase().includes("three") ) { return message.channel.send({stickers: ['967830438070595614']}) } 
			if (message.content.toLowerCase().includes("nohorny") || (message.content.toLowerCase().includes("horny") && (message.content.toLowerCase().includes("nincs") || message.content.toLowerCase().includes("stop") || message.content.toLowerCase().includes("no"))) ) { return message.channel.send({stickers: ['1008492797013278740']}) } 
			if (message.content.includes("Ki korán kell, aranyat lel. Viszont aki később az femboy-t talál") ||  message.content.includes("Ki korán kell, aranyat lel. *Viszont aki később az femboy-t talál*")) { return message.channel.send("My master and creator: https://ppl.moe/u/diamondcoder"); }
		}
		if (message.guildId === "893201403756052521") { 
			if (message.content.toLowerCase().includes("always horny") || message.content.toLowerCase() === "diamond" ) { return message.channel.send({stickers: ['1008706454842261566']}) } 
		}
		//Must last as I'm lazy
        if (!message.mentions.has(client.user)) return;
        if (message.mentions.users.first().id === client.user.id && message.content === "<@" + client.user.id + ">") { return message.channel.send(`
Here's how to use the bot. 
Please open the link for full instructions: 
https://imgur.com/a/dStRp6Y`); }
	}
};
