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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 8;
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

  // Filter and sort data
  const filteredData = teknisis.filter(
    (teknisi) =>
      teknisi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teknisi.jurusan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "name") return a.nama.localeCompare(b.nama);
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            : "bg-gray-50 text-gray-900"
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
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-60`}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Konten utama */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
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
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {/* Header dan Tombol Tambah */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <h1 className="text-xl font-semibold">Daftar Teknisi</h1>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {sortedData.length} teknisi terdaftar dalam sistem
              </p>
            </div>
            <Link
              href="/teknisi/tambah"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md inline-flex items-center transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1.5"
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
              className={`px-3 py-2 rounded-md mb-4 flex items-center text-sm ${
                theme === "dark"
                  ? "bg-red-900/30 border border-red-800 text-red-200"
                  : "bg-red-100 border border-red-200 text-red-700"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
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

          {/* Card untuk data */}
          <div
            className={`rounded-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-sm border ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Header dengan pencarian dan filter */}
            <div
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-3 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari teknisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-3 py-2 w-full text-sm rounded-md border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Urutkan:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`text-sm rounded-md border px-2 py-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="newest">Terbaru</option>
                  <option value="name">Nama A-Z</option>
                </select>
              </div>
            </div>

            {/* Tabel Teknisi (Desktop) */}
            <div className="hidden md:block p-10">
              {sortedData.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
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
                  <h3 className="mt-2 text-sm font-medium">
                    Tidak ada data teknisi
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {searchTerm
                      ? "Coba gunakan kata kunci lain"
                      : 'Tambahkan teknisi baru dengan menekan tombol "Tambah Teknisi"'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full border dark:border-gray-700">
                      <thead
                        className={
                          theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                        }
                      >
                        <tr>
                          {["No", "Nama", "Jurusan", "Aksi"].map((head) => (
                            <th
                              key={head}
                              className={`px-4 py-3 text-center border text-xs font-medium uppercase tracking-wider ${
                                theme === "dark"
                              }`}
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y text-center divide-gray-200 dark:divide-gray-700">
                        {currentItems.map((teknisi, index) => (
                          <tr
                            key={teknisi.id}
                            className={
                              theme === "dark"
                                ? "hover:bg-gray-750"
                                : "hover:bg-gray-50"
                            }
                          >
                            <td className="px-4 border py-3 whitespace-nowrap">
                              <div className="text-sm font-medium">
                                {indexOfFirstItem + index + 1}
                              </div>
                            </td>
                            <td className="px-4 border py-3 whitespace-nowrap">
                              <div className="text-sm font-medium">
                                {teknisi.nama}
                              </div>
                            </td>
                            <td className="px-4 border py-3 whitespace-nowrap">
                              <div className="text-sm">{teknisi.jurusan}</div>
                            </td>
                            <td className="px-4 py-3 border whitespace-nowrap text-center">
                              <div className="flex justify-center items-center space-x-2">
                                <Link
                                  href={`/teknisi/${teknisi.id}`}
                                  className={`p-1.5 rounded-md transition-colors ${
                                    theme === "dark"
                                      ? "text-indigo-400 hover:bg-indigo-900/30"
                                      : "text-indigo-600 hover:bg-indigo-100"
                                  }`}
                                  title="Detail"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                                  className={`p-1.5 rounded-md transition-colors ${
                                    theme === "dark"
                                      ? "text-yellow-400 hover:bg-yellow-900/30"
                                      : "text-yellow-600 hover:bg-yellow-100"
                                  }`}
                                  title="Edit"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                                  className={`p-1.5 rounded-md transition-colors ${
                                    theme === "dark"
                                      ? "text-red-400 hover:bg-red-900/30"
                                      : "text-red-600 hover:bg-red-100"
                                  }`}
                                  title="Hapus"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                </>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  className={`px-4 py-3 border-t ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Menampilkan {indexOfFirstItem + 1} sampai{" "}
                      {Math.min(indexOfLastItem, sortedData.length)} dari{" "}
                      {sortedData.length} data
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-500 hover:text-white"
                        } ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Sebelumnya
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`px-3 py-1.5 rounded-md text-xs ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : `${
                                      theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-500 hover:text-white"
                        } ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card view untuk mobile */}
            <div className="block md:hidden">
              {sortedData.length === 0 ? (
                <div className="p-6 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
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
                  <h3 className="mt-2 text-sm font-medium">
                    Tidak ada data teknisi
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {searchTerm
                      ? "Coba gunakan kata kunci lain"
                      : 'Tambahkan teknisi baru dengan menekan tombol "Tambah Teknisi"'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 p-3">
                  {currentItems.map((teknisi, index) => (
                    <div
                      key={teknisi.id}
                      className={`w-full p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            #{indexOfFirstItem + index + 1}
                          </span>
                          <p className="text-sm font-semibold truncate">
                            {teknisi.nama}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {teknisi.jurusan}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <Link
                            href={`/teknisi/${teknisi.id}`}
                            className={`p-1.5 rounded-md ${
                              theme === "dark"
                                ? "text-indigo-400 hover:bg-indigo-900/30"
                                : "text-indigo-600 hover:bg-indigo-100"
                            }`}
                            title="Detail"
                          >
                            <svg
                              className="w-4 h-4"
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
                            className={`p-1.5 rounded-md ${
                              theme === "dark"
                                ? "text-yellow-400 hover:bg-yellow-900/30"
                                : "text-yellow-600 hover:bg-yellow-100"
                            }`}
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
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
                            className={`p-1.5 rounded-md ${
                              theme === "dark"
                                ? "text-red-400 hover:bg-red-900/30"
                                : "text-red-600 hover:bg-red-100"
                            }`}
                            title="Hapus"
                          >
                            <svg
                              className="w-4 h-4"
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
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination untuk mobile */}
              {totalPages > 1 && (
                <div
                  className={`p-3 border-t ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Menampilkan {indexOfFirstItem + 1} sampai{" "}
                      {Math.min(indexOfLastItem, sortedData.length)} dari{" "}
                      {sortedData.length} data
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-500 hover:text-white"
                        } ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Sebelumnya
                      </button>

                      <span className="px-3 py-1.5 rounded-md text-xs bg-blue-500 text-white">
                        {currentPage}
                      </span>

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1.5 rounded-md text-xs ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-500 hover:text-white"
                        } ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`w-full max-w-md p-5 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-md font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Konfirmasi Hapus
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Apakah Anda yakin ingin menghapus teknisi{" "}
              <span className="font-medium">{deleteConfirm.nama}</span>?
            </p>
            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => setDeleteConfirm(null)}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-3 py-1.5 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
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
