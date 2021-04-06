const videoTitle = require('./play');

const leavemusic = 
module.exports = {
    name: 'leave',
    description: "leaves channel",
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send(`***Stopping song*** - requested by ${message.author} :frowning:`);
        
    }
}