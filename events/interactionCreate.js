const { Collection, InteractionType, ChannelType } = require('discord.js')
const cooldowns = new Collection();
require('dotenv').config(); var b_o_Id = process.env.botOwnerId; var debug_level = process.env.debug_level;
module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, guildInvites) {
		//console.log(interaction)
		try {
			const i = interaction;
			if (i.type === InteractionType.ApplicationCommand) {
				const command = client.commands.get(interaction.commandName);
				if (!command) return;
				if (command.guildOnly && interaction.guildId === null) {console.log(`[${new Date().toLocaleString('hu-HU')}] `+"Execute in DMs, why: " + i.commandName); return interaction.reply("(* ￣︿￣) Executing this command in DMs is disabled. Please use this command on a server.")}
				if ( interaction.user.id === b_o_Id ) {} else {
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
							return interaction.reply({content: "Cooldown time left in seconds, before you can use the command again: `"+timeLeft+"`", ephemeral: true});
						}
					}
					timestamps.set(interaction.user.id, now);
					setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
					//guild permission check
					if (command.guildOnly) { 
						if (command.permissions) {
							if (interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) { r=true } else { r=false }
							if (!r || interaction.channel.type === ChannelType.DM) {console.log(`[${new Date().toLocaleString('hu-HU')}] `+"Not enough permission, what was the plan?"); return interaction.reply({content: "You do not have the required permissions to execute this command. => `"+command.permissions+"`", ephemeral: true})}
						}
					}
				}
				//Execute
				try {
					await command.execute(interaction, client);
				} catch (error) {
					console.error(error);
					try {await interaction.reply({ content: "There was an error while executing this command!", ephemeral:true});}
					catch {await interaction.followUp({ content: "There was an error while executing this command!", ephemeral:true});}
					return;
				}
			}
			if (debug_level >= 1) {
				if (i.guildId === null) {
					return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag + "] Triggered in DMs:" + i.commandName);
				}
				if (i.type === InteractionType.ApplicationCommand) {
					return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] - "+ i.guild.name +" -> #"+ i.channel.name +" triggered: " + i.commandName);
				}
				if ((i.type === InteractionType.MessageComponent) && debug_level >= 2) {
					if (i.message.interaction === null) { nameOfCommand = "-akinator? or followUp button-" } else { nameOfCommand = i.message.interaction.commandName }
					if (nameOfCommand === "akinator") { return } //console.log("Bad akinator") 
					return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] - "+ i.guild.name +" -> #"+ i.channel.name + " triggered a button with commandName: "+ nameOfCommand +" => "+ i.customId);
				} 
				if ((i.type === InteractionType.ModalSubmit) && debug_level >= 2) {
					console.log(i)
					return console.log("["+i.createdAt.toLocaleString('hu-HU') + "] -- ["+ i.user.tag +"] - "+ i.guild.name +" -> #"+ i.channel.name + " triggered a select menu => "+ i.value);
				}
			}
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
			}
		} catch (error) { console.error(error) }
	}
};