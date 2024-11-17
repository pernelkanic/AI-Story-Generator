const { ParseSubtitleFromSrt } = require('./parseSrtFile');
const { TextToSpeechHandler} = require('./audioGenerator');

const inputSRTPath = "../subtitles/minions.srt";
const LANGUAGECODE = "en";
void async function main(){
    const audioFiles = [];
    const subtitleOutput = ParseSubtitleFromSrt(inputSRTPath);
    for(const [index , line] of subtitleOutput.entries()){
        const duration = line.endTime - line.startTime;
        const outputFile = await TextToSpeechHandler(line.text ,LANGUAGECODE);
        audioFiles.push(outputFile);
    }
    console.log('Final audio saved as final/final_audio.mp3');
}();

