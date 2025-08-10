import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const startServer = async () => {
  try {
    await dbConnection(); // Wait for DB connection
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is listening at ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
