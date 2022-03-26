module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {language} = require('../config.json'), lang = require('../languages/' + language + '.json');
		let i_c = lang.int_create.split('-')
		const i = interaction
		try{
			if (i.isCommand()) {
				console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] + i.channel.name + i_c[2] + i.commandName);
			}
			else if (i.isButton()) {
				console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] + i.channel.name + i_c[3]);
			} 
			else if (i.isSelectMenu()) {
				console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] + i.channel.name + i_c[4]);
			}
		} catch (error) {
			console.log(error)
			//console.log(`[${i.createdAt}] -- ${i.user.tag} in DM triggered: ${i.commandName}.`);
		}
	}
};