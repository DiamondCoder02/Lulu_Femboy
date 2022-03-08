const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
let languagesFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'))
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const lanArray = languagesFiles.map(x => {return x.replace('.json',"\n")})
const eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
const comArray = commandFiles.map(x => {return x.replace('.js','\n')})
const config = require('../config.json');
module.exports = {
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription('Bot informations.'),
	async execute(interaction, client) {
		const version_embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle("Here's some information about the bot and it's development:")
        .setDescription(`**Bot done:** ...%`)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Idea list:", value: config.futureIdeas, inline:true},
            { name: "To fix / Bugs:", value: config.bugsToFix, inline:true},
            { name: "Command prefix:", value: "/[command_name]"},
            { name: "Languages:", value: ","+String(lanArray), inline:true},
            { name: "Event listeners:", value: ","+String(eventArray), inline:true},
            { name: "Commands:", value: ","+String(comArray), inline:true},
        )
        .setTimestamp()
        .setFooter({text: `Last update: 2022.March.08`});
        await interaction.reply({embeds: [version_embed]})
    }
}