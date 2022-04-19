const { SlashCommandBuilder } = require("@discordjs/builders"), { MessageEmbed, Client, Intents } = require("discord.js"), { Player, QueryType } = require("discord-player");
const client = new Client({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const po = lang.music.player_on.split('-'), sl = lang.music.slash.split('-'), c1 = lang.music.command.split('-'), c2 = lang.music.command2.split('-')
const player = new Player(client, {
    ytdlOptions: {
        headers: {
            cookie: process.env.YT_COOKIE
        }
    }
});
player.on("error", (queue, error) => { console.log(queue.guild.name +" "+ po[0] + error.message); });
player.on("connectionError", (queue, error) => { console.log(queue.guild.name + po[1] + error.message); });
player.on("trackStart", (queue, track) => { queue.metadata.send(`🎶 |`+po[2]+": **"+track.title+"** => **"+queue.connection.channel.name+"**!"); });
player.on("trackAdd", (queue, track) => { queue.metadata.send(`🎶 |`+po[3]+": **"+track.title+"**"); });
player.on("botDisconnect", (queue) => { queue.metadata.send("❌ |"+po[4]); });
player.on("channelEmpty", (queue) => { queue.metadata.send("❌ |"+po[5]); });
player.on("queueEnd", (queue) => {queue.metadata.send("✅ |"+po[6]); });
module.exports = {
    guildOnly: true,
    cooldown: 3,
	data: new SlashCommandBuilder()
        .setName('music')
        .setDescription(sl[0]+'(YT/Spotify/SoundCloud | test: vimeo/reverbnation/FB/attachment link/lyrics)')
        .addStringOption(option => option.setName('play').setDescription(sl[1]))
        .addStringOption(option => option.setName('control').setDescription(sl[2])
            .addChoice(sl[3], 'queue')
            .addChoice(sl[4], 'pause')
            .addChoice(sl[5], 'resume')
            .addChoice(sl[6], 'skip')
            .addChoice(sl[7], 'disconnect'))
        .addIntegerOption(option => option.setName('volume').setDescription(sl[8]).setMinValue(1).setMaxValue(100)),
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply(c1[0]);
        await interaction.deferReply();
        if (interaction.options.getString('play')) {
            const query = interaction.options.get("play").value;
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                .catch(() => {});
            if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: c1[1] });
            const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel
            });
            try { if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                void player.deleteQueue(interaction.guild);
                return void interaction.followUp({ content: c1[2] });
            }
            await interaction.followUp({ content: `⏱ |${c1[3]}${searchResult.playlist ? `${c1[4]}` : `${c1[5]}`}...` });
            searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
        } else if (interaction.options.getString('control')) {
            const queue = player.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ |" + c1[6] });
            if (interaction.options.getString('control') === 'queue') {
                const currentTrack = queue.current;
                const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                    return `${i + 1}. **${m.title}** ([link](${m.url}))`;
                });
                return void interaction.followUp({
                    embeds: [
                        {
                            title: c1[7],
                            description: `${tracks.join("\n")} ${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.length}` + `${c1[8]}` : "" }`,
                            color: 0xff0000,
                            fields: [{ name: c1[9], value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                        }
                    ]
                });
            } else if (interaction.options.getString('control') === 'pause') {
                const paused = queue.setPaused(true);
                return void interaction.followUp({ content: paused ? "⏸ | " + c2[0] : "❌ |" + c2[3] });
            } else if (interaction.options.getString('control') === 'resume') {
                const paused = queue.setPaused(false);
                return void interaction.followUp({ content: !paused ? "❌ |" + c2[3] : "▶ |" + c2[1] });
            } else if (interaction.options.getString('control') === 'skip') {
                const currentTrack = queue.current;
                const success = queue.skip();
                return void interaction.followUp({ content: success ? `✅ | ${c2[2]} **${currentTrack}**!` : "❌ |" + c2[3] });
            } else if (interaction.options.getString('control') === 'disconnect') {
                queue.destroy();
                return void interaction.followUp({ content: "🛑 |" + c2[4] });
            }
        } else if (interaction.options.getInteger('volume')) {
            const queue = player.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ |" + c1[6] });
            const vol = interaction.options.get("volume");
            const success = queue.setVolume(vol.value);
            return void interaction.followUp({ content: success ? `✅ | ${c2[5]} **${vol.value}%**!` : "❌ |" + c2[3] });
        } else {
            return await interaction.reply({content: c2[6]})
        }
    }
}