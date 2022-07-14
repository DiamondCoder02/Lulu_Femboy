const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        /*
        console.log(oldMember)
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMember)
        */
        const memberUpdateLogs = client.settings.get(oldMember.guild.id, "memberUpdateLogs");
		if(memberUpdateLogs) { 
            const embed = new MessageEmbed()
                .setColor('#FFFF00')
                .setTitle('Member update has been detected')
                .setDescription(`${oldMember.user.tag} has been updated`)
                .setTimestamp()
            
            if (oldMember.user.tag !== newMember.user.tag) {
                embed.addField('Tag', `${oldMember.user.tag} => ${newMember.user.tag}`)
            }
            if (oldMember.avatar !== newMember.avatar) {
                embed.addField('Avatar', `${oldMember.avatar} => ${newMember.avatar}`)
            }
            if (oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()) {
                embed.addField('User Avatar', `${oldMember.user.displayAvatarURL} => ${newMember.user.displayAvatarURL}`)
            }
            if (oldMember.nickname !== newMember.nickname) {
                embed.addField('Server Nickname', `${oldMember.nickname?oldMember.nickname:"-"} => ${newMember.nickname?newMember.nickname:"-"}`)
            }
            if (oldMember.avatar !== newMember.avatar) {
                embed.addField('Server Avatar', `${oldMember.user.avatar?oldMember.user.avatar:"-"} => ${newMember.user.avatar?newMember.user.avatar:"-"}`)
            }
            if (oldMember.displayAvatarURL() !== newMember.displayAvatarURL()) {
                embed.addField('Server Avatar', `${oldMember.displayAvatarURL()?oldMember.displayAvatarURL():"-"} => ${newMember.displayAvatarURL()?newMember.displayAvatarURL():"-"}`)
            }
            try {
                if (client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))} else {channel = oldMember.guild.systemChannel}
                channel.send({embeds: [embed]})
            } catch (error) { console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "guildMemberUpdate no channel:"+err.name) }
        }
    }
};