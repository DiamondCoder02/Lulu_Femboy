module.exports = {
	name: "messageUpdate",
	execute(oldMessage, newMessage, client) {
		try {
			try {
				let channelBlacklist = client.settings.get(oldMessage.guild.id, "messageLogsBlacklistChannels");
				let roleBlacklist = client.settings.get(oldMessage.guild.id, "messageLogsBlacklistRoles");
				for (var i = 0; i < channelBlacklist.length; i++) {
					if (oldMessage.channelId == channelBlacklist[i]) { return }
				}
				for (var ii = 0; ii < roleBlacklist.length; ii++) {
					if (oldMessage.member.roles.cache.has(roleBlacklist[ii])) { return }
				}
			} catch { return }
			try { if (oldMessage.author.bot) { return } } catch { return console.log("Bot is null, messageUpdate, WHAT THE FUCK?") }
			if (newMessage.editedTimestamp === null && (newMessage.content.includes("https://") || newMessage.content.includes("http://"))) { return /* console.log('http(s):// Useless message update')*/ }
			count = 0;
			for (var iii = 0; iii < newMessage.content.length; iii++) {
				if (String(newMessage.content)[iii] != String(oldMessage.content)[iii]) { count++ }
			}
			if (count == 0) {
				for (var iiii = 0; iiii < oldMessage.content.length; iiii++) {
					if (String(oldMessage.content)[iiii] != String(newMessage.content)[iiii]) { count++ }
				}
				if (count == 0) { return console.log("messageUpdate, no context changed") }
				else if (count == 1 || count == 2) { return console.log("messageUpdate, context changed with 1-2 characther") }
			}
			else if (count == 1 || count == 2) { return console.log("messageUpdate, context changed with 1-2 characther") }

			let c = client.channels.cache.get(oldMessage.channelId);
			console.log(`[${new Date(oldMessage.createdTimestamp).toLocaleString("hu-HU")} => ${new Date(newMessage.editedTimestamp).toLocaleString("hu-HU")}] Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) => \nFrom: "${oldMessage.content}" \nTo:   "${newMessage.content}"`);
			const messageLogs = client.settings.get(oldMessage.guild.id, "messageLogs");
			if (messageLogs) {
				try {
					if (client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel"))) { channel = client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel")) } else { channel = oldMessage.guild.systemChannel }
					channel.send({
						content: `[${new Date(oldMessage.createdTimestamp).toLocaleString("hu-HU")} => ${new Date(newMessage.editedTimestamp).toLocaleString("hu-HU")}] 
Message edited in ${c.guild.name} <#${oldMessage.channelId}> (${newMessage.author.toString()}) =>
From: "${oldMessage.content}" 
To:   "${newMessage.content}"`
					});
				} catch (error) {
					console.log(error);
					console.log("message Update Error1");
				}
			}
		} catch (error) {
			console.log("message Update Error2");
			console.log(error);
		}

		/*
		Console.log("NYUUUUUUUUUUUUUUUUUUUUU")
		console.log(oldMessage);
		console.log("NYAAAAAAAAAAAAAAAAAAAAA")
		console.log(newMessage);
		console.log("NYUUUUUUUUUUUUUUUUUUUUU")
		*/
	}
};