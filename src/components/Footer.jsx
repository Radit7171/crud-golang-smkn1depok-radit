"use client";

import useDarkMode from "./DarkModeContext";
import Link from "next/link";
import { Sun, Moon, Info, Shield, FileText } from "lucide-react";

const Footer = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <footer
      className={`mt-auto py-6 px-4 border-t transition-colors ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-700"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Teknisi Management System. All rights
            reserved.
          </div>

          {/* Right Side */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center">
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
              <span className="ml-2 text-sm flex items-center gap-1">
                {theme === "dark" ? (
                  <>
                    <Moon size={14} /> Gelap
                  </>
                ) : (
                  <>
                    <Sun size={14} /> Terang
                  </>
                )}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block border-l h-6 mx-2 border-gray-300 dark:border-gray-600"></div>

            {/* Footer Links */}
            <div className="flex space-x-4">
              <Link
                href="/about"
                className="text-sm flex items-center gap-1 hover:text-blue-500 hover:-translate-y-0.5 transition-all"
              >
                <Info size={14} /> Tentang
              </Link>
              <Link
                href="/privacy"
                className="text-sm flex items-center gap-1 hover:text-blue-500 hover:-translate-y-0.5 transition-all"
              >
                <Shield size={14} /> Privasi
              </Link>
              <Link
                href="/terms"
                className="text-sm flex items-center gap-1 hover:text-blue-500 hover:-translate-y-0.5 transition-all"
              >
                <FileText size={14} /> Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
