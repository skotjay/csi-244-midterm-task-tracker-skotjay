// error.tsx is always a Client Component in the App Router.

"use client";

export default function TasksError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong loading tasks.</h2>

      <p>{error.message}</p>

      <button onClick={reset}>Try again</button>
    </div>
  );
}
