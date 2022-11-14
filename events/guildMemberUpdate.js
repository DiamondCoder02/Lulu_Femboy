const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        if (oldMember.user.bot) return;
        /*
        console.log("\nGuild Member 1")
        console.log(oldMember)
        console.log("NYAAAAAAAAAAAAAAAAAAAAA")
        console.log(newMember)
        console.log("Guild Member 2\n")
        */
        if (oldMember.pending && !newMember.pending) {
            if( client.settings.get(newMember.guild.id, "welcomeRoles") ) {
                let ro = client.settings.get(newMember.guild.id, "welcomeRoles");
                for (let i = 0; i < ro.length; i++) {
                    try{
                        let role = newMember.guild.roles.cache.get(ro[i])
                        newMember.roles.add(role)
                    } catch (e) {
                        console.log("guildMemberUpdate giveRole "+e.name)
                        if (client.settings.get(oldMember.guild.id, "moderationChannel")) {channel = client.channels.cache.get(client.settings.get(oldMember.guild.id, "moderationChannel"))} else {channel = oldMember.guild.systemChannel}
                        if (channel) {
                            channel.send(`An error occured. A role got deleted from welcome roles. Please check the dashboard and edit the settings.`)
                        } else {
                            const user = client.users.fetch(oldMember.guild.ownerId);
                            user.send(`An error occured at ${newMember.guild.name}. A role got deleted from welcome roles. Please check the dashboard and edit the settings.`)
                        }
                    }
                }
            }
        }
        const memberUpdateLogs = client.settings.get(oldMember.guild.id, "memberUpdateLogs");
		if(memberUpdateLogs) { 
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle('Server side profile updated!')
                .setDescription(`${oldMember.user.tag} (${newMember.nickname?newMember.nickname:newMember.user.tag}) user profile has been updated`)
                .setFooter({text: `User ID: ${oldMember.user.id}`})
                .setTimestamp()
            if (oldMember.nickname !== newMember.nickname || oldMember.avatar !== newMember.avatar || oldMember.displayAvatarURL() !== newMember.displayAvatarURL() || oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp) {} else return;
            if (oldMember.nickname !== newMember.nickname) { embed.addFields( { name: 'Server Nickname', value: `${oldMember.nickname?oldMember.nickname:"-"} => ${newMember.nickname?newMember.nickname:"-"}` } ) }
            if (oldMember.avatarURL() !== newMember.avatarURL()) { 
                embed.addFields( { name: 'Server Avatar', value: `Old: ${oldMember.avatarURL()?oldMember.avatarURL():"-"} => \nNew: ${newMember.avatarURL()?newMember.avatarURL():"-"}` } ) 
                embed.setThumbnail(oldMember.avatarURL())
                embed.setImage(newMember.avatarURL())
            }
            if (oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp) { 
                embed.addFields( { name: 'Premium changed: ', value: `${oldMember.premiumSince ? oldMember.premiumSince : "-"} => ${newMember.premiumSince ? newMember.premiumSince : "-"}` } ) 
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
};