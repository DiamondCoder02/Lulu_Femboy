module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {language, debug_level} = require('../config.json'), lang = require('../languages/' + language + '.json');
		const i_c = lang.int_create.split('-'), i = interaction
		if (debug_level >= 1) {
			if (i.options === undefined) { } else {console.log(i.options)}
			if (i.channel.type === 'DM') {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] DM "+ i_c[0] + i.commandName);
			}
			if (i.isCommand()) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name +" "+ i_c[0] + i.commandName);
			}
			if (i.isButton() && debug_level >= 2) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[1] +"= "+ i.customId);
			} 
			if (i.isSelectMenu() && debug_level >= 2) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[2] +"= "+ i.value);
			}
		}
	}
};