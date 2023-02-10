const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'inviteDelete',
	async execute(invite, client, guildInvites) {
		try{
			console.log(`[${new Date().toLocaleString('hu-HU')}] ` + `Invite deleted ${invite.guild.name} code: ${invite.code}`)

			const invites = await invite.guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(invite.guild.id, codeUses);
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
		} catch {
			console.log(`[${new Date().toLocaleString('hu-HU')}] inviteDelete - Not enough permission. Continuing...`)
		}
	}
};