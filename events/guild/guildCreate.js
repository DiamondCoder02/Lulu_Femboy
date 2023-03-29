const { EmbedBuilder } = require("discord.js");
require("dotenv").config(); let botStatusChannelId = process.env.botStatusChannelId; let debug_level = process.env.debug_level;
module.exports = {
	name: "guildCreate",
	async execute(guild, client, guildInvites, vanityInvites) {
		console.log(`[${new Date().toLocaleString("hu-HU")}] Bot joined guild: ${guild.name}`);
		const embed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("Bot joined a guild!")
			.setDescription(`Name: \`${guild.name}\` with \`${guild.memberCount}\` members *(bot included)*)`);
		const channel = client.channels.cache.get(botStatusChannelId);
		channel.send({embeds: [embed]});

		bot=client.user;
		try {
			const channel = client.channels.cache.get(guild.systemChannelId);
			channel.send(`__**Thank you for inviting me, the ${bot.toString()} bot.**__
I am a multipurpose bot. My main goal is to make the server more lively. ^^
I also provide moderation, games and __I'm still being developed__.
I'm strictly wholesome, but if you want want other than that, you can invite my twin. >w<
Or just ask me nicely and I will keep everything clean here. Or I will try. ^^'

All of my commands works with slash commands. More info about them at https://imgur.com/a/dStRp6Y. 
\nTo edit my server config please go to: http://femboy.redirectme.net/`
			);
		} catch {
			client.users.fetch(guild.ownerId).then(user => {
				user.send(`__**Thank you for inviting me, the ${bot.toString()} bot.**__
I am a multipurpose bot. My main goal is to make the server more lively. ^^
I also provide moderation, games and __I'm still being developed__.
I'm strictly wholesome, but if you want want other than that, you can invite my twin. >w<
Or just ask me nicely and I will keep everything clean here. Or I will try. ^^'

All commands works with slash commands. More info about them at https://imgur.com/a/dStRp6Y. 
\nTo edit the server config please go to: http://femboy.redirectme.net/`
				);
			}).catch(err => { console.log("guildCreate Error:", err) });
		}
		try {
			const invites = await guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(guild.id, codeUses);
			if (guild.vanityURLCode != null) {
				guild.fetchVanityData().then(invites => {
					vanityInvites.set(guild.id, invites);
					if (debug_level >= 2) { console.log(`[${new Date().toLocaleString("hu-HU")}] Vanity cached ${guild.name}`) }
				}).catch(err => { console.log("Ready vanity Error:", err) });
			} else { console.log(`[${new Date().toLocaleString("hu-HU")}] Vanity URL: ${guild.name} has no vanity URL`) }
		} catch {
			console.log(`[${new Date().toLocaleString("hu-HU")}] GuildCreate - Not enough permission for ${guild.name}. Continuing...`);
		}
	}
};