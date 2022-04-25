const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
        let welcome = client.settings.get(member.guild.id, "welcome");
        if(welcome) {} else return
        const channel = member.guild.systemChannel
        if (channel === null) {return console.log('No system channel found for ' + member.guild.name)}
        let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setDescription("**"+welcomeMessage+"**" + "\n" + 'The bot works with only slash commands.'+'\n'+'Do "/" to see the list of commands.'+'\n'+'(nsfw only in nsfw channels)')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        channel.send({content: member.user.toString(),embeds: [embed]})
	}
};