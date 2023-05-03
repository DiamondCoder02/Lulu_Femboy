module.exports = {
	name: "guildCreate",
	async execute(guild, client, guildInvites, vanityInvites) {
		let bot = client.user;
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
				}).catch(err => { console.log("Ready vanity Error:", err) });
			}
		} catch {
			console.log(`guildCreate - Not enough permission for ${guild.name}. Continuing...`);
		}
	}
};