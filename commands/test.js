const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');

module.exports = {
	//guildOnly: true,
	cooldown: 3,
	//permissions: "ADMINISTRATOR",
	// https://discord.js.org/#/docs/main/stable/class/Permissions
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Feature testing.')
		.addSubcommand(subcommand => subcommand
            .setName('test')
            .setDescription('Test subcommand.')
            .addStringOption(option => option.setName('input').setDescription('Enter a string'))
			.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
			.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
			.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
			.addUserOption(option => option.setName('target').setDescription('Select a user'))
			.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
			.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
			.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
        )
		.addSubcommandGroup(subcommandGroup => subcommandGroup
			.setName('group')
			.setDescription('Group subcommand')
            .addSubcommand(subcommand => subcommand
				.setName('test2')
				.setDescription("Test 2")
				.addStringOption(option => option.setName('input').setDescription('Enter a string'))
				.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
				.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
				.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
				.addUserOption(option => option.setName('target').setDescription('Select a user'))
				.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
				.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
				.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
			)
			.addSubcommand(subcommand => subcommand
				.setName('test3')
				.setDescription("This is a test.")
				.addStringOption(option => option.setName('input').setDescription('Enter a string'))
				.addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
				.addNumberOption(option => option.setName('num').setDescription('Enter a number'))
				.addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
				.addUserOption(option => option.setName('target').setDescription('Select a user'))
				.addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
				.addRoleOption(option => option.setName('muted').setDescription('Select a role'))
				.addMentionableOption(option => option.setName('mentionable').setDescription('Mention something'))
			)
        ),
	async execute(interaction, client, config) {
		const string = interaction.options.getString('input');
		const integer = interaction.options.getInteger('int');
		const number = interaction.options.getNumber('num');
		const boolean = interaction.options.getBoolean('choice');
		const user = interaction.options.getUser('target');
		const member = interaction.options.getMember('target');
		const channel = interaction.options.getChannel('destination');
		const role = interaction.options.getRole('muted');
		const mentionable = interaction.options.getMentionable('mentionable');
		//console.log(string, integer, number, boolean, user, member, channel, role, mentionable);
		console.log(interaction.options);
		console.log(interaction.options.getString('input'));
		console.log(interaction.options.getGroup());
		console.log(interaction.options.getSubcommand());
		await interaction.reply({ content: `${string}\n${integer}\n${number}\n${boolean}\n${user}\n${member}\n${channel}\n${role}\n${mentionable}` });
		if (interaction.options.getSubcommand() === 'test2') {
			console.log('true');
		}
		console.log("test")
	}
}