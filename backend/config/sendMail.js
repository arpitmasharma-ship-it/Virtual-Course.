import nodemailer from "nodemailer";
import { createTransport } from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465, /* email ke liya ye hota hai port  */
    secure: true, /* Gmail ke liye true krna hota hai */
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    // ⚠️ Only for local development/testing


    /* tls: {       
        rejectUnauthorized: false     =====>>>>> ye line bht important hai yeha eske bina erro aayega.
    } */


    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = async (to, otp) => {  /* to,otp    ==>> kisko hama send krna hai and otp kya hai hamera .  */
    await transporter.sendMail({
        from: process.env.USER_EMAIL, // sender address
        to: to, // list of recipients
        subject: "Reset Your Password", // subject line

        html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>` // HTML body
        , // HTML body
    });
}

export default sendMail

