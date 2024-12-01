const { ParseSubtitleFromSrt } = require('./parseSrtFile');
const { TextToSpeechHandler  ,MergeAudio } = require('./audioGenerator');
const {GenerateImage}  = require("./imageGenerator");

//todo: generate accurate subtitle text for the image generation according to the story gist given by the user and generate the srt file of it.
const inputSRTPath = "../subtitles/minions.srt";
const rateLimitdelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
void async function main(){
    const audioFiles = [];
    const subtitleOutput = ParseSubtitleFromSrt(inputSRTPath);
    const imageFiles = [];

    for(const [index , line] of subtitleOutput.entries()){
        const duration = line.endTime - line.startTime;
        const subtitleIndex = index;
        const tasks = [
            // GenerateImage(subtitleIndex, line.text).then(imageFile => {
            //         imageFiles.push(imageFile);
            //     }),
            TextToSpeechHandler(line.text).then(audioFile => {
                    audioFiles.push(audioFile);
                })
        ];
        await Promise.all(tasks);
        await rateLimitdelay(5000);
    }
    //todo : need to handle the merge logic using audioFiles array.
    MergeAudio(audioFiles);

    //todo : merge the audio and subtitle text with the image.
    console.log('Final audio saved as final/final_audio.mp3');
}();