import { v2 as cloudinary } from 'cloudinary'

import fs from "fs"  /* file ko unlink or delete krna ka liya kaam aata hai .  */
import dotenv from "dotenv";    /* this was missing   */  ////// error point 


dotenv.config();

/* yeha pe ham file ka ek path share kerna wala hu jo ki cloudinary ma jake Store Ho jayega . */
const uploadOnCloudinary = async (filePath) => {
    /* jaha pr bhi ham uploadOnCloudinary ka use krange waha se hama ye file path mil jayega . */
    /* filePath ma jo bhi Public ma photo ya file hogi uska Path Hoga .  */
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    /* try catch ma ham apna main kaam krange . */
    /* main kaam Cloudinary ma  upload krana . */
    try {
        if (!filePath) {
            return null
        }

        /* variable */
        /* error point for upploading  */       // const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: 'auto' })


        const uploadResult = await cloudinary.uploader.unsigned_upload(  /* my mistake is ki ma yeha "unsigned_upload" ki jagha "upload" use kr raha tha . */
            filePath,
            "mern_products",
            {
                folder: "virtual_courses",
                resource_type: "auto"  /* auto isliye ki ye video bhi le sakha ... */
            }
        );




        /* JO value CLoudinary ma store hua hai .  */
        fs.unlinkSync(filePath)  /* Public Folder ma jayega and wha se filePtah le lega and then vo waha se delete kr dega . */
        // return uploadResult.secure_url      ====>>>>>>>>> error point 
        return uploadResult

    } catch (error) {
        // fs.unlinkSync(filePath)     =>>>>>>//////////////////////////  error point 
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.log(error)
    }
}
export default uploadOnCloudinary



/* ERRORS */
/* return uploadResult.secure_url
Iska matlab function return karega:
"https://res.cloudinary.com/..."
Yaani STRING.
Lekin tumhare controller mein:
const uploadedImage = await uploadOnCloudinary(req.file.path);

photoUrl = uploadedImage.secure_url;
Tum string ke andar .secure_url dhoond rahe ho.
❌ Ye mismatch hai. */