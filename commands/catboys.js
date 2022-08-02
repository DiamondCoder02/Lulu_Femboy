const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch')
const wait = require('node:timers/promises').setTimeout;
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
        .setName('catboys')
        .setDescription('Pictures from catboy api')
        .addStringOption(option => option.setName('category').setDescription('Get yourself a cute catboy')
            .addChoices(
                { name: 'catboys', value: 'img' },
                { name: 'Baka', value: 'baka' },
                { name: 'catemoji', value: 'catboy' },
            )
        )
        .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10)),
    async execute(interaction, client, config) {
        try {
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            if (interaction.options.getString('category')) { var category = interaction.options.getString('category') } else var category = 'img'
            for (let a = 0; a < amount; a++ ) {
                // This 3 line good for api
                let response = await fetch(`https://api.catboys.com/${category}`);
                let data = await response.text();
                const img = JSON.parse(data)
                const embed = new EmbedBuilder()
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                    .setColor('#00FF00')
                if (category === "catboy") { embed.setDescription(`Catboy says: ${img.response}`)}
                else if ( img.error !== "none") { return interaction.reply("Error happened: " + img.error) } 
                else { embed.setImage(img.url) }

                try { await interaction.followUp({ embeds: [embed]}) }
                catch { interaction.reply({ embeds: [embed]}) }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
}