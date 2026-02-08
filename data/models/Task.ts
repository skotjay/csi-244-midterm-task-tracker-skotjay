import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Task = models.Task || model("Task", TaskSchema);

//next I moved on to actions/task-actions.ts to code the functions that will interact with the Task model and perform CRUD operations.
