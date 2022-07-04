const config = require('../config.json'), { MessageEmbed } = require('discord.js'), fs = require('fs')
const lang = require('../languages/' + config.language + '.json'), con = lang.ready.console_log.split('-'), emb = lang.ready.embed.split('-')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')), languageFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'));
module.exports = {
	name: 'ready',
	once: true,
	execute(arg, client, guildInvites) {
        client.guilds.cache.forEach(guild => {
            guild.invites.fetch().then(invites => {
                if (config.debug_level >= 2) { console.log(`INVITES CACHED ${guild.name}`); }
                const codeUses = new Map();
                invites.each(inv => codeUses.set(inv.code, inv.uses));
                guildInvites.set(guild.id, codeUses);
            }).catch(err => { console.log("Ready Error:", err) })
        })
        console.log(eventFiles); console.log(languageFiles)
        client.user.setActivity(lang.ready.set_activity)
        const Guilds = client.guilds.cache.map(guild => guild.name).join(' / ');
		console.log(`\n --` + con[0] + client.user.tag
            + `\n\t --` + con[1] + config.language
            + `\n\t --` + con[2] + config.clientId
            + `\n\t --` + con[3] + config.stopPassword
            + `\n\t --` + con[4] + client.readyAt
            + `\n\t --` + con[5]+" "+ Guilds)
        return
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
                return console.log(lang.ready.no_status)
            }
        }
	}
}