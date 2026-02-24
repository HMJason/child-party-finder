"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🎉</span>
            </div>
            <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:text-white">
              Party Finder
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
            
            <nav className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-medium"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
