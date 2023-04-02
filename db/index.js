const mongoose = require("mongoose");

require("dotenv/config");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/Tekko";

async function openConnection() {
  try {
    return await mongoose
      .set("strictQuery", true)
      .connect(
        "mongodb+srv://jltp2c:YAU7SbSQTT6TMUtx@tekko-appfinal.fzajj40.mongodb.net/?retryWrites=true&w=majority"
      );
  } catch (error) {
    console.error(`Error while connecting to the database: ${error.message}`);
  }
}
module.exports = openConnection;
