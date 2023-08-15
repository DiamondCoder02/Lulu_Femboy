const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "userUpdate",
	execute(oldUser, newUser, client) {
		if (oldUser.bot) { return }
		/*
		Console.log("\nUser Member 1")
		console.log(oldUser)
		console.log("NYAAAAAAAAAAAAAAAAAAAAA")
		console.log(newUser)
		console.log("User Member 2\n")
		*/
		const guilds = client.guilds.cache;
		guilds.forEach(guild => {
			if (guild.members.cache.get(oldUser.id)) {
				const memberUpdateLogs = client.settings.get(guild.id, "memberUpdateLogs");
				if (memberUpdateLogs) {
					const embed = new EmbedBuilder()
						.setColor([255, 255, 0])
						.setTitle("User updated their own profile!")
						.setDescription(`${oldUser.username} (${newUser.username}) has been updated`)
						.setFooter({ text: `User ID: ${oldUser.id}` })
						.setTimestamp();
					if (oldUser.username === newUser.username || oldUser.avatarURL === newUser.avatarURL) { return }
					if (oldUser.username !== newUser.username) { embed.addFields({ name: "username", value: `${oldUser.username} => ${newUser.username}` }) }
					if (oldUser.avatarURL() !== newUser.avatarURL()) {
						embed.addFields({ name: "Avatar", value: `Old: ${oldUser.avatarURL() ? oldUser.avatarURL() : "-"} => \nNew: ${newUser.avatarURL() ? newUser.avatarURL() : "-"}` });
						embed.setThumbnail(oldUser.avatarURL());
						embed.setImage(newUser.avatarURL());
					}
					try {
						let channel;
						if (client.channels.cache.get(client.settings.get(guild.id, "moderationChannel"))) { channel = client.channels.cache.get(client.settings.get(guild.id, "moderationChannel")) } else { return }
						channel.send({ embeds: [embed] });
					} catch (error) {
						console.log("userUpdate no channel:" + error);
					}
				}
			}
		});
	}
};