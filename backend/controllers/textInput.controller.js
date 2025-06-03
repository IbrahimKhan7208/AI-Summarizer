const aiService = require("../services/ai.service")

const textInputController = async (req, res)=>{
    let text = req.body.text

    if(!text){ return res.send("Prompt Required!")}

    const response = await aiService(text)

    res.send(response)
}

module.exports = {textInputController}