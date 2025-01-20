const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your-cloud-name', 
  api_key: 'your-api-key',       
  api_secret: 'your-api-secret'  
});


function generateUploadDetails(folder = 'hotel-lemon') {
  const timestamp = Math.round(new Date().getTime() / 1000);


  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder
    },
    cloudinary.config().api_secret
  );


  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`;


  return {
    uploadUrl,
    params: {
      timestamp,
      api_key: cloudinary.config().api_key,
      signature,
      folder
    }
  };
}


