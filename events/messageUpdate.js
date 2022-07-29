module.exports = {
    name: 'messageUpdate',
    execute(oldMessage, newMessage, client) {
		try{
            try { if (oldMessage.author.bot) return } catch { return console.log("Bot is null, messageUpdate, WHAT THE FUCK?"); }
            const c = client.channels.cache.get(oldMessage.channelId)
            if (newMessage.editedTimestamp === null && (newMessage.content.includes("https://") || newMessage.content.includes("http://"))) {return console.log('http(s):// Useless message update')}
            console.log(`[${new Date(oldMessage.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(newMessage.editedTimestamp).toLocaleString('hu-HU')}] Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) => \nFrom: "${oldMessage.content}" \nTo:   "${newMessage.content}"`);

            const messageLogs = client.settings.get(oldMessage.guild.id, "messageLogs");
            if(messageLogs) { 
                try{
                    if (client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(oldMessage.guild.id, "moderationChannel"))} else {channel = oldMessage.guild.systemChannel}
                    channel.send({ content: `[${new Date(oldMessage.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(newMessage.editedTimestamp).toLocaleString('hu-HU')}] 
Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) =>
From: "${oldMessage.content}" 
To:   "${newMessage.content}"`});
                } catch(error) { 
                    console.log(error) 
                    console.log("message Update Error")
                }
            }
        } catch(error) {
            console.log("message Update Error")
            console.log(error)
        }

        /*
        console.log("NYUUUUUUUUUUUUUUUUUUUUU")
        console.log(oldMessage);
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMessage);
        console.log("NYUUUUUUUUUUUUUUUUUUUUU")
        */
    }
};