const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        if (oldMember.user.bot) return;
        /*
        console.log(oldMember)
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMember)
        */
        const memberUpdateLogs = client.settings.get(oldMember.guild.id, "memberUpdateLogs");
		if(memberUpdateLogs) { 
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle('Member update has been detected')
                .setDescription(`${oldMember.user.tag} (${newMember.user.tag}) has been updated`)
                .setTimestamp()
            if (oldMember.user.tag !== newMember.user.tag || oldMember.nickname !== newMember.nickname || oldMember.user.avatar !== newMember.user.avatar || oldMember.avatar !== newMember.avatar || oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL() || oldMember.displayAvatarURL() !== newMember.displayAvatarURL()) {
                if (oldMember.user.tag !== newMember.user.tag) { embed.addFields( { name: 'Tag', value: `${oldMember.user.tag} => ${newMember.user.tag}` } ) }
                if (oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()) { 
                    embed.addFields( { name: 'User Avatar', value: `Old: ${oldMember.user.displayAvatarURL} => \nNew: ${newMember.user.displayAvatarURL}` } ) 
                    embed.setThumbnail(oldMember.user.displayAvatarURL())
                    embed.setImage(newMember.user.displayAvatarURL())
                }
                if (oldMember.nickname !== newMember.nickname) { embed.addFields( { name: 'Server Nickname', value: `${oldMember.nickname?oldMember.nickname:"-"} => ${newMember.nickname?newMember.nickname:"-"}` } ) }
                if (oldMember.displayAvatarURL() !== newMember.displayAvatarURL()) { 
                    embed.addFields( { name: 'Server Avatar', value: `Old: ${oldMember.displayAvatarURL()?oldMember.displayAvatarURL():"-"} => \nNew: ${newMember.displayAvatarURL()?newMember.displayAvatarURL():"-"}` } ) 
                    embed.setThumbnail(oldMember.displayAvatarURL())
                    embed.setImage(newMember.displayAvatarURL())
                }
                try {
                    if (client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))) {channel = client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))} else {channel = oldMember.guild.systemChannel}
                    channel.send({embeds: [embed]})
                } catch (error) { 
                    console.log(error)
                    console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "guildMemberUpdate no channel:"+err.name) 
                }
            }
        }
    }
};