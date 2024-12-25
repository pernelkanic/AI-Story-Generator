const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs  = require("fs");
const path = require("path");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//dont curse me for this hardcoding , i just need to finish this off real quick and play apex lol
const FILLER_WORDS = "generate the concise narrator point of view dialogue alone for this story, include the introductions in third person, as a narrative voice like 'Once upon a time'";

const OUTPUT_DIR = process.env.OUTPUT_CONCISE_DIR 
const FILENAME = process.env.OUTPUT_CONCISE_FILENAME 
const OUTPATH = path.join(OUTPUT_DIR, `${FILENAME}.txt`);

async function GenerateConciseText(input){
    const prompt = input + `${FILLER_WORDS}`;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    fs.writeFileSync(OUTPATH ,result.response.text());
    return OUTPATH;
}
module.exports = {GenerateConciseText}