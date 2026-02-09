"use client";

export default function TaskError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h2>Something went wrong loading this task.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
