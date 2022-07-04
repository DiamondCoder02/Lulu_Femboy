const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), gmc = lang.guild_mem_create.split('-')
module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client, guildInvites) {
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
                    channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \nThe code \`${usedInvite.code}\` (Created by: \`${usedInvite.inviter.tag}\`) was just used by \`${member.user.tag}\`. \nInvites:${usedInvite.uses}/${usedInvite.maxUses}`});
                } else {
                    console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.username} joined without using an invite.`)
                    channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \n\`${member.user.username}\` joined without using an invite.`});
                }
            } catch (err) {
                console.log(`[${new Date().toLocaleString('hu-HU')}] `+ "OnGuildMemberAdd no channel:"+err.name)
                //console.log("OnGuildMemberAdd Error:", err)
            }
        }
        newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
        guildInvites.set(member.guild.id, cachedInvites);
        console.log(`[${new Date().toLocaleString('hu-HU')}] ${member.user.tag} has joined the guild: ${member.guild.name}`)
        if( client.settings.get(member.guild.id, "welcomeRole") ) {
            let ro = client.settings.get(member.guild.id, "welcomeRole");
            const role = member.guild.roles.cache.find(r => r.name == ro)
            member.roles.add(role);
        }
        if( client.settings.get(member.guild.id, "welcome") ) {
            const channel = member.guild.systemChannel
            if (channel === null) { console.log(`[${new Date().toLocaleString('hu-HU')}] ` + gmc[0] + member.guild.name) }
            else {
                let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
                const embed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
                    .setDescription("**"+welcomeMessage+"**" + "\n" + gmc[1] +'\n "/"'+ gmc[2] +'\n'+ gmc[3])
                    //.setThumbnail(member.user.displayAvatarURL())
                    .setFooter({ text: `Member count: ${member.guild.memberCount-1} => ${member.guild.memberCount}` })
                    .setTimestamp()
                channel.send({content: member.user.toString(),embeds: [embed]})
            }
        }
        if( client.settings.get(member.guild.id, "welcomeUserCheck") ) {
            console.log(member)
            const profilepic = member.displayAvatarURL();
            const userInfo = new MessageEmbed()
                .setColor('#00FF00')
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
            if (client.settings.get(member.guild.id, "moderationChannel")) {cha = client.channels.cache.get(client.settings.get(member.guild.id, "moderationChannel"))} else {cha = member.guild.systemChannel}
            cha.send({embeds: [userInfo]})
        }
	}
};