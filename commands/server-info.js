const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
	    .setName('server-info')
	    .setDescription('Shows some server informations!'),
    async execute(interaction, client, config) {
        const owner = await interaction.guild.fetchOwner(); 
        //console.log(interaction.guild)
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Server Informations')
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(`Here are some server information, \nrequested by: ${interaction.user.tag}`)
            .setURL('https://discord.gg/CCXgVGTnSh')
            .setAuthor({ name: 'Femboy_OwO: ', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096', url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
            .setTimestamp()
            .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
            .addFields(
                {name: 'guild name:', value: `${interaction.guild.name} / ${interaction.guild.nameAcronym}`, inline:true},
                {name: 'guild member count:', value: String(interaction.guild.memberCount), inline:true},
                {name: '\u200B', value: '\u200B', inline:true},
                {name: 'guild owner:', value: owner.user.tag, inline:true},
                {name: 'guild creation date:', value: String(interaction.guild.createdAt), inline:true},
                {name: 'guild local:', value: String(interaction.guild.prefferedLocale), inline:true},
            )
            .addField(`Bot name and join date:`, `${interaction.guild.me} \n ${interaction.guild.joinedAt}`)
            .addField('\u200B', '\u200B')
            .addFields(
                {name: "Premium count:", value: String(interaction.guild.premiumSubcriptionCount), inline:true},
                {name: "Premium Tier:", value: String(interaction.guild.premiumTier), inline:true},
                {name: '\u200B', value: '\u200B', inline:true},
            )
            .addFields(
                {name: "Is guild available? ", value: (interaction.guild.available ? 'True' : 'False'), inline:true},
                {name: `System channel?`, value: String(interaction.guild.systemChannel), inline:true},
                {name: '\u200B', value: '\u200B', inline:true},
                {name: "MFA level:", value: String(interaction.guild.mfaLevel), inline:true},
                {name: "Content filter", value: String(interaction.guild.explicitContentFilter), inline:true},
                {name: "Partnered", value: (interaction.guild.partnered ? 'true' : 'false')},
            )
        const page = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('si_left')
					.setLabel('Left')
					.setStyle('SECONDARY')
                    .setEmoji('⬅️'),
                new MessageButton()
					.setCustomId('si_right')
					.setLabel('Right')
					.setStyle('PRIMARY')
                    .setEmoji('➡️'),
				new MessageButton()
					.setCustomId('delete')
					.setLabel('Delete message')
					.setStyle('DANGER')
                    .setEmoji('✖️'),
            )
        await interaction.reply({content: "Server Info", embeds: [embed], components: [page]})
    }
}