export default async function Page({ params }: { params: { taskId: string } }) {
  const { taskId } = await params;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task Detail</h1>
      <p>Task ID from URL: {taskId}</p>
    </div>
  );
}
