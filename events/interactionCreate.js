const { Collection } = require('discord.js'), config = require('../config.json'), lang = require('../languages/' + config.language + '.json');
const cooldowns = new Collection();
require('dotenv').config(); var b_o_Id = process.env.botOwnerId;
module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, guildInvites) {
		const i_c = lang.int_create.split('-'), i = interaction
		if (config.debug_level >= 1) {
			if (i.channel.type === 'DM') {
				console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] DM "+ i_c[0] + i.commandName);
			}
			if (i.isCommand()) {
				console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name +" "+ i_c[0] + i.commandName);
			}
			if (i.isButton() && config.debug_level >= 2) {
				console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[1] +"=> "+ i.customId);
			} 
			if (i.isSelectMenu() && config.debug_level >= 2) {
				console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[2] +"=> "+ i.value);
			}
		}
		if (i.isCommand) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return;
			//OnlyGuild
			if (command.guildOnly && interaction.channel.type === 'DM') {console.log("Execute in DMs, why?"); return interaction.reply(lang.index.no_dm)}
			//Cooldown
			if (!cooldowns.has(interaction.commandName)) {cooldowns.set(interaction.commandName, new Collection());}
			const now = Date.now();
			const timestamps = cooldowns.get(interaction.commandName);
			const cooldownAmount = (command.cooldown || 1) * 1000;
			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					console.log("Cooldown time left, maybe spam?");
					return interaction.reply({content: lang.index.cooldown + " `"+timeLeft+"`", ephemeral: true});
				}
			}
			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
			//guild permission check
			if (command.guildOnly) { 
				try{
					if ((interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) || interaction.member.id === b_o_Id || interaction.member.id === config.botOwnerId) {r=true} else {r=false}
					if (!r && interaction.channel.type === "GUILD_TEXT") {console.log("Not enough permission, what was the plan?"); return interaction.reply({content: lang.index.perm+" => `"+command.permissions+"`", ephemeral: true})}
				} catch { } 
			}
			//Execute
			try {
				await command.execute(interaction, client, config);
			} catch (error) {
				console.error(error);
				return await interaction.reply({ content: lang.index.error, ephemeral:true});
			}
		}
		if (config.debug_level >= 1) {
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
		}
	}
};