const { EmbedBuilder, Client, PermissionsBitField } = require('discord.js'), fs = require('fs'), configData = fs.readFileSync('./botConfigs/config.json', 'utf8')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const packageData = fs.readFileSync('./package.json')
const config = JSON.parse(configData), package = JSON.parse(packageData)
const botStat = require('../botConfigs/bot_private.json', 'utf8'); const SetAct = botStat.botStatus
var dbd_domain = process.env.DBdomain;
try{ if (config.dbd_domain == ".http://localhost/") { dbd_dom = dbd_domain } else dbd_dom = config.dbd_domain }catch{ return console.log("dbd_domain error")}
module.exports = {
	name: 'ready',
	once: true,
	execute(arg, client, guildInvites, vanityInvites) {
        console.log(eventFiles)
        client.user.setActivity("Nya~")
        setInterval(() => {
            let status = SetAct[Math.floor(Math.random() * SetAct.length)]
            client.user.setActivity(status)
            console.log("I am now " + status)
        }, 10800000)

        //Needs better way, but this checks for all values in guild
        client.guilds.cache.forEach(guild => {
            //add if needed
            console.log("Enmap check done for " + guild.name)
        })

        const Guilds = client.guilds.cache.map(guild => guild.name).join(' / ');
		console.log(`\n -- Logged in as: ` + client.user.tag
            + `\n\t -- Client_ID: ` + client.user.id
            + `\n\t -- Password: ` + config.stopPassword
            + `\n\t -- Debug_level: ` + config.debug_level
            + `\n\t -- Ready at: ` + client.readyAt
            + `\n\t -- Guilds joined: ` + Guilds)
        client.guilds.cache.forEach(guild => {
            //check if bot has permissions to view invites
            const nya = guild.members.cache.get(client.user.id)
            if(nya.permissions.has(PermissionsBitField.Flags.ManageGuild)){
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
            } else { console.log(`Ready invite Error: Missing permissions to view invites in ${guild.name}`) }
        })
        if (config.botReadyStatus) {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Bot has started!")
                .setDescription(`Bot info:
DebugLevel: ${config.debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`)
            try{
                const channel = client.channels.cache.get(config.botStatusChannelId)
                channel.send({embeds: [embed]})
            } catch {
                console.log("No status channel ID given or found. Continuing...")
            }
        }
        if (config.gotNewUpdate) {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("Bot has gotten an update: " + package.version)
                .setDescription(`**Bot news:**
__*If you don't want to see this message, set enableBotUpdateMessage to false on the website.*__
\n
- Added Reddit feed (configurable on the website)
    + currently only up to 3 subreddits
    + Gets refreshed every 30 seconds
- Added more activity statuses
- Added ttt (Tic Tac Toe) option to the games command
- Added message logger exception for channels and/or roles

- Update the website a bit

- Removed Anime-images command

- Fixed stuff and other internall changes

Sorry for long update, I was busy with university and it was the holidays

__Also:__ The bot reached more than 75 servvers! Thank you all for using the bot!
I will be verifying it soon.
`)
            .addFields(
                { name: 'Website:', value: `${dbd_dom}`, inline: true },
                { name: 'Support server', value: `https://discord.gg/DcQS9mNEUh`, inline: true },
            )
            .setFooter("Bug/feature report form: https://forms.gle/ebD1edtbir2gDgAn9")
            try{
                client.guilds.cache.forEach(guild => {
                    if (client.settings.get(guild.id, "enableBotUpdateMessage")) {
                        channel = guild.systemChannel
                        if (channel) { channel.send({embeds: [embed]}) } 
                        else {
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