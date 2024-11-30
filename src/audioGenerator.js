const fs  = require("fs");
const { v4: uuidv4 } = require("uuid");
const PlayHT = require("playht");
require('dotenv').config();

PlayHT.init({
    userId: process.env.TTS_USER_ID,
    apiKey: process.env.API_KEY,
});
//@param
// @text - actual subtile json to text parsed input ; todo - might need a thing to pass the full json file instead of the text
// @language  - language .eg -"en"
// @fileName - output directory inside the temp directory
async function TextToSpeechHandler(text){
    const UUID = uuidv4();
    const OUTPUTFILE = "../temp/" + UUID + ".mp3";
    try{
        const fileStream = fs.createWriteStream(OUTPUTFILE);
        //someone give feedback on the tts engine
        const stream = await PlayHT.stream(text, {voiceEngine: "Play3.0-mini"});
        stream.pipe(fileStream);
        console.log("The Audio output saved to " + OUTPUTFILE);
        return OUTPUTFILE;
    }
    catch(error){
        console.error("Error Converting Text To Speech " + error);
    }
}
module.exports = {
    TextToSpeechHandler
}
