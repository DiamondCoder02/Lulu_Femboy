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
            .setDescription('Info about the server'))
        .addSubcommand(subcommand => subcommand
                .setName('server_cheat')
                .setDescription('Cheatsheet about the server infos')),
    //Execution
    async execute(interaction, client, config) {
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
            )
        const filter = i => i.customId === 'delete';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'delete') {
                await interaction.deleteReply();
            }
        });
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        //User, server, cheatsheet
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
            await interaction.reply({content: "Server Info", embeds: [embed], components: [page]})
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
                    {name: "Premium Progress Bar?", value: (interaction.guild.premiumProgressBarEnabled ? 'true' : 'false'), inline:true},
                )
                .addFields(
                    {name: "Is guild available? ", value: (interaction.guild.available ? 'True' : 'False'), inline:true},
                    {name: `System channel?`, value: String(interaction.guild.systemChannel), inline:true},
                    {name: '\u200B', value: '\u200B', inline:true},
                    {name: "MFA level:", value: String(interaction.guild.mfaLevel), inline:true},
                    {name: "Content filter", value: String(interaction.guild.explicitContentFilter), inline:true},
                    {name: "Partnered", value: (interaction.guild.partnered ? 'true' : 'false')},
                )
            await interaction.reply({content: "Server Info", embeds: [embed], components: [page]})
        } else if (interaction.options.getSubcommand() === 'server_cheat') {
            const embedtest1 = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Server Informations Cheatsheets')
                .setDescription(`(Max25 field per embed) 1/?`)
                .addField('01 afkChannel(VoiceChannel)', String(interaction.guild.afkChannel), true)
                .addField('02 afkTimeout(number)',  String(interaction.guild.afkTimeout), true)
                .addField('03 available(boolean)',  (interaction.guild.available ? 'True' : 'False'), true)
                .addField('04 createdAt(date)',  String(interaction.guild.createdAt), true)
                .addField('05 createdTimestamp(number)',  String(interaction.guild.createdTimestamp), true)
                .addField('06 description',  String(interaction.guild.description), true)
                .addField('07 explicitContentFilter(explicitContentFilterLevel)', String(interaction.guild.explicitContentFilter), true)
                .addField('08 features (array)',  String(interaction.guild.features), true)
                .addField('09 id(snowflake)',  String(interaction.guild.id), true)
                .addField('10 joinedAt(date)[The time the client user joined guild]',  String(interaction.guild.joinedAt), true)
                .addField('11 joinedTimestamp(number)[The stamp the client user joined guild]',  String(interaction.guild.joinedTimestamp), true)
                .addField('12 large(boolean)',  (interaction.guild.large ? 'True' : 'False'), true)
                .addField('13 maximumBitrate(number)',  String(interaction.guild.maximumBitrate), true)
                .addField('14 maximumMembers(number)',  String(interaction.guild.maximumMembers), true)
                .addField('15 me(GuildMember)[The client user as a GuildMember of this guild]',  String(interaction.guild.me), true)
                .addField('16 memberCount(number)',  String(interaction.guild.memberCount), true)
                .addField('17 mfaLevel(MFALevel)',  String(interaction.guild.mfaLevel), true)
                .addField('18 name',  interaction.guild.name, true)
                .addField('19 nameAcronym()',  interaction.guild.nameAcronym, true)
                .addField('20 nsfwLevel(NSFWLevel)',  String(interaction.guild.nsfwLevel), true)
                .addField('21 partnered(boolean)',  (interaction.guild.partnered ? 'True' : 'False'), true)
                .addField('22 preferredLocale',  String(interaction.guild.preferredLocale), true)
                .addField("23 PremiumProgressBarEnabled(boolean)",  (interaction.guild.premiumProgressBarEnabled ? 'true' : 'false'), true)
                .addField("24 PremiumSubscriptionCount(number)",  String(interaction.guild.premiumSubscriptionCount), true)
                .addField("25 PremiumTier(PremiumTier)",  String(interaction.guild.premiumTier), true)
            const embedtest2 = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Server Informations Cheatsheets')
                .setDescription(`(Max25 field per embed) 2/?`)
                .addField('26 Presences(PresenceManager)', String(interaction.guild.presences), true)
                .addField('27 PublicUpdatesChannel(TextChannel)', String(interaction.guild.publicUpdatesChannel), true)
                .addField('28 PublicUpdatesChannelId(snowflake)', String(interaction.guild.publicUpdatesChannelId), true)
                .addField('29 Roles(RoleManager)', String(interaction.guild.roles), true)
                .addField('30 RulesChannel(TextChannel)', String(interaction.guild.rulesChannel), true)
                .addField('31 ScheduledEvents(GuildScheduledEventManager)', String(interaction.guild.scheduledEvents), true)
                .addField('32 Shard(WebSocketShard)', String(interaction.guild.shard), true)
                .addField('33 ShardId(number)', String(interaction.guild.shardId), true)
                .addField('34 Splash', String(interaction.guild.splash), true)
                .addField('35 StageInstances(StageInstanceManager)', String(interaction.guild.stageInstances), true)
                .addField('36 Stickers(GuildStickerManager)', String(interaction.guild.stickers), true)
                .addField('37 SystemChannel(TextChannel)', String(interaction.guild.systemChannel), true)
                .addField('38 SystemChannelFlags(Type: Readonly<SystemChannelFlags>)', String(interaction.guild.systemChannelFlags), true)
                .addField('39 SystemChannelId(snowflake)', String(interaction.guild.systemChannelId), true)
                .addField('40 VanityURLCode', String(interaction.guild.vanityURLCode), true)
                .addField('41 VerificationLevel(VerificationLevel)', String(interaction.guild.verificationLevel), true)
                .addField('42 Verified(boolean)', (interaction.guild.verified ? 'true' : 'false'), true)
                .addField('43 VoiceAdapterCreator(Function)', String(interaction.guild.voiceAdapterCreator), true)
                .addField('44 VoiceStates(VoiceStateManager)', String(interaction.guild.voiceStates), true)
                .addField('45 WidgetChannel(TextChannel)', String(interaction.guild.widgetChannel), true)
                .addField('46 WidgetChannelId', String(interaction.guild.widgetChannelId), true)
                .addField('47 WidgetEnabled(boolean)', (interaction.guild.widgetEnabled ? 'true' : 'false'), true)
                .addField('-- OwnerId(snowflake)', String(interaction.guild.ownerId), true)
                .addField('-- Invites(GuildInviteManager)', String(interaction.guild.invites), true)
            await interaction.reply({content: "Server Cheat Info", embeds: [embedtest1, embedtest2], components: [page]})
        }
    }
}