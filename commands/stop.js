const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot with a password.')
		.addStringOption(option => option.setName('stoppassword').setDescription('Enter a password to stop the bot').setRequired(true)),
	async execute(interaction, client, config) {
		const channel = client.channels.cache.get(config.bot_status);
		//channel.bulkDelete(1, true).catch(error => {console.error(error)})
		if (config.stopPassword === interaction.options.getString('stoppassword')){
			console.log(`-------------------------\nThe bot has stopped!!!`)
			console.log(`Triggered: ${interaction.user.tag} in ${interaction.guild.name}, #${interaction.channel.name} at ${interaction.createdAt}\n-------------------------`)
			const embed = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Bot stopped!')
				.setDescription(`Bot has been stopped by ${interaction.user.tag}`);
			await interaction.reply({content: "Stopped!", embeds: [embed]})
			client.destroy()
		} else {
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Wrong password')
				.setDescription(`You gave a wrong password ${interaction.user.tag}.\n` + Date.now());
			await interaction.reply({embeds: [embed]})
		}
	}
}