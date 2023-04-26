const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
require("dotenv").config(); let b_o_Id = process.env.botOwnerId; let stopPassword = process.env.stopPassword;
module.exports = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops the bot with a password.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption(option => option.setName("password").setDescription("Enter a password to stop the bot").setRequired(true)),
	async execute(interaction, client) {
		if (stopPassword === interaction.options.getString("password").trim()){
			if (interaction.user.id === b_o_Id) {
				// eslint-disable-next-line no-console
				console.log("-------------------------\n" + `[${new Date().toLocaleString("hu-HU")}] The bot has stopped! \nBot has been stopped by: ` + interaction.user.tag
					+ "\nGuild: " + interaction.guild.name+", #"+interaction.channel.name + "\nTime:" + interaction.createdAt + "\n-------------------------");
				const embed = new EmbedBuilder()
					.setColor([ 255, 0, 0 ])
					.setTitle("The bot has stopped!")
					.setDescription("Bot has been stopped by " + interaction.user.tag);
				await interaction.reply({ content: "The bot has stopped!", ephemeral: true });
				await interaction.followUp({ embeds: [embed] });
				client.destroy();
				process.exit();
			} else {
				const embed = new EmbedBuilder()
					.setColor([ 255, 0, 0 ])
					.setTitle("Meh, you thought!")
					.setDescription("Please ping the bot owner a million times to stop the bot " + interaction.user.tag);
				await interaction.reply({ content: "UwU", ephemeral: true });
				await interaction.followUp({ embeds: [embed], ephemeral: true });
			}
		} else {
			const embed = new EmbedBuilder()
				.setColor([ 255, 0, 0 ])
				.setTitle("Wrong password!")
				.setDescription("You gave a wrong password" + interaction.user.tag);
			await interaction.reply({ content: "You gave a wrong password", ephemeral: true });
			await interaction.followUp({ embeds: [embed] });
		}
	}
};