const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client, guildInvites, vanityInvites) {
        //console.log(member)
        const cachedInvites = guildInvites.get(member.guild.id)
        const newInvites = await member.guild.invites.fetch();
		if( client.settings.get(member.guild.id, "invitesLogs") ) { 
            try {
                const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
                //console.log("Cached", [...cachedInvites.keys()])
                //console.log("New", [...newInvites.values()].map(inv => inv.code))
                //console.log("Used", usedInvite)
                let channel = ""
                if (client.settings.get(member.guild.id, "moderationChannel")) {channel = client.channels.cache.get(client.settings.get(member.guild.id, "moderationChannel"))} else {channel = member.guild.systemChannel}
                if (usedInvite) {
                    console.log(`[${new Date().toLocaleString('hu-HU')}] Code ${usedInvite.code} (Created: ${usedInvite.inviter.tag}) used by ${member.user.tag} (${usedInvite.uses}/${usedInvite.maxUses})`)
                    channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \nThe code \`${usedInvite.code}\` (Created by: \`${usedInvite.inviter.tag}\`) was just used by \`${member.user.tag}\`(ID:${member.user.id}). \nInvites:${usedInvite.uses}/${usedInvite.maxUses}`});
                } else {
                    try {
                        let cachedVanityInvites = vanityInvites.get(member.guild.id)
                        let newVanityInvites = await member.guild.fetchVanityData();
                        if (cachedVanityInvites.uses < newVanityInvites.uses) {
                            console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} joined with custom invite link.`)
                            console.log(cachedVanityInvites)
                            console.log(newVanityInvites)
                            channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \n\`${member.user.tag}\` joined with custom invite link. \nUsed since creation: \`${newVanityInvites.uses}\``});
                        } else {
                            console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} somehow broke my bot logic. WHAT?`)
                            channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \n\`${member.user.tag}\` somehow broke my bot logic. WHAT?`});
                        }
                    } catch {
                        console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} joined without using an invite or with a limited useable invite.`)
                        channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \n\`${member.user.tag}\` joined without using an invite or with a limited useable invite.`});
                    }
                }
            } catch (err) {
                console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "OnGuildMemberAdd no channel:"+err)
            }
        }
        newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
        guildInvites.set(member.guild.id, cachedInvites);
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} has joined the guild: ${member.guild.name}`)
        if(member.pending === false){    
            if( client.settings.get(member.guild.id, "welcomeRoles") ) {
                let ro = client.settings.get(member.guild.id, "welcomeRoles");
                for (let i = 0; i < ro.length; i++) {
                    try{
                        let role = member.guild.roles.cache.get(ro[i])
                        member.roles.add(role)
                    } catch (e) {
                        console.log("guildMemberAdd giveRole "+e.name)
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
        if( client.settings.get(member.guild.id, "welcome") ) {
            const channel = member.guild.systemChannel
            if (channel === null) { console.log(`[${new Date().toLocaleString('hu-HU')}] No system channel found for ` + member.guild.name) }
            else {
                let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
                const embed = new EmbedBuilder()
                    .setColor('#FFFF00 ')
                    .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
                    .setDescription(welcomeMessage + "\nThe bot works with only slash commands.\n(nsfw only in nsfw channels)")
                    .setFooter({ text: `Member count: ${member.guild.memberCount-1} => ${member.guild.memberCount}` })
                    .setTimestamp()
                channel.send({content: member.user.toString(),embeds: [embed]})
            }
        }
        if( client.settings.get(member.guild.id, "welcomeUserCheck") ) {
            const profilepic = member.displayAvatarURL();
            const userInfo = new EmbedBuilder()
                .setColor('#FFFF00 ')
                .setTitle("New " + (member.user.bot ? "bot" : "user") + " joined:")
                .setThumbnail(profilepic)
                .setAuthor({ name: String(member.user.tag), iconURL: profilepic })
                .setTimestamp()
                .setFooter({ text: String(client.user.tag), iconURL: client.user.displayAvatarURL() })
                .addFields(
                    {name: "Tag:", value: String(member.user.tag)},
                    {name: "UserID", value: String(member.user.id)},
                )
                .addFields(
                    {name: "User created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`, inline: true},
                    {name: "User created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields(
                    {name: "User joined timestamp", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`},
                    {name: "User joined", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`},
                )
            let cha = ""
            try { 
                if (client.settings.get(member.guild.id, "moderationChannel")) {cha = client.channels.cache.get(client.settings.get(member.guild.id, "moderationChannel"))} else {cha = member.guild.systemChannel} 
                cha.send({embeds: [userInfo]})
            } catch (err) {console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "OnGuildMemberAdd no channel:"+err.name)}
            
        }
	}
};