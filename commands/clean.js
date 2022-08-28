const { SlashCommandBuilder } = require('@discordjs/builders'), { ButtonBuilder, Message, PermissionsBitField } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
    guildOnly: true,
    permissions: PermissionsBitField.Flags.ManageMessages,
	data: new SlashCommandBuilder()
        .setName('clean')
		.setDescription("Clean/Purge/Prune up to 99 messages")
        .addIntegerOption(option => option.setName('amount').setDescription("Amount of messages to delete").setMinValue(0).setMaxValue(99).setRequired(true))
        .addUserOption(option => option.setName('user').setDescription("Delete messages from a specific user"))
        .addBooleanOption(option => option.setName('whole_server').setDescription("If true it will delete user messages from everywhere"))
        .addChannelOption(option => option.setName('channel').setDescription("Delete messages from a specific channel")),
	async execute(interaction, client, config) {
        const amount = interaction.options.getInteger('amount');
        if (amount == 0) {return interaction.reply({ content: "You stupid >_<'"})}
        const user = interaction.options.getUser('user');
        const whole_server = interaction.options.getBoolean('whole_server');
        const channel = interaction.options.getChannel('channel');
        console.log(amount)
        console.log(user)
        console.log(whole_server)
        console.log(channel)
        try{
            const cha = await client.channels.cache.get(interaction.channel.id) 
            if (whole_server == true) {

            } else if (user == null && whole_server == null && channel !== null) {
                const deletec = client.channels.cache.get(channel.id) 
                await deletec.bulkDelete(amount).catch(error => {console.error(error)})
                return interaction.reply({ content: `\`${amount}\`` + " messages deleted from #"+ channel.name})
            } else if (channel == null && whole_server == null && user !== null) {
                /*
                async function purgeMemberMessages(
                    memberId, 
                    limit, 
                    timeout = 60000
                ) {
                    // Get all messages posted by the given user with a limit
                    let messagesCollection = await interaction.channel.awaitMessages({
                        filter: m => m.author.id === memberId,
                        max: limit,
                        time: timeout
                    });
                    // Convert the collection to an array
                    let messages = Array.from(messagesCollection.values());
                    // Delete each message
                    for (let message of messages) {
                        await message.delete();
                    }
                }
                await purgeMemberMessages(user.id, amount);
                */
                
                console.log(cha)
                console.log(cha.messages.fetch())
                const userMessages = (await interaction.channel.messages.fetch()).filter((m) => m.author.id === user.id);
                console.log(userMessages)

                console.log("test1")
                let target = []
                await interaction.channel.messages.fetch().then((mes) => { 
                    mes.filter(m => m.author.id === user.id).forEach(m => target.push(m))
                    console.log(target)
                    target.slice(0, amount)
                    console.log("test2")
                    let messages = Array.from(target.values());
                    console.log("test22")
                    // Delete each message
                    for (let message of messages) {
                        console.log("test23")
                        message.delete();
                        console.log("test21")
                    }
                })
                //await interaction.channel.bulkDelete(userMessages)
                console.log("test3")
                return interaction.reply({ content: `\`${amount}\`` + " messages deleted from " + user.tag})
            } else if (user == null && whole_server == null && channel == null) {
                await interaction.channel.bulkDelete(amount)
                return interaction.reply({ content: `\`${amount}\`` + " messages deleted from this channel"})
            } else {
                return interaction.reply({ content: "Something went wrong, try with other settings"})
            }
        } catch (e) {
            console.log("Clean error: ", e)
        }
	},
};
/*
const amount = interaction.options.getInteger('amount');
const user = interaction.options.getUser('user');

if (user) {
    const target = (await interaction.channel.messages.fetch({ limit:amount })).filter(m => m.author.id === user.id)
    await interaction.channel.bulkDelete(target, true)
    return interaction.reply({ content: pr[1] + `\`${amount}\` (${user})` + pr[2]})
} else {

await interaction.channel.bulkDelete(amount, true)
return interaction.reply({ content: pr[1] + `\`${amount}\`` + pr[2]})
}
*/