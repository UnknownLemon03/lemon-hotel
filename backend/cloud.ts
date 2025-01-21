import {v2} from "cloudinary"

v2.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function deleteImageCloud(url:string){
  try{
    let publicId = url.split('/').slice(-1)[0].split('.')[0]; 
    const data = await v2.uploader.destroy(publicId);
      console.log(data)
  }catch(e){
      console.log(e)
  }
}