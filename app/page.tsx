/**
 * Home Page Component
 *
 * @fileoverview Server component that serves as the main entry point for the Task Tracker application.
 * This page is responsible for:
 * - Establishing database connection and fetching all tasks from MongoDB
 * - Serializing task data (converting MongoDB ObjectIds to strings) for client-side compatibility
 * - Rendering the task management UI with the add task form and task list
 *
 * @location /app/page.tsx
 * - Located at app/ root because Next.js App Router treats this as the default page for the root route (/)
 * - Serves as the main application entry point and layout structure
 * - Uses React Server Component pattern to handle data fetching server-side before rendering
 *
 * @component
 * - Form (Add Task): Server action handler that creates new tasks. Positioned here for immediate visibility
 *   and to ensure users see the input at the top of the interface
 * - TaskListClient: Client component child that handles search, filter, and task interaction logic.
 *   Extracted to separate component because it requires useState/useEffect hooks
 *
 * @returns {JSX.Element} Main layout with task form and task list
 *
 * @remarks
 * This component leverages Next.js server components for secure database access and data fetching,
 * while delegating interactive features to TaskListClient to maintain separation of concerns.
 */
// app/page.tsx

import { connectToDatabase } from "@/data/db";
import { Task } from "@/data/models/Task";
import { createTask } from "@/actions/task-actions";
import TaskListClient from "./components/TaskListClient";

export default async function HomePage() {
  await connectToDatabase();

  const rawTasks = await Task.find().sort({ createdAt: -1 }).lean();

  const tasks = rawTasks.map((task) => ({
    _id: task._id.toString(),
    title: task.title,
    completed: task.completed,
  }));

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Task Tracker</h1>

      {/* ADD TASK FORM */}
      <form action={createTask} className="flex gap-2">
        <input
          name="title"
          placeholder="add task"
          className="flex-1 border rounded px-2 py-1"
          required
        />
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>

      {/* TASK LIST + SEARCH (client component) */}
      <TaskListClient tasks={tasks} />
    </main>
  );
}
