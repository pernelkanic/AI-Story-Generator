const { ParseSubtitleFromSrt } = require('./parseSrtFile');
const { TextToSpeechHandler} = require('./audioGenerator');

const inputSRTPath = "../subtitles/minions.srt";
const rateLimitdelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
void async function main(){
    const audioFiles = [];
    const subtitleOutput = ParseSubtitleFromSrt(inputSRTPath);
   
    for(const [index , line] of subtitleOutput.entries()){
        const duration = line.endTime - line.startTime;
        const outputFile = await TextToSpeechHandler(line.text);
        audioFiles.push(outputFile);
        await rateLimitdelay(5000);
    }
    //need to handle the merge logic using audioFiles array
    console.log('Final audio saved as final/final_audio.mp3');
}();