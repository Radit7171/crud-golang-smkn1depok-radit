"use client";

import useDarkMode from "@/components/DarkModeContext";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiLogOut,
  FiSettings,
  FiUser,
  FiBell,
  FiStar
} from "react-icons/fi";
import { useState, useEffect } from "react";

const Navbar = ({ toggleSidebar, isSidebarOpen, title, onLogout }) => {
  const { theme, toggleTheme } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false); // State untuk status bintang

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const handleStarClick = () => {
    setIsStarred(!isStarred);
    // Di sini bisa ditambahkan logika lainnya, seperti menyimpan preferensi user
    console.log("Status bintang:", !isStarred);
  };

  // Hindari hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 
          ${isScrolled ? "shadow-lg" : "shadow-md"}
          ${
            theme === "dark"
              ? "bg-gray-900 border-b border-gray-800"
              : "bg-white border-b border-gray-200"
          }`}
      >
        <div className="flex items-center justify-between p-4 md:px-6">
          {/* Left: toggle sidebar + title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className={`relative p-2.5 rounded-xl transition-all duration-300 group
                ${
                  theme === "dark"
                    ? "text-gray-200 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              aria-label="Toggle Sidebar"
            >
              <div className="relative w-5 h-5">
                {isSidebarOpen ? (
                  <FiX className="w-5 h-5 transition-transform duration-300" />
                ) : (
                  <FiMenu className="w-5 h-5 transition-transform duration-300" />
                )}
              </div>
            </button>

            <h1 className='text-xl md:text-2xl font-bold transition-all duration-300 ${
                  theme === "dark"
                    ? "text-gray-200 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"'>
              {title}
            </h1>
          </div>

          {/* Right: notifications, settings, user and logout */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Tombol Toggle Theme (Bulan/Matahari) */}
            <button
              onClick={toggleTheme}
              className={`relative p-2.5 rounded-xl transition-all duration-300
                ${
                  theme === "dark"
                    ? "text-blue-300 hover:bg-gray-800"
                    : "text-blue-600 hover:bg-gray-100"
                }`}
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button
              className={`relative p-2.5 rounded-xl transition-all duration-300
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings button - triggers right sidebar */}
            <button
              onClick={toggleRightSidebar}
              className={`relative p-2.5 rounded-xl transition-all duration-300
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-label="Open Settings"
            >
              <FiSettings className="w-5 h-5" />
            </button>

            {/* User profile */}
            <button
              className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              aria-label="User Profile"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                ${theme === "dark" ? "bg-blue-700" : "bg-blue-100"}`}
              >
                <FiUser
                  className={
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }
                />
              </div>
              <span
                className={`hidden md:block text-sm font-medium
                ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              >
                Admin
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className={`relative flex items-center space-x-2 py-2.5 px-3 md:px-4 rounded-xl 
                transition-all duration-300 shadow-md hover:shadow-lg
                ${
                  theme === "dark"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
            >
              <FiLogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Right Sidebar for Settings */}
      {isRightSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-60 transition-opacity duration-300"
            onClick={toggleRightSidebar}
          />

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-80 z-70 transform transition-transform duration-300
            ${isRightSidebarOpen ? "translate-x-0" : "translate-x-full"}
            ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-6 border-b
              ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
            >
              <h2
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Pengaturan
              </h2>
              <button
                onClick={toggleRightSidebar}
                className={`p-1.5 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                aria-label="Close Settings"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div
                className={`mb-6 pb-4 border-b
                ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
              >
                <h3
                  className={`text-sm font-medium uppercase mb-4
                  ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                >
                  Tema
                </h3>

                <div className="flex items-center justify-between">
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    Mode Gelap
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                      ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
                    aria-label="Toggle Dark Mode"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                      ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>

              <div
                className={`mb-6 pb-4 border-b
                ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
              >
                <h3
                  className={`text-sm font-medium uppercase mb-4
                  ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                >
                  Notifikasi
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      Notifikasi Email
                    </span>
                    <div className="relative inline-block w-10 h-6">
                      <input
                        type="checkbox"
                        className="sr-only"
                        id="email-notifications"
                        defaultChecked
                      />
                      <label
                        htmlFor="email-notifications"
                        className={`block h-6 w-10 rounded-full transition-colors duration-200
                          ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 bg-white border w-5 h-5 rounded-full transition-transform duration-200 transform translate-x-4`}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }
                    >
                      Notifikasi Aplikasi
                    </span>
                    <div className="relative inline-block w-10 h-6">
                      <input
                        type="checkbox"
                        className="sr-only"
                        id="app-notifications"
                        defaultChecked
                      />
                      <label
                        htmlFor="app-notifications"
                        className={`block h-6 w-10 rounded-full transition-colors duration-200
                          ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 bg-white border w-5 h-5 rounded-full transition-transform duration-200 transform translate-x-4`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3
                  className={`text-sm font-medium uppercase mb-4
                  ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                >
                  Bahasa
                </h3>

                <div
                  className={`rounded-lg p-3 ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <select
                    className={`w-full bg-transparent focus:outline-none
                      ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;