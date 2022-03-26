const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot with a password.')
		.addStringOption(option => option.setName('stoppassword').setDescription('Enter a password to stop the bot').setRequired(true)),
	async execute(interaction, client, config, lang) {
		let st = lang.stop.split('-')
		if (config.stopPassword === interaction.options.getString('stoppassword')){
			console.log(`-------------------------\nThe bot has stopped!!!`)
			console.log(`Triggered: ${interaction.user.tag} in ${interaction.guild.name}, #${interaction.channel.name} at ${interaction.createdAt}\n-------------------------`)
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
				.setTitle(st[2])
				.setDescription(st[3] + interaction.user.tag)
				await interaction.reply({content: st[2], ephemeral: true})
				await interaction.followUp({embeds: [embed]})
		}
	}
}