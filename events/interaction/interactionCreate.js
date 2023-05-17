const { Collection, InteractionType, ChannelType, EmbedBuilder } = require("discord.js");
const cooldowns = new Collection();
require("dotenv").config(); let b_o_Id = process.env.botOwnerId; let debug_level = process.env.debug_level;
let announceChannel, announceRole, announceEmbed = new EmbedBuilder()
	.setColor([255, 255, 0])
	.setTimestamp();
module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		// Console.log(interaction)
		try {
			const i = interaction;
			if (i.type === InteractionType.ApplicationCommand) {
				const command = client.commands.get(interaction.commandName);
				if (!command) { return interaction.reply({ content: "What?, How?" }) }
				if (interaction.user.id !== b_o_Id) {
					// Cooldown
					if (!cooldowns.has(interaction.commandName)) { cooldowns.set(interaction.commandName, new Collection()) }
					const now = Date.now();
					const timestamps = cooldowns.get(interaction.commandName);
					const cooldownAmount = (command.cooldown || 1) * 1000;
					if (timestamps.has(interaction.user.id)) {
						const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
						if (now < expirationTime) {
							const timeLeft = (expirationTime - now) / 1000;
							return interaction.reply({ content: "Cooldown time left in seconds, before you can use the command again: `" + timeLeft + "`", ephemeral: true });
						}
					}
					timestamps.set(interaction.user.id, now);
					setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
					// Guild permission check
					if (command.guildOnly) {
						if (command.permissions) {
							let isCommandDM = false;
							if (interaction.guild && interaction.channel.permissionsFor(interaction.member).has(command.permissions)) { isCommandDM = true }
							if (!isCommandDM || interaction.channel.type === ChannelType.DM) { return interaction.reply({ content: "You do not have the required permissions to execute this command. => `" + command.permissions + "`", ephemeral: true }) }
						}
					}
				}
				// Execute
				try {
					await command.execute(interaction, client);
				} catch (error) {
					console.error(error.name, error.message);
					console.line(error);
					try { await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true }) }
					catch { await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true }) }
					return;
				}
			}
			if (i.isCommand()) {
				if (i.commandName === "announce") {
					if (i.options.getChannel("channel")) {
						announceChannel = i.options.getChannel("channel");
						announceRole = false;
						if (i.options.getRole("role")) {
							announceRole = i.options.getRole("role");
						}
					}
				}
			}
			if (i.type === InteractionType.ModalSubmit) {
				if (i.customId === "announce") {
					let titleString = false, descriptionString = false, smallnote = false;
					if (i.fields.getTextInputValue("title")) { titleString = i.fields.getTextInputValue("title"); announceEmbed.setTitle("*Announcement:*\n"+titleString) }
					if (i.fields.getTextInputValue("description")) { descriptionString = i.fields.getTextInputValue("description"); announceEmbed.setDescription(descriptionString) }
					if (i.fields.getTextInputValue("smallnote")) { smallnote = i.fields.getTextInputValue("smallnote"); announceEmbed.addFields({ name: "*smallnote:*", value: smallnote, inline: false }) }
					announceEmbed.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
					if (announceRole) {
						announceChannel.send({ content: announceRole.toString(), embeds: [announceEmbed] });
					} else { announceChannel.send({ embeds: [announceEmbed] }) }
					await interaction.reply({ content: "Announcement sent!", ephemeral: true });
				}
			}
			if (i.isButton()) {
				// This is useful: console.log(i.message);
				if (i.client.user.id === client.user.id && i.user.id === i.message.interaction.user.id && i.customId === "delete") {
					i.message.delete();
				} else if (i.user.id !== i.message.interaction.user.id && i.client.user.id === client.user.id && i.customId === "delete") {
					await i.reply({ content: "Sorry, you are not the original executer of this command so you cannot delete this.", ephemeral: true });
				}
			}
			if (debug_level >= 1) {
				if (i.guildId === null) {
					return console.log("-- [" + i.user.tag + "] Triggered in DMs:" + i.commandName);
				}
				if (i.type === InteractionType.ApplicationCommand) {
					return console.log("-- [" + i.user.tag + "] - " + i.guild.name + " -> #" + i.channel.name + " triggered: " + i.commandName);
				}
				if ((i.type === InteractionType.MessageComponent) && debug_level >= 2) {
					let nameOfCommand;
					if (i.message.interaction === null) { nameOfCommand = "-akinator? or followUp button-" } else { nameOfCommand = i.message.interaction.commandName }
					if (nameOfCommand === "akinator") { return } // Console.log("Bad akinator")
					return console.log("-- [" + i.user.tag + "] - " + i.guild.name + " -> #" + i.channel.name + " triggered a button with commandName: " + nameOfCommand + " => " + i.customId);
				}
				if ((i.type === InteractionType.ModalSubmit) && debug_level >= 2) {
					// console.line(i);
					return console.log("-- [" + i.user.tag + "] - " + i.guild.name + " -> #" + i.channel.name + " triggered a select menu => " + i.value);
				}
			}
			if (debug_level >= 1) {
				// Console.log(i.options)
				try {
					/* Const string = interaction.options.getString();
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
					// Const subcommand = interaction.options.getSubcommand();
					// Console.log(subcommand);
				} catch (error) {
					console.log(error.name, error.message);
				}
			}
		} catch (error) { console.error(error.name, error.message) }
	}
};