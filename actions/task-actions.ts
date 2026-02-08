"use server";

// This file holds server-only functions that mutate data.
// Think of these as the "factory robots" that do the actual work.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/data/db";
import { Task } from "@/data/models/Task";

/**
 * note to self:
 * This action runs ONLY on the server.
 * The form will send its FormData here.
 * I validate the input, connect to MongoDB, create a Task,
 * then revalidate pages that show tasks so the UI updates.
 */
export async function createTask(formData: FormData) {
  // Pull the value out of the form by "name" attribute.
  const rawTitle = formData.get("title");

  // Basic server-side validation (required for real safety even if the client validates too).
  if (typeof rawTitle !== "string") {
    throw new Error("Title must be a string.");
  }

  const title = rawTitle.trim();

  if (!title) {
    throw new Error("Title is required.");
  }

  // Connect to the DB (this uses the caching connection logic you already wrote).
  await connectToDatabase();

  // Create the task (completed defaults to false; timestamps gives createdAt).
  await Task.create({ title });

  // Tell Next.js: "Hey, any route that displays tasks should refresh its data."
  revalidatePath("/tasks");

  // After creation, send the user back to the tasks list.
  redirect("/tasks");
}

//now i'm moving on to app/tasks/create/page.tsx to build the form that will call this action when submitted.
