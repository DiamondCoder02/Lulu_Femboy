module.exports = {
    name: "Ping",
    description: 'Ping test',
    cooldown: 10,
    execute(message, system, cmdArgs) {
        let date = system.lang.ping.date.split('-')
		let totalSeconds = (system.client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor( (totalSeconds %= 86400) / 3600);
		let minutes = Math.floor( (totalSeconds%= 3600) / 60);
		let seconds = Math.floor(totalSeconds % 60);
        let uptime = days + date[0] + hours + date[1] + minutes + date[2] + seconds + date[3];
        
        message.channel.send("lang.ping.calc").then((resultMessage) => {
            let ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`Ping: \`` + ping + 'ms\`, Discord API: \`' + system.client.ws.ping + 'ms\`' + "\nUptime:" + uptime
            )
        })
    }
}