const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Pornsearch = require('pornsearch');
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
                .addChoice('Pornhub', 'pornhub')
                .addChoice('Sex.com', 'sex')
                .addChoice('Redtube', 'redtube')
                .addChoice('Xvideos', 'xvideos')
                .setRequired(true))
            .addStringOption(option => option.setName('search_video_term').setDescription('Search for something').setRequired(true))
            .addIntegerOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.')))
        .addSubcommand(subcommand => subcommand
            .setName('gifs')
            .setDescription('Gifs search (pornhub.com(.webm), sex.com(.gif))')
            .addStringOption(option =>
                option.setName('gif')
                .setDescription('Choose which you want from')
                .addChoice('Pornhub', 'pornhub')
                .addChoice('Sex.com', 'sex')
                .setRequired(true))
            .addStringOption(option =>option.setName('search_gif_term').setDescription('Search for something').setRequired(true))
            .addIntegerOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.'))),
    //Execution
    async execute(interaction, client, config) {
        if (!interaction.channel.nsfw) {
            interaction.reply('Sorry, this is a Not Safe For Work command!'); return;
        }
        if (interaction.options.getSubcommand() === 'videos') {
            if (interaction.options.getString('video') === 'pornhub') {
                
            }
        }
        if (interaction.options.getSubcommand() === 'gifs') {
            if (interaction.options.getString('gif') === 'pornhub') {
                
            }
        }
    }
}