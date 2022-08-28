const { SlashCommandBuilder } = require('@discordjs/builders');
const { entersState, joinVoiceChannel, VoiceConnectionStatus, EndBehaviorType, getVoiceConnection  } = require('@discordjs/voice');
const { createWriteStream } = require('node:fs');
const prism = require('prism-media');
const { pipeline } = require('node:stream');
const { MessageAttachment, Collection } = require('discord.js');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
module.exports = {
	data: new SlashCommandBuilder()
        .setName('record')
        .setDescription('Voice/talk recording')
        .addSubcommand(subcommand => subcommand.setName('start').setDescription('Record voice/talk'))
        .addSubcommand(subcommand => subcommand.setName('end').setDescription('Stop recording voice/talk')),
    async execute(interaction, client, config) {
        return interaction.reply("Command broken / under refactoring");
        client.voiceManager = new Collection()
        const voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) return interaction.reply("You must be in a voice channel to use this command!")
        // Check if the bot is in voice channel 
        let connection = client.voiceManager.get(interaction.channel.guild.id)
        try {
            // If the bot is not in voice channel 
            if (interaction.options.getSubcommand() === 'start') {
                // Join voice channel
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    selfDeaf: false,
                    selfMute: true,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                // Add voice state to collection 
                client.voiceManager.set(interaction.channel.guild.id, connection);
                await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
                const receiver = connection.receiver;
                // When user speaks in vc
                receiver.speaking.on('start', (userId) => {
                    if(userId !== interaction.user.id) return;
                    //create live stream to save audio
                    createListeningStream(receiver, userId, client.users.cache.get(userId));
                });
                // Return success message 
                return interaction.reply(`🎙️ I am now recording ${voiceChannel.name}`);
                // If the bot is in voice channel 
            }
            if (interaction.options.getSubcommand() === 'end') {
                // Send waiting message 
                interaction.reply("Please wait while I am preparing your recording...")
                // disconnect the bot from voice channel 
                const connect = getVoiceConnection(interaction.channel.guild.id);
                connect.destroy();
                // Remove voice state from collection 
                await client.voiceManager.delete(interaction.channel.guild.id)
                const filename = `./recordings/${interaction.user.id}`;
                // Create ffmpeg command to convert pcm to mp3 
                const process = new ffmpeg(`${filename}.pcm`);
                await process.then(function (audio) {
                    audio.fnExtractSoundToMP3(`${filename}.mp3`, async function (error, file) {
                        //edit message with recording as attachment
                        await interaction.followUp({
                            content: `🔉 Here is your recording!`,
                            files: [new MessageAttachment(`./recordings/${interaction.user.id}.mp3`, 'recording.mp3')]
                        });
                        //delete both files
                        fs.unlinkSync(`${filename}.pcm`)
                        fs.unlinkSync(`${filename}.mp3`)
                    });
                }, function (err) {
                    // handle error by sending error message to discord 
                    return interaction.followUp(`❌ An error occurred while processing your recording: ${err.message}`);
                });
            }
        }catch(error) {
            console.log(error)
        }
    }
}
/* Function to write audio to file (from discord.js example) */
function createListeningStream(receiver, userId, user) {
    const opusStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 100,
        },
    });
    const oggStream = new prism.opus.OggLogicalBitstream({
        opusHead: new prism.opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        pageSizeControl: {
            maxPackets: 10,
        },
    });
    const filename = `./recordings/${user.id}.pcm`;
    const out = createWriteStream(filename, { flags: 'a' });
    console.log(`👂 Started recording ${filename}`);
    pipeline(opusStream, oggStream, out, (err) => {
        if (err) {
            console.warn(`❌ Error recording file ${filename} - ${err.message}`);
        } else {
            console.log(`✅ Recorded ${filename}`);
        }
    });
}