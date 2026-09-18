
import multer from "multer"

/* Multer ke trough ham yeha ek storage create kra raha hai 
ham yeha multer komidleware bana rha hai and diskStorage ki help se ham data ko storage ma store krwayga 
fir cloudinary vo storge pe jayega and Public Folder ma jo image hogi vo utha lega . AND Public Folder ko khali kr dega .    */



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")   /* Yeha Public Folder ek destination ki taraha kaam kr raha hai .  */

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
/* hamena multer ke through ek storage create kiya and usse upload ma daal diya .  */
const upload = multer({ storage })
export default upload
/* jaha jaha ham es image ko hamera storage ma save krana chaiye ga waha waha ham es uploade ka use krange  .  */

