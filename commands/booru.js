const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const Booru = require('booru'), { BooruError } = require('booru');
module.exports = {
	cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('booru')
        .setDescription("Search imageboards for a picture")
        .addStringOption(option => option.setName('sites').setDescription("Sites to search")
            .addChoices(
                { name: "e621.net 18+", value: 'e621' },
                { name: "e926.net <18", value: 'e926' },
                //{ name: "hypnohub.net 18+ (🚫tag)", value: 'hypnohub' },
                //{ name: "danbooru.donmai.us 18+ (🚫tag)", value: 'danbooru' },
                { name: "konachan.com 18+", value: 'konac' },
                { name: "konachan.net <18", value: 'konan' },
                { name: "yande.re 18+", value: 'yandere' },
                //random false unless a tag is given:
                { name: "gelbooru.com 18+", value: 'gelbooru' },
                { name: "rule34.xxx 18+", value: 'rule34' },
                { name: "safebooru.org <18", value: 'safebooru' },
                { name: "tbib.org <18", value: 'tbib' },
                { name: "xbooru.com 18+", value: 'xbooru' },
                { name: "rule34.paheal.net 18+ (🚫tag)", value: 'paheal' },
                { name: "derpibooru.org 18+", value: 'derpibooru' },
                { name: "realbooru.net 18+", value: 'realbooru' }
            )
            .setRequired(true)
        )
        .addStringOption(option => option.setName('tags').setDescription("Tags to search for (separate multiple with space)"))
        .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10)),
    async execute(interaction, client) {
        const sites = interaction.options.getString('sites').trim()
        if (sites=='e926' || sites=='konan' || sites=="safebooru" || sites=="tbib" || sites=="hypnohub" || sites=="danbooru"|| sites=="paheal") { }
        else { if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply({content: "Sorry, this is a Not Safe For Work command!"})} } else {return interaction.reply({content: "Not Safe For Work commands are disabled!"})}  }
        if (!interaction.options.getString('tags') && (sites==('gelbooru') || sites==('rule34') || sites==('safebooru') || sites==('tbib') || sites==('xbooru') || sites==('derpibooru') || sites==('realbooru'))) { return interaction.reply({content: "Please give me a tag to find a random picture."}) }
        else if(!interaction.options.getString('tags')) {tags = ""}
        else { tags = interaction.options.getString('tags').trim().split(' ')}
        if (interaction.options.getString('tags') && (sites=='hypnohub' || sites=='danbooru' || sites=="paheal")) { return interaction.reply({content: "Please don't use tags with this site"}) }
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        for (let a = 0; a < amount; a++) {
            await booruSearch(sites, tags, 1, true).catch(err => { 
                if (err instanceof BooruError) { a=amount; console.error("-"+err) } 
                else { console.error(err); a=amount ; return interaction.reply({content: "Something went wrong. Make sure you wrote the tag correctly by seperating them with spaces."})}
            })
            await wait(2000);
        }
        async function booruSearch(sites, tags, limit = 1, random = true) {
            const posts = await Booru.search(sites, tags, {limit, random})
            if (Number(posts.length) === 0) { return interaction.reply({content: "Something went wrong. Make sure you wrote the tag correctly by seperating them with spaces."}) }
            //console.log(posts +"\n"+ posts.length)
            //Rating: s: 'Safe' q: 'Questionable' e: 'Explicit' u: 'Unrated'
            if (posts.first.rating == 's') { r = "Safe"}
                else if (posts.first.rating == 'q') { r = "Questionable"}
                else if (posts.first.rating == 'e') { r = "Explicit"}
                else if (posts.first.rating == 'u') { r = "Unrated"} 
                else { r = "-"}
            if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText && (posts.first.rating == 'e' || posts.first.rating == 'q')) {
                return interaction.reply({content: "Sorry this is an explixit or questionable picture that got somehow sent here. This is wholesome only chat :3"})
            }
            const embed = new EmbedBuilder()
                .setTitle("🌐"+sites +" ("+ posts.first.booru.domain+")")
                .setColor('#A020F0')
                .setAuthor({ name: posts.first.booru.domain, url: "https://"+posts.first.booru.domain })
                .addFields(
                    { name: "⚖️ Rating:", value: r, inline: true },
                    { name: "🔍 Searched for:", value: "*"+tags+"*", inline: true }
                )
                .setTimestamp()
            if (posts.first.tags.join(', ').length > 1000) {embed.addFields( { name: "📄"+"Tags: ", valve: "`"+posts.first.tags.join(', ').substring(0,999)+"...`" } )} else {embed.addFields( { name: "📄"+"Tags: ", value: "`"+posts.first.tags.join(', ')+"`" } )}
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setURL(posts[0].fileUrl).setLabel('Link').setStyle(ButtonStyle.Link).setEmoji('🖥️'),
                //new ButtonBuilder().setCustomId('delete').setLabel(lang.d).setStyle(ButtonStyle.Danger).setEmoji('✖️')
            )
            //const filter = i => i.user.id === interaction.user.id;
            //const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 30000 });
            //collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
            if (posts[0].fileUrl.includes(".webm") || posts[0].fileUrl.includes(".mp4")|| posts[0].fileUrl.includes(".gif")) {
                try { 
                    await interaction.followUp({embeds: [embed], components: [buttons]})
                    await interaction.followUp({content: posts[0].fileUrl}); 
                } catch { 
                    await interaction.reply({embeds: [embed], components: [buttons]})
                    await interaction.followUp({content: posts[0].fileUrl}); 
                }
            } else {
                await embed.setImage(posts[0].fileUrl)
                try { await interaction.followUp({embeds: [embed], components: [buttons]}) }
                catch { await interaction.reply({embeds: [embed], components: [buttons]}) }
            }
        }
    }
};