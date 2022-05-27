# From my discord notes:
Task sheet: __***Do not delete!***__

__**Idea:**__
- Webpage to edit config
- Bot voting?
- Reminders
- Google search (chrome tabs)
- In interactionCreate also get other options for console log
- API and RSS testing?
- Math solver?

__**To fix:**__


__**Reminder:**__
- Languages at some commands
- Find a way for music to not start at 100 at every song

__**To test:**__
- Test guildMemberAdd role
- __guildScheduledEventCreate__ , __guildScheduledEventDelete__ , __guildScheduledEventUpdate__


Commands:
akinator , anime_images , booru , bot_info , clean , guild_config , info , music , nekoslife , nhentai  , phub , ping , prune , purge , record , role , stop , translate , waifu_pics

Events:
emojiCreate , emojiDelete , guildBanAdd , guildBanDelete , guildCreate , guildDelete , guildMemberAdd , guildMemberRemove , guildScheduledEventCreate , guildScheduledEventDelete , guildScheduledEventUpdate , interactionCreate , inviteCreate , messageCreate , messageDelete , messageUpdate , ready , stickerCreate , stickerDelete

Languages:
english , german , hungarian , owo

Main: 
- Deploy-commands.js => That enables slash commands for the servers
- Index.js => Brain and handler for the whole bot
- Language.js => Just a stupid language changer, you still need to restart the bot

Other:
- Setup.bat => To install the node modules
- Restart_run.bat => To make sure the server restart automatically
- Start.bat => Just start the bot once