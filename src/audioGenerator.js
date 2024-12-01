const fs  = require("fs");
const { v4: uuidv4 } = require("uuid");
const PlayHT = require("playht");
const audioconcat = require('audioconcat')
 
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
//might work , too lazy to install ffmpeg , which is needed for audioconcat to work but this would do the job for now according to the docs , so just  someone fucking help me with this fucking code so we can test the fuckingg codeeeeee....ahh i can't...
async function MergeAudio(audioFiles){
    const outputFile = '../temp/combined_output.mp3';
    audioconcat(audioFiles)
  .concat(outputFile)
  .on('start', function (command) {
    console.log(command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error(err)
    console.error(stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in-', output)
  })
    
}
module.exports = {
    TextToSpeechHandler,
    MergeAudio
}
