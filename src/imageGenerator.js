const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const api_key = process.env.IMAGE_API_KEY;
const url = "https://api.segmind.com/v1/flux-1.1-pro";
//need to fine tune the images a bit according to the subs and add rate limiting.
async function GenerateImage(index, text) {
  const formData = new FormData();
  formData.append('seed', 12345);
  formData.append('width', 1024);
  formData.append('height', 1024);
  formData.append('prompt', text);
  formData.append('aspect_ratio', "1:1");
  formData.append('output_format', "png");
  formData.append('output_quality', 80);
  formData.append('safety_tolerance', 2);
  formData.append('prompt_upsampling', 'false');

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'x-api-key': api_key,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer', 
   
    });
    console.log(response);
    if(response.data){
        if (Buffer.isBuffer(response.data)) {
            const imagePath = `../generated_images/image_${index}.jpg`;
            fs.writeFileSync(imagePath, response.data);
            console.log(`Image for subtitle ${index} saved as ${imagePath}`);
            return imagePath;
          } else {
            console.error("Received data is not a valid Buffer.");
          }
        }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message );
  }
}
module.exports={
    GenerateImage
}