import mongoose from "mongoose";

export function connectDb(mongoUri) {
  return mongoose.connect(mongoUri);
}
