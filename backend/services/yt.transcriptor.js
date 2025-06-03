const { YoutubeTranscript } = require('youtube-transcript');

async function getYoutubeTranscript (url){
    const getVideoId = (await import("get-video-id")).default;
    const {id: vidId} = getVideoId(url)
    if(!vidId) throw new Error ("Invalid Link")
    const transcript = await YoutubeTranscript.fetchTranscript(vidId);
    const text = transcript.map((t)=> t.text).join(" ")
    return text
}

module.exports = {getYoutubeTranscript}