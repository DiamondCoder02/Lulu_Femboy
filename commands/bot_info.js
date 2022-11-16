const { SlashCommandBuilder } = require('@discordjs/builders'), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType } = require('discord.js'), fs = require('fs')
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')), eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')), comArray = commandFiles.map(x => {return x.replace('.js','\n')})
const package = require('../package.json');
const config = require('../botConfigs/config.json');
const goodBad = require('../botConfigs/bot_private.json');
module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription("Bot information.")
        .addBooleanOption(option => option.setName('owner').setDescription('Warning: This can show potenially sensitive information.')),
	async execute(interaction, client) {
        const packDependence = Object.entries(package.dependencies)
        const npmPackages = packDependence.join(', \n')
const GaInBi = `MessageContent,
Guilds, 
GuildMembers, 
GuildBans, 
GuildEmojisAndStickers, 
GuildIntegrations, 
~~GuildWebhooks,~~
GuildInvites, 
GuildVoiceStates,
GuildPresences,
GuildMessages,
GuildScheduledEvents,
GuildMessageReactions,
~~GuildMessageTyping,~~
GuildVoiceStates,
DirectMessages,
DirectMessageReactions,
~~DirectMessageTyping~~`
const pars = `Channel,
GuildMember,
GuildScheduledEvent,
Message,
Reaction,
User,
~~ThreadMember~~
`
        let configList = []
        configOwner(config, configList)
        const guildLength = client.guilds.cache.map(guild => guild.id).length;
        const page = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('delete').setLabel("Delete message").setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
		const version_embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle("Here is some information about the bot and its development:")
            .setDescription(`Source code / Creator: [Github](https://github.com/DiamondPRO02/Femboi_OwO)`)
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .addFields(
                { name: "Roadmap of development", value: "[Github project](https://github.com/users/DiamondPRO02/projects/2/views/1)", inline:true},
                { name: "To fix/bugs:", value: "[Github issues](https://github.com/DiamondPRO02/Femboi_OwO/issues)", inline:true},
                { name: "How to use:", value: "[slash commands](https://imgur.com/a/dStRp6Y)"},
                { name: "Event listeners:", value: ","+String(eventArray), inline:true},
                { name: "Commands:", value: ","+String(comArray), inline:true},
                { name: "Bot Stop Password:", value: "||RickRoll :3||"},
                { name: "Project name:", value: package.name, inline:true},
                { name: "Project version:", value: package.version, inline:true},
                { name: "Project author:", value: package.author, inline:true},
                { name: "Project license:", value: package.license, inline:true},
                { name: "Project main file:", value: package.main, inline:true},
                { name: "Project description:", value: package.description},
                { name: "Project homepage:", value: package.homepage},
                { name: "__npm packages__", value: npmPackages, inline:true},
                { name: "__GatewayIntentBits__", value: GaInBi, inline:true},
                { name: "__Partials__", value: pars, inline:true},
                { name: "Current servers:", value: guildLength},
                { name: "I was called good:", value: "\'"+goodBad.goodBot+ "\' time(s)", inline:true},
                { name: "I was called bad:", value: "\'"+goodBad.badBot+ "\' time(s)", inline:true},
                { name: "People asked if:", value: "They can fuck my bot \'"+goodBad.badBot+ "\' time(s)", inline:true},
            )
            .setTimestamp()
            .setFooter({text: `Last update: 2022.Nov.09.`});
        await interaction.reply({embeds: [version_embed], components: [page]})
        //if bot owner, give more info
        require('dotenv').config(); var bOwnerId = process.env.botOwnerId;
        if(interaction.user.id === config.botOwnerId || interaction.user.id === bOwnerId) {
            const Guilds = client.guilds.cache.map(guild => guild.name).join(' / ');
            const owner_embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setDescription("Only bot owner should be able to see this:")
                .addFields(configList)
                .addFields({name: `(${String(guildLength)}) guild(s):`, value: Guilds})
            if (interaction.options.getBoolean('owner')) {
                await interaction.followUp({embeds: [owner_embed], components: [page]})
            } else {
                await interaction.followUp({embeds: [owner_embed], ephemeral: true})
            }
        }
    }
}
function configOwner(configIn, configOut) {
    var as = Object.entries(configIn)
    Array.from(as).forEach(obj => {
        if(obj[0] === 'Token') return;
        if(obj[0] === 'clientSecret') return;
        if(obj[0] === 'dbd_license') return;
        if(obj[0] === 'gotNewUpdate') return;
        let cmdObject = {
            name: obj[0],
            value: String(obj[1]),
            inline: true
        }
        configOut.push(cmdObject)
    })
}