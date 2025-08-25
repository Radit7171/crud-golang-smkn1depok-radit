"use client";

import useDarkMode from "./DarkModeContext";
import Link from "next/link";

const Footer = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <footer className={`mt-auto py-6 px-4 border-t ${
      theme === "dark" 
        ? "bg-gray-800 border-gray-700 text-gray-300" 
        : "bg-white border-gray-200 text-gray-700"
    }`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Teknisi Management System. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="mr-2 text-sm">Mode: </span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label="Toggle theme"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-2 text-sm">
                {theme === "dark" ? "Gelap" : "Terang"}
              </span>
            </div>
            
            <div className="hidden md:block border-l h-6 mx-2 border-gray-300 dark:border-gray-600"></div>
            
            <div className="flex space-x-4">
              <Link 
                href="/about" 
                className="text-sm hover:text-blue-500 transition-colors"
              >
                Tentang
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm hover:text-blue-500 transition-colors"
              >
                Privasi
              </Link>
              <Link 
                href="/terms" 
                className="text-sm hover:text-blue-500 transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;