module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.isCommand()) {
			console.log(`[${interaction.createdAt}] -- ${interaction.user.tag} in ${interaction.guild.name} at #${interaction.channel.name} triggered: ${interaction.commandName}.`);
		}
		else if (interaction.isButton()) {
			console.log(`[${interaction.createdAt}] -- ${interaction.user.tag} in ${interaction.guild.name} at #${interaction.channel.name} triggered a button.`);
		} 
		else if (interaction.isSelectMenu()) {
			console.log(`[${interaction.createdAt}] -- ${interaction.user.tag} in ${interaction.guild.name} at #${interaction.channel.name} triggered a select menu.`);
		}
	}
};