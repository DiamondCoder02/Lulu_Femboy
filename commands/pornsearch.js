const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('pornsearch')
        .setDescription('Shows some server informations!')
        .addSubcommand(subcommand => subcommand
            .setName('videos')
            .setDescription('Video search (pornhub.com, sex.com, redtube.com, xvideos.com)')
            .addStringOption(option =>
                option.setName('video')
                .setDescription('Choose which you want from')
                .addChoice('Pornhub', 'phub')
                .addChoice('Sex.com', 'sex')
                .addChoice('Redtube', 'red')
                .addChoice('Xvideos', 'xvid')
                .setRequired(true)
            ))
        .addSubcommand(subcommand => subcommand
            .setName('gifs')
            .setDescription('Gifs search (pornhub.com(.webm), sex.com(.gif))')
            .addStringOption(option =>
                option.setName('gif')
                .setDescription('Choose which you want from')
                .addChoice('Pornhub', 'ph_gif')
                .addChoice('Sex.com', 'sex_gif')
                .setRequired(true)
            )),
    //Execution
    async execute(interaction, client, config) {
        if (!interaction.channel.nsfw) {
            interaction.reply('Sorry, this is a Not Safe For Work command!'); return;
        }
        if (interaction.options.getSubcommand() === 'videos') {

        }
        if (interaction.options.getSubcommand() === 'gifs') {

        }
    }
}