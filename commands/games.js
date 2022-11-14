const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder,SelectMenuBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Some small minigames')
        .addSubcommand(subcommand => subcommand.setName('rpc').setDescription('Rock-Paper-Scissors'))
        .addSubcommand(subcommand => subcommand.setName('numbers').setDescription('Guess the number')
            .addStringOption(option => option.setName('game_mode').setDescription('Who should think about the number')
                .addChoices(
                    { name: "I will think about a number", value: 'bot' },
                    { name: "You, the player think of a number", value: 'player' }
                ).setRequired(true)
            )
            .addIntegerOption(option => option.setName('min').setDescription('Minimum number (default 1)'))
            .addIntegerOption(option => option.setName('max').setDescription('Maximum number (default 100)'))
            .addIntegerOption(option => option.setName('tries').setDescription('How many tries do you have? (default 10)'))
        )
        ,
    async execute(interaction, client, config) {
        switch (interaction.options.getSubcommand()) {
            case 'rpc':
                const rpc = new EmbedBuilder()
                    .setTitle('Rock-Paper-Scissors!')
                    .setColor('#00FF00')
                const row = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('select')
                            .setPlaceholder('Nothing selected')
                            .addOptions(
                                { label: 'Rock', value: 'rock' },
                                { label: 'Paper', value: 'paper' },
                                { label: 'Scissors', value: 'scissors' }
                            ),
                    );
                await interaction.reply({ embeds: [rpc], components: [row] });
                var bN = Math.floor(Math.random() * 3) + 1;
                switch (bN) {
                    case 1: bNw = 'rock'; break;
                    case 2: bNw = 'paper'; break;
                    case 3: bNw = 'scissors'; break;
                }
                const filter = i => {i.deferUpdate();return i.user.id === interaction.user.id;};
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 10000 });
                collector.on('collect', async i => {
                    switch (i.values[0]) {
                        case 'rock': pA=1; break
                        case 'paper': pA=2; break
                        case 'scissors': pA=3; break
                    }
                    if (pA === bN) { rpc.setDescription('We both chose \`'+i.values[0]+ '\`\nIt\'s **a tie**'); await interaction.followUp({embeds: [rpc]}) }
                    if ((pA===1&&bN===2) || (pA===2&&bN===3) || (pA===3&&bN===1)) { rpc.setDescription('You chose \`'+i.values[0]+'\` and I chose \`'+bNw + '\`\n**I win**'); await interaction.followUp({embeds: [rpc]}) }
                    if ((pA===1&&bN===3) || (pA===2&&bN===1) || (pA===3&&bN===2)) { rpc.setDescription('You chose \`'+i.values[0]+'\` and I chose \`'+bNw + '\`\n**You win**'); await interaction.followUp({embeds: [rpc]}) }
                    collector.stop()
                });
            case 'numbers':
                win=false
                const game_mode = interaction.options.getString('game_mode');
                var min = interaction.options.getInteger('min') || 1;
                var max = interaction.options.getInteger('max') || 100;
                var tries = interaction.options.getInteger('tries') || 10;
                const embed = new EmbedBuilder()
                    .setTitle('Guess the number!')
                    .setColor('#00FF00')
                if (game_mode === 'bot') {



                    
                } else {
                    const buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('high')
                                .setLabel('Higher')
                                .setStyle(ButtonStyle.Success)
                                .setEmoji("⬆️"),
                            new ButtonBuilder()
                                .setCustomId('low')
                                .setLabel('Lower')
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("⬇️"),
                            new ButtonBuilder()
                                .setCustomId('equal')
                                .setLabel('Guessed it')
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("✅"),
                        )
                    var guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    embed.setDescription('I\'m thinking of the number '+guessingNum+"!\n(I have "+tries+" tries left)")
                    interaction.reply({ embeds: [embed], components: [buttons] });
                    const filter = i => {i.deferUpdate();return i.user.id === interaction.user.id;};
                    const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000 });
                    collector.on('collect', async i => {
                        if (i.customId === 'high') {
                            min = guessingNum
                            guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
                            tries--
                        }
                        if (i.customId === 'low') {
                            max = guessingNum
                            guessingNum = Math.floor(Math.random() * (max - min + 1)) + min;
                            tries--
                        }
                        if (i.customId === 'equal') { win = true }
                        embed.setDescription('I\'m thinking of the number '+guessingNum+"!\n(I have "+tries+" tries left)")
                        await interaction.editReply({embeds: [embed]})
                        if (win===true) { embed.setDescription(`You **won**! The number was: ${guessingNum}`); await interaction.editReply({embeds: [embed]}); collector.stop() }
                        else if (tries===0) { embed.setDescription(`You **lost**! The number was: ${guessingNum}`); await interaction.editReply({embeds: [embed]}); collector.stop() }
                    })
                }
        }
    }
}