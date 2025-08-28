"use client";

import useDarkMode from "./DarkModeContext";
import Link from "next/link";
import { Sun, Moon, Info, Shield, FileText, Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <footer
      className={`mt-auto py-6 px-6 transition-colors ${
        theme === "dark"
          ? "bg-gray-950 text-gray-400"
          : "bg-gray-50 text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div
              className={`text-xs font-semibold px-2 py-1 rounded-md ${
                theme === "dark"
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              TMS
            </div>
            <span className="text-xs">
              © {new Date().getFullYear()} Teknisi Management System
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2 text-xs">
            <Link
              href="/about"
              className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <Info size={12} />
              Tentang
            </Link>
            <Link
              href="/privacy"
              className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <Shield size={12} />
              Privasi
            </Link>
            <Link
              href="/terms"
              className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <FileText size={12} />
              Syarat
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              <Mail size={12} />
              Kontak
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs gap-3">
          <span>
            Dibuat oleh Radit di Indonesia
          </span>

          <div className="flex items-center gap-4">
            {/* Social */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              title="GitHub"
            >
              <Github size={14} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                theme === "dark" ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>

            <span className="opacity-70">v1.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
