module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {language} = require('../config.json'), lang = require('../languages/' + language + '.json');
		let i_c = lang.int_create.split('-')
		const i = interaction
		try{
			if (i.channel.type === 'DM') {
				return console.log(i.createdAt + " -- "+ i.user.tag + " DM"+ i_c[2] + i.commandName);
			}
			if (i.isCommand()) {
				return console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] +"#"+ i.channel.name + i_c[2] + i.commandName);
			}
			if (i.isButton()) {
				return console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] +"#"+  i.channel.name + i_c[3]);
			} 
			if (i.isSelectMenu()) {
				return console.log(i.createdAt + " -- "+ i.user.tag +" "+ i_c[0] + i.guild.name + i_c[1] +"#"+  i.channel.name + i_c[4]);
			}
		} catch (error) {
			console.log(error)
		}
	}
};