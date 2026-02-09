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
