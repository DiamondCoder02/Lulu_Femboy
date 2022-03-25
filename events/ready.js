const config = require('../config.json'), { MessageEmbed } = require('discord.js'), fs = require('fs'), lang = require('../languages/' + config.language + '.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        const channel = client.channels.cache.get(config.bot_status_channelId);
        client.user.setActivity("([]~(￣▽￣)~* Learning new commands")
        console.log(client)
        //client.on("error", (e) => console.error(e))
        //client.on("warn", (e) => console.warn(e))
        //client.on("debug", (e) => console.info(e))
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        const languageFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'));
        console.log(eventFiles)
        console.log(languageFiles)
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(` -- Ready! \n -- Logged in as ${client.user.tag}`
            + "\n\t -- Language: " + config.language
            + "\n\t -- ClientID: " + config.clientId
            + "\n\t -- Password: " + config.stopPassword
            + "\n\t -- Ready at: " + client.readyAt
            + "\n\t -- Guilds: "+ Guilds)
        channel.bulkDelete(1, true).catch(error => {console.error(error)})
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Bot start!')
            .setDescription(`Bot has been started \n<t:${Math.floor(client.readyTimestamp / 1000)}:f> \nThat was <t:${Math.floor(client.readyTimestamp / 1000)}:R>`);
        channel.send({embeds: [embed]})
	}
}