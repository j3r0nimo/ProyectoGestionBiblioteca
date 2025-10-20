import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isconnected = false;

const connectDB = async () => {
  if (isconnected) return mongoose.connection;

  try {
    //const uri = 'mongodb://localhost:27017/miBiblioteca';
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      // 'throw new Error' immediately stops execution of the current function
      // This is correct: if uri doesn’t exist, execution should stop,
      // because there’s no point in trying to connect.
      throw new Error("Hay un problema con la conexión a MongoDB.");
    }

    await mongoose.connect(uri);
    isconnected = true;
    console.log(`Sistema conectado a MongoDB: ${mongoose.connection.name}`);
  } catch (err) {
    // Here you catch any thrown error and log it to the console
    // 'console.error' do not stop the process, it just logs the error message to the console,
    // So you see what went wrong and then gracefully exit the process. That’s also fine.
    console.error("Error de conección a MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
