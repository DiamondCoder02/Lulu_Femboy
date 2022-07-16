const { SlashCommandBuilder } = require('@discordjs/builders'), akinator = require("discord.js-akinator"), fs = require('fs')
const {language} = require('../config.json'), l = require('../languages/' + language + '.json'), s = l.akinator.slash.split('-')
module.exports = {
	data: new SlashCommandBuilder()
        .setName('akinator')
        .setDescription(s[0])
        .addStringOption(option => option.setName('lang').setDescription(s[1]))
        .addBooleanOption(option => option.setName('child_mode').setDescription(s[2]))
        .addStringOption(option => option.setName('game_type').setDescription(s[3])
            .addChoice(s[5], 'animal')
            .addChoice(s[6], 'character')
            .addChoice(s[7], 'object'))
		.addBooleanOption(option => option.setName('button').setDescription(s[4])),
    async execute(interaction) {
        if (interaction.options.getBoolean('button') === false) {useButtons = false} else {useButtons = true}
        if (interaction.options.getBoolean('child_mode') === false) {childMode = false} else {childMode = true}
        if (interaction.options.getString('lang')) {lang = interaction.options.getString('lang')} else {lang = "en"}
        if (interaction.options.getString('game_type')) {gameType = interaction.options.getString('game_type')} else {gameType = "character"}

        try{ const la = require(`../node_modules/discord.js-akinator/src/translations/${lang}.json`) } 
        catch { return await interaction.reply(l.akinator.error+": \nhttps://github.com/WillTDA/Discord.js-Akinator/tree/master/src/translations .")}

        //const lang = "en"; //The Language of the Game
        //const childMode = false; //Whether to use Akinator's Child Mode
        //const gameType = "character"; //The Type of Akinator Game to Play. ("animal", "character" or "object")
        //const useButtons = true; //Whether to use Discord's Buttons
        //const embedColor = "#1F1E33"; //The Color of the Message Embeds

        akinator(interaction, {
            embedColor: "#00FF00", //Defaults to "RANDOM"
            language: lang, //Defaults to "en"
            childMode: childMode, //Defaults to "false"
            gameType: gameType, //Defaults to "character"
            useButtons: useButtons //Defaults to "false"
        })
    }
}