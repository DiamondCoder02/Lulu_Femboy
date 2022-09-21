const { SlashCommandBuilder } = require("@discordjs/builders"), { EmbedBuilder, Client, GatewayIntentBits } = require("discord.js"), { Player, QueryType } = require("discord-player");
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds] });

const player = new Player(client, { ytdlOptions: { headers: { cookie: process.env.YT_COOKIE } }, });
player.on("error", (queue, error) => { console.log(`[${new Date().toLocaleString('hu-HU')}] ` + queue.guild.name +", Error emitted from the queue: " + error.message); });
player.on("connectionError", (queue, error) => { console.log(`[${new Date().toLocaleString('hu-HU')}] ` + queue.guild.name + ", Error emitted from the connection: " + error.message); });
player.on("trackStart", (queue, track) => { queue.metadata.send(`🎶 |`+" Started playing: **"+track.title+"** => **"+queue.connection.channel.name+"**!"); });
player.on("trackAdd", (queue, track) => { queue.metadata.send(`🎶 |`+" Track queued: **"+track.title+"**"); });
player.on("botDisconnect", (queue) => { queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!"); });
player.on("channelEmpty", (queue) => { queue.metadata.send("❌ | Nobody is in the voice channel, leaving..."); });
player.on("queueEnd", (queue) => { queue.metadata.send("✅ | Queue finished!"); });

module.exports = {
    guildOnly: true,
    cooldown: 3,
	data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Playing audio (YT/Spotify/SoundCloud | test: vimeo/FB/attachment links)')
        .addStringOption(option => option.setName('play').setDescription("Enter a url to be played"))
        .addStringOption(option => option.setName('control').setDescription("Choose an action to be performed")
            .addChoices(
                { name: "Bass Boost", value: 'bassboost' },
                { name: "Queue", value: 'queue' },
                { name: "Pause", value: 'pause' },
                { name: "Resume", value: 'resume' },
                { name: "Skip", value: 'skip' },
                { name: "Disconnect", value: 'disconnect' }
            )
        )
        .addIntegerOption(option => option.setName('volume').setDescription("Volume for the audio").setMinValue(1).setMaxValue(100)),
    async execute(interaction) { 
        //return interaction.reply("Command under refactoring");
        if(!interaction.member.voice.channel) return interaction.reply("Please connect to a voice channel!");
        await interaction.deferReply();
        if (interaction.options.getString('play')) {
            const url = interaction.options.getString('play');
            const query = url.split("&")[0];
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                .catch(() => {});
            if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" });
            const queue = await player.createQueue(interaction.guild, {
                metadata: interaction.channel
            });
            try { if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                void player.deleteQueue(interaction.guild);
                return void interaction.followUp({ content: "Could not join your voice channel!" });
            }
            await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? `playlist` : `track`}...` });
            searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
        } else if (interaction.options.getString('control')) {
            const queue = player.getQueue(interaction.guild);
            if (interaction.options.getString('control') === 'disconnect') {
                queue.destroy();
                return void interaction.followUp({ content: "🛑 |" + "Stopped the player!" });
            }
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
            if (interaction.options.getString('control') === 'bassboost') {
                await queue.setFilters({
                    bassboost: !queue.getFiltersEnabled().includes('bassboost'),
                    normalizer2: !queue.getFiltersEnabled().includes('bassboost') // because we need to toggle it with bass
                });
                setTimeout(() => {
                    return void interaction.followUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes('bassboost') ? '✅' : '❌'}!` });
                }, queue.options.bufferingTimeout);
            }
            if (interaction.options.getString('control') === 'queue') {
                const currentTrack = queue.current;
                const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                    return `${i + 1}. **${m.title}** ([link](${m.url}))`;
                });
                return void interaction.followUp({
                    embeds: [
                        {
                            title: "Server queue",
                            description: `${tracks.join("\n")} ${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.length}` + `more track(s)` : "" }`,
                            color: 0x00FF00,
                            fields: [{ name: "Now playing", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                        }
                    ]
                });
            }
            if (interaction.options.getString('control') === 'pause') {
                const paused = queue.setPaused(true);
                return void interaction.followUp({ content: paused ? "⏸ | " + "Paused!" : "❌ |" + "Something went wrong!" });
            }
            if (interaction.options.getString('control') === 'resume') {
                const paused = queue.setPaused(false);
                return void interaction.followUp({ content: !paused ? "❌ |" + "Something went wrong!" : "▶ |" + "Resumed!" });
            }
            if (interaction.options.getString('control') === 'skip') {
                const currentTrack = queue.current;
                const success = queue.skip();
                return void interaction.followUp({ content: success ? `✅ | Skipped: **${currentTrack}**!` : "❌ |" + "Something went wrong!" });
            }
        } else if (interaction.options.getInteger('volume')) {
            const queue = player.getQueue(interaction.guild);
            if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
            const vol = interaction.options.get("volume");
            const success = queue.setVolume(vol.value);
            return void interaction.followUp({ content: success ? `✅ | Volume set to **${vol.value}%**!` : "❌ |" + "Something went wrong!" });
        } else {
            return await interaction.editReply({content: "Please enter a command!"})
        }
    }
}