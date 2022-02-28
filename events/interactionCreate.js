module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`[${interaction.createdAt}] -- ${interaction.user.tag} in ${interaction.guild.name} at #${interaction.channel.name} triggered: ${interaction.commandName}.`);
	},
};