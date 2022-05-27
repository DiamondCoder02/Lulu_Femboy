const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), gmc = lang.guild_mem_create.split('-')
module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client, guildInvites) {
        const cachedInvites = guildInvites.get(member.guild.id)
        const newInvites = await member.guild.invites.fetch();
        try {
            const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code) < inv.uses);
            //console.log("Cached", [...cachedInvites.keys()])
            //console.log("New", [...newInvites.values()].map(inv => inv.code))
            //console.log("Used", usedInvite)
            if (client.settings.get(member.guild.id, "moderationChannel")) {channel = client.channels.cache.get(client.settings.get(member.guild.id, "moderationChannel"))} else {channel = invite.guild.systemChannel}
            if (usedInvite) {
                console.log(`Code ${usedInvite.code} (Created: ${usedInvite.inviter.tag}) used by ${member.user.username} (${usedInvite.uses}/${usedInvite.maxUses})`)
                channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \nThe code \`${usedInvite.code}\` (Created by: \`${usedInvite.inviter.tag}\`) was just used by \`${member.user.username}\`. Invites:${usedInvite.uses}/${usedInvite.maxUses}`});
            } else {
                console.log(`${member.user.username} joined without using a one time invite.`)
                channel.send({ content: `[\`${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}\`] \n\`${member.user.username}\` joined without using a one time invite.`});
            }
        } catch (err) {
            console.log("OnGuildMemberAdd no channel:"+err.name)
            //console.log("OnGuildMemberAdd Error:", err)
        }
        newInvites.each(inv => cachedInvites.set(inv.code, inv.uses));
        guildInvites.set(member.guild.id, cachedInvites);
        console.log(`[${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}] ${member.user.tag} has joined the guild: ${member.guild.name}`)
        if(client.settings.get(member.guild.id, "welcomeRole")) {
            let ro = client.settings.get(member.guild.id, "welcomeRole");
            console.log(ro)
            const role = member.guild.roles.cache.find(r => r.name == ro)
            console.log(role)
            //console.log(member)
            member.roles.add(role);
            console.log('Yay')
        }
        let welcome = client.settings.get(member.guild.id, "welcome");
        if(welcome) {} else return
        const channel = member.guild.systemChannel
        if (channel === null) {return console.log(gmc[0] + member.guild.name)}
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
};