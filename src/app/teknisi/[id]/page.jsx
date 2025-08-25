// src/app/teknisi/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetailTeknisi() {
  const [teknisi, setTeknisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchTeknisi();
  }, []);

  const fetchTeknisi = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/tampil/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Gagal mengambil data teknisi');
      }

      const data = await response.json();
      setTeknisi(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Detail Teknisi</h1>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Kembali
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {teknisi && (
          <div className="bg-white shadow overflow-hidden rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Informasi Teknisi</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Nama:</p>
                <p>{teknisi.nama}</p>
              </div>
              <div>
                <p className="font-medium">Jurusan:</p>
                <p>{teknisi.jurusan}</p>
              </div>
              {/* Tambahkan field lainnya sesuai kebutuhan */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}