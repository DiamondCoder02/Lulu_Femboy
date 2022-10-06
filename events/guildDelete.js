const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildDelete',
	execute(guild) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot left guild: ${guild.name}`)
		const embed = new EmbedBuilder()
			.setColor('#FFFF00')
			.setTitle("Bot left a guild!")
			.setDescription(`Name: ${guild.name}\n(ID: ${guild.id})`)
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