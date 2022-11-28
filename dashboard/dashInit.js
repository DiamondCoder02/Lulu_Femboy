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
                index: {
                    card: {
                        category: `${client.user.tag} Discord bot control panel`,
                        title: `Welcome to the ${client.user.tag} control panel. You can edit options and I can learn discord dashboard.`,
                        image: `https://i.imgur.com/bYYjIZC.png`,
                        footer: "Last edit: 16.09.2022",
                    },
                    information: {
                        category: "Info",
                        title: "Information about the bot",
                        description: `After a couple of failed bots, I'm planning making this as a project I'm not gonna abondon quickly. 
                        This bot only works with slash commands. 
                        NSFW commands only works in nsfw channels.`,
                        footer: "Last edit: 16.09.2022",
                    },
                    feeds: {
                        category: "News",
                        title: `Update info ${package.version}`,
                        description: `Updated packages and fixed some bugs and maybe fixed some database deletion error.`,
                        footer: "Last edit: 13.10.2022",
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
                            optionDescription: "Should the bot send message when it updates?",
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
                            if(option.optionId === "singleChannelMessageLogger_in") {
                                const chanLog = client.settings.get(guild.id, "singleChannelMessageLogger")
                                chanLog[0] = option.data
                                client.settings.set(guild.id, chanLog, "singleChannelMessageLogger")
                            };
                            if(option.optionId === "singleChannelMessageLogger_out") {
                                const chanLog = client.settings.get(guild.id, "singleChannelMessageLogger")
                                chanLog[1] = option.data
                                client.settings.set(guild.id, chanLog, "singleChannelMessageLogger")
                            }
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
