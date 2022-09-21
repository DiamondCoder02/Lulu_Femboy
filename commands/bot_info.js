const { SlashCommandBuilder } = require('@discordjs/builders'), { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType } = require('discord.js'), fs = require('fs')
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')), eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')), comArray = commandFiles.map(x => {return x.replace('.js','\n')})
const package = require('../package.json');
module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription("Bot information."),
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
        const page = new ActionRowBuilder().addComponents( new ButtonBuilder().setCustomId('delete').setLabel("Delete message").setStyle(ButtonStyle.Danger).setEmoji('✖️'))
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
		const version_embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle("Here is some information about the bot and its development:")
            .setDescription(`Source code / Creator: https://github.com/DiamondPRO02/Femboi_OwO \nhttps://imgur.com/a/dStRp6Y`)
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .addFields(
                { name: "Idea list:", value: config.futureIdeas, inline:true},
                { name: "To fix/bugs:", value: config.bugsToFix, inline:true},
                { name: "Command prefix:", value: "/[command_name]"},
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
            )
            .setTimestamp()
            .setFooter({text: `Last update: 2022.Sept.21`});
        await interaction.reply({embeds: [version_embed], components: [page]})
    }
}