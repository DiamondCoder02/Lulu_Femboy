module.exports = {
    name: 'messageUpdate',
    execute(oldMessage, newMessage, client) {
        if (oldMessage.author.bot) return;
        const c = client.channels.cache.get(oldMessage.channelId)
        if (newMessage.editedTimestamp === null && (newMessage.content.includes("https://") || newMessage.content.includes("http://"))) {return console.log('http(s):// Useless message update')}
        console.log(`[${new Date(oldMessage.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(newMessage.editedTimestamp).toLocaleString('hu-HU')}] Message edited in ${c.guild.name} <#${c.name}> (${newMessage.author.tag}) => \nFrom: "${oldMessage.content}" \nTo: "${newMessage.content}"`);
        /*
        console.log("NYUUUUUUUUUUUUUUUUUUUUU")
        console.log(oldMessage);
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMessage);
        console.log("NYUUUUUUUUUUUUUUUUUUUUU")
        */
    }
};