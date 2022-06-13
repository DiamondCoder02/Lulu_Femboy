const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'inviteDelete',
	async execute(invite, client, guildInvites) {
        //console.log(invite)
		const invites = await invite.guild.invites.fetch();
		const codeUses = new Map();
		invites.each(inv => codeUses.set(inv.code, inv.uses));
		guildInvites.set(invite.guild.id, codeUses);
		console.log("["+new Date(invite.createdTimestamp).toLocaleString('hu-HU') + "] " + `Invite deleted ${invite.guild.name} code: ${invite.code}`)
		const invitesLogs = client.settings.get(invite.guild.id, "invitesLogs");
		if(invitesLogs) { 
			try{
				if (client.channels.cache.get(client.settings.get(invite.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(invite.guild.id, "moderationChannel"))} else {channel = invite.guild.systemChannel}
				return channel.send({ content: `Invite code deleted: \`${invite.code}\``});
			} catch(error) { 
				//console.log(error) 
				console.log("Invite Delete Error")
			}
		}
	}
};