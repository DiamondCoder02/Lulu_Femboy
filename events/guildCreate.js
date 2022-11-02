const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildCreate',
	execute(guild, client) {
        console.log(`[${new Date().toLocaleString('hu-HU')}] Bot joined guild: ${guild.name}`)
		bot=client.user
		try{
			const channel = client.channels.cache.get(guild.systemChannelId)
			channel.send(`Thank you for inviting ${bot.toString()}. All commands works with slash commands. More info at https://imgur.com/a/dStRp6Y \n\nTo edit config please go to: http://femboy.redirectme.net/`)
		} catch {
			client.users.fetch(guild.ownerId).then(user => {
				user.send(`Thank you for inviting ${bot.toString()}. All commands works with slash commands. More info at https://imgur.com/a/dStRp6Y \n\nTo edit config please go to: http://femboy.redirectme.net/`)
			}).catch(err => { console.log("guildCreate Error:", err) })
		}
		
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