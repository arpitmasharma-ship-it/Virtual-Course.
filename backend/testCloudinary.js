import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

console.log("========== CLOUDINARY TEST ==========");

console.log(
    "Cloud Name:",
    process.env.CLOUDINARY_NAME ? "Loaded" : "❌ Missing"
);

console.log(
    "API Key:",
    process.env.CLOUDINARY_API_KEY ? "Loaded" : "❌ Missing"
);

console.log(
    "API Secret:",
    process.env.CLOUDINARY_API_SECRET ? "Loaded" : "❌ Missing"
);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


try {

    const result = await cloudinary.api.ping();

    console.log("================================");
    console.log("✅ CLOUDINARY PING SUCCESS");
    console.log(result);
    console.log("================================");

} catch (error) {

    console.log("================================");
    console.log("❌ CLOUDINARY PING FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full Error:", error);
    console.log("================================");

}