"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    setLoading(true);

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    setTitle("");
    await fetchTodos();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Todo App</h1>

        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Что нужно сделать?"
            className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "..." : "Добавить"}
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((t: any) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-white/10 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/20 transition"
            >
              <span className={t.completed ? "line-through opacity-60" : ""}>
                {t.title}
              </span>
              <span>{t.completed ? "✅" : "⏳"}</span>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">Нет задач</p>
        )}
      </div>
    </div>
  );
}
