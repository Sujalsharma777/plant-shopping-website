import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connect", () => console.log("database connect"));
  await mongoose.connect(`{process.env.MONGODB_URL}/ecommerce-project`);
};
export default connectDB;
