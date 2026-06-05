

import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  ShoppingBag,
  Layers,
} from "lucide-react";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Serum",
    skinType: "Semua",
    price: "",
    brand: "SkinCycle",
    description: "",
    benefits: "",
    ingredients: "",
    skinOily: 90,
    skinDry: 80,
    skinKombinasi: 85,
    skinSensitif: 65,
    gambar_produk: null,
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/produk");
      const result = await response.json();
      if (result.status === "success") setProducts(result.data || []);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── 🚀 LOGIKA METRIKS DINAMIS CARD (MENGHITUNG DATA SECARA REAL-TIME) ──
  const totalProduk = products.length;
  const kategoriAktif = [...new Set(products.map((p) => p.kategori))].length;

  const handleOpenEditModal = (produk) => {
    setIsEditMode(true);
    setEditingProductId(produk.id_produk);
    const skinVals =
      produk.ph_level && typeof produk.ph_level === "string"
        ? produk.ph_level.split(",")
        : [90, 80, 85, 65];

    setFormData({
      name: produk.nama_produk || "",
      category: produk.kategori || "Serum",
      skinType: produk.suitable_skin_type || "Semua",
      price: produk.harga_asli || "",
      brand: produk.brand || "SkinCycle",
      description: produk.deskripsi_produk || "",
      benefits: produk.link_pembelian || "",
      ingredients: produk.bahan_kandungan || "",
      skinOily: skinVals[0] || 90,
      skinDry: skinVals[1] || 80,
      skinKombinasi: skinVals[2] || 85,
      skinSensitif: skinVals[3] || 65,
      gambar_produk: null,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingProductId(null);
    setFormData({
      name: "",
      category: "Serum",
      skinType: "Semua",
      price: "",
      brand: "SkinCycle",
      description: "",
      benefits: "",
      ingredients: "",
      skinOily: 90,
      skinDry: 80,
      skinKombinasi: 85,
      skinSensitif: 65,
      gambar_produk: null,
    });
  };

  const handleDelete = async (id, nama) => {
    if (
      !window.confirm(`Hapus produk "${nama}" dari database secara permanen?`)
    )
      return;
    try {
      const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        alert("Produk berhasil dihapus!");
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    const url = isEditMode
      ? `http://localhost:5000/api/produk/${editingProductId}`
      : "http://localhost:5000/api/produk";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();

      if (response.ok || result.status === "success") {
        alert("Data produk berhasil disimpan ke dalam katalog!");
        handleCloseModal();
        fetchProducts();
      } else {
        alert("Gagal memproses: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke server backend. Pastikan server Anda menyala.");
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-brand-dark-500">
      <SidebarAdmin />
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500 uppercase tracking-tight">
              Manajemen Produk
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-medium">
              Kelola data list katalog dan harga inventori SkinCycle.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setShowModal(true);
            }}
            className="bg-brand-primary-300 hover:bg-brand-primary-500 text-neutral-default px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 outline-none shadow-sm"
          >
            <Plus className="w-4 h-4" /> TAMBAH PRODUK BARU
          </button>
        </header>

        {/* ── 🚀 FIX: Menambahkan 'items-start' agar tinggi card terkunci ringkas & tidak memanjang vertikal ── */}
        {/* ── 🚀 FIX MUTLAK TAMPILAN CARD: DIKUNCI MAX-W AGAR RINGKAS DAN TIDAK MEMANJANG ── */}
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-start">
          {/* Card 1: Total Produk */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center md:text-left">
                Total Produk
              </p>
              <p className="text-3xl font-sans font-black text-brand-dark-500 mt-0.5 text-center md:text-left">
                {totalProduk}
              </p>
            </div>
            <ShoppingBag className="w-6 h-6 text-brand-primary-300 opacity-40 shrink-0 ml-4" />
          </div>

          {/* Card 2: Kategori Aktif */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center md:text-left">
                Kategori Aktif
              </p>
              <p className="text-3xl font-sans font-black text-brand-dark-500 mt-0.5 text-center md:text-left">
                {kategoriAktif}
              </p>
            </div>
            <Layers className="w-6 h-6 text-brand-dark-500 opacity-40 shrink-0 ml-4" />
          </div>
        </div>

        {/* DATA TABEL */}
        <div className="bg-neutral-default rounded-[40px] shadow-sm border border-neutral-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[10px] text-neutral-400 font-black uppercase border-b border-neutral-100">
              <tr>
                <th className="px-8 py-6">Produk</th>
                <th className="px-8 py-6">Kategori</th>
                <th className="px-8 py-6">Harga</th>
                <th className="px-8 py-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold text-neutral-600 divide-y divide-neutral-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-12 text-brand-primary-300 italic"
                  >
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1" />{" "}
                    Memuat...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr
                    key={p.id_produk}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-8 py-5 flex items-center gap-4">
                      <img
                        src={`http://localhost:5000/uploads/${p.gambar_produk?.split(",")[0] || "default.jpg"}`}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-100 shadow-inner"
                        alt="img"
                      />
                      <p className="text-brand-dark-500 uppercase tracking-tight">
                        {p.nama_produk}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-neutral-50 border px-3 py-1 rounded-full text-[9px] font-black uppercase text-neutral-400">
                        {p.kategori}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-brand-primary-300 font-sans text-sm">
                      Rp {p.harga_asli?.toLocaleString("id-ID")}
                    </td>
                    <td className="px-8 py-5 text-center flex justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="text-neutral-400 hover:text-brand-primary-300 outline-none"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id_produk, p.nama_produk)}
                        className="text-neutral-400 hover:text-feedback-error-200 transition-colors outline-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-neutral-400 italic"
                  >
                    Katalog inventori kosong.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL POPUP FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-default w-full max-w-xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-sans font-bold text-brand-dark-500 uppercase tracking-tight">
                {isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-neutral-400 hover:text-brand-dark-500 outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xs font-bold text-neutral-600"
            >
              <div>
                <label className="block mb-1">Nama Produk</label>
                <input
                  type="text"
                  placeholder="Nama Produk Skincare"
                  required
                  value={formData.name}
                  className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-brand-primary-300 text-brand-dark-500 shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 cursor-pointer shadow-sm border border-neutral-100"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option>Serum</option>
                    <option>Sunscreen</option>
                    <option>Facial Wash</option>
                    <option>Moisturizer</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Tipe Kulit</label>
                  <select
                    value={formData.skinType}
                    className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 cursor-pointer shadow-sm border border-neutral-100"
                    onChange={(e) =>
                      setFormData({ ...formData, skinType: e.target.value })
                    }
                  >
                    <option>Semua</option>
                    <option>Berminyak</option>
                    <option>Kering</option>
                    <option>Kombinasi</option>
                    <option>Sensitif</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    placeholder="Harga Jual"
                    required
                    value={formData.price}
                    className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 shadow-inner"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="Brand Skincare"
                    value={formData.brand}
                    className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 shadow-inner"
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">Deskripsi Produk</label>
                <textarea
                  placeholder="Deskripsi Singkat..."
                  value={formData.description}
                  rows="3"
                  className="w-full p-4 bg-neutral-50 rounded-2xl text-xs outline-none font-bold resize-none text-brand-dark-500 shadow-inner border border-transparent"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">
                  Gambar Produk{" "}
                  {isEditMode && (
                    <span className="text-neutral-400 font-normal lowercase">
                      (Kosongkan jika tidak diubah)
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!isEditMode}
                  className="w-full p-2 text-xs text-neutral-400 font-medium cursor-pointer"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gambar_produk: e.target.files[0],
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-brand-primary-300 text-white rounded-2xl font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
              >
                {isEditMode ? "SIMPAN PERUBAHAN" : "PUBLIKASIKAN PRODUK"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
