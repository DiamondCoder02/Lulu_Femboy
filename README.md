# Femboi_OwO (Soon this readme will be rewriten)
4th try making a Discorcd bot.

If you ping the bot it will give you a small help how to use it.( Bot itself, not the role.)

#### A bit of explanation:
Just my own little bot to learn. Early in development. Still not stupid proof but working on it as I don't want it to break often.
Feel free to contribute if you want. I also appriciate every problem report and every help.
This bot only works with slash commands. NSFW commands only works in nsfw channels. :3

## Self Setup
- Have latest [NodeJs](https://nodejs.org/en/) installed. (Currently developed on 18.5.0)
- First start setup.bat (You can close the console when done).
- Make a bot for yourself at [Discord developer portal](https://discord.com/developers/applications).
- Get both Client ID and Token, copy and paste into the config.json file.
- If you want you can change the stop password for your desire but it's only used for the stop command( for now).
- Invite the bot into the server with this link. Replace TEXT with client id: ( https://discord.com/api/oauth2/authorize?client_id=TEXT&permissions=2415930432&scope=bot%20applications.commands )
- After all this save and run start.bat ~~( It will ask you what language you want and how you want to activate commands. Recommended: 1.)~~

##### Debug level in config:
0. No trigger messages. Only errors.
1. Trigger messages.
2. Trigger messages and button/menu reactions. (Default)
3. Discord.js debug messages.

### Future (maybe) ideas:
- [ ] reminder system
- [ ] Make website to edit config?
- [ ] Per server language support
- [ ] Google(?) search

### Currently I know broken or needs a bit of fixing:
- [x] ???

#### Limitation:
- Only works with slash commands
- Roles cannot have the same name

## Credits (Package name - command name)
- [Discord.js Akinator - akinator](https://www.npmjs.com/package/discord.js-akinator)
- [Anime-images API - anime_images](https://anime-api.hisoka17.repl.co/)
- [Booru - booru](https://www.npmjs.com/package/booru)
- [Discord Player - music](https://www.npmjs.com/package/discord-player), huge thanks for: [Androz2091 Discord player example](https://github.com/Androz2091/discord-player/blob/master/example/music-bot/index.js)
- [Nekos.life - nekoslife](https://www.npmjs.com/package/nekos.life)
- [sHentai - nHentai](https://www.npmjs.com/package/shentai)
- [Discord-phub - phub](https://www.npmjs.com/package/discord-phub)
- [CTK-WARRIOR youtube - record](https://www.youtube.com/watch?v=h7CC-8kTsGI), code: [Gist.github](https://gist.github.com/CTK-WARRIOR/dcf9bdeee01ddf2a6f6cf0004ebd20ff)
- [Translate - translate](https://www.npmjs.com/package/translate)
- [Waifu.pics - waifu_pics](https://waifu.pics/)
- Also big thanks for Github Copilot. :3
