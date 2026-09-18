import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    // Enrolled courses
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",    /* courseModel ke anderr hamana Course Model banaya hai Waha se reference lelega. */
        },
    ],

    // =========================
    // FORGOT PASSWORD FIELDS
    // =========================

    resetOtp: {
        type: String
    },

    otpExpires: {
        type: Date
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
);


const User = mongoose.model("User", userSchema);
export default (User)


/* model hamana bana liya ab ham iska Controller banana wala hai jaha ham course ko create kr sakha ... */