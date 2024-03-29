const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, PermissionsBitField } = require('discord.js');
require('dotenv').config(); var b_o_Id = process.env.botOwnerId; var stopPassword = process.env.stopPassword;
module.exports = {
	permissions: PermissionsBitField.Flags.Administrator,
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription("Stops the bot with a password.")
		.addStringOption(option => option.setName('password').setDescription("Enter a password to stop the bot").setRequired(true)),
	async execute(interaction, client) {
		if (stopPassword === interaction.options.getString('password').trim()){
			if (interaction.user.id === b_o_Id) {
				console.log(`-------------------------\n` + `[${new Date().toLocaleString('hu-HU')}] The bot has stopped! \nBot has been stopped by: ` + interaction.user.tag 
					+ "\nGuild: " + interaction.guild.name+", #"+interaction.channel.name + "\nTime:" + interaction.createdAt + `\n-------------------------`)
				const embed = new EmbedBuilder()
					.setColor('#ff0000')
					.setTitle("The bot has stopped!")
					.setDescription("Bot has been stopped by " + interaction.user.tag)
				await interaction.reply({content: "The bot has stopped!", ephemeral: true})
				await interaction.followUp({embeds: [embed]})
				client.destroy()
				process.exit()
			}else{
				const embed = new EmbedBuilder()
					.setColor('#FFFF00 ')
					.setTitle("Meh, you thought!")
					.setDescription("Please ping the bot owner a million times to stop the bot " + interaction.user.tag)
				await interaction.reply({content: "UwU", ephemeral: true})
				await interaction.followUp({embeds: [embed], ephemeral: true})
			}
		} else {
			const embed = new EmbedBuilder()
				.setColor('#FFFF00 ')
				.setTitle("Wrong password!")
				.setDescription("You gave a wrong password" + interaction.user.tag)
			await interaction.reply({content: "You gave a wrong password", ephemeral: true})
			await interaction.followUp({embeds: [embed]})
		}
	}
}