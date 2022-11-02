const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Very basic 8ball command.')
        .addStringOption(option => option.setName('question').setDescription('Enter a question').setRequired(true)),
    async execute(interaction, client, config) {
        let items = ['It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes — definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            `Don't count on it.`,
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ]
        if (interaction.guildID === "953982453436018748"){
            //have a random very low chance of getting a special response
            let special = Math.floor(Math.random() * 1000)
            if (special == 117) {
                var item = "Diamond said this as a nice quote"
            } else if (special == 2) {
                var item = "Finish this with Diamond: *Ki korán kell, aranyat...*"
            } else {
                var item = items[Math.floor(Math.random()*items.length)];
            }
        } else {
            let special = Math.floor(Math.random() * 1000)
            if (special == 117) {
                var item = "Whatever. All I know you are a good person and I support you ^^"
            } else {
                var item = items[Math.floor(Math.random()*items.length)];
            }
        }
        const string = interaction.options.getString('question');
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(`**${string}**` +"\n8ball says: " + item)
        await interaction.reply({embeds: [embed]})
    }
}