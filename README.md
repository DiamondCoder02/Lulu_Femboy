# Femboi_OwO
4th trying making a Discorcd bot.
Please don't use this...(, **unless you know what mess I made here.**)

#### A bit of explanation:
Just my own little bot to learn. Early in development. Still not stupid proof but working on it as I don't want it to break often.
Feel free to contribute if you want. I also appriciate every problem report and every help.
This bot only works with slash commands. NSFW commands only works in nsfw channels. :3

## Setup
- Have latest [NodeJs](https://nodejs.org/en/) installed.
- First start setup.bat (You can close the console when done).
- Make a bot for yourself at [Discord developer portal](https://discord.com/developers/applications).
- Get both Client ID and Token, copy and paste into the config.json file.
- (Temporarly you need to have a channel id where it can send one message where it sends a ready message.)
- If you want you can change the stop password for your desire but it's only used for the stop command( for now).
- Invite the bot into the server with this link. Replace TEXT with client id: ( https://discord.com/api/oauth2/authorize?client_id=TEXT&permissions=2415930432&scope=bot%20applications.commands )
- After all this save and run start.bat ( It will ask you what language you want and how you want to activate commands. Recommended: 1.)

##### Debug level in config:
0. No trigger messages. Only errors.
1. Trigger messages. (Default)
2. Trigger messages and button/menu reactions.
3. Discord.js debug messages.

"Easy" language support as usual. In config you can kinda see what I plan and how I'm currently holding.

### Future (maybe) ideas:
- [ ] reminder
- [x] Music
- [ ] Better role handling
- [ ] More event listeners
- [ ] Make website to edit config?
- [ ] Welcome message to system channel (embed or image?)

### Currently I know broken or needs a bit of fixing:
- [x] Better error handling (maybe...?)
- [ ] nHentai broke

## Credits (Package name - command name)
- [Discord.js Akinator - Akinator](https://www.npmjs.com/package/discord.js-akinator)
- [Booru](https://www.npmjs.com/package/booru)
- [Discord Player - music](https://www.npmjs.com/package/discord-player), huge thanks for: [Androz2091 Discord player example](https://github.com/Androz2091/discord-player/blob/master/example/music-bot/index.js)
- [Nekos.life - nekoslife](https://www.npmjs.com/package/nekos.life)
- [sHentai - nHentai](https://www.npmjs.com/package/shentai)
- [Discord-phub - phub](https://www.npmjs.com/package/discord-phub)
- [Translate](https://www.npmjs.com/package/translate)
- Also big thanks for Github Copilot. :3