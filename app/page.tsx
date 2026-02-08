// app/page.tsx

import { connectToDatabase } from "@/data/db";
import { Task } from "@/data/models/Task";
import { createTask } from "@/actions/task-actions";
import TaskListClient from "./components/TaskListClient";

export default async function HomePage() {
  await connectToDatabase();
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();

  return (
    <main>
      <h1>Task Tracker</h1>

      {/* ADD TASK FORM */}
      <form
        action={createTask}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input name="title" type="text" placeholder="add task" required />
        <button type="submit">Add</button>
      </form>

      {/* CLIENT-SIDE SEARCH + LIST */}
      <TaskListClient tasks={tasks} />
    </main>
  );
}
