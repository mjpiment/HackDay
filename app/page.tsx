'use client';

import { useState } from 'react';
import TodoList, { Task } from './components/TodoList';
import ChatWrapper from './components/ChatWrapper';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            SlugHub Task Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Organize your tasks with AI assistance
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Todo List Section */}
          <div className="order-2 lg:order-1">
            <TodoList onTasksChange={handleTasksChange} />
          </div>

          {/* AI Chat Section */}
          <div className="order-1 lg:order-2">
            <ChatWrapper tasks={tasks} />
          </div>
        </div>

        {/* Stats Section */}
        {tasks.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Task Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {tasks.length}
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    Total Tasks
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {tasks.filter(task => task.completed).length}
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-200 font-medium">
                    Completed
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-300">
                    {tasks.filter(task => !task.completed).length}
                  </div>
                  <div className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}