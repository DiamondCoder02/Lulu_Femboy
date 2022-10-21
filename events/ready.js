const { EmbedBuilder } = require('discord.js'), fs = require('fs'), configData = fs.readFileSync('./config.json', 'utf8')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const packageData = fs.readFileSync('./package.json')
const config = JSON.parse(configData), package = JSON.parse(packageData)
module.exports = {
	name: 'ready',
	once: true,
	execute(arg, client, guildInvites, vanityInvites) {
        console.log(eventFiles)
        client.user.setActivity("Web dashboard testing...")
        //client.user.setActivity("[]~(￣▽￣)~* Learning new commands")
        const Guilds = client.guilds.cache.map(guild => guild.name).join(' / ');
		console.log(`\n -- Logged in as: ` + client.user.tag
            + `\n\t -- Client_ID: ` + client.user.id
            + `\n\t -- Password: ` + config.stopPassword
            + `\n\t -- Debug_level: ` + config.debug_level
            + `\n\t -- Ready at: ` + client.readyAt
            + `\n\t -- Guilds joined: ` + Guilds)
        client.guilds.cache.forEach(guild => {
            guild.invites.fetch().then(invites => {
                const codeUses = new Map();
                invites.each(inv => codeUses.set(inv.code, inv.uses));
                guildInvites.set(guild.id, codeUses);
                if (config.debug_level >= 2) { console.log(`INVITES CACHED ${guild.name}`); }
            }).catch(err => { console.log("Ready invite Error:", err) })

            if (guild.vanityURLCode != null) {
                guild.fetchVanityData().then(invites => {
                    vanityInvites.set(guild.id, invites);
                    if (config.debug_level >= 2) { console.log(`Vanity cached ${guild.name}`); }
                }).catch(err => { console.log("Ready vanity Error:", err) })
            } else { console.log(`Vanity URL: ${guild.name} has no vanity URL`) }
        })
        if (config.botReadyStatus) {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Bot has updated!")
                .setDescription(`Bot has been started:
DebugLevel: ${config.debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`)
            try { 
                const channel = client.channels.cache.find(channel => channel.name === config.botStatusChannel)
                channel.send({embeds: [embed]})
            } catch { 
                try{
                    const channel = client.channels.cache.get(config.botStatusChannel)
                    channel.send({embeds: [embed]})
                } catch {
                    console.log("No status channel given or found. Continuing...")
                }
            }
        }
        if (config.gotNewUpdate) {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Bot has gotten an update: " + package.version)
                .setDescription(`**Bot news:**\n
- You can now disable to get bot updates at the web dashboard (default: ON )
`)
            try{
                client.guilds.cache.forEach(guild => {
                    //todo: make this work
                    client.settings.set(guild.id, true, "enableBotUpdateMessage")
                    if (client.settings.get(guild.id, "enableBotUpdateMessage")) {
                        channel = guild.systemChannel
                        if (channel) { channel.send({embeds: [embed]}) } else {
                            if (client.settings.get(guild.id, "moderationChannel")) {
                                channel = client.channels.cache.get(client.settings.get(guild.id, "moderationChannel"))
                                channel.send({embeds: [embed]})
                            } else {
                                client.users.fetch(guild.ownerId).then(user => { user.send({embeds: [embed]}) })
                            }
                            
                        }
                    }
                })
                config.gotNewUpdate = false
                fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
            } catch(err) { 
                console.log("FATAL ERROR THAT SHOULD NEVER HAPPENED: " + err) 
            }
        }
	}
}