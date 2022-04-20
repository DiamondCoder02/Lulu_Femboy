const config = require('../config.json'), { MessageEmbed } = require('discord.js'), fs = require('fs'), lang = require('../languages/' + config.language + '.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        let con = lang.ready.console_log.split('-')
        let emb = lang.ready.embed.split('-')
        client.user.setActivity(lang.ready.set_activity)
        console.log(client)
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        const languageFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'));
        console.log(eventFiles)
        console.log(languageFiles)
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(`\n --` + con[0] + client.user.tag
            + `\n\t --` + con[1] + config.language
            + `\n\t --` + con[2] + config.clientId
            + `\n\t --` + con[3] + config.stopPassword
            + `\n\t --` + con[4] + client.readyAt
            + `\n\t --` + con[5]+" "+ Guilds)
        const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle(emb[0])
        .setDescription(emb[1] + ` \n<t:${Math.floor(client.readyTimestamp / 1000)}:f> \n${emb[2]} <t:${Math.floor(client.readyTimestamp / 1000)}:R> \n\n` + con[1] + config.language)
        try { 
            const channel = client.channels.cache.find(channel => channel.name === config.botStatusChannel)
            channel.bulkDelete(1, true).catch(error => {console.error(error)})
            return channel.send({embeds: [embed]})
        } catch { 
            try{
                const channel = client.channels.cache.get(config.botStatusChannel) 
                channel.bulkDelete(1, true).catch(error => {console.error(error)})
                return channel.send({embeds: [embed]})
            } catch {
                return console.log("No status channel found. Continuing.")
            }
        }
	}
}