\\\\\\\\\\  BACKEND /////////

npm init 


express
// Backend/API banane ke liye

mongoose
// MongoDB se connect karne ke liye

dotenv
// .env ki secret values use karne ke liye

nodemon
// Code change par server automatically restart

jsonwebtoken
// Login authentication ke liye JWT token

cookie-parser
// Cookies read karne ke liye

bcryptjs
// Password ko hash/secure karne ke liye

validator
// Email/password validation ke liye

cors
// Frontend aur backend ko connect/allow karne ke liye


 "scripts": {
    "dev" : "nodemon index.js"  //////  to use npm run dev
  }










  <!-- Fronted -->

  #   npm install tailwindcss @tailwindcss/vite

  <!-- import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   ///// this is to import 

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  ///// this is to add
  ],
}) -->


<!-- @import "tailwindcss"; -->   ///////  in index.css



<!-- import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'   ////// this is important to import 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) -->



<!-- if u want to add  fonts from the google fonts  then grt the font in import form and add it to the index.css -->



<!-- npm i react-router-dom   , ,,,,, ,  npm i react-icons  ,,   ract-toastify  react-spinners   ,,,   axios   react-redux  @reduxjs/toolkit -->

<!--    
   npm i react-router-dom react-icons react-toastify react-spinners axios react-redux @reduxjs/toolkit

     -->



     <!--    main.js ma BrowseRouter ko leke aata hai and app ko BrowseRouter ke ander wrap krta hai ..      -->





     <!-- TRY CATCH 
     Means :
     "Pehle ye code try karo. Agar isme error aaye, to program crash karne ke bajay catch me chale jao."



     Kaha kaha apn majeraly try catch lagata hai 
     A. Database operations
     B. API calls
     C. JSON parsing
     D. File operations
     
      -->













      <!-- CLOUDINARY ERROR ==================>>>>>>>>>>>>>>>>>>>>>>>>>
      
      
      2. 🔴 Jo EXACT error log aaya
Tumhare log mein tha:
❌ UPDATE PROFILE ERROR:
ReferenceError: Cannot access 'user' before initialization

at updateProfile
(userController.js:136:13)
Important part:
ReferenceError:
Cannot access 'user' before initialization
Iska matlab:
JavaScript ko kahin aisa code mila jahan:
user
ko uske initialize hone se pehle access kiya gaya.
Ye Cloudinary 403 error nahi tha.



 -->



 <!-- CLOUDIBNARY WALA MA ISSUE UserCountyroler and Cloudinary MA THI  . -->












 <!-- flow 
 
 
 model => esma sbse phele ham ek Schema Banata hai jisme us ma kya kya hoga usse define krta hai fir us Schema ka Model Create krta hai 
 
 Controller =>   upper hamne ye jo Model banaya iski help se ham use User ya fir entitiy tho  create krta hi Controller ma ...  --> 



 <!-- 
 
 
 HTTP methods mainly 4 hain:
Method	Kab use karna hai?	Simple meaning
GET ==>>	Data chahiye ==>>	📥 Lao
POST  ==>>	Naya data banana/send karna	 ==>> 📤 Banao/Bhejo
PUT  ==>>	Existing data ko poora update karna	 ==>> 🔄 Replace/Update
PATCH  ==>>	Existing data ka kuch part update karna ==>> 	✏️ Thoda Update
DELETE  ==>>	Data delete karna ==>> 	🗑️ Mitao




 -->