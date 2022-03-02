const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot with a password.'),
	async execute(interaction, client) {
		await interaction.reply({content: `Bot has been stopped by you (${interaction.user.tag})!!!`, ephemeral:true});
		console.log(`-------------------------\nThe bot has stopped!!!`)
		console.log(`Triggered: ${interaction.user.tag} in ${interaction.guild.name}, #${interaction.channel.name} at ${interaction.createdAt}\n-------------------------`)
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Bot stopped!')
			.setDescription(`Bot has been stopped by ${interaction.user.tag}`);
		await interaction.followUp({content: "Stopped!", embeds: [embed]})
		client.destroy()
	}
}