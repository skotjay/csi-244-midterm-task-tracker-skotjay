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
  const rawTitle = formData.get("title");

  // Server-side validation
  if (typeof rawTitle !== "string") {
    throw new Error("Title must be a string.");
  }

  const title = rawTitle.trim();

  if (!title) {
    throw new Error("Title is required.");
  }

  // Ensure DB connection
  await connectToDatabase();

  // Create task
  await Task.create({ title });

  // Revalidate the ROOT task list ("/")
  revalidatePath("/");

  // Redirect back to the main task list
  redirect("/");
}

/**
 * note to self:
 * This action toggles a task's `completed` state.
 * The server decides the new value to keep MongoDB as the source of truth.
 */
export async function toggleTaskComplete(taskId: string) {
  if (!taskId) {
    throw new Error("Task ID is required.");
  }

  await connectToDatabase();

  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found.");
  }

  // Flip completion state
  task.completed = !task.completed;
  await task.save();

  // Revalidate routes that display this data
  revalidatePath("/");
  revalidatePath(`/tasks/${taskId}`);
}

/**
 * note to self:
 * This action permanently deletes a task from the database.
 */
export async function deleteTask(taskId: string) {
  if (!taskId) {
    throw new Error("Task ID is required.");
  }

  await connectToDatabase();

  const deleted = await Task.findByIdAndDelete(taskId);

  if (!deleted) {
    throw new Error("Task not found.");
  }

  // Revalidate the main task list
  revalidatePath("/");
}
