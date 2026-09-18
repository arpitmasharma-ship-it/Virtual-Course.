import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("========== CLOUDINARY UPLOAD TEST ==========");

try {
    const result = await cloudinary.uploader.upload(
        "./public/1787150589740-IMG-20250831-WA0016.jpg",
        {
            resource_type: "image",
            folder: "virtual-courses",
        }
    );

    console.log("================================");
    console.log("✅ IMAGE UPLOAD SUCCESS");
    console.log("Public ID:", result.public_id);
    console.log("URL:", result.secure_url);
    console.log("================================");

} catch (error) {

    console.log("================================");
    console.log("❌ IMAGE UPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full Error:", error);
    console.log("================================");
}