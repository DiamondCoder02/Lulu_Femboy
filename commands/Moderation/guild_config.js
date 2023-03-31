const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
module.exports = {
	guildOnly: true,
	permissions: PermissionsBitField.Flags.ManageGuild,
	data: new SlashCommandBuilder()
		.setName("guild_config")
		.setDescription("Small info and limited configuration for the guild. (Leave empty for current settings)")
		.addChannelOption(option => option.setName("moderation_channel").setDescription("Change mod channel.")), // .addBooleanOption(option => option.setName('enable_bot_update_message').setDescription('Enable or dissable bot update message.'))

	async execute(interaction, client) {
		if (interaction.options.getChannel("moderation_channel")) {
			client.settings.set(interaction.guild.id, interaction.options.getChannel("moderation_channel").id, "moderationChannel");
			return interaction.reply(`Guild configuration item "moderationChannel" has been changed to: \`${interaction.options.getChannel("moderation_channel")}\``);
		}
		else {
			const guildConf = client.settings.get(interaction.guild.id);
			let configProps = Object.keys(guildConf).map(prop => { return `**${prop}** :  ${guildConf[prop]}` });
			return interaction.reply(`The following are the server's current configuration:\n\`\`\`${configProps.join("\n")}\`\`\` \nTo edit config please go to: http://femboy.redirectme.net/`);
		}
	}
};