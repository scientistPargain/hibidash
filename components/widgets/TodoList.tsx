"use client";

import { useState } from "react";
import { useTodoList, useAddTodo, useToggleTodo, useDeleteTodo } from "@/hooks";
import { TodoPriority } from "@/models";
import { showSuccess, showError } from "@/utils";
import { Plus, Trash2, Check } from "lucide-react";

export default function TodoList({ userId }: { userId: string }) {
  const { data: todos = [], isLoading } = useTodoList(userId);
  const addTodo = useAddTodo(userId);
  const toggleTodo = useToggleTodo(userId);
  const deleteTodo = useDeleteTodo(userId);

  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    priority: "medium" as TodoPriority,
  });

  const handleAdd = () => {
    if (!newTodo.title.trim()) return;

    addTodo.mutate(
      { title: newTodo.title, priority: newTodo.priority },
      {
        onSuccess: () => {
          setNewTodo({ title: "", priority: "medium" });
          setShowForm(false);
          showSuccess("Task added!");
        },
        onError: (error) => {
          showError(error.message || "Failed to add task");
        },
      }
    );
  };

  const handleToggle = (id: string, completed: boolean) => {
    toggleTodo.mutate({ id, completed: !completed });
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id, {
      onSuccess: () => showSuccess("Task deleted!"),
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-bold">
          To-Do List
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-lg hover:shadow-xl p-2 text-white transition hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>

      {showForm && (
        <div className="mb-4 space-y-2 rounded-lg border p-3">
          <input
            type="text"
            placeholder="Task title..."
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="w-full rounded-md border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <select
            value={newTodo.priority}
            onChange={(e) =>
              setNewTodo({
                ...newTodo,
                priority: e.target.value as TodoPriority,
              })
            }
            className="w-full rounded-md border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            onClick={handleAdd}
            disabled={addTodo.isPending}
            className="w-full rounded-md bg-gradient-to-r from-orange-500 to-amber-600 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {addTodo.isPending ? "Adding..." : "Add Task"}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`rounded-lg border p-3 transition ${
                todo.completed ? "bg-gray-50 opacity-60" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-2">
                <button
                  onClick={() => handleToggle(todo.id, todo.completed)}
                  className={`mt-1 rounded-full border-2 p-1 transition ${
                    todo.completed
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  <Check size={14} />
                </button>

                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${getPriorityColor(
                      todo.priority
                    )}`}
                  >
                    {todo.priority}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 transition hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tasks yet
            </p>
          )}
        </div>
      )}
    </div>
  );
}
