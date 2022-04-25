const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    guildOnly: true,
    //permissions: "ADMINISTRATOR",
	data: new SlashCommandBuilder()
        .setName('guild_config')
        .setDescription('Configure the bot for your server. Only give one at a time. (No option gives current config)')
        .addSubcommand(subcommand => subcommand.setName('text').setDescription('Configure text settings and also display current settings.')
            .addStringOption(option => option.setName('welcome_message').setDescription('What the welcome message should be.'))
            .addRoleOption(option => option.setName('welcome_role').setDescription('What role for new members.(If empty, no role, but once given you cannot remove, only change it)'))
            .addRoleOption(option => option.setName('add_role').setDescription('What optional rola can people choose from.'))
            .addRoleOption(option => option.setName('remove_role').setDescription('What optional role can people remove.'))
        )
        .addSubcommand(subcommand => subcommand.setName('button').setDescription('Configure button settings.')),
    async execute(interaction, client, config) {
        console.log(interaction.options.getRole('welcome_role'))
        console.log(interaction.options.getRole('add_role'))
        console.log(interaction.options.getRole('remove_role'))
        const a = interaction.options.getRole('welcome_role')
        console.log(a.id + "\n" + a.guild.id)
        try {
            if (interaction.options.getSubcommand() === 'text') {
                if(interaction.options.getString('welcome_message')) {
                    client.settings.set(interaction.guild.id, interaction.options.getString('welcome_message'), "welcomeMessage");
                    return interaction.reply(`Guild configuration item "welcomeMessage" has been changed to: \`${interaction.options.getString('welcome_message')}\``);
                } else if(interaction.options.getRole('welcome_role')) {
                    a = interaction.options.getRole('welcome_role')
                    client.settings.set(interaction.guild.id, a.id, "welcomeRole");
                    return interaction.reply(`Guild configuration item "welcomeRole" has been changed to: \`${a.name}\``);
                }
                else {
                    const guildConf = client.settings.get(interaction.guild.id);
                    let configProps = Object.keys(guildConf).map(prop => { return `${prop}  :  ${guildConf[prop]}` });
                    return interaction.reply(`The following are the server's current configuration:
                    \`\`\`${configProps.join("\n")}\`\`\``);
                }
            }
            if (interaction.options.getSubcommand() === 'button') {
                await interaction.reply({ content:"Loading..." })
                const filter = i => i.user.id === interaction.user.id
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 30000 });
                async function setting(interaction, client) {
                    if (client.settings.get(interaction.guild.id, "welcome")===true) {welc="SUCCESS"} else {welc="DANGER"}
                    if (client.settings.get(interaction.guild.id, "enableNSFW")===true) {nsfw="SUCCESS"} else {nsfw="DANGER"}
                    test = new MessageActionRow().addComponents( 
                        new MessageButton().setCustomId('welcome').setLabel('Display welcome?').setStyle(welc),
                        new MessageButton().setCustomId('enableNSFW').setLabel('NSFW').setStyle(nsfw),
                    )
                    const del = new MessageActionRow().addComponents(new MessageButton().setCustomId('delete').setLabel('Delete message').setStyle('DANGER'))
                    interaction.editReply({content: "Buttons to turn features on and off",components: [test, del]})
                }
                setting(interaction, client);
                collector.on('collect', async i => {
                    if (i.customId === 'delete') {interaction.deleteReply(); collector.stop(); return}
                    if (client.settings.get(interaction.guild.id, i.customId)===true) { client.settings.set(interaction.guild.id, false, i.customId); await interaction.editReply({components: [test]})
                    } else { client.settings.set(interaction.guild.id, true, i.customId); await interaction.editReply({components: [test]})}
                    setting(interaction, client);
                    //await interaction.deleteReply()
                });
                collector.on('end', collected => console.log(`Collected ${collected.size} items`))
            }
        }catch(error) {
            console.log(error)
        }
    }
}