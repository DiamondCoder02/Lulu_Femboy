const { SlashCommandBuilder } = require('@discordjs/builders'), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType } = require('discord.js'), fs = require('fs')
let languagesFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json')), lanArray = languagesFiles.map(x => {return x.replace('.json',"\n")})
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')), eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')), comArray = commandFiles.map(x => {return x.replace('.js','\n')})
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), td = lang.bot_info.tdf.split('-'), fi = lang.bot_info.fields.split('-')
const package = require('../package.json');
module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription(td[3]),
	async execute(interaction, client, config) {
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
~~GuildMessageReactions,~~
~~GuildMessageTyping,~~
GuildVoiceStates,
~~DirectMessages,~~
~~DirectMessageReactions,~~
~~DirectMessageTyping~~`
const pars = `Channel,
GuildMember,
GuildScheduledEvent,
Message,
~~Reaction,~~
User,
~~ThreadMember~~
`
        const page = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('delete').setLabel(lang.d).setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
		const version_embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle(td[0])
            .setDescription(td[1] + `https://github.com/DiamondPRO02/Femboi_OwO \nhttps://imgur.com/a/dStRp6Y`)
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .addFields(
                { name: fi[0], value: config.futureIdeas, inline:true},
                { name: fi[1], value: config.bugsToFix, inline:true},
                { name: fi[2], value: "/[command_name]"},
                { name: fi[3], value: ","+String(lanArray), inline:true},
                { name: fi[4], value: ","+String(eventArray), inline:true},
                { name: fi[5], value: ","+String(comArray), inline:true},
                { name: "Bot Stop Password:", value: "||RickRoll :3||", inline:true},
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
            )
            .setTimestamp()
            .setFooter({text: td[2]+` 2022.August.02`});
        await interaction.reply({embeds: [version_embed], components: [page]})
    }
}