// src/app/teknisi/[id]/page.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import useDarkMode from '@/components/DarkModeContext';

export default function DetailTeknisi() {
  const [teknisi, setTeknisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  // id bisa string atau string[] tergantung route, amankan:
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const { theme } = useDarkMode();

  useEffect(() => {
    // Pastikan sudah ada id
    if (!id) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchTeknisi = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/tampil/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          router.replace('/login');
          return;
        }

        if (response.status === 404) {
          setError('Teknisi tidak ditemukan.');
          setTeknisi(null);
          return;
        }

        if (!response.ok) {
          const msg = await response.text().catch(() => '');
          throw new Error(msg || 'Gagal mengambil data teknisi');
        }

        const data = await response.json();
        setTeknisi(data);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan jaringan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeknisi();
  }, [id, router]);

  if (!id) {
    // Saat params belum siap (sekejap), tampilkan loader singkat
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        Memuat...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Memuat data teknisi...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <header className={`shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Detail Teknisi</h1>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Informasi lengkap tentang teknisi
            </p>
          </div>
          <Link
            href="/teknisi/tampil/"
            className={`flex items-center font-medium py-2 px-4 rounded-lg transition-colors ${
              theme === "dark" 
                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className={`px-4 py-3 rounded-lg mb-6 flex items-center ${
            theme === "dark"
              ? "bg-red-900 border border-red-700 text-red-200"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {teknisi && (
          <div className={`shadow-lg rounded-xl overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            {/* Header Card */}
            <div className={`px-6 py-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
              <h2 className="text-xl font-semibold flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informasi Teknisi
              </h2>
            </div>
            
            {/* Content Card */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-1`}>Nama Lengkap</span>
                  <p className="text-lg font-medium">{teknisi.nama}</p>
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-1`}>Jurusan</span>
                  <p className="text-lg font-medium">{teknisi.jurusan}</p>
                </div>

                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-1`}>ID Teknisi</span>
                  <p className="text-lg font-medium">#{teknisi.id}</p>
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-1`}>Status</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit ${
                    teknisi.status === 'Aktif' 
                      ? (theme === "dark" ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800")
                      : (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800")
                  }`}>
                    {teknisi.status || 'Aktif'}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className={`mt-8 pt-6 border-t flex space-x-4 ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                <Link
                  href={`/teknisi/edit/${teknisi.id}`}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    theme === "dark" 
                      ? "bg-yellow-700 hover:bg-yellow-600 text-white" 
                      : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Teknisi
                </Link>
                
                <button
                  onClick={() => router.push('/teknisi/tampil/')}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    theme === "dark" 
                      ? "bg-gray-700 hover:bg-gray-600 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
