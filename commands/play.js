const { VoiceConnection, DiscordAPIError, MessageEmbed, User } = require("discord.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");


module.exports = {
    name: 'play',
    description: "Basic Music Bot!",
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to execute this command!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send("You haven't given me the ability to CONNECT to this voice channel!");
        if(!permissions.has('SPEAK')) return message.channel.send("You haven't given me the ability to SPEAK to this voice channel!");
        if(!args.length) return message.channel.send('You need to send the second argument!');


        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\m*)?(\S+)(:[0-9]+)?(\/|\/([\w#!;/+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }   
        if(validURL(args[0])){

            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], {filter: 'audioonly'});

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
            
            await message.reply(`:thumbsup: Now Playing ***${args[0]}***!`);
        }


        const connection = await voiceChannel.join();
        const videoFinder = async(query) => {
            const videoResult= await ytSearch(query)

            return (videoResult.videos.length > 1) ? videoResult.videos[0]: null;
        }

        const video = await videoFinder(args.join(' '));
        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
            const RequestedSong = new MessageEmbed()
            .setTitle(`:thumbsup: Now Playing ${video.title}`)
            .setURL(`${video.url}`)
            .setAuthor('Discord Bot Made by @Wyznel#0001')
            .setTimestamp()
            .setFooter("If you encounter any issues with this bot please DM Wyznel#0001!")
            .addField(`Music Playing - ${video.title}`, `Song requested by ${message.author}`)

            await message.reply(RequestedSong)
        } else {
            message.channel.send(":thumbsdown: Seems like we couldn't find what you where looking for! :thumbsdown: ");
        }
        
     }
}