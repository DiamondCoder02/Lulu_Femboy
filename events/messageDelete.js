module.exports = {
	name: 'messageDelete',
	async execute(message, client) {
		/*
		console.log("Delete")
		console.log(message)
		console.log("Delete2")
		*/
        const c = client.channels.cache.get(message.channelId)
        process.stdout.write(`[${new Date(message.createdTimestamp).toLocaleString('hu-HU')}] Message deleted in ${c.guild.name} <#${c.name}> (${message.author.tag}) => "${message.content}"`);

		if (message.content.length <1 && message.embeds) { process.stdout.write(" //Embed deleted//") }
		if (message.content.length <1 && message.attachments.size) { process.stdout.write(" //Attachment deleted//") }
		if (message.content.length <1 && (message.components).length) { process.stdout.write(" //Components deleted//") }
		if (message.content.length <1 && message.stickers.size) { process.stdout.write(" //Stickers deleted//") }
		if (message.content.length <1 && message.interaction) { process.stdout.write(" //Interaction deleted//") }

		if (!message.guild) return;
		const fetchedLogs = await message.guild.fetchAuditLogs({ limit: 1, type: 'MESSAGE_DELETE'});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
		// Now grab the user object of the person who deleted the message / Also grab the target of this action to double-check things
		const { executor, target } = deletionLog;
		// Update the output with a bit more information / Also run a check to make sure that the log returned was for the same author's message
		if (target.id === message.author.id) { console.log(` deleted by ${executor.tag}.`); } 
		else { console.log(` deleted, but we don't know by who, probably themselves.`); }
	}
};