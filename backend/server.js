import app from "./app.js";
import { v2 as cloudinary } from "cloudinary"; // ✅ Correct import

cloudinary.config({ // ✅ No .v2 here
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
