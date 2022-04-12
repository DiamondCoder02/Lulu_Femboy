const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Booru = require('booru'), { BooruError } = require('booru');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), s = lang.booru.slash.split('-') , e = lang.booru.embed.split('-')
module.exports = {
	//guildOnly: true,
	cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('booru')
        .setDescription(s[0])
        .addStringOption(option => option.setName('sites').setDescription(s[1])
            .addChoice('e621.net 18+', 'e621')
            .addChoice('e926.net <18', 'e926')
            //.addChoice('hypnohub.net 18+', 'hypnohub')
            //.addChoice('danbooru.donmai.us 18+', 'danbooru')
            .addChoice('konachan.com 18+', 'konac')
            .addChoice('konachan.net <18', 'konan')
            .addChoice('yande.re 18+', 'yandere')
            .addChoice('gelbooru.com 18+', 'gelbooru')
            .addChoice('rule34.xxx 18+', 'rule34')
            .addChoice('safebooru.org <18', 'safebooru')
            .addChoice('tbib.org <18', 'tbib')
            .addChoice('xbooru.com 18+', 'xbooru')
            //.addChoice('rule34.paheal.net 18+', 'paheal')
            .addChoice('derpibooru.org 18+', 'derpibooru')
            .addChoice('realbooru.net 18+', 'realbooru')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('tags').setDescription(s[2]).setRequired(true))
        .addNumberOption(option => option.setName('repeat').setDescription(s[3]).setMinValue(1).setMaxValue(10)),
    async execute(interaction) {
        const sites = interaction.options.getString('sites').trim()
        if (sites=='e926' || sites=='konan' || sites=="safebooru" || sites=="tbib") { }
        else { if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { return interaction.reply(lang.nsfw) } }
        const tags = interaction.options.getString('tags').trim().split(' ')
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        for (let a = 0; a < amount; ) {
            async function booruSearch(sites, tags, limit = 1, random = true) {
                const posts = await Booru.search(sites, tags, {limit, random})
                if (posts.length === 0) { try{return interaction.followUp({content: lang.booru.err})}catch{return interaction.reply({content: lang.booru.err})} }
                const tag = posts.first.tags.join(', ').length
                if (posts.first.tags.join(', ').length > 1000) { try{return interaction.followUp({content: lang.booru.long_tag})}catch{return interaction.reply({content: lang.booru.long_tag})}}
                //console.log(posts +"\n"+ posts[0].fileUrl)
                try{ 
                    //Rating: s: 'Safe' q: 'Questionable' e: 'Explicit' u: 'Unrated'
                    if (posts.first.rating == 's') { r = e[0]}
                    if (posts.first.rating == 'q') { r = e[1]}
                    if (posts.first.rating == 'e') { r = e[2]}
                    if (posts.first.rating == 'u') { r = e[3]}
                } catch(e) { r = "-"}
                const embed = new MessageEmbed()
                    .setTitle("🌐"+sites +" ("+ posts.first.booru.domain+")")
                    .setColor('#ff0000')
                    .setAuthor({ name: posts.first.booru.domain, url: "https://"+posts.first.booru.domain })
                    .addField("⚖️"+e[4], r, true)
                    .addField("🔍"+e[5], "*"+tags+"*", true)
                    .addField("📄"+"Tags: ", "`"+posts.first.tags.join(', ')+"`")
                    .setTimestamp()
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton().setURL(posts[0].fileUrl).setLabel('Link').setStyle('LINK').setEmoji('🖥️'))
                if (posts[0].fileUrl.includes(".webm") || posts[0].fileUrl.includes(".mp4")|| posts[0].fileUrl.includes(".gif")) {
                    try{ await interaction.reply({embeds: [embed], components: [buttons]})
                    }catch{ await interaction.followUp({embeds: [embed], components: [buttons]})}
                    await interaction.followUp({content: posts[0].fileUrl});
                } else {
                    await embed.setImage(posts[0].fileUrl)
                    try{ await interaction.reply({embeds: [embed], components: [buttons]});
                    }catch{ await interaction.followUp({embeds: [embed], components: [buttons]}); }
                }
            }
            booruSearch(sites, tags, 1, true).catch(err => { 
                if (err instanceof BooruError) { console.error(err) } 
                else { console.error(err) ; try{return interaction.followUp({content: lang.booru.error})}catch{return interaction.reply({content: lang.booru.error})} }
            })
            a+=1
            await wait(1500);
        }
    }
};