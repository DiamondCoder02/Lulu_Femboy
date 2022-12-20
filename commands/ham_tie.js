const { SlashCommandBuilder } = require('@discordjs/builders')
const HMfull = require("hmfull");
module.exports = {
    cooldown: 60,
    guildOnly: true,
    hasNSFW: true,
	data: new SlashCommandBuilder()
        .setName('ham_tie')
        .setDescription('wholesome :3')
    ,
    async execute(interaction, client, config) {
        let res = await HMfull.Nekos.sfw.hug()
        console.log(res)
        console.log(res.url); 
    }
}