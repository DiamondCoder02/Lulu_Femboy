//lewd command (Gihub Copilot)
const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const Booru = require('booru'), { BooruError } = require('booru')
module.exports = {
	//guildOnly: true,
	cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('booru')
        .setDescription('Search booru for a picture')
        .addStringOption(option => option.setName('sites').setDescription('Sites to search')
            .addChoice('e621.net 18+', 'e621')
            .addChoice('e926.net <18', 'e926')
            .addChoice('hypnohub.net 18+', 'hypnohub')
            .addChoice('danbooru.donmai.us 18+', 'danbooru')
            .addChoice('konachan.com 18+', 'konac')
            .addChoice('konachan.net <18', 'konan')
            .addChoice('yande.re 18+', 'yandere')
            .addChoice('gelbooru.com 18+', 'gelbooru')
            .addChoice('rule34.xxx 18+', 'rule34')
            .addChoice('safebooru.org <18', 'safebooru')
            .addChoice('tbib.org <18', 'tbib')
            .addChoice('xbooru.com 18+', 'xbooru')
            .addChoice('rule34.paheal.net 18+', 'paheal')
            .addChoice('derpibooru.org 18+', 'derpibooru')
            .addChoice('realbooru.net 18+', 'realbooru')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('tags').setDescription('Tags to search for').setRequired(true))
        .addNumberOption(option => option.setName('repeat').setDescription('Amount: If you want to get more than one at a time.').setMinValue(1).setMaxValue(10)),
    async execute(interaction, client, config, lang) {
        if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { interaction.reply(lang.nsfw); return }
        const sites = interaction.options.getString('sites')
        const tags = interaction.options.getString('tags')
        //console.log(sites + "\n" + tags + "\n" + repeat)
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        for (let a = 0; a < amount; ) {
            async function booruSearch(sites, tags, limit = 1, random = true) {
                const posts = await Booru.search(sites, tags, {limit, random})
                const embed = new MessageEmbed()
                    .setTitle(sites)
                    .setColor('#ff0000')
                    .setDescription('Searching for ' + tags + ' on ' + sites)
                    .setImage(posts[0].fileUrl)
                    .setTimestamp()
                try{
                    await interaction.reply({embeds: [embed]})
                    console.log(posts[0].fileUrl)
                }catch{
                    await wait(1000)
                    await interaction.followUp({embeds: [embed]})
                    console.log(posts[0].fileUrl)
                }
            }
            booruSearch(sites, tags, 1, true).catch(err => { 
                if (err instanceof BooruError) { console.error(err) } 
                else { interaction.reply({content: "Something went wrong. Make sure you wrote the tag and chosen the correct site."});console.error(err) }
            })
            a+=1
        }
    }
};