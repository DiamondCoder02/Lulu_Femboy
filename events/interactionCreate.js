module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {language, debug_level} = require('../config.json'), lang = require('../languages/' + language + '.json');
		const i_c = lang.int_create.split('-'), i = interaction
		if (debug_level >= 1) {
			//console.log(i.options)
			try {
				/*const string = interaction.options.getString();
				const integer = interaction.options.getInteger();
				const number = interaction.options.getNumber();
				const boolean = interaction.options.getBoolean();
				const user = interaction.options.getUser();
				const member = interaction.options.getMember();
				const channel = interaction.options.getChannel();
				const role = interaction.options.getRole();
				const mentionable = interaction.options.getMentionable();
				const subcommand = interaction.options.getSubcommand();
				console.log(string + '\n' + integer + '\n' + number + '\n' + boolean + '\n' + user + '\n' + member + '\n' + channel + '\n' + role + '\n' + mentionable + '\n' + subcommand);
				*/
				//const subcommand = interaction.options.getSubcommand();
				//console.log(subcommand);
			}catch(error) {
				console.log(error.name)
			}
			if (i.channel.type === 'DM') {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] DM "+ i_c[0] + i.commandName);
			}
			if (i.isCommand()) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name +" "+ i_c[0] + i.commandName);
			}
			if (i.isButton() && debug_level >= 2) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[1] +"=> "+ i.customId);
			} 
			if (i.isSelectMenu() && debug_level >= 2) {
				return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[2] +"=> "+ i.value);
			}
		}
	}
};