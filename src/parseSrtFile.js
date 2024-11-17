const fs = require("fs");
const parser = require("subtitles-parser");
const { v4: uuidv4 } = require("uuid");

const UUID = uuidv4();
const outputSubtitlePath = "../subtitles/" + UUID +".json"//might need a object storage
//@param
// @filepath - subtitle filepath as the input
//@output - json file inside the subtitle directory
function ParseSubtitleFromSrt(filepath){
    const srtContent = fs.readFileSync(filepath  ,'utf-8');
    const subtitles = parser.fromSrt(srtContent , true);
    //for reference to check how the output will be.
    fs.writeFileSync(outputSubtitlePath , JSON.stringify(subtitles));
    return subtitles;
}
module.exports = {
    ParseSubtitleFromSrt
}
