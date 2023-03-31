const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "inviteCreate",
	async execute(invite, client, guildInvites) {
		try {
			console.log(`[${new Date().toLocaleString("hu-HU")}] `+`Invite created ${invite.guild.name} code: ${invite.code} from ${invite.inviter.tag} with ${invite.maxUses} uses`);

			const invites = await invite.guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(invite.guild.id, codeUses);
			// Console.log(invite)
			const invitesLogs = client.settings.get(invite.guild.id, "invitesLogs");
			if (invitesLogs) {
				try {
					if (client.channels.cache.get(client.settings.get(invite.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(invite.guild.id, "moderationChannel"))} else {channel = invite.guild.systemChannel}
					return channel.send({ content: `[\`${new Date(invite.createdTimestamp).toLocaleString("hu-HU")}\`] \nInvite created with code \`${invite.code}\` from \`${invite.inviter.tag}\` with \`${invite.maxUses}\` uses (0 = infinite).`});
				} catch (error) {
					// Console.log(error)
					console.log("Invite Create Error");
				}
			}
		} catch {
			console.log(`[${new Date().toLocaleString("hu-HU")}] inviteCreate - Not enough permission. Continuing...`);
		}
	}
};