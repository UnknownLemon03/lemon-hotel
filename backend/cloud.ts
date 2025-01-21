import {v2} from "cloudinary"

v2.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function deleteImageCloud(url:string){
  try{
      let publicId = url.split('/').slice(-2).join('/').slice(0,-4);
      const data = await v2.uploader.destroy(publicId,(result)=>{
      })
  }catch(e){
  }
}