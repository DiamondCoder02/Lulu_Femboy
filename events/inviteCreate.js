const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
module.exports = {
	name: 'inviteCreate',
	execute(invite) {
        console.log(invite)
        console.log(`Invite created in guild: ${invite.guild.name} \n ${invite.url}`)
	}
};