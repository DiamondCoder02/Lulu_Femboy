const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows some server informations!')
        .addSubcommand(subcommand => subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('server')
            .setDescription('Info about the server')),
    async execute(interaction, client, config) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            const profilepic = user.displayAvatarURL();
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Profile / User Informations')
                .setThumbnail(profilepic)
                .setDescription(`Here are some server information, \nrequested by: ${interaction.user.tag}`)
                .setAuthor({ name: user.tag, iconURL: profilepic })
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
                .addFields(
                    {name: "Username:", value: user.username, inline:true},
                    {name: "Tag:", value: user.tag, inline:true},
                )
                .addFields(
                    {name: "UserID:", value: String(user.id), inline:true},
                    {name: "CreatedAt", value: String(user.createdAt), inline:true},
                    {name: "Bot?", value: (user.bot ? "True" : "False")}
                )
            await interaction.reply({content: "Server Info", embeds: [embed]})
        } else if (interaction.options.getSubcommand() === 'server') {
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
                        .setEmoji('⬅️')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('si_right')
                        .setLabel('Right')
                        .setStyle('PRIMARY')
                        .setEmoji('➡️')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('delete')
                        .setLabel('Delete message')
                        .setStyle('DANGER')
                        .setEmoji('✖️')
                        .setDisabled(false),
                )
                const filter = i => i.customId === 'delete' && i.user.id === '748830668812845077';

                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
                
                collector.on('collect', async i => {
                    if (i.customId === 'delete') {
                        await interaction.deleteReply();
                    }
                });
                
                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            await interaction.reply({content: "Server Info", embeds: [embed], components: [page]})
        }
    }
}