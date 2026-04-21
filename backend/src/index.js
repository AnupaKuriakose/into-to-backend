import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Point to the .env file in the parent folder (backend/)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const startServer = async () => {
  try {
    await connectDB();
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Serrver is running on port:${process.env.PORT}`);
    });
  } catch (err) {
    console.log("MongoDb connect fail", err);
  }
};
startServer();
