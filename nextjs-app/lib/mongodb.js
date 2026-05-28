/**
 * MongoDB connection singleton for Next.js + Mongoose (MERN)
 * Uses a global cache to avoid exhausting connections in serverless/dev environments.
 */
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || "sbj_db";

// Defer error to connection time so build doesn't fail
// if MONGO_URL isn't set during CI/CD


// Cache connection across hot-reloads in development
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGO_URL) {
    throw new Error(
      "Please define MONGO_URL in .env.local — e.g. mongodb://localhost:27017 or your Atlas URI"
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        dbName: DB_NAME,
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
