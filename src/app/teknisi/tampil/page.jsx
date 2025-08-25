"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import useDarkMode from "@/components/DarkModeContext";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [teknisis, setTeknisis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const router = useRouter();

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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/hapus/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setDeleteConfirm(null);
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
        className={`min-h-screen flex flex-col items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Memuat data teknisi...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
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
          title="Dashboard Teknisi"
          onLogout={handleLogout}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header dan Tombol Tambah */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Daftar Teknisi</h1>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Kelola data teknisi yang terdaftar dalam sistem
              </p>
            </div>
            <Link
              href="/teknisi/tambah"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg inline-flex items-center transition-colors shadow-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Teknisi
            </Link>
          </div>

          {error && (
            <div
              className={`px-4 py-3 rounded-lg mb-6 flex items-center ${
                theme === "dark"
                  ? "bg-red-900 border border-red-700 text-red-200"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Tabel Teknisi */}
          <div
            className={`shadow-lg rounded-xl overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {teknisis.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium">
                  Tidak ada data teknisi
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Tambahkan teknisi baru dengan menekan tombol "Tambah Teknisi"
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                  <thead
                    className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}
                  >
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
                        className={`transition-colors ${
                          theme === "dark"
                            ? "hover:bg-gray-750"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {teknisi.nama}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{teknisi.jurusan}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <Link
                              href={`/teknisi/${teknisi.id}`}
                              className={`p-2 rounded-full transition-colors ${
                                theme === "dark"
                                  ? "text-indigo-400 hover:bg-indigo-900/30"
                                  : "text-indigo-600 hover:bg-indigo-100"
                              }`}
                              title="Detail"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </Link>
                            <Link
                              href={`/teknisi/edit/${teknisi.id}`}
                              className={`p-2 rounded-full transition-colors ${
                                theme === "dark"
                                  ? "text-yellow-400 hover:bg-yellow-900/30"
                                  : "text-yellow-600 hover:bg-yellow-100"
                              }`}
                              title="Edit"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(teknisi)}
                              className={`p-2 rounded-full transition-colors ${
                                theme === "dark"
                                  ? "text-red-400 hover:bg-red-900/30"
                                  : "text-red-600 hover:bg-red-100"
                              }`}
                              title="Hapus"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-2xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Konfirmasi Hapus
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Apakah Anda yakin ingin menghapus teknisi{" "}
              <span className="font-medium">{deleteConfirm.nama}</span>?
            </p>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
