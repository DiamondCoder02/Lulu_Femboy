module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isCommand()) {
			console.log(`[${interaction.createdAt}] -- ${interaction.user.tag} in ${interaction.guild.name} at #${interaction.channel.name} triggered: ${interaction.commandName}.`);
		}
		else if (interaction.isButton()) {
			console.log("interactionCreate-Button");
		} 
		else if (interaction.isSelectMenu()) {
			console.log("interactionCreate-SelectMenu");
		}
	}
};