const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a problem to admins or report a bot bug to me.')
        .addSubcommand(subcommand => subcommand.setName('guild').setDescription('If there is a problem with the guild or any member, report it here.')
            .addStringOption(option => option.setName('problem_with').setDescription('What is the problem with?')
                .addChoices(
                    { name: "Rules", value: 'rule' },
                    { name: "User", value: 'user' },
                    { name: "Channel", value: 'channel' },
                    { name: "Voice", value: 'voice' },
                    { name: "Role", value: 'role' },
                    { name: "Other", value: 'other' }
                ).setRequired(true)
            )
            .addStringOption(option => option.setName('description').setDescription('Describe the problem.').setRequired(true))
            .addUserOption(option => option.setName('reporter').setDescription('If you want to get notified/credited for reporting.'))
            .addStringOption(option => option.setName('description_2').setDescription('If you want to add more details, describe them here.'))
            .addStringOption(option => option.setName('fix').setDescription('Do you have a fix? If so, describe it here.'))
        )
        .addSubcommand(subcommand => subcommand.setName('bot_bug').setDescription('If there is a bug in the bot, report it to bot owner.')
            .addStringOption(option => option.setName('problem_with').setDescription('What is the problem with?')
                .addChoices(
                    { name: "Command_error", value: 'commandError' },
                    { name: "Event_error", value: 'eventError' },
                    { name: "Language_error", value: 'languageError' },
                    { name: "Command_feature", value: 'commandFeature' },
                    { name: "Event_feature", value: 'eventFeature' },
                    { name: "Other", value: 'otherError' }
                ).setRequired(true)
            )
            .addStringOption(option => option.setName('description').setDescription('Describe the problem.').setRequired(true))
            .addUserOption(option => option.setName('reporter').setDescription('If you want to get notified about the fix, select yourself.'))
            .addStringOption(option => option.setName('description_2').setDescription('If you want to add more details, describe them here.'))
            .addStringOption(option => option.setName('fix').setDescription('Do you have a fix? If so, describe it here.'))
        ),
    async execute(interaction, client, config) {
        try {
            const reporter = interaction.options.getUser('reporter');
            const problem_with = interaction.options.getString('problem_with');
            const description = interaction.options.getString('description');
            const description_2 = interaction.options.getString('description_2');
            const fix = interaction.options.getString('fix');
            const report = new EmbedBuilder()
                .setDescription(description + '\n' + (description_2? description_2:"-") + '\n\n**Fix:**\n' + (fix? fix:"-"))
                .setColor(0xFF0000)
                .addFields( { name: 'Reported by ID:', value: `${interaction.user.id}`, inline: true } )
                .setTimestamp()
                .setFooter({ text: `React with emoji to delete` });
            if (reporter) {
                report.setAuthor({ name: `Reported by ${String(reporter.tag)}`, iconURL: reporter.displayAvatarURL()})
                    .setThumbnail(reporter.displayAvatarURL());
            }
            if (interaction.options.getSubcommand() === 'guild') {
                report.setTitle('Guild Report about ' + problem_with);
                if (client.settings.get(interaction.guild.id, "moderationChannel")) {channel = client.channels.cache.get(client.settings.get(interaction.guild.id, "moderationChannel"))} else {channel = interaction.guild.systemChannel}
                if (channel) {
                    await channel.send({embeds: [report]})
                    await interaction.reply({content: "Report has been sent to moderators", ephemeral: true})
                } else {
                    console.log("Unable to find a channel to send the report to for " + interaction.guild.name)
                    await interaction.reply({content: "No admin channel found, please contact mods directly", ephemeral: true})
                }
            }
            if (interaction.options.getSubcommand() === 'bot_bug') {
                report.setTitle('Bot Bug Report' + '\n' + problem_with);
                try{
                    const config = require('../config.json')
                    require('dotenv').config(); var b_o_Id = process.env.botOwnerId;
                    if(config.botOwnerId === "botOwnerID"){
                        const user = await client.users.fetch(b_o_Id);
                        await user.send({embeds: [report]})
                    } else {
                        const user = await client.users.fetch(config.botOwnerId);
                        await user.send({embeds: [report]})
                    }
                    await interaction.reply({content: "Report has been sent to bot owner", ephemeral: true})
                } catch {
                    console.log("Unable to find a channel to send the report to.")
                    await interaction.reply({content: "No bot owner found, unable to report anything", ephemeral: true})
                }
            }
        }catch(error) {
            console.log(error)
        }
    }
}