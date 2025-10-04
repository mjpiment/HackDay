'use client'; 

import { useState } from 'react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  onTasksChange?: (tasks: Task[]) => void;
}

export default function TodoList({ onTasksChange }: TodoListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Notify parent component when tasks change
  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    onTasksChange?.(newTasks);
  };

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    updateTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id: number) => {
    updateTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    updateTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl mt-12 transition-colors duration-300">

      {/* Bouncing Emoji Icon */}
      <div className="flex justify-center mb-4">
        <span 
          role="img" 
          aria-label="Task Icon" 
          className="text-5xl animate-bounce" // text-5xl and animate-bounce applied to emoji
        >
          🍌
        </span>
      </div>

      {/* Adjusted Title (Smaller: text-3xl, no emoji) */}
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">
        My Task Manager
      </h1>

      {/* Task Input Area and List (with dark mode classes) */}
      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="What needs to be done?"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-4 rounded-lg transition duration-150 transform hover:scale-[1.01] ${
              task.completed 
                ? 'bg-green-50 border-green-300 dark:bg-green-900 dark:border-green-700 shadow-sm' 
                : 'bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 shadow-sm'
            }`}
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer select-none text-lg ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
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
        <p className="text-center text-gray-500 mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
          You have no tasks! Get started by adding one above.
        </p>
      )}
    </div>
  );
}