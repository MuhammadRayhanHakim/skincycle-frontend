import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  CheckCircle,
  Loader2,
  Upload,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  Image,
  X,
} from "lucide-react";

const AdminArticleManagement = () => {
  // STATE DATA ARTIKEL & LOADING
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // STATE UNTUK FILTER & SEARCH
  const [searchTerm, setSearchTerm] = useState("");

  // STATE FORM INPUT ARTIKEL (CREATE & EDIT)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    judul_artikel: "",
    isi_artikel: "",
    kategori: "",
    status: "Published",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // FETCH DATA FROM ENDPOINT
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ensiklopedia");
      const result = await response.json();
      if (result.status === "success" || result.data) {
        setArticles(result.data || result);
      }
    } catch (error) {
      console.error("Gagal memuat basis data artikel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // HANDLER UNGGAH GAMBAR / FOTO SAMPUL
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // HANDLER OPEN MODAL UNTUK BUAT BARU
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setEditingArticleId(null);
    setNewArticle({
      judul_artikel: "",
      isi_artikel: "",
      kategori: "",
      status: "Published",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // HANDLER OPEN MODAL UNTUK EDIT
  const handleOpenEditModal = (article) => {
    setIsEditMode(true);
    setEditingArticleId(article.id_artikel || article.id);
    setNewArticle({
      judul_artikel: article.judul_artikel || article.title || "",
      isi_artikel: article.isi_artikel || article.content || "",
      kategori: article.kategori || article.category || "",
      status: article.status || "Published",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // HANDLER SUBMIT (BISA CREATE MAUPUN UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newArticle.judul_artikel.trim() ||
      !newArticle.isi_artikel.trim() ||
      !newArticle.kategori
    ) {
      alert("Mohon lengkapi judul, kategori, dan isi artikel Anda!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("judul_artikel", newArticle.judul_artikel);
      formData.append("isi_artikel", newArticle.isi_artikel);
      formData.append("kategori", newArticle.kategori);
      formData.append("status", newArticle.status);
      formData.append("tanggal_publish", new Date().toISOString());

      if (selectedFile) {
        formData.append("gambar", selectedFile);
      }

      const url = isEditMode
        ? `http://localhost:5000/api/ensiklopedia/${editingArticleId}`
        : "http://localhost:5000/api/ensiklopedia";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const result = await response.json();

      if (response.ok || result.status === "success") {
        alert(
          isEditMode
            ? "💾 Perubahan Artikel Berhasil Disimpan!"
            : "🚀 Artikel Baru Berhasil Diterbitkan!",
        );
        fetchArticles();
        setIsModalOpen(false);
        setNewArticle({
          judul_artikel: "",
          isi_artikel: "",
          kategori: "",
          status: "Published",
        });
        setSelectedFile(null);
      } else {
        alert("Gagal memproses artikel: " + result.message);
      }
    } catch (error) {
      console.error("Error saat memproses artikel:", error);
      alert("Terjadi kesalahan sistem, pastikan server backend Anda aktif.");
    }
  };

  // HANDLER DELETE ARTIKEL
  const handleDelete = async (id_artikel) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus artikel ini dari sistem?",
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ensiklopedia/${id_artikel}`,
          {
            method: "DELETE",
          },
        );
        const result = await response.json();
        if (response.ok || result.status === "success") {
          alert("🗑️ Artikel Berhasil Dihapus!");
          setArticles(
            articles.filter((art) => (art.id_artikel || art.id) !== id_artikel),
          );
        } else {
          alert("Gagal menghapus: " + result.message);
        }
      } catch (error) {
        console.error("Error saat menghapus artikel:", error);
      }
    }
  };

  // LOGIC FILTERING (MURNI BERDASARKAN SEARCH TERM)
  const filteredArticles = articles.filter((article) => {
    const judul = (article.judul_artikel || article.title || "").toLowerCase();
    const kategori = (article.kategori || article.category || "").toLowerCase();

    return (
      judul.includes(searchTerm.toLowerCase()) ||
      kategori.includes(searchTerm.toLowerCase())
    );
  });

  // COUNTER STATISTIK DINAMIS
  const totalArticles = articles.length;
  const publishedCount = articles.filter(
    (a) => a.status === "Published" || !a.status,
  ).length;

  return (
    // 🌟 PERBAIKAN STRUKTUR LAYOUT: Menyelaraskan flex-row & margin kiri ml-64 agar sejajar rapi di bawah Fixed NavbarAdmin global
    <div className="flex min-h-screen bg-neutral-50 font-sans text-brand-dark-500 relative">
      {/* SIDEBAR PANEL KIRI (Mengunci di tempat) */}
      <SidebarAdmin />

      {/* AREA UTAMA PANEL KANAN (Mengalir scroll normal secara independen) */}
      <div className="flex-1 ml-64 p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* HEADER SEKSI */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-sans text-brand-dark-500 font-bold">
                Manajemen Artikel
              </h1>
              <p className="text-neutral-400 text-xs mt-1 font-medium">
                Kelola basis pengetahuan keberlanjutan dan edukasi konsumen.
                Pastikan setiap konten memberikan transparansi bahan dan panduan
                daur ulang yang akurat.
              </p>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="bg-[#3D5532] text-neutral-default px-6 py-3 rounded-xl font-bold text-xs hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Tambah Artikel Baru
            </button>
          </div>

          {/* DYNAMIC OVERVIEW CARDS COUNTER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 1: TOTAL ARTIKEL */}
            <div className="bg-neutral-default p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  Total Artikel
                </p>
                <p className="text-3xl font-sans font-black text-brand-dark-500 mt-1">
                  {totalArticles}
                </p>
              </div>
              <FileText className="w-8 h-8 text-brand-primary-300 opacity-40" />
            </div>

            {/* CARD 2: TERBIT */}
            <div className="bg-neutral-default p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                  Terbit
                </p>
                <p className="text-3xl font-sans font-black text-feedback-success-300 mt-1">
                  {publishedCount}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-feedback-success-300 opacity-40" />
            </div>
          </div>

          {/* TABEL DATA CONTAINER */}
          <div className="bg-neutral-default rounded-[30px] shadow-sm border border-neutral-100 overflow-hidden">
            {/* BAR KONTROL INTERNAL ATAS TABEL */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-50 bg-neutral-default">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-brand-dark-500 tracking-tight">
                  Daftar Konten
                </h3>
                <span className="bg-neutral-100 border border-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  Semua Artikel
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-3 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari artikel atau kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-100 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-brand-primary-300 text-brand-dark-500"
                  />
                </div>
              </div>
            </div>

            {/* TABEL DATA STREAM UTUH */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 text-[11px] text-neutral-400 font-bold uppercase border-b border-neutral-100">
                  <tr>
                    <th className="px-8 py-5">Judul Artikel</th>
                    <th className="px-8 py-5">Kategori</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Tanggal</th>
                    <th className="px-8 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold text-neutral-600 divide-y divide-neutral-50">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-12 text-neutral-400 font-bold italic"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#3D5532]" />
                          <span>
                            Menyinkronkan database artikel edukasi sirkular...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => {
                      const id_artikel = article.id_artikel || article.id;
                      const judul = article.judul_artikel || article.title;
                      const kategori = article.kategori || article.category;
                      const statusArtikel = article.status || "Published";
                      const gambar = article.gambar;
                      const tanggal = article.tanggal_publish
                        ? new Date(article.tanggal_publish).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : article.date;

                      return (
                        <tr
                          key={id_artikel}
                          className="hover:bg-neutral-50/40 transition-colors"
                        >
                          <td className="px-8 py-4 flex items-center gap-4 font-bold text-brand-dark-500 tracking-tight">
                            {gambar ? (
                              <img
                                src={`http://localhost:5000/uploads/${gambar}`}
                                alt={judul}
                                className="w-10 h-10 rounded-xl object-cover border border-neutral-100 shadow-inner shrink-0"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://placehold.co/40x40/f5f5f5/a3a3a3?text=🖼️";
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 shadow-inner flex items-center justify-center text-sm shrink-0 text-neutral-400">
                                🖼️
                              </div>
                            )}
                            <div className="space-y-0.5 max-w-md">
                              <p className="text-brand-dark-500 font-bold leading-snug line-clamp-2 uppercase tracking-tight">
                                {judul}
                              </p>
                            </div>
                          </td>

                          <td className="px-8 py-4 text-neutral-400 font-medium">
                            <span className="bg-neutral-100 border border-neutral-100 text-neutral-500 px-2.5 py-1 rounded text-[10px] font-bold uppercase">
                              {kategori}
                            </span>
                          </td>

                          <td className="px-8 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                statusArtikel === "Published"
                                  ? "bg-brand-primary-100/30 text-[#3D5532]"
                                  : statusArtikel === "Draft"
                                    ? "bg-neutral-100 text-neutral-400"
                                    : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              ● {statusArtikel}
                            </span>
                          </td>

                          <td className="px-8 py-4 text-neutral-400 font-medium">
                            {tanggal}
                          </td>

                          <td className="px-8 py-4 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleOpenEditModal(article)}
                                className="p-1.5 text-neutral-400 hover:text-brand-primary-300 transition-colors outline-none"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(id_artikel)}
                                className="p-1.5 text-neutral-400 hover:text-feedback-error-200 transition-colors outline-none"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-12 text-neutral-400 italic font-medium"
                      >
                        Tidak ada data artikel yang ditemukan dalam database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER TOTAL DATA DETECTOR */}
            <div className="px-8 py-4 border-t border-neutral-50 bg-neutral-default/20 flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              <span>
                Menampilkan {filteredArticles.length} dari {totalArticles} total
                artikel
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* REUSABLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 font-['DM_Sans']">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="text-left">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                  {isEditMode ? "Edit Artikel" : "Tambah Artikel Baru"}
                </h2>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  Buat konten edukasi berkualitas untuk komunitas SkinCycle.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 hover:bg-gray-50 rounded-full outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto space-y-5 text-left flex-1 scrollbar-thin"
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pentingnya Transparansi Kandungan Skincare"
                  value={newArticle.judul_artikel}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      judul_artikel: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-200 text-xs font-medium rounded-lg px-4 py-3 outline-none focus:border-[#3D5532] text-gray-800 transition-all placeholder-gray-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                    Kategori
                  </label>
                  <select
                    value={newArticle.kategori}
                    onChange={(e) =>
                      setNewArticle({ ...newArticle, kategori: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 text-xs font-bold rounded-lg px-4 py-3 outline-none focus:border-[#3D5532] text-gray-500 cursor-pointer transition-all"
                    required
                  >
                    <option value="" disabled>
                      Pilih Kategori
                    </option>
                    <option value="Bahan Skincare">Bahan Skincare</option>
                    <option value="Daur Ulang">Daur Ulang</option>
                    <option value="Tren Edukasi">Tren Edukasi</option>
                    <option value="Panduan Komunitas">Panduan Komunitas</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                    Status Publikasi
                  </label>
                  <div className="flex items-center gap-3 py-2.5">
                    <div
                      onClick={() =>
                        setNewArticle({
                          ...newArticle,
                          status:
                            newArticle.status === "Published"
                              ? "Draft"
                              : "Published",
                        })
                      }
                      className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 flex items-center ${
                        newArticle.status === "Published"
                          ? "bg-[#3D5532]"
                          : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                          newArticle.status === "Published"
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                      Tandai sebagai Published
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                  Foto Sampul{" "}
                  {isEditMode && "(Biarkan kosong jika tidak ingin diubah)"}
                </label>
                <div
                  onClick={() => document.getElementById("cover-input").click()}
                  className="border-2 border-dashed border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 rounded-xl py-8 px-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <input
                    type="file"
                    id="cover-input"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-50 group-hover:text-[#3D5532] transition-colors">
                    <Upload className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-gray-500">
                    {selectedFile ? (
                      <span className="text-[#3D5532] font-bold">
                        {selectedFile.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-[#3D5532] font-bold hover:underline">
                          Upload foto baru
                        </span>{" "}
                        atau drag & drop
                      </>
                    )}
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                  Konten Artikel
                </label>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3D5532] transition-all bg-white">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-100 text-gray-400 shrink-0">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <Link className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-white hover:text-gray-700 rounded transition-colors"
                    >
                      <Image className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows="6"
                    placeholder="Tuliskan isi artikel Anda di sini..."
                    value={newArticle.isi_artikel}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        isi_artikel: e.target.value,
                      })
                    }
                    className="w-full text-xs font-medium p-4 outline-none text-gray-700 placeholder-gray-300 resize-none leading-relaxed bg-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all outline-none"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  className="bg-[#3D5532] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#2c3e24] transition-all outline-none shadow-md"
                >
                  {isEditMode ? "Simpan Perubahan" : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticleManagement;
