const { EmbedBuilder, Client, PermissionsBitField } = require('discord.js'), fs = require('fs')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const botStat = require('../botConfigs/bot_private.json', 'utf8'); const SetAct = botStat.botStatus
var stopPassword = process.env.stopPassword;
var debug_level = process.env.debug_level;
var botStatusChannelId = process.env.botStatusChannelId;
module.exports = {
	name: 'ready',
	once: true,
	execute(arg, client, guildInvites, vanityInvites) {
        console.log(eventFiles)
        client.user.setActivity("Nya~")
        setInterval(() => {
            let status = SetAct[Math.floor(Math.random() * SetAct.length)]
            client.user.setActivity(status)
        }, 10800000)

        //Needs better way, but this checks for all values in guild
        client.guilds.cache.forEach(guild => {
            //add if needed
            console.log("Enmap check done for " + guild.name)
        })

        client.guilds.cache.forEach(guild => {
            //check if bot has permissions to view invites
            const nya = guild.members.cache.get(client.user.id)
            if(nya.permissions.has(PermissionsBitField.Flags.ManageGuild)){
                guild.invites.fetch().then(invites => {
                    const codeUses = new Map();
                    invites.each(inv => codeUses.set(inv.code, inv.uses));
                    guildInvites.set(guild.id, codeUses);
                    if (debug_level >= 2) { console.log(`INVITES CACHED ${guild.name}`); }
                }).catch(err => { console.log("Ready invite Error:", err) })
                if (guild.vanityURLCode != null) {
                    guild.fetchVanityData().then(invites => {
                        vanityInvites.set(guild.id, invites);
                        if (debug_level >= 2) { console.log(`Vanity cached ${guild.name}`); }
                    }).catch(err => { console.log("Ready vanity Error:", err) })
                } else { console.log(`Vanity URL: ${guild.name} has no vanity URL`) }
            } else { console.log(`Ready invite Error: Missing permissions to view invites in ${guild.name}`) }
        })

        console.log(`\n -- Logged in as: ` + client.user.tag
            + `\n\t -- Client_ID: ` + client.user.id
            + `\n\t -- Password: ` + stopPassword
            + `\n\t -- Debug_level: ` + debug_level
            + `\n\t -- Ready at: ` + client.readyAt)

        const embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle("Bot has started!")
            .setDescription(`Bot info:
DebugLevel: ${debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`)
        try{
            const channel = client.channels.cache.get(botStatusChannelId)
            channel.send({embeds: [embed]})
        } catch {
            console.log("No status channel ID given or found. Continuing...")
        }
	}
}