const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js'), fs = require('fs')
let languagesFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json')), lanArray = languagesFiles.map(x => {return x.replace('.json',"\n")})
let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')), eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')), comArray = commandFiles.map(x => {return x.replace('.js','\n')})
//const lanArray = languagesFiles.map(x => {return x.replace('.json',"\n")})
//const eventArray = eventFiles.map(x => {return x.replace('.js','\n')})
//const comArray = commandFiles.map(x => {return x.replace('.js','\n')})
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), td = lang.bot_info.tdf.split('-'), fi = lang.bot_info.fields.split('-')
module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
		.setName('bot_info')
		.setDescription(td[3]),
	async execute(interaction, client, config) {
		const version_embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle(td[0])
        .setDescription(`**`+td[1]+`** ...%`)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: fi[0], value: config.futureIdeas, inline:true},
            { name: fi[1], value: config.bugsToFix, inline:true},
            { name: fi[2], value: "/[command_name]"},
            { name: fi[3], value: ","+String(lanArray), inline:true},
            { name: fi[4], value: ","+String(eventArray), inline:true},
            { name: fi[5], value: ","+String(comArray), inline:true},
        )
        .setTimestamp()
        .setFooter({text: td[2]+` 2022.April.05`});
        await interaction.reply({embeds: [version_embed]})
    }
}