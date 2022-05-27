module.exports = {
	name: 'messageDelete',
	execute(message, client) {
		if (message.author.bot) return;
        const c = client.channels.cache.get(message.channelId)
        console.log(`[${new Date(message.createdTimestamp).toLocaleString('hu-HU')} => ${new Date(message.editedTimestamp).toLocaleString('hu-HU')}] Message deleted in ${c.guild.name} <#${c.name}> (${message.author.tag}) => "${message.content}"`);
		//console.log(message);
	}
};