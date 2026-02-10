// app/loading.tsx

export default function LoadingHome() {
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Loading tasks…</h2>
      <p>Please wait while your tasks are fetched.</p>

      <ul>
        <li>Loading task…</li>
        <li>Loading task…</li>
        <li>Loading task…</li>
      </ul>
    </main>
  );
}
