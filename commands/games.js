const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder,SelectMenuBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Some small minigames')
        .addSubcommand(subcommand => subcommand.setName('rpc').setDescription('Rock-Paper-Scissors'))
        .addSubcommand(subcommand => subcommand.setName('numbers').setDescription('Guess the number')
            .addStringOption(option => option.setName('game_mode').setDescription('Who should think about the number')
                .setRequired(true)
                .addChoices(
                    { name: "I will think about a number", value: 'bot' },
                    { name: "You, the player think one", value: 'player' }
                )
            )
            .addIntegerOption(option => option.setName('min').setDescription('Minimum number (default 1)'))
            .addIntegerOption(option => option.setName('max').setDescription('Maximum number (default 100)'))
        )
        ,
    async execute(interaction, client, config) {
        
        // TO-DO

        switch (interaction.options.getSubcommand()) {
            case 'rpc':
                const rpc = new EmbedBuilder()
                    .setTitle('Rock-Paper-Scissors!')
                    .setDescription('Choose your weapon!')
                    .setColor('#00FF00')
                    .setTimestamp()
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
                interaction.reply({ embeds: [rpc], components: [row] });
                const filter = i => {i.deferUpdate();return i.user.id === interaction.user.id;};
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 10000 });
                pA=0
                collector.on('collect', async i => {
                    if (i.customId === "rock") {pA=1}
                    if (i.customId === "paper") {pA=2}
                    if (i.customId === "scissors") {pA=3}
                });
                const bN = Math.floor(Math.random() * 3) + 1;
                if (pA === bN) { rpc.setDescription('You chose '+pA+' and I chose '+bN + '\nIt\'s a tie'); interaction.editReply({embeds: [rpc]}) }
                if ((pA === 1 && bN === 2) || (pa===2&&bN===3) || (pa===3&&bN===1)) { rpc.setDescription('You chose '+pA+' and I chose '+bN + '\nI win'); interaction.editReply({embeds: [rpc]}) }
                if ((pA === 1 && bN === 3) || (pa===2&&bN===1) || (pa===3&&bN===2)) { rpc.setDescription('You chose '+pA+' and I chose '+bN + '\nYou win'); interaction.editReply({embeds: [rpc]}) }
            case 'numbers':
            
        }
    }
}