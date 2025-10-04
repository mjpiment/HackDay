'use client';

import { useState, useRef, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueTime?: string;
  dueDate: string;
}

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatWrapperProps {
  tasks: Task[];
  selectedDate: string;
  onTaskComplete: (taskId: number) => void;
  onTaskDelete: (taskId: number) => void;
}

// Motivational quotes for encouragement
const motivationalQuotes = [
  "You're doing great! Every task completed is a step forward! 🚀",
  "Progress, not perfection! Keep going! 💪",
  "You've got this! Small steps lead to big achievements! ⭐",
  "Every completed task makes you stronger! Keep it up! 🔥",
  "Success is the sum of small efforts repeated daily! 🌟",
  "You're building momentum with each task! Keep going! 🎯",
  "Remember: Rome wasn't built in a day, but every stone counts! 🏛️",
  "You're closer to your goals than you think! Don't stop now! 🎉",
];

// Task completion suggestions
const taskSuggestions = {
  'study': ['Break it into 25-minute Pomodoro sessions', 'Create a study playlist', 'Find a quiet space', 'Set specific learning goals'],
  'work': ['Prioritize by urgency and importance', 'Take breaks every hour', 'Minimize distractions', 'Set clear deadlines'],
  'exercise': ['Start with a 5-minute warm-up', 'Find a workout buddy', 'Track your progress', 'Choose activities you enjoy'],
  'clean': ['Start with one room at a time', 'Play upbeat music', 'Set a timer for 15 minutes', 'Make it a game'],
  'cook': ['Prep ingredients first', 'Try a new recipe', 'Cook with friends', 'Make extra for leftovers'],
  'read': ['Find a comfortable spot', 'Set a daily reading goal', 'Join a book club', 'Try audiobooks'],
  'write': ['Set a word count goal', 'Write in short bursts', 'Eliminate distractions', 'Join a writing group'],
  'default': ['Break it into smaller steps', 'Set a specific deadline', 'Find an accountability partner', 'Reward yourself when done']
};

// Encouragement messages based on task completion
const getEncouragementMessage = (completedCount: number, totalCount: number) => {
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  if (completionRate === 100) {
    return "🎉 AMAZING! You've completed ALL your tasks for today! You're unstoppable! 🏆";
  } else if (completionRate >= 75) {
    return "🔥 Fantastic work! You're almost done! The finish line is in sight! 🏁";
  } else if (completionRate >= 50) {
    return "💪 Great progress! You're more than halfway there! Keep that momentum going! 🚀";
  } else if (completionRate >= 25) {
    return "⭐ Good start! Every task completed is progress! You're building great habits! 🌟";
  } else {
    return "🌟 Ready to tackle your tasks? Remember, every journey begins with a single step! 🚀";
  }
};

// Get suggestions based on task content
const getTaskSuggestions = (taskText: string): string[] => {
  const text = taskText.toLowerCase();
  
  for (const [keyword, suggestions] of Object.entries(taskSuggestions)) {
    if (keyword !== 'default' && text.includes(keyword)) {
      return suggestions;
    }
  }
  
  return taskSuggestions.default;
};

export default function ChatWrapper({ tasks, selectedDate, onTaskComplete, onTaskDelete }: ChatWrapperProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi there! I'm your Task Buddy! 🍌✨\n\nI can help you with:\n• Task suggestions and tips\n• Motivation and encouragement\n• Progress tracking\n• Quick task completion\n\nTry the quick action buttons below or ask me anything!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Debug log to ensure component is rendering
  console.log('ChatWrapper rendered with tasks:', tasks.length);

  // Show a temporary indicator that the component is loaded
  useEffect(() => {
    console.log('ChatWrapper mounted successfully!');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update encouragement when tasks change
  useEffect(() => {
    const todayTasks = tasks.filter(task => task.dueDate === selectedDate);
    const completedTasks = todayTasks.filter(task => task.completed);
    
    if (todayTasks.length > 0) {
      const encouragement = getEncouragementMessage(completedTasks.length, todayTasks.length);
      
      // Only add encouragement message if it's different from the last one
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.text !== encouragement) {
        addBotMessage(encouragement);
      }
    }
  }, [tasks, selectedDate]);

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      text,
      isUser: false,
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Process user input and generate response
    setTimeout(() => {
      const response = generateResponse(inputValue.trim());
      addBotMessage(response.text, response.suggestions);
    }, 500);

    setInputValue('');
  };

  const generateResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();

    // Check if user is asking about specific tasks
    const todayTasks = tasks.filter(task => task.dueDate === selectedDate && !task.completed);
    const allTodayTasks = tasks.filter(task => task.dueDate === selectedDate);
    
    if (input.includes('help') || input.includes('suggestion')) {
      if (todayTasks.length === 0) {
        return { 
          text: "You don't have any pending tasks for today! Time to add some or enjoy your free time! 🎉",
        };
      }

      // Pick a random task and provide suggestions
      const randomTask = todayTasks[Math.floor(Math.random() * todayTasks.length)];
      const suggestions = getTaskSuggestions(randomTask.text);
      
      return {
        text: `Here are some suggestions for "${randomTask.text}":`,
        suggestions
      };
    }

    if (input.includes('list') || input.includes('show') || input.includes('tasks')) {
      if (allTodayTasks.length === 0) {
        return { text: "No tasks scheduled for today! Add some tasks to get started! 📝" };
      }
      
      const taskList = allTodayTasks.map(task => 
        `${task.completed ? '✅' : '📋'} ${task.text}${task.dueTime ? ` (${task.dueTime})` : ''}`
      ).join('\n');
      
      return { 
        text: `Here are your tasks for today:\n\n${taskList}`,
        suggestions: todayTasks.length > 0 ? ['Complete a task', 'Get suggestions'] : undefined
      };
    }

    if (input.includes('complete') || input.includes('done')) {
      if (todayTasks.length === 0) {
        return { text: "You're all caught up! 🎉" };
      }
      return { 
        text: `You have ${todayTasks.length} task${todayTasks.length > 1 ? 's' : ''} left for today. Click on any task to mark it complete! 💪`,
        suggestions: todayTasks.slice(0, 3).map(task => `Complete: ${task.text}`)
      };
    }

    if (input.includes('motivation') || input.includes('encourage')) {
      const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      return { text: quote };
    }

    if (input.includes('progress') || input.includes('status')) {
      const completed = tasks.filter(task => task.dueDate === selectedDate && task.completed).length;
      const total = tasks.filter(task => task.dueDate === selectedDate).length;
      
      if (total === 0) {
        return { text: "No tasks scheduled for today! Add some tasks to start tracking your progress! 📝" };
      }
      
      return { 
        text: `Your progress for today: ${completed}/${total} tasks completed (${Math.round((completed/total)*100)}%)! ${completed === total ? "🎉 Perfect!" : "Keep going! 💪"}`,
      };
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help you with your tasks! Ask me for suggestions, motivation, or progress updates! 🍌",
      "Try asking me for help with your tasks, motivation, or to check your progress! 💪",
      "I can help you complete your tasks with suggestions and encouragement! What would you like to know? ✨"
    ];

    return { text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] };
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.startsWith('Complete: ')) {
      const taskText = suggestion.replace('Complete: ', '');
      const task = tasks.find(t => t.dueDate === selectedDate && t.text === taskText && !t.completed);
      if (task) {
        onTaskComplete(task.id);
        addBotMessage(`Great job completing "${taskText}"! 🎉 You're making excellent progress! 💪`);
      }
    } else {
      // Add suggestion as user input
      setInputValue(suggestion);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white animate-pulse'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{ zIndex: 9999 }}
      >
        <span className="text-2xl">{isOpen ? '✕' : '🍌'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col" style={{ zIndex: 9998 }}>
          {/* Chat Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">Task Buddy 🍌</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setInputValue('Show my tasks')}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                📋 My Tasks
              </button>
              <button
                onClick={() => setInputValue('Give me suggestions')}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                💡 Suggestions
              </button>
              <button
                onClick={() => setInputValue('Motivate me')}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                🔥 Motivate
              </button>
              <button
                onClick={() => setInputValue('Check progress')}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                📊 Progress
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask for help or motivation..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
