
import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dh82farcr", 
    api_key: process.env.CLOUDINARY_API_KEY || "729678993778463", 
    api_secret: process.env.CLOUDINARY_API_SECRET || "yelxzet9Ib6Y3W5WMRNlPuZRulU"
})

const uploadToCloudinary = async (localFilePath) => {
   try{
    if(!localFilePath) return null;{
       // upload the file on cloudinary 
    const  response = await cloudinary.uploader.upload(localFilePath,{
            resource__type: "auto",
        } )
     // file has been ulpoad on cloudinary sucessfully
     response.url;
     return response;
    }
   } catch (error){
      fs.unlinkSync(localFilePath); // remove the file from the local saved temporary as the upload failed
      return null;    
      }
}

export {uploadToCloudinary}

//after dot env used 