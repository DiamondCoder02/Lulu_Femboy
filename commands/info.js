const { SlashCommandBuilder } = require('@discordjs/builders'), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, ChannelType } = require('discord.js');
module.exports = {
    guildOnly: true,
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Server and user informations!")
        .addStringOption(option => option.setName('search').setDescription("Info about a server, channel, user or debug server info")
            .addChoices(
                { name: 'user', value: 'user' },
                { name: 'text_channel', value: 'text' },
                { name: 'voice_channel', value: 'voice' },
                { name: 'server', value: 'server' },
                { name: 'server_cheatsheet', value: 'cheat' },
                //{ name: 'sticker', value: 'sticker' },
                //{ name: 'emoji', value: 'emoji' },
            )
            .setRequired(true))
        .addUserOption(option => option.setName('target').setDescription("Which user do you want info about")),
    async execute(interaction, client) {
        const page = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('delete').setLabel("Delete message").setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
        if (interaction.options.getString('search') === 'user') {
            if (!interaction.options.getUser('target')) {return await interaction.reply("Which user do you want info about?")}
            const user = interaction.options.getUser('target');
            const userMember = interaction.guild.members.cache.get(user.id);
            const roleOfMember = userMember.roles.cache.map((role) => role.toString()).join(', ');
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Profile / User Informations")
                .setImage(user.displayAvatarURL())
                .setDescription("Here are some user information, requested by: " + interaction.user.tag+`\n\n**Current Server Roles (${String(userMember.roles.cache.map(role => role.id).length)}) :**\n`+String(roleOfMember))
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .addFields(
                    {name: "Nickname:", value: userMember.nickname ? userMember.nickname : "-", inline: true},
                    {name: "Tag:", value: user.tag, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                    {name: "Bot?", value: (user.bot ? "True" : "False"), inline: true},
                    {name: "UserID:", value: String(user.id), inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields(
                    {name: "User created timestamp", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true},
                    {name: "User created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                    {name: "User joined timestamp", value: `<t:${Math.floor(userMember.joinedTimestamp / 1000)}:F>`, inline: true},
                    {name: "User joined", value: `<t:${Math.floor(userMember.joinedTimestamp / 1000)}:R>`, inline: true},
                )
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'text') {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Info about the text channel:")
                .setDescription("**#"+interaction.channel.name+"**\nTopic: **" + (interaction.channel.topic ? interaction.channel.topic : "-") + "**")
                .addFields(
                    {name: "Position:", value: String(interaction.channel.rawPosition+1), inline:true},
                    {name: "NSFW?", value: (interaction.channel.nsfw ? "True" : "False"), inline:true},
                    {name: "ID:", value: interaction.channel.id, inline:true},
                    {name: "Type:", value: String(interaction.channel.type), inline:true},
                    {name: "RateLimit:", value: interaction.channel.topic ? interaction.channel.topic : "0" +" seconds", inline:true},
                )
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'voice') {
            if(!interaction.member.voice.channel) return interaction.reply("Please connect to a voice channel!");
            //console.log(interaction.member.voice.channel)
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Info about the voice channel:")
                .setDescription("**"+interaction.member.voice.channel.name+"**\nTopic: **" + (interaction.member.voice.channel.topic ? interaction.member.voice.channel.topic : "-") + "**")
                .addFields(
                    {name: "Position:", value: String(interaction.member.voice.channel.rawPosition+1), inline:true},
                    {name: "ID:", value: String(interaction.member.voice.channel.id), inline:true},
                    {name: "Type:", value: String(interaction.member.voice.channel.type), inline:true},
                    {name: "Bitrate:", value: String(interaction.member.voice.channel.bitrate/100)+"kbps", inline:true},
                    {name: "UserLimit:", value: String(interaction.member.voice.channel.userLimit) + " members", inline:true},
                    {name: "rtcRegion:", value: interaction.member.voice.channel.rtcRegion ? interaction.member.voice.channel.rtcRegion : "Automatic", inline:true},
                    {name: "VideoQuality:", value: interaction.member.voice.channel.videoQualityMode ? (interaction.member.voice.channel.videoQualityMode===2 ? "720p": "Automatic" ) : "Automatic" , inline:true},
                )
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'server') {
            const serverRoles = interaction.guild.roles.cache.map((role) => role.toString()).join(', ');
            const botUser = client.user
            const owner = await interaction.guild.fetchOwner(); 
            const afktime = String(interaction.guild.afkTimeout / 60)
            const servertime = new Date(interaction.guild.createdTimestamp).toLocaleString();
            const botservertime = new Date(interaction.guild.joinedTimestamp).toLocaleString();
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Server Informations")
                .setImage(interaction.guild.iconURL())
                .setDescription( String(interaction.guild.roles.cache.map(role => role.id).length) + " roles:\n" + String(serverRoles) )
                .setTimestamp()
                .setFooter({ text: "Server info, requested by: " + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .addFields( 
                    { name: "Guild name and acronym:", value: interaction.guild.name + `\n(${interaction.guild.nameAcronym})`, inline:true },
                    { name: "Server owner:", value: String(owner.user.tag), inline:true },
                    { name: "Server capacity:", value: `${interaction.guild.memberCount} / ` + interaction.guild.maximumMembers, inline:true },
                    { name: "Guild Created:", value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, inline:true },
                    { name: "Server ID:", value: String(interaction.guild.id), inline:true },
                    { name: "Guild description:", value: String(interaction.guild.description) },
                    { name: "Premium count and tier:", value: `${interaction.guild.premiumSubscriptionCount} / ` + String(interaction.guild.premiumTier), inline:true },
                    { name: "Is premium progress bar on?", value: (interaction.guild.premiumProgressBarEnabled ? "True" : "False"), inline:true },
                    { name: "Guild created at:", value: servertime },
                    { name: 'Bot:', value: botUser.toString(), inline:true },
                    { name: "Bot joined at:", value: botservertime, inline:true },
                    { name: '\u200B', value: '\u200B', inline:true },
                    { name: "Update channel:", value: String(interaction.guild.publicUpdatesChannel), inline:true },
                    { name: "Rules channel:", value: String(interaction.guild.rulesChannel), inline:true },
                    { name: "System channel:", value: `${interaction.guild.systemChannel}`, inline:true },
                    { name: "Afk voice channel:", value: String(interaction.guild.afkChannel), inline:true },
                    { name: "Afk timeout (min):", value: afktime, inline:true },
                    { name: "Explicit content filter level:", value: `${interaction.guild.explicitContentFilter}`, inline:true },
                    { name: "Mfa and nsfw level:", value: `${interaction.guild.mfaLevel} / ` + String(interaction.guild.nsfwLevel), inline:true },
                    { name: "Guild required verification level:", value: String(interaction.guild.verificationLevel), inline:true },
                    { name: "Preferred server locale:", value: String(interaction.guild.preferredLocale), inline:true },
                    { name: "Is guild verified?", value: (interaction.guild.verified ? "True" : "False"), inline:true },
                    { name: "Is guild partnered?", value: (interaction.guild.partnered ? "True" : "False"), inline:true },
                )
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getString('search') === 'cheat') {
            //if (posts.first.tags.join(', ').length > 1000) {embed.addFields( { name: "📄"+"Tags: ", valve: "`"+posts.first.tags.join(', ').substring(0,999)+"...`" } )} else {embed.addFields( { name: "📄"+"Tags: ", value: "`"+posts.first.tags.join(', ')+"`" } )}            
            const serverRoles = interaction.guild.roles.cache.map(role => role.name).join(', @');
            const sSticker = interaction.guild.stickers.cache.map(sticker => sticker.name).join(', ');
            const serverStickers = sSticker.split(', ').sort().join(' // ')
            const sEmoji = interaction.guild.emojis.cache.map(emoji => emoji.name).join(', ');
            const serverEmojis = sEmoji.split(', ').sort().join(' // ')
            const embedtest1 = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Cheatsheet that will never be translated")
                .setDescription(`(Max25 field per embed) 1/?`)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .addFields(
                    { name: '01 afkChannel(VoiceChannel)', value: String(interaction.guild.afkChannel), inline:true },
                    { name: '02 afkTimeout(number)', value: String(interaction.guild.afkTimeout), inline:true },
                    { name: '03 available(boolean)', value: (interaction.guild.available ? "True" : "False"), inline:true },
                    { name: '04 createdAt(date)', value: String(interaction.guild.createdAt), inline:true },
                    { name: '05 createdTimestamp(number)', value: String(interaction.guild.createdTimestamp), inline:true },
                    { name: '06 description', value: String(interaction.guild.description), inline:true },
                    { name: '07 explicitContentFilter(explicitContentFilterLevel)', value: String(interaction.guild.explicitContentFilter), inline:true },
                    { name: '08 features (array)', value: String(interaction.guild.features), inline:true },
                    { name: '09 id(snowflake)', value: String(interaction.guild.id), inline:true },
                    { name: '10 joinedAt(date)[The time the client user joined guild]', value: String(interaction.guild.joinedAt), inline:true },
                    { name: '11 joinedTimestamp(number)[The stamp the client user joined guild]', value: String(interaction.guild.joinedTimestamp), inline:true },
                    { name: '12 large(boolean)', value: (interaction.guild.large ? "True" : "False"), inline:true },
                    { name: '13 maximumBitrate(number)', value: String(interaction.guild.maximumBitrate), inline:true },
                    { name: '14 maximumMembers(number)', value: String(interaction.guild.maximumMembers), inline:true },
                    { name: '15 [Bot, not debug]', value: client.user.toString(), inline:true },
                    { name: '16 memberCount(number)', value: String(interaction.guild.memberCount), inline:true },
                    { name: '17 mfaLevel(MFALevel)', value: String(interaction.guild.mfaLevel), inline:true },
                    { name: '18 name', value: interaction.guild.name, inline:true },
                    { name: '19 nameAcronym()', value: interaction.guild.nameAcronym, inline:true },
                    { name: '20 nsfwLevel(NSFWLevel)', value: String(interaction.guild.nsfwLevel), inline:true },
                    { name: '21 partnered(boolean)', value: (interaction.guild.partnered ? "True" : "False"), inline:true },
                    { name: '22 preferredLocale', value: String(interaction.guild.preferredLocale), inline:true },
                    { name: "23 PremiumProgressBarEnabled(boolean)", value: (interaction.guild.premiumProgressBarEnabled ? "True" : "False"), inline:true },
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
                    { name: '42 Verified(boolean)', value: (interaction.guild.verified ? "True" : "False"), inline:true },
                    { name: '43 VoiceAdapterCreator(Function)', value: String(interaction.guild.voiceAdapterCreator), inline:true },
                    { name: '44 VoiceStates(VoiceStateManager)', value: String(interaction.guild.voiceStates), inline:true },
                    { name: '45 WidgetChannel(TextChannel)', value: String(interaction.guild.widgetChannel), inline:true },
                    { name: '46 WidgetChannelId', value: String(interaction.guild.widgetChannelId), inline:true },
                    { name: '47 WidgetEnabled(boolean)', value: (interaction.guild.widgetEnabled ? "True" : "False"), inline:true },
                    { name: '-- OwnerId(snowflake)', value: String(interaction.guild.ownerId), inline:true },
                    { name: '-- Invites(GuildInviteManager)', value: String(interaction.guild.invites), inline:true },
                    { name: "Stickers name:", value: String(serverStickers) },
                )
            const embedtest3 = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Cheatsheet that will never be translated")
                .setDescription(`(Max25 field per embed) 3/? \n\n**Roles:**\n` + String(serverRoles))
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .addFields(
                    { name: "Emoji names:", value: String(serverEmojis) },
                )
            await interaction.reply({content: "Here's all the debug info", embeds: [embedtest1, embedtest2, embedtest3], components: [page]})
        } else if (interaction.options.getString('search') === 'sticker') {
            console.log(interaction.guild)
            const sSticker = interaction.guild.stickers.cache.map(sticker => sticker.name).join(', ');
            const serverStickers = sSticker.split(', ').sort().join(', ');
            console.log(serverStickers)
            const sStickers = interaction.guild.stickers.cache
            console.log(sStickers)
        } else if (interaction.options.getString('search') === 'emoji') {
            console.log(interaction.guild)
            const sEmoji = interaction.guild.emojis.cache.map(emoji => emoji.name).join(', ');
            const serverEmojis = sEmoji.split(', ').sort()
            console.log(serverEmojis)
            const sEmojis = interaction.guild.emojis.cache
            console.log(sEmojis)
        }
    }
}