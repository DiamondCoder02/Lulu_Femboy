const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), gmc = lang.guild_mem_create.split('-')
module.exports = {
	name: 'guildBanRemove',
	execute(ban, client) {
        console.log(ban)
        const banKickLogs = client.settings.get(ban.guild.id, "banKickLogs");
        console.log("["+new Date().toLocaleString('hu-HU') + "] " + `${ban.user.tag} unbanned from ${ban.guild.name}`)
		if(banKickLogs) { 
            try{
				if (client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(ban.guild.id, "moderationChannel"))} else {channel = ban.guild.systemChannel}
				return channel.send({ content: `[\`${new Date().toLocaleString('hu-HU')}\`] ${ban.user.tag} has been unbanned today.`});
			} catch(error) { 
				console.log(error) 
				console.log("GuildBanRemove Error")
			}
        }
	}
};