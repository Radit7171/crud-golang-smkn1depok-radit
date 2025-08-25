"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import useDarkMode from "@/components/DarkModeContext";

export default function Dashboard() {
  const [teknisis, setTeknisis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  // ✅ Ambil theme dari DarkModeContext (bukan boolean lagi)
  const { theme } = useDarkMode();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTeknisis();
  }, []);

  const fetchTeknisis = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/tampil", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!response.ok) throw new Error("Gagal mengambil data teknisi");

      const data = await response.json();
      setTeknisis(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus teknisi ini?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/tampil/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchTeknisis();
      } else {
        throw new Error("Gagal menghapus teknisi");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-40`}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Konten utama */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
          title="Dashboard"
          onLogout={handleLogout}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          {error && (
            <div
              className={`px-4 py-3 rounded mb-4 ${
                theme === "dark"
                  ? "bg-red-900 border border-red-700 text-red-200"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          {/* Tombol Tambah Teknisi */}
          <div className="mb-4">
            <Link
              href="/teknisi/tambah"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Teknisi
            </Link>
          </div>

          {/* Tabel Teknisi */}
          <div
            className={`shadow overflow-hidden rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table
              className={`min-w-full divide-y ${
                theme === "dark"
                  ? "divide-gray-700 text-white"
                  : "divide-gray-200 text-gray-900"
              }`}
            >
              <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  {["No", "Nama", "Jurusan", "Aksi"].map((head) => (
                    <th
                      key={head}
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  theme === "dark"
                    ? "divide-gray-700 bg-gray-800"
                    : "divide-gray-200 bg-white"
                }`}
              >
                {teknisis.map((teknisi, index) => (
                  <tr
                    key={teknisi.id}
                    className={`${
                      theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teknisi.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teknisi.jurusan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/teknisi/${teknisi.id}`}
                        className={`mr-4 ${
                          theme === "dark"
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-indigo-600 hover:text-indigo-900"
                        }`}
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/teknisi/edit/${teknisi.id}`}
                        className={`mr-4 ${
                          theme === "dark"
                            ? "text-yellow-400 hover:text-yellow-300"
                            : "text-yellow-600 hover:text-yellow-900"
                        }`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(teknisi.id)}
                        className={`${
                          theme === "dark"
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-900"
                        }`}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
