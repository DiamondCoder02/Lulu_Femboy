module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
/*
module.exports = (system) => {
    console.log('Ready!');
    system.client.user.setActivity("(^///^) Testing / commands")
        
    "\n\t" + system.lang.ready.login + system.client.user.tag
    + "\n\n\t" + system.lang.ready.prefix + system.config.prefix
    + "\n\t" + system.lang.ready.start_lang + system.config.language
    + "\n\n\t" + system.lang.ready.start + system.client.readyAt
        )
        
    const ready_embed = new system.Discord.MessageEmbed()
    .setColor(system.config.embed_colors.blue)
    .addField("Bot started! \n" 
    + "Starting prefix:" + `${system.config.prefix}` + "\nLanguage: " + `${system.config.language}`)

    const channel2 = system.client.channels.cache.get(897097242861789236)    
    const channel = system.client.channels.cache.find(c => c.name === "bot-status")
    try{
        channel2.send(ready_embed);return
    }catch{  
        channel.send(ready_embed);return
    }
}*/