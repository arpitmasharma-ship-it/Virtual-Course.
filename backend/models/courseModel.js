import mongoose from "mongoose"



const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    subTitle: {
        type: String,

    },

    description: {
        type: String,

    },

    category: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"]
    },

    price: {
        type: Number
    },

    thumbnail: {
        type: String,

    },



    /* type: mongoose.Schema.Types.ObjectId
ObjectId MongoDB ka unique ID hota hai.
Har User document ka apna _id hota hai: */

    /* To enrolledStudents mein hum poora user object nahi, sirf uska _id store karenge. */

    /* ref: "User" 🔥
    Ye sabse important part hai.
    ref: "User"
    iska matlab:
    Ye ObjectId User model ke document ko refer karta hai. */



    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,  /* Ye ek tarika hota hai dusra model se lean ka  */
        ref: "User"
    }],
    lectures: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"

    }],

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    /* yeha ham check krange ki hamera course Published hai ki nhi ...    agar publish hai tho vo hama main home pr dikhai dega and 
    and hamera all courses ma dikhai dega and ager publish nhi ahi ager vo draft ma hai tho jb ham course create krwaywge tho ham bs do cheeza lenge 
      Title , Category .   */

    isPublished: {
        type: Boolean,
        default: false  /* by deafult ye false rha . */

    },

    reviews: [{  /*   []  iska mltb hai ki ham esa ek array ma likh raha hai .   */
        type: mongoose.Schema.Types.ObjectId, /* review ko bhi ham kishi dusra model se lange ... */
        ref:"Review"
    }],
    
     
     



}, { timestamps: true })


const Course = mongoose.model("Course"  ,  courseSchema)

export default Course



/* 

enum: ["beginner", "intermediate", "advance"]
🔥 enum ka matlab
enum ka full concept hai fixed allowed values.
Matlab is field mein sirf ye 3 values store ho sakti hain:
beginner
intermediate
advance

*/