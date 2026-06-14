import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Swal from "sweetalert2"; // 🚀 IMPOR: Menggunakan library SweetAlert2 asli
import { Beaker, Eye, Plus, ShieldCheck, X, Edit2, Trash2 } from "lucide-react";

const AdminKandunganManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Flag penanda operasi Edit
  const [currentId, setCurrentId] = useState(null); // Penyimpan ID kandungan saat di-edit
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nama_kandungan: "",
    fungsi: "",
    manfaat: "",
    efek_samping: "",
    jenis_kulit_cocok: "",
    kategori_bahan: "Semua",
    status_publikasi: "Published",
    gambar_bahan: null,
  });

  // --- 1. FETCH DATA DARI BACKEND API ---
  const fetchIngredients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/kandungan");
      const result = await response.json();
      if (result.status === "success") setIngredients(result.data);
    } catch (error) {
      console.error("Gagal memuat data kandungan:", error);
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  // --- 2. TRIGGER MODAL EDIT & AUTO-FILL VALUES ---
  const handleOpenEdit = (ing) => {
    setIsEditMode(true);
    setCurrentId(ing.id_kandungan);
    setFormData({
      nama_kandungan: ing.nama_kandungan || "",
      fungsi: ing.fungsi || "",
      manfaat: ing.manfaat || "",
      efek_samping: ing.efek_samping || "",
      jenis_kulit_cocok: ing.jenis_kulit_cocok || "",
      kategori_bahan: ing.kategori_bahan || "Semua",
      status_publikasi: ing.status_publikasi || "Published",
      gambar_bahan: null,
    });
    setShowModal(true);
  };

  // --- 3. TRIGGER AKSI HAPUS DENGAN KONFIRMASI SWEETALERT2 ---
  const handleDelete = async (id, nama) => {
    Swal.fire({
      title: "Hapus Bahan Kandungan?",
      text: `Apakah Anda yakin ingin menghapus "${nama}" secara permanen dari database?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3D5532",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-[30px]",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/kandungan/${id}`,
            {
              method: "DELETE",
            },
          );

          if (response.ok) {
            Swal.fire({
              title: "Berhasil Dihapus!",
              text: `Bahan kandungan "${nama}" telah dibersihkan dari katalog.`,
              icon: "success",
              confirmButtonColor: "#3D5532",
              customClass: { popup: "rounded-[30px]" },
            });
            fetchIngredients();
          } else {
            Swal.fire({
              title: "Gagal Menghapus",
              text: "Server menolak permintaan penghapusan data.",
              icon: "error",
              confirmButtonColor: "#3D5532",
            });
          }
        } catch (error) {
          console.error("Error menghapus kandungan:", error);
          Swal.fire({
            title: "Koneksi Terputus",
            text: "Terjadi kesalahan jaringan menuju server backend.",
            icon: "error",
            confirmButtonColor: "#3D5532",
          });
        }
      }
    });
  };

  // --- 4. SUBMIT FORM (TAMBAH / EDIT BAHAN KANDUNGAN) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "gambar_bahan") {
        if (formData[key]) data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    const url = isEditMode
      ? `http://localhost:5000/api/kandungan/${currentId}`
      : "http://localhost:5000/api/kandungan";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (response.ok) {
        Swal.fire({
          title: isEditMode
            ? "Kandungan Diperbarui!"
            : "Kandungan Ditambahkan!",
          text: isEditMode
            ? "Detail data bahan aktif skincare berhasil disimpan."
            : "Bahan aktif baru sukses dipublikasikan ke katalog.",
          icon: "success",
          confirmButtonColor: "#3D5532",
          customClass: { popup: "rounded-[30px]" },
        });

        handleCloseModal();
        fetchIngredients();
      } else {
        Swal.fire({
          title: "Gagal Menyimpan",
          text: "Periksa kembali kelengkapan seluruh data inputan Anda.",
          icon: "warning",
          confirmButtonColor: "#3D5532",
        });
      }
    } catch (error) {
      console.error("Error submit kandungan:", error);
      Swal.fire({
        title: "Koneksi Terputus",
        text: "Gagal mengirimkan data, pastikan service server aktif.",
        icon: "error",
        confirmButtonColor: "#3D5532",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Helper reset form state saat tutup modal ---
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setCurrentId(null);
    setFormData({
      nama_kandungan: "",
      fungsi: "",
      manfaat: "",
      efek_samping: "",
      jenis_kulit_cocok: "",
      kategori_bahan: "Semua",
      status_publikasi: "Published",
      gambar_bahan: null,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9f6] font-sans text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500 font-bold">
              Manajemen Bahan Skincare
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-medium">
              Kelola database kandungan produk dan transparansi bahan konsumen
              SkinCycle.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setShowModal(true);
            }}
            className="bg-[#3D5532] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#22351c] transition-all flex items-center gap-1.5 outline-none shadow-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Bahan Baru
          </button>
        </header>

        {/* STATS OVERVIEW CARDS: Dengan Aksen Desain Ikon Berwarna Semula */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl">
          {/* Card 1: Total Bahan */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[105px]">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Total Bahan
              </p>
              <p className="text-3xl font-sans font-black text-brand-dark-500 mt-1">
                {ingredients.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 ml-4 shadow-sm">
              <Beaker className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>

          {/* Card 2: Bahan Aktif Aman */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[105px]">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Bahan Aktif
              </p>
              <p className="text-3xl font-sans font-black text-feedback-success-300 mt-1">
                {
                  ingredients.filter((i) => i.status_publikasi === "Published")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#3D5532] shrink-0 ml-4 shadow-sm">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* TABEL DATA MANAGEMENT */}
        <div className="bg-white rounded-[30px] shadow-sm border border-neutral-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50 text-[11px] text-neutral-400 font-bold uppercase border-b border-neutral-100">
              <tr>
                <th className="px-8 py-5">Nama Bahan</th>
                <th className="px-8 py-5">Kategori Utama</th>
                <th className="px-8 py-5">Cocok Untuk Kulit</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-neutral-600 divide-y divide-neutral-50">
              {ingredients.map((ing) => (
                <tr
                  key={ing.id_kandungan}
                  className="hover:bg-neutral-50/40 transition-colors"
                >
                  <td className="px-8 py-4 font-bold text-brand-dark-500 uppercase tracking-tight">
                    {ing.nama_kandungan}
                  </td>
                  <td className="px-8 py-4 text-neutral-400 font-medium">
                    {ing.kategori_bahan}
                  </td>
                  <td className="px-8 py-4">
                    <span className="bg-neutral-100 border border-neutral-100 text-neutral-500 px-2.5 py-1 rounded text-[10px] font-bold uppercase">
                      {ing.jenis_kulit_cocok || "Semua Kulit"}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ing.status_publikasi === "Published" ? "bg-brand-primary-100/30 text-brand-primary-300" : "bg-neutral-100 text-neutral-400"}`}
                    >
                      ● {ing.status_publikasi}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(ing)}
                        className="p-1.5 text-neutral-400 hover:text-brand-primary-300 transition-colors outline-none"
                        title="Edit Bahan"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(ing.id_kandungan, ing.nama_kandungan)
                        }
                        className="p-1.5 text-neutral-400 hover:text-feedback-error-200 transition-colors outline-none"
                        title="Hapus Bahan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-neutral-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-sans font-bold text-brand-dark-500">
                  {isEditMode
                    ? "Edit Kandungan Skincare"
                    : "Tambah Kandungan Baru"}
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {isEditMode
                    ? "Perbarui detail bahan aktif pada database di bawah ini."
                    : "Lengkapi detail bahan di bawah ini untuk database."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-neutral-400 hover:text-brand-dark-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xs font-bold text-neutral-600"
            >
              <div>
                <label className="block mb-1">Nama Bahan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hyaluronic Acid"
                  value={formData.nama_kandungan}
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-neutral-200 text-brand-dark-500 shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, nama_kandungan: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Kategori Utama</label>
                  <select
                    value={formData.kategori_bahan}
                    className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none cursor-pointer text-brand-dark-500 border border-neutral-200"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kategori_bahan: e.target.value,
                      })
                    }
                  >
                    <option>Semua</option>
                    <option>Anti-Aging</option>
                    <option>Hydrating</option>
                    <option>Brightening</option>
                    <option>Menenangkan</option>
                    <option>Eksfoliasi</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Status Publikasi</label>
                  <select
                    value={formData.status_publikasi}
                    className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none cursor-pointer text-brand-dark-500 border border-neutral-200"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status_publikasi: e.target.value,
                      })
                    }
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1">
                  Tipe Kulit Cocok (Pisahkan dengan Koma)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Berminyak, Kering, Sensitif"
                  value={formData.jenis_kulit_cocok}
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-neutral-200 text-brand-dark-500 shadow-inner"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jenis_kulit_cocok: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Fungsi / Ringkasan Utama</label>
                <textarea
                  rows="2"
                  placeholder="Deskripsikan fungsi bahan aktif ini..."
                  value={formData.fungsi}
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-neutral-200 resize-none text-brand-dark-500 shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, fungsi: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">
                  Manfaat Utama (Pisahkan dengan Koma)
                </label>
                <textarea
                  rows="2"
                  placeholder="Contoh: Melembabkan, Menyamarkan noda hitam"
                  value={formData.manfaat}
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-neutral-200 resize-none text-brand-dark-500 shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, manfaat: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">
                  Upload Gambar Ilustrasi{" "}
                  {isEditMode && (
                    <span className="text-neutral-400 font-normal lowercase">
                      (Kosongkan jika tidak diubah)
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  required={!isEditMode}
                  className="w-full p-2 text-xs text-neutral-400 cursor-pointer"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gambar_bahan: e.target.files[0],
                    })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-4 text-white rounded-xl font-bold uppercase tracking-wider outline-none ${isSubmitting ? "bg-neutral-300 cursor-not-allowed" : "bg-[#3D5532] hover:bg-[#22351c]"}`}
                >
                  {isSubmitting
                    ? "Memproses..."
                    : isEditMode
                      ? "Simpan Perubahan"
                      : "Simpan Bahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKandunganManagement;
