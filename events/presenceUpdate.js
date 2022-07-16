const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'presenceUpdate',
    execute(oldPresence, newPresence, client) {
        /*
        console.log(oldPresence)
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newPresence)
        
        const memberUpdateLogs = client.settings.get(oldMember.guild.id, "memberUpdateLogs");
		if(memberUpdateLogs) { 
            //client.users.cache.find(user => user.id === 'USER-ID')
            const embed = new MessageEmbed()
                .setColor('#FFFF00')
                .setTitle('Member update has been detected')
                .setDescription(`${oldMember.user.tag} (${newMember.user.tag}) has been updated`)
                .setTimestamp()
            if (oldMember.user.tag !== newMember.user.tag || oldMember.nickname !== newMember.nickname || oldMember.user.avatar !== newMember.user.avatar || oldMember.avatar !== newMember.avatar || oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL() || oldMember.displayAvatarURL() !== newMember.displayAvatarURL()) {
                if (oldMember.user.tag !== newMember.user.tag) { embed.addField('Tag', `${oldMember.user.tag} => ${newMember.user.tag}`) }
                //if (oldMember.user.avatar !== newMember.user.avatar) { embed.addField('Avatar', `${oldMember.avatar} => ${newMember.avatar}`) }
                if (oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()) { 
                    embed.addField('User Avatar', `Old: ${oldMember.user.displayAvatarURL} => \nNew: ${newMember.user.displayAvatarURL}`) 
                    embed.setThumbnail(oldMember.user.displayAvatarURL())
                    embed.setImage(newMember.user.displayAvatarURL())
                }
                if (oldMember.nickname !== newMember.nickname) { embed.addField('Server Nickname', `${oldMember.nickname?oldMember.nickname:"-"} => ${newMember.nickname?newMember.nickname:"-"}`) }
                //if (oldMember.avatar !== newMember.avatar) { embed.addField('Avatar', `${oldMember.user.avatar?oldMember.user.avatar:"-"} => ${newMember.user.avatar?newMember.user.avatar:"-"}`) }
                if (oldMember.displayAvatarURL() !== newMember.displayAvatarURL()) { 
                    embed.addField('Server Avatar', `Old: ${oldMember.displayAvatarURL()?oldMember.displayAvatarURL():"-"} => \nNew: ${newMember.displayAvatarURL()?newMember.displayAvatarURL():"-"}`) 
                    embed.setThumbnail(oldMember.displayAvatarURL())
                    embed.setImage(newMember.displayAvatarURL())
                }
                try {
                    if (client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))} else {channel = oldMember.guild.systemChannel}
                    channel.send({embeds: [embed]})
                } catch (error) { console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "guildMemberUpdate no channel:"+err.name) }
            }
        }
        */
    }
};