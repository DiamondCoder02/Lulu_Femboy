module.exports = {
	name: 'messageDelete',
	async execute(message, client) {
		if (!message.guild) return;
		if (message.author.tag === client.user.tag) return;
		if (message.author.bot) return;
		/*
		console.log("Delete")
		console.log(message)
		console.log("Delete2")
		*/
        let c = client.channels.cache.get(message.channelId)
        process.stdout.write(`[${new Date().toLocaleString('hu-HU')}] Message deleted in ${c.guild.name} <#${c.name}> (${message.author.tag}) => "${message.content}"`);

		if (message.embeds.length) { process.stdout.write(" //Embed deleted//") }
		if (message.attachments.size) { process.stdout.write(" //Attachment deleted//") }
		if (message.components.length) { process.stdout.write(" //Components deleted//") }
		if (message.stickers.size) { process.stdout.write(" //Stickers deleted//") }
		if (message.interaction) { process.stdout.write(" //Interaction deleted//") }

		let fetchedLogs = await message.guild.fetchAuditLogs({ limit: 1, type: 'MESSAGE_DELETE'});
		// Since there's only 1 audit log entry in this collection, grab the first one
		let deletionLog = fetchedLogs.entries.first();
		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
		// Now grab the user object of the person who deleted the message / Also grab the target of this action to double-check things
		let { executor, target } = deletionLog;
		// Update the output with a bit more information / Also run a check to make sure that the log returned was for the same author's message
		if (target.id === message.author.id) { console.log(` deleted by ${executor.tag}.`); } 
		else { console.log(` deleted, but we don't know by who, probably themselves.`); }

		let messageLogs = client.settings.get(message.guild.id, "messageLogs");
		if(messageLogs) { 
			try{
				if (client.channels.cache.get(client.settings.get(message.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(message.guild.id, "moderationChannel"))} else {channel = message.guild.systemChannel}
				channel.send({ content: `[${new Date().toLocaleString('hu-HU')}] 
Message deleted in <#${c.name}> (${message.author.tag}) => 
"${message.content}"`
+ "\nEmbed:" + (message.embeds.length?"✅":"❌") + " Attachment:" + (message.attachments.size?"✅":"❌") + " Components:" + (message.components.length?"✅":"❌") + " Stickers:" + (message.stickers.size?"✅":"❌") + " Interaction:" + (message.interaction?"✅":"❌")
+ (deletionLog ?  (target.id === message.author.id ? `\ndeleted by ${executor.tag}.` : `\ndeleted, but we don't know by who, probably themselves.`) : `\ndeleted, but no relevant audit logs were found.`)
				});
			} catch(error) { 
				//console.log(error) 
				console.log("message Delete Error")
			}
		}
	}
};