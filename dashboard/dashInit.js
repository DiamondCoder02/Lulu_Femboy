const { Client, Collection, GatewayIntentBits, Partials, ChannelType } = require('discord.js'), config = require('../config.json')
const wait = require('node:timers/promises').setTimeout;
/* --- PRE_DASHBOARD --- */
const DarkDashboard = require('dbd-dark-dashboard');
let DBD = require('discord-dashboard');
var cliId = process.env.cid;
var cliSecret = process.env.ClientSecret;
var dbd_key = process.env.dbd;
try{ if (config.clientId == "clientId") { clientID = String(cliId) } else clientID = String(config.clientId) }catch{ return console.log("clientID error")}
try{ if (config.clientSecret == "clientSecret") { cSec = cliSecret } else cSec = config.clientSecret }catch{ return console.log("clientSecret error")}
try{ if (config.dbd_license == "dbd_license") { dbd_lic = dbd_key } else dbd_lic = config.dbd_license }catch{ return console.log("dbd_license error")}

module.exports = {
    /**
     * @param {Client} client 
     */
    async execute(client, commandFuck) {
        let commandList = []
        CommandPushDashboard(commandFuck, commandList)
        await DBD.useLicense(dbd_lic);
        DBD.Dashboard = DBD.UpdatedClass();
        const Dashboard = new DBD.Dashboard({
            port: 80,
            client: {
                id: client.user.id,
                secret: cSec
            },
            redirectUri: 'http://localhost/discord/callback',
            domain: 'http://localhost',
            bot: client,
            theme: DarkDashboard({
                information: {
                    createdBy: "DiamondCoder",
                    websiteTitle: "Femboy_OwO discord bot testing",
                    websiteName: "Femboy_OwO bot",
                    websiteUrl: "https://github.com/DiamondPRO02/Femboi_OwO",
                    dashboardUrl: "http://localhost:3000/",
                    //supporteMail: "support@imidnight.ml",
                    //supportServer: "https://discord.gg/no",
                    imageFavicon: "https://i.imgur.com/KQyOp8j.png",
                    iconURL: "https://i.imgur.com/KQyOp8j.png",
                    loggedIn: "Successfully signed in OwO.",
                    mainColor: "#2CA8FF",
                    subColor: "#ebdbdb",
                    preloader: "Loading UwU..."
                },
                index: {
                    card: {
                        category: "Femboy_OwO Discord bot control panel",
                        title: `Welcome to the Femboy_OwO control panel. You can edit options and I can learn discord dashboard.`,
                        image: "https://i.imgur.com/mF37cEE.png",
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
                        title: "Update info (0.1.0?)",
                        description: `If I'm not lazy, I will write. First release`,
                        footer: "Last edit: 16.09.2022",
                    },
                },
                commands: [
                    {
                        category: `Slash commands ＼(ﾟｰﾟ＼)`,
                        subTitle: `Here is all the "/" command that should be possible`,
                        aliasesDisabled: true,
                        list: commandList,
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
                    categoryOptionsList: [
                        {
                            optionId: 'welcome',
                            optionName: "Welcome / goodbye message",
                            optionDescription: "Welcome message when someone joins",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "welcome")
                                return client.settings.get(guild.id, "welcome")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "welcome")
                                return
                            },
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'goodbye',
                            optionDescription: "Goodbye message when someone leaves",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "goodbye")
                                return client.settings.get(guild.id, "goodbye")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "goodbye")
                                return
                            },
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                        {
                            optionId: 'welcomeMessage',
                            optionDescription: "Max 999 word welcome message when someone joins",
                            optionType: DBD.formTypes.textarea("Max 999 word welcome message", 1, 999, false),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "welcomeMessage")
                                return client.settings.get(guild.id, "welcomeMessage")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "welcomeMessage")
                                return
                            },
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                    ]
                },
                {
                    categoryId: 'channels',
                    categoryName: "Channels settings",
                    categoryDescription: "Channel setups",
                    categoryOptionsList: [
                        {
                            optionId: 'moderationChannel',
                            optionName: "Moderation Channel",
                            optionDescription: "Secret moderation channel",
                            optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "moderationChannel")
                                return client.settings.get(guild.id, "moderationChannel")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "moderationChannel")
                                return
                            },
                        },
                    ]
                },
                {
                    categoryId: 'roles',
                    categoryName: "Roles settings",
                    categoryDescription: "Roles setups",
                    categoryOptionsList: [
                        {
                            optionId: 'welcomeRoles',
                            optionName: "Welcome roles",
                            optionDescription: "Roles you get as soon you join guild",
                            optionType: DBD.formTypes.rolesMultiSelect(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "welcomeRoles")
                                return client.settings.get(guild.id, "welcomeRoles")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "welcomeRoles")
                                return
                            },
                        },
                        {
                            optionId: 'freeRoles',
                            optionName: "Self roles",
                            optionDescription: "Roles you let users asign themselves",
                            optionType: DBD.formTypes.rolesMultiSelect(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "freeRoles")
                                return client.settings.get(guild.id, "freeRoles")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "freeRoles")
                                return
                            },
                        },
                    ]
                },
                {
                    categoryId: 'nsfw',
                    categoryName: "NSFW",
                    categoryDescription: "NSFW settings",
                    categoryOptionsList: [
                        {
                            optionId: 'enableNSFW',
                            optionName: "NSFW",
                            optionDescription: "Enable nsfw on server?",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "enableNSFW")
                                return client.settings.get(guild.id, "enableNSFW")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "enableNSFW")
                                return
                            },
                        },
                    ]
                },
                {
                    categoryId: 'logs',
                    categoryName: "Logs and security (⌐■_■)",
                    categoryDescription: "Security and spying (Nice logs bro, UwU)",
                    categoryOptionsList: [
                        {
                            optionId: 'welcomeUserCheck',
                            optionName: "User checking:",
                            optionDescription: "Check new user?",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "welcomeUserCheck")
                                return client.settings.get(guild.id, "welcomeUserCheck")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "welcomeUserCheck")
                                return
                            },
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'memberUpdateLogs',
                            optionDescription: "Server profile update",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "memberUpdateLogs")
                                return client.settings.get(guild.id, "memberUpdateLogs")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "memberUpdateLogs")
                                return
                            },
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                        {
                            optionId: 'messageLogs',
                            optionName: "Loggings",
                            optionDescription: "Message logs",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "messageLogs")
                                return client.settings.get(guild.id, "messageLogs")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "messageLogs")
                                return
                            },
                            themeOptions: { minimalbutton: { first: true, } },
                        },
                        {
                            optionId: 'invitesLogs',
                            optionDescription: "Invite logging",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "invitesLogs")
                                return client.settings.get(guild.id, "invitesLogs")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "invitesLogs")
                                return
                            },
                            themeOptions: { minimalbutton: true },
                        },
                        {
                            optionId: 'schedulesLogs',
                            optionDescription: "Schedule Logging",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "schedulesLogs")
                                return client.settings.get(guild.id, "schedulesLogs")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "schedulesLogs")
                                return
                            },
                            themeOptions: { minimalbutton: true },
                        },
                        {
                            optionId: 'banKickLogs',
                            optionDescription: "Ban - kick logging",
                            optionType: DBD.formTypes.switch(),
                            getActualSet: async ({guild}) => {
                                client.settings.get(guild.id, "banKickLogs")
                                return client.settings.get(guild.id, "banKickLogs")
                            },
                            setNew: async ({guild,newData}) => {
                                client.settings.set(guild.id, newData, "banKickLogs")
                                return
                            },
                            themeOptions: { minimalbutton: { last: true, } },
                        },
                    ]
                },
            ]
        });
        Dashboard.init();
        
    }
}

function CommandPushDashboard(filterredArray, CategoryArray) {
    Array.from(filterredArray).forEach(obj => {
        let cmdObject = {
            commandName: obj.name,
            commandUsage: "/"+obj.name,
            commandDescription: obj.description
        }
        CategoryArray.push(cmdObject)
    })
}
