'use client'; // This component must be a Client Component to use state and hooks

import { useState } from 'react';

// Define the type for a single task
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(), // Simple unique ID
      text: newTaskText.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-2xl mt-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Task Manager 🚀</h1>

      {/* Task Input Area */}
      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="What needs to be done?"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-4 rounded-lg transition duration-150 transform hover:scale-[1.01] ${
              task.completed ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer select-none text-lg ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-white p-2 rounded-full hover:bg-red-500 transition duration-150"
              aria-label="Delete Task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          You have no tasks! Get started by adding one above.
        </p>
      )}
    </div>
  );
}