const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
let languagesFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'))
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
module.exports = {
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription('Bot informations.'),
	async execute(interaction, client) {
        const lanArray = languagesFiles.map(x => {return x.replace('.json',' ');})
        const eventArray = eventFiles.map(x => {return x.replace('.js',' ');})
        const comArray = commandFiles.map(x => {return x.replace('.js',' ');})
		const version_embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle("Here's some information about the bot and it's development:")
        .setDescription(`**Bot done:** ...%`)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Command prefix:", value: "/[command_name]"},
            { name: "Idea list:", value: "To do", inline:true},
            { name: "To fix:", value: "To do", inline:true},
            { name: "Bugs:", value: "To do", inline:true},
            { name: "Language files", value: String(lanArray)},
            { name: "Event files", value: String(eventArray)},
            { name: "Command files", value: String(comArray)},
        )
        .setTimestamp()
        .setFooter({text: `Last update: 2022.March.08`});
        await interaction.reply({embeds: [version_embed]})
    }
}