const { EmbedBuilder } = require('discord.js');
const config = require('../botConfigs/config.json');
module.exports = {
	name: 'guildCreate',
	async execute(guild, client, guildInvites, vanityInvites) {
		console.log(`[${new Date().toLocaleString('hu-HU')}] Bot joined guild: ${guild.name}`)
		const embed = new EmbedBuilder()
			.setColor('#FFFF00')
			.setTitle("Bot joined a guild!")
			.setDescription(`Name: \`${guild.name}\` with \`${guild.memberCount}\` members *(bot included)* \n(ID: \`${guild.id}\`)`)
		try{
			const channel = client.channels.cache.get(config.botStatusChannelId)
			channel.send({embeds: [embed]})
		} catch {
			console.log(`[${new Date().toLocaleString('hu-HU')}] No status channel ID given or found. Guild create Continuing...`)
		}

		bot=client.user
		try{
			const channel = client.channels.cache.get(guild.systemChannelId)
			channel.send(`Thank you for inviting ${bot.toString()}. All commands works with slash commands. More info at https://imgur.com/a/dStRp6Y \n\nTo edit config please go to: http://femboy.redirectme.net/`)
		} catch {
			client.users.fetch(guild.ownerId).then(user => {
				user.send(`Thank you for inviting ${bot.toString()}. All commands works with slash commands. More info at https://imgur.com/a/dStRp6Y \n\nTo edit config please go to: http://femboy.redirectme.net/`)
			}).catch(err => { console.log("guildCreate Error:", err) })
		}
		try{
			const invites = await guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(guild.id, codeUses);
			if (guild.vanityURLCode != null) {
				guild.fetchVanityData().then(invites => {
					vanityInvites.set(guild.id, invites);
					if (config.debug_level >= 2) { console.log(`[${new Date().toLocaleString('hu-HU')}] Vanity cached ${guild.name}`); }
				}).catch(err => { console.log("Ready vanity Error:", err) })
			} else { console.log(`[${new Date().toLocaleString('hu-HU')}] Vanity URL: ${guild.name} has no vanity URL`) }
		} catch {
			console.log(`[${new Date().toLocaleString('hu-HU')}] GuildCreate - Not enough permission for ${guild.name}. Continuing...`)
		}
	}
};