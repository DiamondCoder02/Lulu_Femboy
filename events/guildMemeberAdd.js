const {welcome, welcomePic, welcomeMessage} = require('../config.json')
const { Client, Intents, MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	// Declare a base size of the font
	let fontSize = 70;
	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);
	// Return the result to use in the actual canvas
	return context.font;
};

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		//New member joins a guild
        if(welcome) {} else return
        const channel = member.guild.systemChannel
        if (channel === null) {return console.log('No system channel found for ' + member.guild.name)}
        if(!welcomePic) {
            const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setDescription("**"+welcomeMessage+"**" + "\n" + 'The bot works with only slash commands.'+'\n'+'Do "/" to see the list of commands.'+'\n'+'(nsfw only in nsfw channels)')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            channel.send({content: member.user.toString(),embeds: [embed]})
        } else {
/*
            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./wallpaper.jpg');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.strokeStyle = '#0099ff';
            context.strokeRect(0, 0, canvas.width, canvas.height);
            context.font = '28px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);
            context.font = applyText(canvas, `${member.displayName}!`);
            context.fillStyle = '#ffffff';
            context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));
            context.drawImage(avatar, 25, 25, 200, 200);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
*/
            
            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');
            const background = Canvas.loadImage('./wallpaper.jpg');
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Use the helpful Attachment class structure to process the file for you
            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
            context.strokeStyle = '#0099ff';
            // Draw a rectangle with the dimensions of the entire canvas
            context.strokeRect(0, 0, canvas.width, canvas.height);
            const avatar = Canvas.loadImage(member.displayAvatarURL({ format: 'jpg' }));
            // Draw a shape onto the main canvas
            context.drawImage(avatar, 25, 25, 200, 200);
            // Pick up the pen
            context.beginPath();
            // Start the arc to form a circle
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            // Put the pen down
            context.closePath();
            // Clip off the region you drew on
            context.clip();
            // Assign the decided font to the canvas
            context.font = applyText(canvas, member.displayName);
            context.fillStyle = '#ffffff';
            context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
            
            channel.send({ files: [attachment] });
        }
	}
};