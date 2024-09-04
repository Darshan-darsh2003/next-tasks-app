"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:3000/api/tasks/${params.id}`);
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, completed }),
    });
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Completed
          </label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2 leading-tight"
          />
          <span className="text-sm">Task Completed</span>
        </div>
        <Button text="Update Task" buttonType="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
