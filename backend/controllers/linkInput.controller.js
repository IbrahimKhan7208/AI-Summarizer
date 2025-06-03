const aiService = require("../services/ai.service")
const {getYoutubeTranscript} = require('../services/yt.transcriptor')
const {articleExtract} = require('../services/article.extractor')

const linkInputController = async (req, res)=>{
    let link = req.body.link
    if(!link){return res.send("Link Required!")}
    let content = ''
    
    try {
        if (link.includes("youtube.com") || link.includes("youtu.be")) {
            content = await getYoutubeTranscript(link);
        } else {
            content = await articleExtract(link);
        }
    } catch (error) {
        console.error("Link processing failed:", error.message);
        content = "⚠️ Unable to extract content from the provided link.";
    }

    const response = await aiService(content)
    res.send(response)
}

module.exports = {linkInputController}