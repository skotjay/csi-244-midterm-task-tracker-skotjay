"use client";

export default function CreateTaskError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h2>Something went wrong creating the task.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
