const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildCreate',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot joined guild: ${guild.name}`)
		const embed = new EmbedBuilder()
			.setColor('#FFFF00')
			.setTitle("Bot joined a guild!")
			.setDescription(`Name:${guild.name} with ${guild.memberCount} members \n(ID: ${guild.id})`)
		try { 
			const channel = client.channels.cache.find(channel => channel.name === config.botStatusChannel)
			channel.send({embeds: [embed]})
		} catch { 
			try{
				const channel = client.channels.cache.get(config.botStatusChannel)
				channel.send({embeds: [embed]})
			} catch {
				console.log("No status channel given or found. Continuing...")
			}
		}
	}
};