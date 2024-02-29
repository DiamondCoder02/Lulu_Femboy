const { ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	async subreddit(client) {
		let redditFeedSub = [];
		let redditFeedChannel = [];
		setInterval(() => {
			client.guilds.cache.forEach(guild => {
				let tr = client.settings.get(guild.id, "redditFeed");
				if (!tr) {return}
				redditFeedSub[0] = client.settings.get(guild.id, "redditFeedSub1");
				redditFeedSub[1] = client.settings.get(guild.id, "redditFeedSub2");
				redditFeedSub[2] = client.settings.get(guild.id, "redditFeedSub3");
				redditFeedChannel[0] = client.settings.get(guild.id, "redditFeedChannel1");
				redditFeedChannel[1] = client.settings.get(guild.id, "redditFeedChannel2");
				redditFeedChannel[2] = client.settings.get(guild.id, "redditFeedChannel3");
				let i;
				for (i = 0; i < redditFeedSub.length; i++){
					if (redditFeedSub[i] == "") {return}
					if (redditFeedChannel[i] == "") {return}
					else { redditFetchFunction(client, redditFeedChannel[i], redditFeedSub[i], i, guild) }
				}
			});
		}, 240000);
	}
};

async function redditFetchFunction(client, channel, sub, i, guild) {
	let feedChannel = await client.channels.cache.get(channel);
	if (feedChannel == undefined) {return}
	let post = await fetch(`https://www.reddit.com/r/${sub}/new.json`)
		.then(res => res.json()).then(body => {
			try {
				let found = body.data.children;
				if (!found.length) {return channel.send(`Unable to find a post. The subreddit "${sub}" does not exist, or it has no available post data.`)}
				return found[0].data;
			} catch (e) {
				return channel.send(`Unable to find a post. The subreddit "${sub}" does not exist, or it has no available post data.`);
			}
		});
	if (i == 0) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost1");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost1") }
	} else if (i == 1) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost2");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost2") }
	} else if (i == 2) {
		let lastID = client.settings.get(guild.id, "lastRedditFeedPost3");
		if (lastID == post.id) {return}
		else { client.settings.set(guild.id, post.id, "lastRedditFeedPost3") }
	} else {return}
	// Console.log(post)
	const embed = new EmbedBuilder()
		.setColor([160, 32, 240]) // #A020F0 purple
		.setTitle(post.title)
		.setURL(`https://reddit.com${post.permalink}`)
		.setAuthor({ name: post.author })
		.setTimestamp();
	const linkButton = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setLabel("Link")
			.setStyle(ButtonStyle.Link)
			.setEmoji("🖥️")
			.setURL(`https://reddit.com${post.permalink}`)
	);
	if (post.url != null) {
		embed.setImage(post.url);
		feedChannel.send({ embeds: [embed], components: [linkButton] });
	}
	else {
		feedChannel.send({ embeds: [embed], components: [linkButton] });
	}
}