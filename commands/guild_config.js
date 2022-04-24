const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    guildOnly: true,
    permissions: "ADMINISTRATOR",
	data: new SlashCommandBuilder()
        .setName('guild_config')
        .setDescription('Configure the bot for your server. Only give one at a time. (No option gives current config)')
        .addSubcommand(subcommand => subcommand.setName('text').setDescription('Configure text settings and also display current settings.')
            .addStringOption(option => option.setName('welcome_message').setDescription('What the welcome message should be.')))
        .addSubcommand(subcommand => subcommand.setName('button').setDescription('Configure button settings.')),
    async execute(interaction, client, config) {
        try {
            if (interaction.options.getSubcommand() === 'text') {
                if(interaction.options.getString('welcome_message')) {
                    client.settings.set(interaction.guild.id, interaction.options.getString('welcome_message'), "welcomeMessage");
                    return interaction.reply(`Guild configuration item "welcomeMessage" has been changed to: \`${interaction.options.getString('welcome_message')}\``);
                } else {
                    const guildConf = client.settings.get(interaction.guild.id);
                    let configProps = Object.keys(guildConf).map(prop => { return `${prop}  :  ${guildConf[prop]}` });
                    return interaction.reply(`The following are the server's current configuration:
                    \`\`\`${configProps.join("\n")}\`\`\``);
                }
            }
            if (interaction.options.getSubcommand() === 'button') {
                const filter = i => i.user.id === interaction.user.id
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 20000 });
                if (client.settings.get(interaction.guild.id, "welcome")===true) {welc1="SUCCESS"} else {welc1="DANGER"}
                if (client.settings.get(interaction.guild.id, "enableNSFW")===true) {nsfw1="SUCCESS"} else {nsfw1="DANGER"}
                const test1 = new MessageActionRow().addComponents( 
                    new MessageButton().setCustomId('welcome').setLabel('Display welcome?').setStyle(welc1),
                    new MessageButton().setCustomId('enableNSFW').setLabel('NSFW').setStyle(nsfw1),
                )
                interaction.reply({components: [test1]})
                collector.on('collect', async i => {
                    if (client.settings.get(interaction.guild.id, "welcome")===true) {welc="SUCCESS"} else {welc="DANGER"}
                    if (client.settings.get(interaction.guild.id, "enableNSFW")===true) {nsfw="SUCCESS"} else {nsfw="DANGER"}
                    const test = new MessageActionRow().addComponents( 
                        new MessageButton().setCustomId('welcome').setLabel('Display welcome?').setStyle(welc),
                        new MessageButton().setCustomId('enableNSFW').setLabel('NSFW').setStyle(nsfw),
                    )
                    if (client.settings.get(interaction.guild.id, i.customId)===true) {client.settings.set(interaction.guild.id, false, i.customId); await interaction.editReply({components: [test]})} else {client.settings.set(interaction.guild.id, true, i.customId); await interaction.editReply({components: [test]})}
                    //await interaction.deleteReply()
                });
                collector.on('end', collected => console.log(`Collected ${collected.size} items`))
            }
        }catch(error) {
            console.log(error)
        }
    }
}