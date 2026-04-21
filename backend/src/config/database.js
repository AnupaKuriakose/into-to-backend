import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Checking URI:", process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(`\n MongoDb connected !!!
            ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
