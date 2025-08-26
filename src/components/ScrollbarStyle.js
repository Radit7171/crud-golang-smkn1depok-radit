// components/ScrollbarStyle.js
"use client";

import useDarkMode from "./DarkModeContext";
import { useEffect } from "react";

export default function ScrollbarStyle() {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Fungsi untuk mengubah style scrollbar berdasarkan mode
    const styleScrollbar = () => {
      if (typeof document === "undefined") return;

      const style = document.createElement('style');
      style.id = 'scrollbar-style';
      
      if (darkMode) {
        // Dark mode scrollbar styles
        style.innerHTML = `
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #0f172a;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 10px;
            border: 2px solid #0f172a;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #475569;
          }
          /* Untuk Firefox */
          html {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
          }
        `;
      } else {
        // Light mode scrollbar styles
        style.innerHTML = `
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
            border: 2px solid #f1f5f9;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          /* Untuk Firefox */
          html {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
          }
        `;
      }

      // Hapus style sebelumnya jika ada
      const existingStyle = document.getElementById('scrollbar-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }

      // Tambahkan style baru
      document.head.appendChild(style);
    };

    styleScrollbar();
  }, [darkMode]);

  return null;
}