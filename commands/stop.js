const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), s = lang.stopSlash.split('-'), st = lang.stop.split('-')
module.exports = {
	permissions: "ADMINISTRATOR",
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription(s[0])
		.addStringOption(option => option.setName('password').setDescription(s[1]).setRequired(true)),
	async execute(interaction, client, config) {
		if (config.stopPassword === interaction.options.getString('password').trim()){
			console.log(`-------------------------\n` + st[0] + `\n` + st[1] +`: ` + interaction.user.tag 
				+ st[3] + interaction.guild.name+", #"+interaction.channel.name + st[4] + interaction.createdAt + `\n-------------------------`)
			const embed = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle(st[0])
				.setDescription(st[1] + interaction.user.tag)
			await interaction.reply({content: st[0], ephemeral: true})
			await interaction.followUp({embeds: [embed]})
			client.destroy()
		} else {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(st[5])
				.setDescription(st[2] + interaction.user.tag)
				await interaction.reply({content: st[2], ephemeral: true})
				await interaction.followUp({embeds: [embed]})
		}
	}
}