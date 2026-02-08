// app/tasks/create/page.tsx
import { createTask } from "@/actions/task-actions";

export default function CreateTaskPage() {
  return (
    <main>
      <h1>Create Task</h1>

      {/* The key thing here is action={createTask}.
          That means submitting this form calls my SERVER ACTION directly.
      */}
      <form action={createTask}>
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={1}
          placeholder="e.g. Finish midterm checklist"
        />

        <button type="submit">Add Task</button>
      </form>
    </main>
  );
}

//next i moved to the app/tasks/page.tsx. starting with something minimalest that just lists the tasks, then i'll add the delete and toggle complete buttons that call more server actions.
