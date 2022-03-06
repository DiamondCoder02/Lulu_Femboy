const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'guildMemberAdd',
	execute(client, interaction, member) {
        console.log(interaction.guild.systemChannel)
        let channel = member.guild.channels.cache;
  
        let embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Welcome!')
        .addField(`Hello, welcome to chill <@${member.user.id}>!`)
        .setThumbnail(interaction.guild.iconURL())
      
        channel.find(898290588284223498).send(embed);
        
        channel.find(898290588284223498).reply({embeds: [embed]})


/*
        //MEMBER LOG
    // Get member log
    const memberLogId = client.db.settings.selectMemberLogId.pluck().get(member.guild.id);
    const memberLog = member.guild.channels.cache.get(memberLogId);
    if (
        memberLog &&
        memberLog.viewable &&
        memberLog.permissionsFor(member.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {
        const embed = new MessageEmbed()
        .setTitle('Member Joined')
        .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${member} (**${member.user.tag}**)`)
        .addField('Account created on', member.user.createdAt)
        .setTimestamp()
        .setColor(member.guild.me.displayHexColor);
        memberLog.send({embeds: [embed]});
    }

     //AUTO ROLE
    // Get auto role
    const autoRoleId = client.db.settings.selectAutoRoleId.pluck().get(member.guild.id);
    const autoRole = member.guild.roles.cache.get(autoRoleId);
    if (autoRole) {
        try {
            member.roles.add(autoRole);
        } catch (err) {
            console.log("Unable to assign auto role, please check the role hierarchy and ensure I have the Manage Roles permission")
        }
    }

     // WELCOME MESSAGES
    // Get welcome channel
    let { welcome_channel_id: welcomeChannelId, welcome_message: welcomeMessage } = 
        client.db.settings.selectWelcomes.get(member.guild.id);
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    // Send welcome message
    if (
        welcomeChannel &&
        welcomeChannel.viewable &&
        welcomeChannel.permissionsFor(member.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS']) &&
        welcomeMessage
    ) {
        welcomeMessage = welcomeMessage
        .replace(/`?\?member`?/g, member) // Member mention substitution
        .replace(/`?\?username`?/g, member.user.username) // Username substitution
        .replace(/`?\?tag`?/g, member.user.tag) // Tag substitution
        .replace(/`?\?size`?/g, member.guild.members.cache.size); // Guild size substitution
        welcomeChannel.send({embeds: [new MessageEmbed().setDescription(welcomeMessage).setColor(member.guild.me.displayHexColor)]});
    }*/
    }
}