"use client";

import { useState, useEffect, useRef } from "react";
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
  FiSearch,
  FiGlobe,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi";

const Navbar = ({ toggleSidebar, isSidebarOpen, title, onLogout }) => {
  const { theme, toggleTheme } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("switcher-home");

  // State untuk mengontrol dropdown yang aktif
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Ref untuk mendeteksi klik di luar dropdown
  const dropdownRefs = {
    language: useRef(null),
    notifications: useRef(null),
    profile: useRef(null),
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Event listener untuk menutup dropdown saat klik di luar
    const handleClickOutside = (event) => {
      // Jika ada dropdown yang aktif dan klik dilakukan di luar dropdown, tutup dropdown
      if (activeDropdown) {
        const ref = dropdownRefs[activeDropdown];
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
    // Tutup dropdown lainnya saat membuka sidebar kanan
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    // Tutup dropdown lainnya saat mengubah mode layar penuh
    setActiveDropdown(null);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    // Tutup dropdown lainnya saat membuka pencarian
    setActiveDropdown(null);
  };

  // Fungsi untuk menangani toggle dropdown
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 
    ${isScrolled ? "shadow-sm" : ""}
    ${
      theme === "dark"
        ? "bg-gray-900 border-b border-gray-800"
        : "bg-white border-b border-gray-100"
    }`}
      >
        <div className="flex items-center justify-between px-2 py-1.5 sm:px-3">
          {/* Left: toggle sidebar + title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className={`p-1.5 rounded-md transition-all duration-200
    ${
      theme === "dark"
        ? "text-gray-300 hover:bg-gray-800"
        : "text-gray-600 hover:bg-gray-100"
    }`}
            >
              {isSidebarOpen ? (
                <FiX className="w-4 h-4" />
              ) : (
                <FiMenu className="w-4 h-4" />
              )}
            </button>

            {/* Search bar for desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-9 pr-3 py-1.5 rounded-md text-sm transition-all duration-200
    ${
      theme === "dark"
        ? "bg-gray-800 text-white placeholder-gray-400"
        : "bg-gray-100 text-gray-800 placeholder-gray-500"
    }`}
                />
                <FiSearch className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right: notifications, settings, user and logout */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Search button for mobile */}
            <button
              onClick={toggleSearch}
              className={`p-1.5 rounded-lg transition-all duration-200 md:hidden
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Language dropdown */}
            <div className="relative" ref={dropdownRefs.language}>
              <button
                onClick={() => toggleDropdown("language")}
                className={`p-1.5 rounded-lg transition-all duration-200
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                aria-label="Language"
                aria-expanded={activeDropdown === "language"}
              >
                <FiGlobe className="w-5 h-5" />
              </button>

              {activeDropdown === "language" && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50
                    ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                >
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    English
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Spanish
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    French
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    German
                  </a>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-md transition-all duration-200
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
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
            <div className="relative" ref={dropdownRefs.notifications}>
              <button
                onClick={() => toggleDropdown("notifications")}
                className={`p-1.5 rounded-md transition-all duration-200 relative
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                aria-label="Notifications"
                aria-expanded={activeDropdown === "notifications"}
              >
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {activeDropdown === "notifications" && (
                <div
                  className={`absolute right-0 mt-2 w-63 rounded-md shadow-lg z-50
      ${
        theme === "dark"
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
                >
                  {/* Header */}
                  <div className="p-1.5 flex items-center justify-between">
                    <p
                      className={`text-base font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Notifications
                    </p>
                    <span
                      className={`text-xs px-1.5 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      6 Unread
                    </span>
                  </div>
                  <div
                    className={`border-t ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  />

                  {/* List */}
                  <ul className="max-h-50 overflow-y-auto">
                    {[
                      {
                        icon: "📂",
                        color: "bg-pink-500",
                        title: "New Files available",
                        time: "10 hours ago",
                      },
                      {
                        icon: "🟣",
                        color: "bg-purple-500",
                        title: "Updates available",
                        time: "2 days ago",
                      },
                      {
                        icon: "🛒",
                        color: "bg-green-500",
                        title: "New order received",
                        time: "1 hour ago",
                      },
                      {
                        icon: "✉️",
                        color: "bg-yellow-500",
                        title: "New review received",
                        time: "1 day ago",
                      },
                      {
                        icon: "📋",
                        color: "bg-red-500",
                        title: "22 verified registrations",
                        time: "2 hours ago",
                      },
                      {
                        icon: "✅",
                        color: "bg-green-600",
                        title: "Project approved",
                        time: "4 hours ago",
                      },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className={`p-1 flex items-start gap-3 hover:${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                        } transition`}
                      >
                        {/* Avatar */}
                        <span
                          className={`w-8 h-8 flex items-center justify-center text-white rounded-lg ${item.color}`}
                        >
                          {item.icon}
                        </span>

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {item.title}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.time}
                            </span>
                          </div>
                          {/* Close button */}
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div
                    className={`p-1 border-t ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <button
                      className={`w-full text-center py-1.5 text-sm rounded-md font-medium
          ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className={`p-1.5 rounded-lg transition-all duration-200
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <FiMinimize className="w-5 h-5" />
              ) : (
                <FiMaximize className="w-5 h-5" />
              )}
            </button>

            {/* User profile */}
            <div className="relative" ref={dropdownRefs.profile}>
              <button
                onClick={() => toggleDropdown("profile")}
                className={`flex items-center space-x-1.5 p-1.5 rounded-lg transition-all duration-200
                  ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                aria-label="User Profile"
                aria-expanded={activeDropdown === "profile"}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center
  ${theme === "dark" ? "bg-blue-800" : "bg-blue-100"}`}
                >
                  <FiUser
                    className={
                      theme === "dark"
                        ? "text-blue-200 w-4 h-4"
                        : "text-blue-600 w-4 h-4"
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

              {activeDropdown === "profile" && (
                <div
                  className={`absolute right-0 mt-2 w-30 rounded-lg shadow-lg py-0.5 z-50
                    ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                >
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleRightSidebar}
              className={`p-1.5 rounded-md transition-all duration-200
                ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-label="Open Settings"
            >
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchVisible && (
          <div className="px-4 py-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg transition-all duration-200
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-800 placeholder-gray-500"
                  }`}
              />
              <FiSearch
                className={`absolute left-3 top-2.5 w-4 h-4
                  ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
          </div>
        )}
      </header>

      {/* Right Sidebar for Switcher */}
      {isRightSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={toggleRightSidebar}
          />

          {/* Switcher Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-65 z-50 transform transition-transform duration-300
              ${isRightSidebarOpen ? "translate-x-0" : "translate-x-full"}
              ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } shadow-xl flex flex-col`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-1.5 border-b
                ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
            >
              <h5
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Switcher
              </h5>
              <button
                onClick={toggleRightSidebar}
                className={`p-0.5 rounded-md transition-colors
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-500"
                  }`}
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs Navigation */}
            <nav
              className={`border-b ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div className="flex" role="tablist">
                <button
                  className={`flex-1 py-3 text-sm font-medium
                    ${
                      activeTab === "switcher-home"
                        ? theme === "dark"
                          ? "text-blue-400 border-b-2 border-blue-400"
                          : "text-blue-600 border-b-2 border-blue-600"
                        : theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("switcher-home")}
                  role="tab"
                >
                  Theme Styles
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium
                    ${
                      activeTab === "switcher-profile"
                        ? theme === "dark"
                          ? "text-blue-400 border-b-2 border-blue-400"
                          : "text-blue-600 border-b-2 border-blue-600"
                        : theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("switcher-profile")}
                  role="tab"
                >
                  Theme Colors
                </button>
              </div>
            </nav>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-1.5">
              {/* Theme Styles Tab */}
              {activeTab === "switcher-home" && (
                <div className="space-y-2">
                  {/* Theme Color Mode */}
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Theme Color Mode:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`rounded-md p-3 cursor-pointer border
    ${
      theme === "dark"
        ? "border-gray-700 hover:border-gray-600"
        : "border-gray-200 hover:border-gray-300"
    }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-light-theme"
                            name="theme-style"
                            className="mr-2"
                            checked={theme === "light"}
                            onChange={() => theme === "dark" && toggleTheme()}
                          />
                          <label
                            htmlFor="switcher-light-theme"
                            className="cursor-pointer"
                          >
                            Light
                          </label>
                        </div>
                      </div>

                      <div
                        className={`rounded-md p-3 cursor-pointer border
    ${
      theme === "dark"
        ? "border-gray-700 hover:border-gray-600"
        : "border-gray-200 hover:border-gray-300"
    }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-dark-theme"
                            name="theme-style"
                            className="mr-2"
                            checked={theme === "dark"}
                            onChange={() => theme === "light" && toggleTheme()}
                          />
                          <label
                            htmlFor="switcher-dark-theme"
                            className="cursor-pointer"
                          >
                            Dark
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Directions */}
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Directions:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`rounded-md p-3 cursor-pointer border
                        ${
                          theme === "dark"
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-ltr"
                            name="direction"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="switcher-ltr"
                            className="cursor-pointer"
                          >
                            LTR
                          </label>
                        </div>
                      </div>
                      <div
                        className={`rounded-md p-3 cursor-pointer border
                        ${
                          theme === "dark"
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-rtl"
                            name="direction"
                            className="mr-2"
                          />
                          <label
                            htmlFor="switcher-rtl"
                            className="cursor-pointer"
                          >
                            RTL
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Styles */}
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Navigation Styles:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`rounded-md p-3 cursor-pointer border
                        ${
                          theme === "dark"
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-vertical"
                            name="navigation-style"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="switcher-vertical"
                            className="cursor-pointer"
                          >
                            Vertical
                          </label>
                        </div>
                      </div>
                      <div
                        className={`rounded-md p-3 cursor-pointer border
                        ${
                          theme === "dark"
                            ? "border-gray-700 hover:border-gray-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="switcher-horizontal"
                            name="navigation-style"
                            className="mr-2"
                          />
                          <label
                            htmlFor="switcher-horizontal"
                            className="cursor-pointer"
                          >
                            Horizontal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add other sections similarly... */}

                  {/* Reset Button */}
                  <div className="mt-6">
                    <button
                      className={`w-full py-2 px-4 rounded-md font-medium
                      ${
                        theme === "dark"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-amber-600 hover:bg-amber-700 text-white"
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={handleLogout}
                      className={`w-full py-2 px-4 rounded-md font-medium
                      ${
                        theme === "dark"
                          ? "bg-red-700 hover:bg-red-600 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* Theme Colors Tab */}
              {activeTab === "switcher-profile" && (
                <div className="space-y-6">
                  {/* Menu Colors */}
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Menu Colors:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "bg-white",
                        "bg-gray-900",
                        "bg-blue-600",
                        "bg-gradient-to-r from-blue-500 to-purple-600",
                        "bg-transparent",
                      ].map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full ${color} border border-gray-300 cursor-pointer`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Primary Colors */}
                  <div>
                    <p
                      className={`text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Theme Primary:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "bg-blue-500",
                        "bg-purple-500",
                        "bg-green-500",
                        "bg-yellow-500",
                        "bg-red-500",
                      ].map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full ${color} cursor-pointer`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Add other color sections similarly... */}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
