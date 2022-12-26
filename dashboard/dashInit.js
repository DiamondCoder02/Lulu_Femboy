const { Client, ChannelType } = require('discord.js'), config = require('../botConfigs/config.json');
const package = require('../package.json');
/* --- PRE_DASHBOARD --- */
const DarkDashboard = require('dbd-dark-dashboard');
let DBD = require('discord-dashboard');
var cliId = process.env.cid;
var cliSecret = process.env.ClientSecret;
var dbd_key = process.env.dbd;
var dbd_domain = process.env.DBdomain;
var dbd_redirect = process.env.DBredirect;
try{ if (config.clientId == "clientId") { clientID = String(cliId) } else clientID = String(config.clientId) }catch{ return console.log("clientID error")}
try{ if (config.clientSecret == "clientSecret") { cSec = cliSecret } else cSec = config.clientSecret }catch{ return console.log("clientSecret error")}
try{ if (config.dbd_license == "dbd_license") { dbd_lic = dbd_key } else dbd_lic = config.dbd_license }catch{ return console.log("dbd_license error")}
try{ if (config.dbd_domain == ".http://localhost/") { dbd_dom = dbd_domain } else dbd_dom = config.dbd_domain }catch{ return console.log("dbd_domain error")}
try{ if (config.dbd_redirect == ".http://localhost/discord/callback") { dbd_red = dbd_redirect } else dbd_red = config.dbd_redirect }catch{ return console.log("dbd_redirect error")}

module.exports = {
    /**
     * @param {Client} client 
     */
    async execute(arg, client, commandFuck) {
        let commandList = []
        let hasNsfw = []
        let needsPerms = []
        CommandPushDashboard(commandFuck, commandList, hasNsfw, needsPerms)
        await DBD.useLicense(dbd_lic);
        DBD.Dashboard = DBD.UpdatedClass();
        const Dashboard = new DBD.Dashboard({
            port: 80,
            client: {
                id: client.user.id,
                secret: cSec
            },
            redirectUri: dbd_red,
            domain: dbd_dom,
            bot: client,
            requiredPermissions: [DBD.DISCORD_FLAGS.Permissions.MANAGE_GUILD, DBD.DISCORD_FLAGS.Permissions.ADMINISTRATOR],
            useCategorySet: true,
            theme: DarkDashboard({
                information: {
                    createdBy: "DiamondCoder",
                    websiteTitle: `${client.user.username} discord bot`,
                    websiteName: `${client.user.username} bot`,
                    websiteUrl: "https://github.com/DiamondPRO02/Femboi_OwO",
                    dashboardUrl: "http://localhost:3000/",
                    supporteMail: "femboyowo.supp@gmail.com",
                    supportServer: "https://discord.gg/DcQS9mNEUh",
                    imageFavicon: "https://i.imgur.com/GrXR9z8.png",
                    iconURL: "https://i.imgur.com/GrXR9z8.png",
                    loggedIn: "Successfully signed in OwO.",
                    mainColor: "#2CA8FF",
                    subColor: "#ebdbdb",
                    preloader: "Loading UwU..."
                },
                sidebar: {
                    keepDefault: true,
                    list: [{
                        icon: `<svg style="position: absolute; margin-left: 8px; margin-top: 2px;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2CA8FF">    <path d="M0 0h24v24H0z" fill="none"/> <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0  0 0 1.74-1 10 10 0 0 0-.27-10.44z"/> <path d="M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>`,
                        title: "Terms & Service",
                        link: "https://www.termsofservicegenerator.net/live.php?token=uShWSqnDh7ZZsR18uM93ohdVVLfGAMQr",
                        id: "term_service",
                    }]
                },
                index: {
                    card: {
                        category: `${client.user.tag} Discord bot control panel`,
                        title: `Welcome to the ${client.user.tag} control panel. You can edit options.`,
                        image: `https://i.imgur.com/bYYjIZC.png`,
                        footer: "Last edit: 26.12.2022",
                    },
                    information: {
                        category: "Info",
                        title: `Information about the bot.`,
                        description: `After a couple of failed bots, I'm planning making this as a project I'm not gonna abondon quickly. 
                        This bot only works with slash commands. 
                        NSFW commands only works in nsfw channels.`,
                        footer: "Last edit: 26.12.2022",
                    },
                    feeds: {
                        category: "News",
                        title: `Version: ${package.version}`,
                        description: `Soon TM`,
                        footer: "Last edit: 26.12.2022",
                    },
                },
                commands: [
                    {
                        category: `Slash commands ＼(ﾟｰﾟ＼)`,
                        subTitle: `Here is all the "/" command that should be possible ( Cooldown:⌛ )`,
                        aliasesDisabled: true,
                        list: commandList,
                    },
                    {
                        category: `Permission based commands`,
                        subTitle: `All the commands that require permissions to use`,
                        aliasesDisabled: true,
                        list: needsPerms,
                    },
                    {
                        category: `Nsfw commands`,
                        subTitle: `Not safe for work commands ( Cooldown:⌛ )`,
                        aliasesDisabled: true,
                        list: hasNsfw,
                    },
                ],
                guilds: {
                    cardTitle: "Guilds []~(￣▽￣)~*",
                    cardDescription: "Here are all the guilds you currenly have permissions for:",
                    type: "tablelist"
                },
                popupMsg: {
                    savedSettings: "Settings saved UwU", 
                    noPerms: "Error, sowwy >.<",
                },
            }),
            settings: [
                {
                    categoryId: 'basic',
                    categoryName: "Basic",
                    categoryDescription: "Some basic settings",
                    getActualSet: async ({guild}) => {
                        return [
                            // optionId, must be EXACTLY the same
                            { optionId: "welcome", data: client.settings.get(guild.id, "welcome") || null },
                            { optionId: "goodbye", data: client.settings.get(guild.id, "goodbye") || null },
                            { optionId: "welcomeMessage", data: client.settings.get(guild.id, "welcomeMessage") || null },
                            { optionId: "enableRandomReactions", data: client.settings.get(guild.id, "enableRandomReactions") || null },
                            { optionId: "enableBotUpdateMessage", data: client.settings.get(guild.id, "enableBotUpdateMessage") || null },
                        ]
                    },
                    setNew: async ({guild,data}) => { // data = [ { optionId: 'lang', data: 'fr' } ]
                        for(const option of data) {
                            if(option.optionId === "welcome") client.settings.set(guild.id, option.data, "welcome");
                            if(option.optionId === "goodbye") client.settings.set(guild.id, option.data, "goodbye");
                            if(option.optionId === "welcomeMessage") client.settings.set(guild.id, option.data, "welcomeMessage");
                            if(option.optionId === "enableRandomReactions") client.settings.set(guild.id, option.data, "enableRandomReactions");
                            if(option.optionId === "enableBotUpdateMessage") client.settings.set(guild.id, option.data, "enableBotUpdateMessage");
                        } 
                        // Errors still work!
                        // Allowed check still works, but needs to be on the option itself, not the category.
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'welcome',
                            optionName: "Welcome / goodbye message",
                            optionDescription: "Welcome message when someone joins",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'goodbye',
                            optionDescription: "Goodbye message when someone leaves",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                        {
                            optionId: 'welcomeMessage',
                            optionDescription: "Max 999 word welcome message when someone joins",
                            optionType: DBD.formTypes.textarea("Max 999 word welcome message", 1, 999, false),
                        },
                        {
                            optionId: 'enableRandomReactions',
                            optionDescription: "Should the bot react to messages randomly?",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'enableBotUpdateMessage',
                            optionDescription: "Should the bot send a message when it gets an updates?",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                    ]
                },
                {
                    categoryId: 'channels',
                    categoryName: "Channels settings",
                    categoryDescription: "Channel setups",
                    getActualSet: async ({guild}) => {
                        return [
                            { optionId: "moderationChannel", data: client.settings.get(guild.id, "moderationChannel") || null },
                            { optionId: "randomReactionChannelBlacklist", data: client.settings.get(guild.id, "randomReactionChannelBlacklist") || null },
                            { optionId: "singleChannelMessageLogger_in", data: client.settings.get(guild.id, "singleChannelMessageLogger")[0] || null },
                            { optionId: "singleChannelMessageLogger_out", data: client.settings.get(guild.id, "singleChannelMessageLogger")[1] || null },
                        ]
                    },
                    setNew: async ({guild,data}) => {
                        for(const option of data) {
                            if(option.optionId === "moderationChannel") client.settings.set(guild.id, option.data, "moderationChannel");
                            if(option.optionId === "randomReactionChannelBlacklist") client.settings.set(guild.id, option.data, "randomReactionChannelBlacklist");
                            if(option.optionId === "singleChannelMessageLogger_in") client.settings.set(guild.id, chanLog, "singleChannelMessageLogger", 0);
                            if(option.optionId === "singleChannelMessageLogger_out") client.settings.set(guild.id, chanLog, "singleChannelMessageLogger", 1);
                        } 
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'moderationChannel',
                            optionName: "Moderation Channel",
                            optionDescription: "Secret moderation channel",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'randomReactionChannelBlacklist',
                            optionName: "Random Reaction Channel Blacklist",
                            optionDescription: "What channels the bot should never post random reactions in",
                            optionType: DBD.formTypes.channelsMultiSelect(false, false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'singleChannelMessageLogger_in',
                            optionName: "Log messages from a channel",
                            optionDescription: "Single channel message logger input",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'singleChannelMessageLogger_out',
                            optionName: "Send logs to the channel",
                            optionDescription: "Single channel message logger output",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                    ]
                },
                {
                    categoryId: 'roles',
                    categoryName: "Roles settings",
                    categoryDescription: "Roles setups",
                    getActualSet: async ({guild}) => {
                        return [
                            { optionId: "welcomeRoles", data: client.settings.get(guild.id, "welcomeRoles") || null },
                            { optionId: "freeRoles", data: client.settings.get(guild.id, "freeRoles") || null },
                        ]
                    },
                    setNew: async ({guild,data}) => {
                        for(const option of data) {
                            if(option.optionId === "welcomeRoles") client.settings.set(guild.id, option.data, "welcomeRoles");
                            if(option.optionId === "freeRoles") client.settings.set(guild.id, option.data, "freeRoles");
                        } 
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'welcomeRoles',
                            optionName: "Welcome roles",
                            optionDescription: "Roles you a member gets when they join or they accepted the Rules Screening",
                            optionType: DBD.formTypes.rolesMultiSelect(),
                        },
                        {
                            optionId: 'freeRoles',
                            optionName: "Self roles",
                            optionDescription: "Roles you let users asign themselves with /role command",
                            optionType: DBD.formTypes.rolesMultiSelect(),
                        },
                    ]
                },
                {
                    categoryId: 'nsfw',
                    categoryName: "NSFW",
                    categoryDescription: "NSFW settings",
                    getActualSet: async ({guild}) => {
                        return [
                            { optionId: "enableNSFW", data: client.settings.get(guild.id, "enableNSFW") || null },
                        ]
                    },
                    setNew: async ({guild,data}) => {
                        for(const option of data) {
                            if(option.optionId === "enableNSFW") client.settings.set(guild.id, option.data, "enableNSFW");
                        } 
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'enableNSFW',
                            optionName: "NSFW",
                            optionDescription: "Enable nsfw on server?",
                            optionType: DBD.formTypes.switch(),
                        },
                    ]
                },
                {
                    categoryId: 'reddit',
                    categoryName: "Reddit Feed",
                    categoryDescription: "reddit feed settings",
                    getActualSet: async ({guild}) => {
                        return [
                            { optionId: "enableReddit", data: client.settings.get(guild.id, "redditFeed") || null },
                            { optionId: "subreddit1", data: client.settings.get(guild.id, "redditFeedSub1") || null },
                            { optionId: "redditChannelId1", data: client.settings.get(guild.id, "redditFeedChannel1") || null },
                            { optionId: "subreddit2", data: client.settings.get(guild.id, "redditFeedSub2") || null },
                            { optionId: "redditChannelId2", data: client.settings.get(guild.id, "redditFeedChannel2") || null },
                            { optionId: "subreddit3", data: client.settings.get(guild.id, "redditFeedSub3") || null },
                            { optionId: "redditChannelId3", data: client.settings.get(guild.id, "redditFeedChannel3") || null },
                        ]
                    },
                    setNew: async ({guild,data}) => {
                        for(const option of data) {
                            if(option.optionId === "enableReddit") client.settings.set(guild.id, option.data, "redditFeed");
                            if(option.optionId === "subreddit1") client.settings.set(guild.id, option.data, "redditFeedSub1");
                            if(option.optionId === "redditChannelId1") client.settings.set(guild.id, option.data, "redditFeedChannel1");
                            if(option.optionId === "subreddit2") client.settings.set(guild.id, option.data, "redditFeedSub2");
                            if(option.optionId === "redditChannelId2") client.settings.set(guild.id, option.data, "redditFeedChannel2");
                            if(option.optionId === "subreddit3") client.settings.set(guild.id, option.data, "redditFeedSub3");
                            if(option.optionId === "redditChannelId3") client.settings.set(guild.id, option.data, "redditFeedChannel3");
                        } 
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'enableReddit',
                            optionName: "Enable?",
                            optionDescription: "Enable reddit feed? Refreshes every 1 minute. (only 3 feeds per server for now)",
                            optionType: DBD.formTypes.switch(),
                        },
                        {
                            optionId: 'subreddit1',
                            optionName: "subbreddit name",
                            optionDescription: "Give only the name of the subreddit",
                            optionType: DBD.formTypes.input(),
                        },
                        {
                            optionId: 'redditChannelId1',
                            optionName: "Channel",
                            optionDescription: "Choose a channel for the feed",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'subreddit2',
                            optionName: "subbreddit name",
                            optionDescription: "Give only the name of the subreddit",
                            optionType: DBD.formTypes.input(),
                        },
                        {
                            optionId: 'redditChannelId2',
                            optionName: "Channel",
                            optionDescription: "Choose a channel for the feed",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'subreddit3',
                            optionName: "subbreddit name",
                            optionDescription: "Give only the name of the subreddit",
                            optionType: DBD.formTypes.input(),
                        },
                        {
                            optionId: 'redditChannelId3',
                            optionName: "Channel",
                            optionDescription: "Choose a channel for the feed",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                        },
                    ]
                },
                {
                    categoryId: 'logs',
                    categoryName: "Logs and security (⌐■_■)",
                    categoryDescription: "Security and spying (Nice logs bro, UwU)",
                    getActualSet: async ({guild}) => {
                        return [
                            { optionId: "welcomeUserCheck", data: client.settings.get(guild.id, "welcomeUserCheck") || null },
                            { optionId: "memberUpdateLogs", data: client.settings.get(guild.id, "memberUpdateLogs") || null },
                            { optionId: "messageLogs", data: client.settings.get(guild.id, "messageLogs") || null },
                            { optionId: "invitesLogs", data: client.settings.get(guild.id, "invitesLogs") || null },
                            { optionId: "schedulesLogs", data: client.settings.get(guild.id, "schedulesLogs") || null },
                            { optionId: "banKickLogs", data: client.settings.get(guild.id, "banKickLogs") || null },
                            { optionId: "mesLogBlaLisChan", data: client.settings.get(guild.id, "messageLogsBlacklistChannel") || null },
                            { optionId: "mesLogBlaLisRole", data: client.settings.get(guild.id, "messageLogsBlacklistRoles") || null },
                        ]
                    },
                    setNew: async ({guild,data}) => {
                        for(const option of data) {
                            if(option.optionId === "welcomeUserCheck") client.settings.set(guild.id, option.data, "welcomeUserCheck");
                            if(option.optionId === "memberUpdateLogs") client.settings.set(guild.id, option.data, "memberUpdateLogs");
                            if(option.optionId === "messageLogs") client.settings.set(guild.id, option.data, "messageLogs");
                            if(option.optionId === "invitesLogs") client.settings.set(guild.id, option.data, "invitesLogs");
                            if(option.optionId === "schedulesLogs") client.settings.set(guild.id, option.data, "schedulesLogs");
                            if(option.optionId === "banKickLogs") client.settings.set(guild.id, option.data, "banKickLogs");
                            if(option.optionId === "mesLogBlaLisChan") client.settings.set(guild.id, option.data, "messageLogsBlacklistChannel");
                            if(option.optionId === "mesLogBlaLisRole") client.settings.set(guild.id, option.data, "messageLogsBlacklistRoles");
                        } 
                        return;
                    },
                    categoryOptionsList: [
                        {
                            optionId: 'welcomeUserCheck',
                            optionName: "User checking:",
                            optionDescription: "Check new user?",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'memberUpdateLogs',
                            optionDescription: "Server profile update",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                        {
                            optionId: 'messageLogs',
                            optionName: "Loggings",
                            optionDescription: "Message logs",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'invitesLogs',
                            optionDescription: "Invite logging",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: true },
                        },
                        {
                            optionId: 'schedulesLogs',
                            optionDescription: "Schedule Logging",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: true },
                        },
                        {
                            optionId: 'banKickLogs',
                            optionDescription: "Ban - kick logging",
                            optionType: DBD.formTypes.switch(),
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                        {
                            optionId: 'mesLogBlaLisChan',
                            optionName: "messageLogsBlacklist Channel:",
                            optionDescription: "Blacklist message logging for certain channels",
                            optionType: DBD.formTypes.channelsMultiSelect(false, false, channelTypes = [ChannelType.GuildText]),
                        },
                        {
                            optionId: 'mesLogBlaLisRole',
                            optionName: "messageLogsBlacklist Roles:",
                            optionDescription: "Blacklist message logging for certain roles",
                            optionType: DBD.formTypes.rolesMultiSelect(),
                        },
                    ]
                },
            ]
        });
        Dashboard.init();
    }
}

function CommandPushDashboard(filterredArray, commandCate, nsfwCate, permCate) {
    Array.from(filterredArray).forEach(obj => {
        if (obj.permissions) {
            let cmdObject = {
                commandName: obj.data.name,
                commandUsage: "/"+obj.data.name,
                commandDescription: (obj.cooldown? `⌛ ${obj.cooldown} sec - ` : `- `)+obj.data.description
            }
            permCate.push(cmdObject)
        } else if (obj.hasNSFW) {
            let cmdObject = {
                commandName: obj.data.name,
                commandUsage: "/"+obj.data.name,
                commandDescription: (obj.cooldown? `⌛ ${obj.cooldown} sec - ` : `- `)+obj.data.description
            }
            nsfwCate.push(cmdObject)
        } else {
            let cmdObject = {
                commandName: obj.data.name,
                commandUsage: "/"+obj.data.name,
                commandDescription: (obj.cooldown? `⌛ ${obj.cooldown} sec - ` : `- `)+obj.data.description
            }
            commandCate.push(cmdObject)
        }
    })
}
