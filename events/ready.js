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
            if (!client.settings.has(guild.id, "redditFeed")) client.settings.set(guild.id, false, "redditFeed")
            if (!client.settings.has(guild.id, "redditFeedSub1")) client.settings.set(guild.id, "", "redditFeedSub1")
            if (!client.settings.has(guild.id, "lastRedditFeedPost1")) client.settings.set(guild.id, "", "lastRedditFeedPost1")
            if (!client.settings.has(guild.id, "redditFeedChannel1")) client.settings.set(guild.id, "", "redditFeedChannel1")
            if (!client.settings.has(guild.id, "redditFeedSub2")) client.settings.set(guild.id, "", "redditFeedSub2")
            if (!client.settings.has(guild.id, "lastRedditFeedPost2")) client.settings.set(guild.id, "", "lastRedditFeedPost2")
            if (!client.settings.has(guild.id, "redditFeedChannel2")) client.settings.set(guild.id, "", "redditFeedChannel2")
            if (!client.settings.has(guild.id, "redditFeedSub3")) client.settings.set(guild.id, "", "redditFeedSub3")
            if (!client.settings.has(guild.id, "lastRedditFeedPost3")) client.settings.set(guild.id, "", "lastRedditFeedPost3")
            if (!client.settings.has(guild.id, "redditFeedChannel3")) client.settings.set(guild.id, "", "redditFeedChannel3")
            if (!client.settings.has(guild.id, "messageLogsBlacklistChannel")) client.settings.set(guild.id, [], "messageLogsBlacklistChannel")
            if (!client.settings.has(guild.id, "messageLogsBlacklistRoles")) client.settings.set(guild.id, [], "messageLogsBlacklistRoles")
            if (!client.settings.has(guild.id, "welcome")) client.settings.set(guild.id, false, "welcome")
            if (!client.settings.has(guild.id, "welcomeUserCheck")) client.settings.set(guild.id, false, "welcomeUserCheck")
            if (!client.settings.has(guild.id, "goodbye")) client.settings.set(guild.id, false, "goodbye")
            if (!client.settings.has(guild.id, "messageLogs")) client.settings.set(guild.id, false, "messageLogs")
            if (!client.settings.has(guild.id, "memberUpdateLogs")) client.settings.set(guild.id, false, "memberUpdateLogs")
            if (!client.settings.has(guild.id, "invitesLogs")) client.settings.set(guild.id, false, "invitesLogs")
            if (!client.settings.has(guild.id, "schedulesLogs")) client.settings.set(guild.id, false, "schedulesLogs")
            if (!client.settings.has(guild.id, "banKickLogs")) client.settings.set(guild.id, false, "banKickLogs")
            if (!client.settings.has(guild.id, "welcomeMessage")) client.settings.set(guild.id, "**Welcome to the server!** \nHope you enjoy your stay! \nThe bot works with only slash commands.\n(nsfw only in nsfw channels)", "welcomeMessage")
            if (!client.settings.has(guild.id, "enableNSFW")) client.settings.set(guild.id, false, "enableNSFW")
            if (!client.settings.has(guild.id, "welcomeRoles")) client.settings.set(guild.id, [], "welcomeRoles")
            if (!client.settings.has(guild.id, "freeRoles")) client.settings.set(guild.id, [], "freeRoles")
            if (!client.settings.has(guild.id, "moderationChannel")) client.settings.set(guild.id, "", "moderationChannel")
            if (!client.settings.has(guild.id, "enableBotUpdateMessage")) client.settings.set(guild.id, true, "enableBotUpdateMessage")
            if (!client.settings.has(guild.id, "enableRandomReactions")) client.settings.set(guild.id, false, "enableRandomReactions")
            if (!client.settings.has(guild.id, "randomReactionChannelBlacklist")) client.settings.set(guild.id, [], "randomReactionChannelBlacklist")
            if (!client.settings.has(guild.id, "singleChannelMessageLogger")) client.settings.set(guild.id, [], "singleChannelMessageLogger")
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

- Reworked entire image posting system
- Reworked nsfw image posting system

- Removed Anime-images command

- Fixed stuff and other internall changes

Sorry for long update, I was busy with university and it was the holidays
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