import React from "react";
import Link from "next/link";

async function fetchTasks() {
  const res = await fetch("http://localhost:3000/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0, // Ensure fresh data is fetched
    },
  });
  return res.json();
}

export default async function HomePage() {
  const tasks = await fetchTasks();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <Link href="/tasks/new" className="text-blue-500 mb-4 inline-block">
        Create New Task
      </Link>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task: any) => (
            <div key={task.id} className="border p-4 mb-4 rounded-md shadow">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.completed ? "Completed" : "Not Completed"}</p>
              <Link href={`/tasks/${task.id}`} className="text-blue-500">
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
