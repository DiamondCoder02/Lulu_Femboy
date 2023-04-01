module.exports = {
	name: "guildDelete",
	async execute(guild, client, guildInvites) {
		try {
			const invites = await guild.invites.fetch();
			const codeUses = new Map();
			invites.each(inv => codeUses.set(inv.code, inv.uses));
			guildInvites.set(guild.id, codeUses);
		} catch {
			console.log(`guildDelete - Not enough permission for ${guild.name}. Continuing...`);
		}
	}
};