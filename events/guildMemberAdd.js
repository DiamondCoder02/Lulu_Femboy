const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), gmc = lang.guild_mem_create.split('-')
module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
        console.log(`${member.user.tag} has joined the guild: ${member.guild.name}`)
        try{
            let ro = client.settings.get(member.guild.id, "welcomeRole");
            console.log(ro)
            const role = member.guild.roles.find(r => r.name == ro)
            console.log(role)
            console.log(member)
            member.roles.add(role);
            console.log('Yay')
        } catch { console.log('No welcome role') }
        let welcome = client.settings.get(member.guild.id, "welcome");
        if(welcome) {} else return
        const channel = member.guild.systemChannel
        if (channel === null) {return console.log(gmc[0] + member.guild.name)}
        let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setDescription("**"+welcomeMessage+"**" + "\n" + gmc[1] +'\n "/"'+ gmc[2] +'\n'+ gmc[3])
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
        channel.send({content: member.user.toString(),embeds: [embed]})
	}
};