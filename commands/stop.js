const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
	permissions: PermissionsBitField.Flags.Administrator,
	guildOnly: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription("Stops the bot with a password.")
		.addStringOption(option => option.setName('password').setDescription("Enter a password to stop the bot").setRequired(true)),
	async execute(interaction, client, config) {
		if (config.stopPassword === interaction.options.getString('password').trim()){
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