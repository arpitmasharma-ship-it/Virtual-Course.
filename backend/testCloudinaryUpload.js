import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("========== CLOUDINARY TEST ==========");

console.log(
    "Cloud Name:",
    process.env.CLOUDINARY_NAME ? "Loaded" : "Missing"
);

console.log(
    "API Key:",
    process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing"
);

console.log(
    "API Secret:",
    process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing"
);


// ================================
// 1. PING TEST
// ================================
try {
    console.log("\n========== UNSIGNED UPLOAD TEST ==========");

    const result = await cloudinary.uploader.unsigned_upload(
        "./public/1787152649048-IMG-20250831-WA0016.jpg",
        "mern_products",
        {
            folder: "virtual_courses"
        }
    );

    console.log("✅ UNSIGNED UPLOAD SUCCESS");
    console.log("Public ID:", result.public_id);
    console.log("URL:", result.secure_url);

} catch (error) {
    console.log("❌ UNSIGNED UPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full Error:", error);
}