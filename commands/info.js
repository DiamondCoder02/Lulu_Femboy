const { SlashCommandBuilder } = require('@discordjs/builders'), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const sl = lang.info.slash.split('-'), us = lang.info.user.split('-'), s1 = lang.info.server1.split('-'), s2 = lang.info.server2.split('-'), c1 = lang.music.command.split('-')
module.exports = {
    guildOnly: true,
    cooldown: 10,
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription(sl[0])
        .addStringOption(option => option.setName('search').setDescription(sl[1])
            .addChoices(
                { name: 'user', value: 'user' },
                { name: 'text_channel', value: 'text' },
                { name: 'voice_channel', value: 'voice' },
                { name: 'server', value: 'server' },
                { name: 'server_cheatsheet', value: 'cheat' },
            )
            .setRequired(true))
        .addUserOption(option => option.setName('target').setDescription(sl[2])),
    async execute(interaction, client) {
        const page = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('delete').setLabel(lang.d).setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter, time: 20000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
        //User, server, cheatsheet
        if (interaction.options.getString('search') === 'user') {
            if (!interaction.options.getUser('target')) {return await interaction.reply(sl[2]+"?")}
            const user = interaction.options.getUser('target');
            /*
            const tes = client.users.cache.find(u => u.id === user.id)
            console.log(tes)
            console.log(user.joinedTimestamp)
            console.log(user.joinedAt)
            console.log(tes.joinedTimestamp)
            console.log(tes.joinedAt)
            */
            const profilepic = user.displayAvatarURL();
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle(us[0])
                .setThumbnail(profilepic)
                .setDescription(us[1] + interaction.user.tag)
                .setAuthor({ name: user.tag, iconURL: profilepic })
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .addFields(
                    {name: us[2], value: user.username, inline: true},
                    {name: "Tag:", value: user.tag, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields(
                    {name: "Bot?", value: (user.bot ? lang.t : lang.f), inline: true},
                    {name: us[5], value: String(user.id), inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields(
                    {name: "User created timestamp", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true},
                    {name: "User created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                /*
                .addFields(
                    {name: "User joined timestamp", value: `<t:${new Date(user.joinedTimestamp).toLocaleString('hu-HU')}:F>`, inline: true},
                    {name: "User joined", value: `<t:${new Date(user.joinedTimestamp).toLocaleString('hu-HU')}:R>`, inline: true},
                )
                */
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'text') {
            console.log(interaction.channel)
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Info about the channel:")
                .setDescription("**#"+interaction.channel.name+"**\nTopic: **" + (interaction.channel.topic ? interaction.channel.topic : "-") + "**")
                .addFields(
                    {name: "Position:", value: String(interaction.channel.rawPosition+1), inline:true},
                    {name: "NSFW?", value: (interaction.channel.nsfw ? lang.t : lang.f), inline:true},
                    {name: "ID:", value: interaction.channel.id, inline:true},
                    {name: "RateLimit:", value: interaction.channel.topic ? interaction.channel.topic : "0" +" seconds", inline:true},
                )
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'voice') {
            if(!interaction.member.voice.channel) return interaction.reply(c1[0]);
            console.log(interaction.member.voice.channel)
            if (interaction.member.voice.channel.userLimit === 0) { ul = "10000" } else { ul = interaction.member.voice.channel.userLimit }
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Info about the channel:")
                .setDescription("**"+interaction.member.voice.channel.name+"**\nTopic: **" + (interaction.member.voice.channel.topic ? interaction.member.voice.channel.topic : "-") + "**")
                .addFields(
                    {name: "Position:", value: String(interaction.member.voice.channel.rawPosition+1), inline:true},
                    {name: "ID:", value: interaction.member.voice.channel.id, inline:true},
                    {name: "Type:", value: interaction.member.voice.channel.type, inline:true},
                    {name: "Bitrate:", value: String(interaction.member.voice.channel.bitrate%100)+"kbps", inline:true},
                    {name: "UserLimit:", value: String(interaction.member.voice.channel.userLimit) + " members", inline:true},
                    {name: "rtcRegion:", value: interaction.member.voice.channel.rtcRegion ? interaction.member.voice.channel.rtcRegion : "Automatic", inline:true},
                )
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'server') {
            const owner = await interaction.guild.fetchOwner(); 
            const afktime = String(interaction.guild.afkTimeout / 60)
            const servertime = new Date(interaction.guild.createdTimestamp).toLocaleString();
            const botservertime = new Date(interaction.guild.joinedTimestamp).toLocaleString();
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle(s1[0])
                .setThumbnail(interaction.guild.iconURL())
                .setDescription( s1[1] + interaction.user.tag)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .addFields( 
                    { name: s1[2], value: interaction.guild.name + `\n(${interaction.guild.nameAcronym})`, inline:true },
                    { name: s1[3], value: String(owner.user.tag), inline:true },
                    { name: s1[4], value: `${interaction.guild.memberCount} / ` + interaction.guild.maximumMembers, inline:true },
                    { name: s1[5], value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, inline:true },
                    { name: s1[6], value: (interaction.guild.large ? lang.t : lang.f), inline:true },
                    { name: s1[7], value: String(interaction.guild.id), inline:true },
                    { name: s1[8], value: String(interaction.guild.description) },
                    { name: s1[9], value: `${interaction.guild.premiumSubscriptionCount} / ` + String(interaction.guild.premiumTier), inline:true },
                    { name: s1[10], value: (interaction.guild.premiumProgressBarEnabled ? lang.t : lang.f), inline:true },
                    { name: s1[11], value: servertime },
                    { name: 'Bot:', value: String(interaction.guild.me), inline:true },
                    { name: s1[12], value: botservertime, inline:true },
                    { name: '\u200B', value: '\u200B', inline:true },
                    { name: s2[0], value: String(interaction.guild.publicUpdatesChannel), inline:true },
                    { name: s2[1], value: String(interaction.guild.rulesChannel), inline:true },
                    { name: s2[2], value: `${interaction.guild.systemChannel}`, inline:true },
                    { name: s2[3], value: String(interaction.guild.afkChannel), inline:true },
                    { name: s2[4], value: `${interaction.guild.maximumBitrate}`, inline:true },
                    { name: s2[5], value: afktime, inline:true },
                    { name: s2[6], value: `${interaction.guild.explicitContentFilter}`, inline:true },
                    { name: s2[7], value: `${interaction.guild.mfaLevel} / ` + String(interaction.guild.nsfwLevel), inline:true },
                    { name: s2[8], value: String(interaction.guild.verificationLevel), inline:true },
                    { name: s2[9], value: String(interaction.guild.preferredLocale), inline:true },
                    { name: s2[10], value: (interaction.guild.verified ? lang.t : lang.f), inline:true },
                    { name: s2[11], value: (interaction.guild.partnered ? lang.t : lang.f), inline:true }
                )
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'cheat') {
            const embedtest1 = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Cheatsheet that will never be translated")
                .setDescription(`(Max25 field per embed) 1/?`)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .addFields(
                    { name: '01 afkChannel(VoiceChannel)', value: String(interaction.guild.afkChannel), inline:true },
                    { name: '02 afkTimeout(number)', value: String(interaction.guild.afkTimeout), inline:true },
                    { name: '03 available(boolean)', value: (interaction.guild.available ? lang.t : lang.f), inline:true },
                    { name: '04 createdAt(date)', value: String(interaction.guild.createdAt), inline:true },
                    { name: '05 createdTimestamp(number)', value: String(interaction.guild.createdTimestamp), inline:true },
                    { name: '06 description', value: String(interaction.guild.description), inline:true },
                    { name: '07 explicitContentFilter(explicitContentFilterLevel)', value: String(interaction.guild.explicitContentFilter), inline:true },
                    { name: '08 features (array)', value: String(interaction.guild.features), inline:true },
                    { name: '09 id(snowflake)', value: String(interaction.guild.id), inline:true },
                    { name: '10 joinedAt(date)[The time the client user joined guild]', value: String(interaction.guild.joinedAt), inline:true },
                    { name: '11 joinedTimestamp(number)[The stamp the client user joined guild]', value: String(interaction.guild.joinedTimestamp), inline:true },
                    { name: '12 large(boolean)', value: (interaction.guild.large ? lang.t : lang.f), inline:true },
                    { name: '13 maximumBitrate(number)', value: String(interaction.guild.maximumBitrate), inline:true },
                    { name: '14 maximumMembers(number)', value: String(interaction.guild.maximumMembers), inline:true },
                    { name: '15 me(GuildMember)[The client user as a GuildMember of this guild]', value: String(interaction.guild.me), inline:true },
                    { name: '16 memberCount(number)', value: String(interaction.guild.memberCount), inline:true },
                    { name: '17 mfaLevel(MFALevel)', value: String(interaction.guild.mfaLevel), inline:true },
                    { name: '18 name', value: interaction.guild.name, inline:true },
                    { name: '19 nameAcronym()', value: interaction.guild.nameAcronym, inline:true },
                    { name: '20 nsfwLevel(NSFWLevel)', value: String(interaction.guild.nsfwLevel), inline:true },
                    { name: '21 partnered(boolean)', value: (interaction.guild.partnered ? lang.t : lang.f), inline:true },
                    { name: '22 preferredLocale', value: String(interaction.guild.preferredLocale), inline:true },
                    { name: "23 PremiumProgressBarEnabled(boolean)", value: (interaction.guild.premiumProgressBarEnabled ? lang.t : lang.f), inline:true },
                    { name: "24 PremiumSubscriptionCount(number)", value: String(interaction.guild.premiumSubscriptionCount), inline:true },
                    { name: "25 PremiumTier(PremiumTier)", value: String(interaction.guild.premiumTier), inline:true }
                )
            const embedtest2 = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Cheatsheet that will never be translated")
                .setDescription(`(Max25 field per embed) 2/?`)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .addFields(
                    { name: '26 Presences(PresenceManager)', value: String(interaction.guild.presences), inline:true },
                    { name: '27 PublicUpdatesChannel(TextChannel)', value: String(interaction.guild.publicUpdatesChannel), inline:true },
                    { name: '28 PublicUpdatesChannelId(snowflake)', value: String(interaction.guild.publicUpdatesChannelId), inline:true },
                    { name: '29 Roles(RoleManager)', value: String(interaction.guild.roles), inline:true },
                    { name: '30 RulesChannel(TextChannel)', value: String(interaction.guild.rulesChannel), inline:true },
                    { name: '31 ScheduledEvents(GuildScheduledEventManager)', value: String(interaction.guild.scheduledEvents), inline:true },
                    { name: '32 Shard(WebSocketShard)', value: String(interaction.guild.shard), inline:true },
                    { name: '33 ShardId(number)', value: String(interaction.guild.shardId), inline:true },
                    { name: '34 Splash', value: String(interaction.guild.splash), inline:true },
                    { name: '35 StageInstances(StageInstanceManager)', value: String(interaction.guild.stageInstances), inline:true },
                    { name: '36 Stickers(GuildStickerManager)', value: String(interaction.guild.stickers), inline:true },
                    { name: '37 SystemChannel(TextChannel)', value: String(interaction.guild.systemChannel), inline:true },
                    { name: '38 SystemChannelFlags(Type: Readonly<SystemChannelFlags>)', value: String(interaction.guild.systemChannelFlags), inline:true },
                    { name: '39 SystemChannelId(snowflake)', value: String(interaction.guild.systemChannelId), inline:true },
                    { name: '40 VanityURLCode', value: String(interaction.guild.vanityURLCode), inline:true },
                    { name: '41 VerificationLevel(VerificationLevel)', value: String(interaction.guild.verificationLevel), inline:true },
                    { name: '42 Verified(boolean)', value: (interaction.guild.verified ? lang.t : lang.f), inline:true },
                    { name: '43 VoiceAdapterCreator(Function)', value: String(interaction.guild.voiceAdapterCreator), inline:true },
                    { name: '44 VoiceStates(VoiceStateManager)', value: String(interaction.guild.voiceStates), inline:true },
                    { name: '45 WidgetChannel(TextChannel)', value: String(interaction.guild.widgetChannel), inline:true },
                    { name: '46 WidgetChannelId', value: String(interaction.guild.widgetChannelId), inline:true },
                    { name: '47 WidgetEnabled(boolean)', value: (interaction.guild.widgetEnabled ? lang.t : lang.f), inline:true },
                    { name: '-- OwnerId(snowflake)', value: String(interaction.guild.ownerId), inline:true },
                    { name: '-- Invites(GuildInviteManager)', value: String(interaction.guild.invites), inline:true }
                )
            await interaction.reply({content: sl[4], embeds: [embedtest1, embedtest2], components: [page]})
        }
    }
}