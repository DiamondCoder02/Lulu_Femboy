module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const i = interaction
		if (i.isCommand()) {
			console.log(`[${i.createdAt}] -- ${i.user.tag} in ${i.guild.name} at #${i.channel.name} triggered: ${i.commandName}.`);
		}
		else if (i.isButton()) {
			console.log(`[${i.createdAt}] -- ${i.user.tag} in ${i.guild.name} at #${i.channel.name} triggered a button.`);
		} 
		else if (i.isSelectMenu()) {
			console.log(`[${i.createdAt}] -- ${i.user.tag} in ${i.guild.name} at #${i.channel.name} triggered a select menu.`);
		}
	}
};