const { SlashCommandBuilder } = require('@discordjs/builders')
const HMfull = require("hmfull");
module.exports = {
    cooldown: 60,
    hasNSFW: true,
	data: new SlashCommandBuilder()
        .setName('hentai')
        .setDescription('HENTAI!')
    ,
    async execute(interaction, client, config) {
        if(client.settings.get(interaction.guild.id, "enableNSFW")) { if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!")} } else {return interaction.reply("Not Safe For Work commands are disabled!")}
        let res = await HMfull.Nekos.sfw.hug()
        console.log(res)
        console.log(res.url); 
    }
}