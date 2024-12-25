const { ParseSubtitleFromSrt } = require('./parseSrtFile');
const { TextToSpeechHandler  ,MergeAudio } = require('./audioGenerator');
const {GenerateImage}  = require("./imageGenerator");
const{GenerateConciseText}  = require('./textGenerator');


const rateLimitdelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const input  = "i need a story of prince that lived in a town called wakanda ";// this needs to be handled from the frontend
void async function main(){
    //need to define api's and move this code to controller
    const inputSRTPath = GenerateConciseText(input);
    //dont fucking execute the fn without commenting the below code.
    const audioFiles = [];
    //need to handle the subtitle path and splitting case.
    const subtitleOutput = ParseSubtitleFromSrt(inputSRTPath);
    const imageFiles = [];
    //need to change this
    for(const [index , line] of subtitleOutput.entries()){
        const duration = line.endTime - line.startTime;
        const subtitleIndex = index;
        const tasks = [
            GenerateImage(subtitleIndex, line.text).then(imageFile => {
                    imageFiles.push(imageFile);
                }),
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