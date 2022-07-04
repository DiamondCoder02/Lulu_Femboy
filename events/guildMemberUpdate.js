module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        if (oldMember.author.bot) return;
        console.log(oldMember)
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMember)
/*
        console.log(`[${new Date(oldMember.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(newMessage.editedTimestamp).toLocaleString('hu-HU')}] Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) => \nFrom: "${oldMessage.content}" \nTo:   "${newMessage.content}"`);

        const messageLogs = client.settings.get(oldMessage.guild.id, "messageLogs");
		if(messageLogs) { 
			try{
				if (client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel"))} else {channel = message.guild.systemChannel}
				channel.send({ content: `[${new Date(oldMessage.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(newMessage.editedTimestamp).toLocaleString('hu-HU')}] 
Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) =>
From: "${oldMessage.content}" 
To:   "${newMessage.content}"`});
			} catch(error) { 
				console.log(error) 
				console.log("message Update Error")
			}
		}
        */
    }
};