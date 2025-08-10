import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    });
    console.log("✅ Connected successfully to MongoDB");
  } catch (err) {
    console.error("❌ Error while connecting to database:", err);
    process.exit(1); // stop the app if DB connection fails
  }
};
