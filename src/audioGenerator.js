const fs  = require("fs");
const tts = require("google-tts-api");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

//Temp directory for audio storage , todo - might need a object storage
//@param
// @text - actual subtile json to text parsed input ; todo - might need a thing to pass the full json file instead of the text
// @language  - language .eg -"en"
// @fileName - output directory inside the temp directory
async function TextToSpeechHandler(text , language){
    const UUID = uuidv4();
    const OUTPUTFILE = "../temp/" + UUID + ".mp3";
    //todo : need to use @google-cloud/text-to-speech library using env keys to handle different vocals.
    try{
        const url = await tts.getAudioUrl(text ,{
            lang : language ,
            slow:false,
            host:'https://translate.google.com'
        });
        const response = await axios.get(url ,{responseType :'arraybuffer'});
        fs.writeFileSync(OUTPUTFILE, Buffer.from(response.data));
        console.log("The Audio output saved to " + OUTPUTFILE);
        return OUTPUTFILE;
    }
    catch(error){
        console.error("Error Converting Text To Speech " + OUTPUTFILE);
    }
}

module.exports = {
    TextToSpeechHandler
}
