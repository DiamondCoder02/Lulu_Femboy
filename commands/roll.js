const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Dice rolling')
        .addIntegerOption(option => option.setName('min').setDescription('If you want to set a minimum value (default: 1)').setMinValue(1))
        .addIntegerOption(option => option.setName('max').setDescription('If you want to set a maximum value (default: 6)').setMinValue(1))
        .addIntegerOption(option => option.setName('amount').setDescription('If you want to set the amount of dice').setMinValue(1).setMaxValue(100)),
    async execute(interaction, client, config) {
        let allResults = [];
        try {
            if (interaction.options.getInteger('min') !== null) { min = interaction.options.getInteger('min') } else { min = 1 };
            if (interaction.options.getInteger('max') !== null) { max = interaction.options.getInteger('max') } else { max = 6 };
            if (interaction.options.getInteger('amount') !== null) { amount = interaction.options.getInteger('amount') } else { amount = 1 };

            for (let a = 0; a < amount; a++ ) {
                const getRandomNumber = (minM, maxM) => {
                    return Math.floor(Math.random() * (maxM - minM + 1)) + minM;
                };
                const rollDice = () => getRandomNumber(min, max);
                allResults.push(rollDice());
            }
            
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle(`${amount} times got rolled with min:${min} - max:${max}`)
                .setDescription(`Numbers: ${String(allResults.join(', '))} \nTotal: ${String(allResults.reduce((a, b) => a + b, 0))}`)

            await interaction.reply({embeds: [embed]})
        }catch(error) {
            console.log(error)
        }
    }
}