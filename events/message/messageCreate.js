const { ChannelType } = require("discord.js");
const fs = require("fs"), configData = fs.readFileSync("./botConfigs/bot_private.json", "utf8");
const config = JSON.parse(configData);
let good = config.goodBot, bad = config.badBot, canIFuck = config.canIFuckBot;
module.exports = {
	name: "messageCreate",
	execute(message, client) {
		// Console.log(message);
		try { if (message.author.bot) { return } } catch { return console.log("Bot is null, messageCreate, WHAT THE FUCK?") }
		if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") { return }
		// Single channel logger
		if (message.channel.type != ChannelType.DM) {
			const l = client.settings.get(message.guild.id, "singleChannelMessageLogger");
			if (l[0] != "" && l[1] != "") {
				const channel = client.settings.get(message.guild.id, "singleChannelMessageLogger");
				if (channel[0] == message.channel.id) {
					client.channels.cache.get(channel[1]).send({ content: message.author.tag + "* said:\n" + `${String(message.content)}` });
					if (message.embeds.length) {
						console.log(" //Embed detected//");
						client.channels.cache.get(channel[1]).send({ embeds: [message.embeds[0]] });
					}
					if (message.stickers.size) {
						console.log(" //Sticker detected//");
						const sStic = message.stickers.map(Stickers => Stickers.id);
						console.log(sStic);
						try { client.channels.cache.get(channel[1]).send({ stickers: [`${sStic}`] }) }
						catch {
							const sSti = message.stickers.map(Stickers => Stickers.name);
							console.log(sSti);
							client.channels.cache.get(channel[1]).send("Sticker name: " + sSti);
						}
					}
				}
			}
		}
		// Random funny respons (Needs more?)
		if (message.channel.type === ChannelType.DM || client.settings.get(message.guild.id, "enableRandomReactions")) {
			let channelBlacklist = [];
			if (message.channel.type != ChannelType.DM) { channelBlacklist = client.settings.get(message.guild.id, "randomReactionChannelBlacklist") }
			canSend = true;
			for (let i = 0; i < channelBlacklist.length; i++) { if (message.channelId === channelBlacklist[i]) { return canSend = false } }
			if (canSend) {
				// Add good morning message when asked?
				if (message.content.toLowerCase() === "nya" || message.content.toLowerCase() === "nya~" || message.content.toLowerCase() === "nyaa~" || message.content.toLowerCase() === "nya~~") { message.channel.send("https://cdn.discordapp.com/attachments/657545944136417280/920902875364864090/nya.mp4") }
				if (message.content.toLowerCase().includes("good bot")) { good++; message.channel.send(`Thank you! :3 \n||I was called good ${good} time(s)||`) }
				if (message.content.toLowerCase().includes("bad bot")) { bad++; message.channel.send(`I'm sorry. >.< \n||I was bad ${bad} time(s)||`) }
				if ((message.content.toLowerCase().includes("political view") && message.content.toLowerCase().includes("bot"))) { message.channel.send("Me and my creator/master hates politics. So I don't have any opinion.¯\\_(ツ)_/¯") }
				if (message.content.toLowerCase().includes("can i fuck") && message.content.toLowerCase().includes("bot")) { canIFuck++; message.react("<:what_how:961926449806315530>") }
				if (message.content.toLowerCase().includes("uwu")) { message.react("<:uwu:1042202197477294111>") }
				if (message.content.toLowerCase().includes("owo")) { message.react("<:owo:1042202181027242024>") }
				config.goodBot = good; config.badBot = bad; config.canIFuckBot = canIFuck;
				fs.writeFileSync("./botConfigs/bot_private.json", JSON.stringify(config, null, 2));
				const chan = client.channels.cache.get(message.channelId);
				if (chan.nsfw) {
					if (message.content.toLowerCase().includes("cock and ball torture") || message.content.toLowerCase().includes("cbt")) { message.channel.send("https://en.wikipedia.org/wiki/Cock_and_ball_torture"); message.channel.send("https://www.youtube.com/watch?v=nOPIu7isD3s") }
					if (message.content.toLowerCase().includes("suck my horse cock")) { message.channel.send("<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse4:973550361505824778>") }
					if (message.content.toLowerCase().includes("suck my giant horse cock")) { message.channel.send("<:horse1:973550284041232414><:horse2:973550337711558656><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse3:973550350449639424><:horse4:973550361505824778>") }
					if ((message.content.toLowerCase().includes("femboy") || message.content.toLowerCase().includes("femboi")) && message.content.toLowerCase().includes("racist")) { message.react("<:FemboyRacist:1049367250592870482>") }
				}
			}
		}
		// Must last as I'm lazy
		if (!message.mentions.has(client.user)) { return }
		if (message.mentions.users.first().id === client.user.id && message.content === "<@" + client.user.id + ">") {
			return message.channel.send(`
Main Web dashboard:
http://femboy.redirectme.net/

Here's how to use the bot, please open the link for full instructions: 
https://imgur.com/a/dStRp6Y`);
		}
	}
};