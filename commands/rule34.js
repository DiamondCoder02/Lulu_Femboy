//rule34 command (Writen by Gihub Copilot)
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow,MessageButton,MessageEmbed} = require('discord.js')
module.exports = {
	//guildOnly: true,
	cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('rule34')
        .setDescription('Search rule34 for a picture')
        .addStringOption(option => option.setName('tags').setDescription('Tags to search for').setRequired(true))
        .addStringOption(option => option.setName('page').setDescription('Page number (Default 1)')),
    async execute(interaction, client, config, lang) {
        if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { interaction.reply(lang.nsfw); return }
        //rule34 image search
        const tags = interaction.options.getString('tags').split(' ').join('+');
        const page = interaction.options.getString('page') || 1;
        const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}&pid=${page}`;
        const res = await interaction.http.get(url);
        const data = JSON.parse(res.body);
        if (data.length === 0) { interaction.reply("No results"); return }
        const image = data[Math.floor(Math.random() * data.length)];
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Rule34")
            .setDescription("Here's a random image from rule34")
            .setImage(image.file_url)
            .setFooter("Page " + page + " | " + data.length + " results")
            .setTimestamp()
        interaction.reply({embeds: [embed]})
    }
};