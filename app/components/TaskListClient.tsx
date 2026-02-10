"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleTaskComplete, deleteTask } from "@/actions/task-actions";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

/**
 * TaskListClient Component
 * 
 * @fileoverview
 * This file contains the client-side task list component responsible for displaying,
 * filtering, and managing tasks in the task tracker application.
 * 
 * <details>
 * <summary><b>File Purpose & Architecture</b></summary>
 * 
 * ## Purpose
 * This component handles all client-side interactivity for the task list, including:
 * - Real-time search/filtering of tasks
 * - Toggling task completion status
 * - Deleting tasks
 * 
 * ## Why This is a Separate Client Component
 * This file is separated from server components because it:
 * 1. **Uses React State**: The search functionality requires `useState` for real-time filtering
 * 2. **Requires Interactivity**: User input (search) and form submissions need client-side JavaScript
 * 3. **Follows Next.js 13+ App Router Pattern**: Server components fetch data, client components handle UI state
 * 
 * ## Component Breakdown
 * 
 * ### Main Component: TaskListClient
 * - **Props**: Receives `tasks` array from parent (likely a server component)
 * - **State**: Manages `search` string for filtering tasks
 * - **Responsibility**: Orchestrates the display and filtering of tasks
 * 
 * ### Sub-Components (Inline)
 * 
 * #### 1. Search Input
 * - **Purpose**: Filters tasks by title in real-time
 * - **Why Here**: Tightly coupled to the filtered task list; no reuse elsewhere
 * 
 * #### 2. Task List (ul/li)
 * - **Purpose**: Renders filtered tasks with conditional styling
 * - **Why Here**: Specific to this view; uses local filtered data
 * 
 * #### 3. Task Title Link
 * - **Purpose**: Navigation to individual task detail page
 * - **Why Here**: Part of the task item presentation logic
 * 
 * #### 4. Toggle Complete Form
 * - **Purpose**: Server action to mark task complete/incomplete
 * - **Why Here**: Action specific to task list items; uses server action `toggleTaskComplete`
 * 
 * #### 5. Delete Task Form
 * - **Purpose**: Server action to remove task
 * - **Why Here**: Action specific to task list items; uses server action `deleteTask`
 * 
 * ## Data Flow
 * 1. Parent server component fetches tasks from database
 * 2. Tasks passed as props to this client component
 * 3. User types in search → updates state → triggers re-render with filtered results
 * 4. User clicks Complete/Delete → triggers server action → parent re-fetches → new props
 * 
 * </details>
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Task[]} props.tasks - Array of task objects to display and filter
 * @returns {JSX.Element} Rendered task list with search and action buttons
 */
export default function TaskListClient({ tasks }: { tasks: Task[] }) {
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between rounded border px-3 py-2"
          >
            {/* TASK TITLE */}
            <Link href={`/tasks/${task._id}`} className="flex-1">
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
            </Link>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 ml-4">
              {/* TOGGLE */}
              <form
                action={async () => {
                  await toggleTaskComplete(task._id);
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-3 py-1 text-white
                             hover:bg-blue-700 transition"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </form>

              {/* DELETE */}
              <form
                action={async () => {
                  await deleteTask(task._id);
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-red-600 px-3 py-1 text-white
                             hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
