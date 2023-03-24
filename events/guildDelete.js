const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); var botStatusChannelId = process.env.botStatusChannelId;
module.exports = {
	name: 'guildDelete',
	async execute(guild, client, guildInvites) {
		console.log(`[${new Date().toLocaleString('hu-HU')}] Bot left guild: ${guild.name}`)
		const embed = new EmbedBuilder()
			.setColor('#FFFF00')
			.setTitle("Bot left a guild!")
			.setDescription(`Name: \`${guild.name}\` \n(ID: \`${guild.id}\`)`)
		try{
			const channel = client.channels.cache.get(botStatusChannelId)
			channel.send({embeds: [embed]})
		} catch {
			console.log(`[${new Date().toLocaleString('hu-HU')}] No status channel given or found. Guild delete Continuing...`)
		}
		try{
			const invites = await guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(guild.id, codeUses);
		} catch {
			console.log(`[${new Date().toLocaleString('hu-HU')}] guildDelete - Not enough permission for ${guild.name}. Continuing...`)
		}
		
	}
};