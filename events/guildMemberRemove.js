const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildMemberRemove',
	execute(member, client) {
        //console.log(member)
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} has left the guild: ${member.guild.name}`)
        let goodbye = client.settings.get(member.guild.id, "goodbye");
        if(goodbye) {} else return
        if (member.guild.systemChannel === null) {return console.log(`[${new Date().toLocaleString('hu-HU')}] No system channel found for ` + member.guild.name)}
        const embed = new EmbedBuilder()
            .setColor('#FFFF00 ')
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setDescription(`**${member.user.tag}**, has left the server \n\`(ID:${member.user.id})\`.`)
            //.setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `Member count: ${member.guild.memberCount+1} => ${member.guild.memberCount}` })
            .setTimestamp()
        const channel = member.guild.systemChannel
        channel.send({embeds: [embed]})
	}
};