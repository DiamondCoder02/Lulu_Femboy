module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {language} = require('../config.json'), lang = require('../languages/' + language + '.json');
		const i_c = lang.int_create.split('-'), i = interaction
		try{
			if (i.channel.type === 'DM') {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] DM "+ i_c[0] + i.commandName);
			}
			if (i.isCommand()) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name +" "+ i_c[0] + i.commandName);
			}
			if (i.isButton()) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[1]);
			} 
			if (i.isSelectMenu()) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[2]);
			}
		} catch (error) {
			console.log(error)
		}
	}
};