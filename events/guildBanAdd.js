const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildBanAdd',
	execute(ban, client) {
        //console.log(ban)
        const banKickLogs = client.settings.get(ban.guild.id, "banKickLogs");
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${ban.user.tag} banned from ${ban.guild.name}`)
		if(banKickLogs) { 
            try{
				if (client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))} else {channel = ban.guild.systemChannel}
				return channel.send({ content: `[\`${new Date().toLocaleString('hu-HU')}\`] ${ban.user.tag} has been banned`});
			} catch(error) { 
				console.log(error) 
				console.log("GuildBanAdd Error")
			}
        }
	}
};