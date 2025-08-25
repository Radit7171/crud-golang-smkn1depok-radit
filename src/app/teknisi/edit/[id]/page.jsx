"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTeknisiPage({ params }) {
  const { id } = params; // <-- ambil dari URL /teknisi/edit/[id]

  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // preload data teknisi
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan, silakan login ulang.");
        return;
      }

      try {
        const res = await fetch(`/api/tampil/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setNama(data.nama);
          setJurusan(data.jurusan);
        } else {
          setError("Gagal memuat data teknisi");
        }
      } catch (err) {
        setError("Terjadi kesalahan jaringan");
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nama, jurusan }), // id tidak perlu dikirim lagi
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/teknisi/tampil");
      } else {
        setError(data.message || "Gagal mengupdate teknisi");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Edit Teknisi
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="text"
          placeholder="Jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Update"}
        </button>
      </form>
    </div>
  );
}
