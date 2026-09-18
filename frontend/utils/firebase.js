// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyDl4SydvBYMUzoa5xrsG1YSo4gTh0j5j58", ================= >>>>>>>>>>>>>> /* es api ki ko ham env ma dala ge because ye senstative hai. */
    apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
    authDomain: "loginvirtualcourses-f3f0d.firebaseapp.com",
    projectId: "loginvirtualcourses-f3f0d",
    storageBucket: "loginvirtualcourses-f3f0d.firebasestorage.app",
    messagingSenderId: "880973492803",
    appId: "1:880973492803:web:f6eecac476da215b07daf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* yeha hama Authentatication krana Hoga . */
const auth = getAuth(app)
/* ab esa ek Provider bhi dena Hoga . */
const provider  = new GoogleAuthProvider()

/* Now Hamea Yeha Kuch Chiza export krni hai . */

export {auth , provider}

/* auth se ham authentacation krana wala hai and provider ki help se ham google Authentaction ka use krna wala hai .  */
/* hama AUthentication kaha laha krani hai ..
Signup  Login */