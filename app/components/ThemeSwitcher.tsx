'use client';

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  // Initialize theme state to null before client-side hydration
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // 1. Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

    // 2. Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []); // Runs once on mount

  useEffect(() => {
    if (theme) {
      // Critical step: update the class on the HTML element
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);

      // Save the preference
      localStorage.setItem('theme', theme);
    }
  }, [theme]); // Runs whenever theme state changes

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Do not render the button until the theme is determined (to avoid flicker)
  if (!theme) return null; 

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}