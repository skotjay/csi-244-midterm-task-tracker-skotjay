//after firing up the server, and creating the folder structure, this was the first code i wrote, in order to connect to MongoDB

// Import mongoose so this file can manage the database connection.
// This file should be the *only* place where MongoDB connections are handled.
import mongoose from "mongoose";

// Pull the MongoDB connection string from environment variables.
// This keeps secrets out of the codebase and allows different environments
// (local, production) to use different databases.
const MONGODB_URI = process.env.MONGODB_URI as string;

// Hard fail early if the env variable is missing.
// If this throws, it means I forgot to set up `.env.local`
// or the deployment environment variables.
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

// Use a global cache to store the connection across hot reloads.
// Next.js can re-run server code frequently in development,
// and without this cache I'd accidentally open multiple DB connections.
let cached = (global as any).mongoose;

// If this is the first time this file runs, initialize the cache.
// `conn` will store the active connection.
// `promise` will store the in-progress connection attempt.
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// This function is what the rest of the app will call
// whenever it needs database access.
export async function connectToDatabase() {
  // If a connection already exists, reuse it.
  // This avoids reconnecting on every request.
  if (cached.conn) return cached.conn;

  // If no connection is in progress, start one.
  // Store the promise so multiple calls can await the same connection.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  // Wait for the connection to finish, cache it,
  // and return it so callers know the DB is ready.
  cached.conn = await cached.promise;
  return cached.conn;
}

//next i moved to the data/models/Tasks.ts to check on that situation :)
