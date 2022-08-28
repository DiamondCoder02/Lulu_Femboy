const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	guildOnly: true,
	cooldown: 3,
	//permissions: "ADMINISTRATOR",
	// https://discord.js.org/#/docs/main/stable/class/Permissions
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Feature testing')
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
        )
		.addSubcommand(subcommand => subcommand
			.setName('debug_event_test')
			.setDescription('Will test most events that is available in events folder.')
		),
	async execute(interaction, client, config) {
		if (interaction.options.getSubcommand() === 'debug_event_test') {
			console.log(interaction.guild)
			console.log(interaction)
			//console.log(client)

			const channel = client.channels.cache.get(interaction.channelId);
			await interaction.reply('**Debugging events... Started!**');
			await wait(500);
			await client.emit('emojiCreate', interaction.guild.emojis.cache.first()); await channel.send(`Event emojiCreate has been emitted.`)
			await client.emit('emojiDelete', interaction.guild.emojis.cache.first()); await channel.send(`Event emojiDelete has been emitted.`)
			await client.emit('guildBanAdd', interaction.member); await channel.send(`Event guildBanAdd has been emitted.`)
			await client.emit('guildBanRemove', interaction.member); await channel.send(`Event guildBanRemove has been emitted.`)
			await client.emit('guildCreate', interaction.guild); await channel.send(`Event guildCreate has been emitted.`)
			await client.emit('guildDelete', interaction.guild); await channel.send(`Event guildDelete has been emitted.`)
			await client.emit('guildMemberAdd', interaction.member); await channel.send(`Event guildMemberAdd has been emitted.`)
			await client.emit('guildMemberRemove', interaction.member); await channel.send(`Event guildMemberRemove has been emitted.`)
			await client.emit('guildMemberUpdate', interaction.member, interaction.guild.members.cache.first()); await channel.send(`Event guildMemberUpdate has been emitted.`)
			//await client.emit('guildScheduledEventCreate', interaction.guild); await channel.send(`Event guildScheduledEventCreate has been emitted.`)
			//await client.emit('guildScheduledEventDelete', interaction.guild); await channel.send(`Event guildScheduledEventDelete has been emitted.`)
			//await client.emit('guildScheduledEventUpdate', interaction.guild); await channel.send(`Event guildScheduledEventUpdate has been emitted.`)
			const t = await interaction.channel.createInvite({ maxAge: 60000, maxUses: 0 });
			await client.emit('inviteCreate', t); await channel.send(`Event inviteCreate has been emitted.`)
			await client.emit('inviteDelete', t); await channel.send(`Event inviteDelete has been emitted.`)
			//await client.emit('messageCreate', interaction); await channel.send(`Event messageCreate has been emitted.`)
			//await client.emit('messageDelete', interaction); await channel.send(`Event messageDelete has been emitted.`)
			//await client.emit('messageUpdate', interaction); await channel.send(`Event messageUpdate has been emitted.`)
			//NO, just don't:  await client.emit('ready', client); await channel.send(`Event ready has been emitted.`)
			await client.emit('stickerCreate', interaction.guild.stickers.cache.first()); await channel.send(`Event stickerCreate has been emitted.`)
			await client.emit('stickerDelete', interaction.guild.stickers.cache.first()); await channel.send(`Event stickerDelete has been emitted.`)

			return await interaction.followUp('**Debugging events... Done!**');
		}
		if (interaction.options.getSubcommand() === 'test2') {
			console.log('true');
		}
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
		
		console.log("test")
	}
}