import Link from "next/link";
import { connectToDatabase } from "@/data/db";
import { Task } from "@/data/models/Task";

export default async function TasksPage() {
  await connectToDatabase();
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();

  return (
    <main>
      <h1>Tasks</h1>
      <Link href="/tasks/create">Create a task</Link>

      <ul>
        {tasks.map((t: any) => (
          <li key={t._id.toString()}>{t.title}</li>
        ))}
      </ul>
    </main>
  );
}
