"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useDarkMode from "@/components/DarkModeContext";

export default function TambahTeknisiPage() {
  const [formData, setFormData] = useState({
    nama: "",
    jurusan: "",
    email: "",
    telepon: "",
    spesialisasi: "",
    pengalaman: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { theme } = useDarkMode();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validasi sederhana
    if (!formData.nama.trim() || !formData.jurusan.trim()) {
      setError("Nama dan Jurusan wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Teknisi berhasil ditambahkan!");
        // Reset form
        setFormData({
          nama: "",
          jurusan: "",
          email: "",
          telepon: "",
          spesialisasi: "",
          pengalaman: "",
        });
        // Redirect setelah 2 detik
        setTimeout(() => {
          router.push("/teknisi/tampil/");
        }, 2000);
      } else {
        setError(data.message || "Gagal menambahkan teknisi");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/teknisi/tampil/"
            className={`inline-flex items-center text-sm font-medium mb-4 ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Dashboard
          </Link>
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Tambah Teknisi Baru
          </h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Isi formulir di bawah ini untuk menambahkan teknisi baru ke sistem.
          </p>
        </div>

        {/* Form Container */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Form Header */}
          <div
            className={`px-6 py-4 border-b ${
              theme === "dark"
                ? "border-gray-700 bg-gray-750"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <h2
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Informasi Teknisi
            </h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Alert Messages */}
            {error && (
              <div
                className={`mb-6 px-4 py-3 rounded-lg flex items-center ${
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

            {success && (
              <div
                className={`mb-6 px-4 py-3 rounded-lg flex items-center ${
                  theme === "dark"
                    ? "bg-green-900 border border-green-700 text-green-200"
                    : "bg-green-100 border border-green-400 text-green-700"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {success}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              {/* Jurusan Field */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Jurusan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Contoh: Teknik Elektro"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/teknisi/tampil/"
                className={`px-5 py-2.5 text-center rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2.5 rounded-lg font-medium flex items-center justify-center transition-colors ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Simpan Teknisi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Footer */}
        <div
          className={`mt-6 text-center text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <p>Pastikan data yang dimasukkan sudah benar sebelum menyimpan.</p>
        </div>
      </div>
    </div>
  );
}
