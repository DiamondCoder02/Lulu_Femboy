const { Collection, InteractionType, ChannelType } = require('discord.js'), config = require('../config.json'), lang = require('../languages/' + config.language + '.json');
const cooldowns = new Collection();
require('dotenv').config(); var b_o_Id = process.env.botOwnerId;
module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, guildInvites) {
		try {
			const i_c = lang.int_create.split('-'), i = interaction
			if (i.type === InteractionType.ApplicationCommand) {
				const command = client.commands.get(interaction.commandName);
				if (!command) return;
				//OnlyGuild
				if (command.guildOnly && interaction.channel.type === 'DM') {console.log(`[${new Date().toLocaleString('hu-HU')}] `+"Execute in DMs, why?"); return interaction.reply(lang.index.no_dm)}
				if ( interaction.member.id === b_o_Id || interaction.member.id === config.botOwnerId ) {} else {
					//Cooldown
					if (!cooldowns.has(interaction.commandName)) {cooldowns.set(interaction.commandName, new Collection());}
					const now = Date.now();
					const timestamps = cooldowns.get(interaction.commandName);
					const cooldownAmount = (command.cooldown || 1) * 1000;
					if (timestamps.has(interaction.user.id)) {
						const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
						if (now < expirationTime) {
							const timeLeft = (expirationTime - now) / 1000;
							console.log(`[${new Date().toLocaleString('hu-HU')}] `+"Cooldown time left, maybe spam?");
							return interaction.reply({content: lang.index.cooldown + " `"+timeLeft+"`", ephemeral: true});
						}
					}
					timestamps.set(interaction.user.id, now);
					setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
					//guild permission check
					if (command.guildOnly) { 
						if (command.permissions) {
							if (interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) { r=true } else { r=false }
							if (!r || interaction.channel.type === ChannelType.DM) {console.log(`[${new Date().toLocaleString('hu-HU')}] `+"Not enough permission, what was the plan?"); return interaction.reply({content: lang.index.perm+" => `"+command.permissions+"`", ephemeral: true})}
						}
					}
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
				if (i.channel.type === 'DM') {
					console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] DM "+ i_c[0] + i.commandName);
				}
				if (i.type === InteractionType.ApplicationCommand) {
					console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name +" "+ i_c[0] + i.commandName);
				}
				if ((i.type === InteractionType.MessageComponent) && config.debug_level >= 2) {
					if (i.message.interaction === null) { nameOfCommand = "-akinator?-" } else { nameOfCommand = i.message.interaction.commandName }
					console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[1] +"-commandName:"+ nameOfCommand +" => "+ i.customId);
				} 
				if ((i.type === InteractionType.ModalSubmit) && config.debug_level >= 2) {
					console.log(i)
					console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] "+ i.guild.name +" -> #"+ i.channel.name + i_c[2] +"=> "+ i.value);
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
		} catch (error) { console.error(error) }
	}
};