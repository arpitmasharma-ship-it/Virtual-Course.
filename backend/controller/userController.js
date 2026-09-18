/* current user ki id kop get krna ke liya we are doing this  */

import User from "../models/userModel.js"
import uploadOnCloudinary from "../config/cloudinary.js"

export const getCurrentUser = async (req, res) => {
    try {
        /* yeha apne user ko find krna hai */
        /* user ki id se find krange   AND user ki id kaha se  milage "isAuth" ma hamena 
        req.userId likgha tha veha se ham apne user ki id ko get kr lange and hamea current user ko find kr lenge*/
        const user = await User.findById(req.userId).select("-password")/* .select wala ilsiya because ham user ke pass password ko pass nhi krna hai isliye  */
        /* Ager User nhi mila thop ... */

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        /* if ager user aa gaya tho  */
        return res.status(200).json(user)
        /* Understandinfg 
        res ka matlab response object. Server is object ke through frontend ko response bhejta hai.
        .json(user) ==>>ser ko JSON format mein frontend ko bhej raha hai. */
    } catch (error) {
        return res.status(500).json({
            message: `Get Current User Error ${error}`
        })
    }
}


/* Yeha ham ek controler banana wala hai profile ko update krna ke liya .  */
export const updateProfile = async (req, res) => {
    try {
        /* Firastly we need user id ki konsa user ko update krna hai .  */
        const userId = req.userId
        const { description, name } = req.body
        let photoUrl




        /* YE KHATARNAK ERROR THA YEHA MA PURA 
        Tumhara uploadOnCloudinary() sirf URL nahi, balki Cloudinary ka poora response object return kar raha hai.
        BUT HAMA SHRIF IMAGE WALA CHAIYE THA .. */
        // if (req.file) {
        //     photoUrl = await uploadOnCloudinary(req.file.path) /* ye path upload se milage jo hamne multer ma banaya tha waha se. */
        // }



        if (req.file) {
            const uploadedImage = await uploadOnCloudinary(req.file.path);

            photoUrl = uploadedImage.secure_url;
        }

        /* jo photoUrl , name , discription hai usse hama MongoDb ma bhi dhalana hai .  */
        const user = await User.findByIdAndUpdate(userId, { name, description, photoUrl }, { new: true }) /*  { name, description, photoUrl } Ye sb ham body se le raha hai .  */
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }


        // await user.save()   /* yeha ham user ko save kr raha hai .  */


        /* if ager user aa gaya tho  */
        return res.status(200).json(user)  /* gaar user exiwst krta hai tho ham user ko response ma send kr deta hai .  */
    } catch (error) {
        return res.status(500).json({
            message: `Update Profile Error ${error}`
        })
    }
}

