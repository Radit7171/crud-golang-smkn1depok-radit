"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useDarkMode from "./DarkModeContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme } = useDarkMode();

  // state submenu
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "";
    }
  }, [isOpen]);

  if (!mounted) return null;

  // struktur menu mirip Nowa
  const menuGroups = [
    {
      category: "Main",
      items: [
        {
          href: "/teknisi/tampil",
          label: "Dashboard",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
            </svg>
          ),
        },
      ],
    },
    {
      category: "Management",
      items: [
        {
          label: "Teknisi",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
            </svg>
          ),
          children: [
            { href: "/teknisi/tampil", label: "Data Teknisi" },
            { href: "/teknisi/tambah", label: "Tambah Teknisi" },
          ],
        },
        // {
        //   label: "Sparepart",
        //   icon: (
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       className="side-menu__icon"
        //       width="24"
        //       height="24"
        //       viewBox="0 0 24 24"
        //     >
        //       <path d="M20 6h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zM4 18V8h4v10H4zm6 0V8h4v10h-4zm10 0h-4V8h4v10zm-6-12V4h4v2h-4z" />
        //     </svg>
        //   ),
        //   children: [
        //     { href: "/sparepart/tampil", label: "Data Sparepart" },
        //     { href: "/sparepart/tambah", label: "Tambah Sparepart" },
        //   ],
        // },
      ],
    },
    // {
    //   category: "General",
    //   items: [
    //     {
    //       href: "/settings",
    //       label: "Settings",
    //       icon: (
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="side-menu__icon"
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M12 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm8-4h-2.101a7.027 7.027 0 0 0-1.274-2.567l1.487-1.487a1 1 0 1 0-1.414-1.414L15.211 2.1A7.021 7.021 0 0 0 12 1c-.862 0-1.696.156-2.479.447L8.101.039A1 1 0 0 0 6.687 1.453l1.487 1.487A7.027 7.027 0 0 0 6.9 5.507C5.277 5.832 4 7.265 4 9a1 1 0 0 0 1 1h2.101a7.027 7.027 0 0 0 1.274 2.567L6.888 14.04a1 1 0 1 0 1.414 1.414L9.789 13.9A7.04 7.04 0 0 0 12 15c.862 0 1.696-.156 2.479-.447l1.42 1.413a1 1 0 0 0 1.414-1.414l-1.487-1.487A7.027 7.027 0 0 0 17.1 10H20a1 1 0 0 0 1-1c0-1.735-1.277-3.168-2.9-3.493z" />
    //         </svg>
    //       ),
    //     },
    //   ],
    // },
  ];

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          h-screen w-50 max-w-full
          shadow-xl lg:shadow-md
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${
            theme === "dark"
              ? "bg-gray-900 text-gray-300"
              : "bg-white text-gray-700"
          }
        `}
      >
        {/* Header */}
        <div className="main-sidebar-header text-center p-1 border-b border-gray-200 dark:border-gray-700">
          <a href="/teknisi/tampil" className="header-logo flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Bengkel SMKN 1 Depok
            </span>
          </a>
        </div>

        {/* Menu */}
        <div className="main-sidebar p-2 flex-1 overflow-y-auto">
          <nav className="main-menu-container nav nav-pills flex-column sub-open py-0.5">
            <ul className="main-menu space-y-1">
              {menuGroups.map((group) => (
                <div key={group.category}>
                  {/* Category Title */}
                  <li className="slide__category px-4 py-2">
                    <span className="category-name text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      {group.category}
                    </span>
                  </li>

                  {/* Menu Items */}
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const hasChildren =
                      item.children && item.children.length > 0;

                    return (
                      <li key={item.label} className="slide has-sub">
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => toggleMenu(item.label)}
                              className={`side-menu__item flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                                openMenus[item.label]
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <span className="side-menu__icon mr-3">
                                {item.icon}
                              </span>
                              <span className="side-menu__label flex-1 text-left">
                                {item.label}
                              </span>
                              <svg
                                className={`w-4 h-4 transition-transform ${
                                  openMenus[item.label] ? "rotate-90" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>

                            {/* Submenu */}
                            {openMenus[item.label] && (
                              <ul className="slide-menu child1 ml-4 pl-6 border-l border-gray-200 mt-1 space-y-1">
                                {item.children.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <li key={child.href} className="slide">
                                      <Link
                                        href={child.href}
                                        className={`side-menu__item block px-3 py-2 rounded-md text-sm transition-colors ${
                                          isChildActive
                                            ? "bg-blue-100"
                                            : "hover:bg-gray-100"
                                        }`}
                                      >
                                        {child.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className={`side-menu__item flex items-center px-4 py-3 rounded-md transition-colors ${
                              isActive
                                ? "bg-blue-100"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <span className="side-menu__icon mr-3">
                              {item.icon}
                            </span>
                            <span className="side-menu__label">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </div>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div
          className={`p-1.5 border-t text-xs text-center ${
            theme === "dark"
              ? "border-gray-700 text-gray-400 bg-gray-800"
              : "border-gray-200 text-gray-500 bg-gray-50"
          }`}
        >
          © {new Date().getFullYear()} Bengkel SMKN 1 Depok
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
