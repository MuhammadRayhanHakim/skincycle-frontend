// import React, { useState, useEffect, useCallback } from "react";
// import SidebarAdmin from "../components/SidebarAdmin";

// const AdminKandunganManagement = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     nama_kandungan: "",
//     fungsi: "",
//     manfaat: "",
//     efek_samping: "",
//     jenis_kulit_cocok: "",
//     kategori_bahan: "Semua",
//     status_publikasi: "Published",
//     gambar_bahan: null,
//   });

//   const fetchIngredients = useCallback(async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/kandungan");
//       const result = await response.json();
//       if (result.status === "success") setIngredients(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchIngredients();
//   }, [fetchIngredients]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));

//     try {
//       const response = await fetch("http://localhost:5000/api/kandungan", {
//         method: "POST",
//         body: data,
//       });
//       if (response.ok) {
//         alert("Bahan kandungan baru berhasil ditambahkan!");
//         setShowModal(false);
//         setFormData({
//           nama_kandungan: "",
//           fungsi: "",
//           manfaat: "",
//           efek_samping: "",
//           jenis_kulit_cocok: "",
//           kategori_bahan: "Semua",
//           status_publikasi: "Published",
//           gambar_bahan: null,
//         });
//         fetchIngredients();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8FBF9] font-['DM_Sans'] text-gray-700">
//       <SidebarAdmin />
//       <main className="flex-1 ml-64 p-10">
//         <header className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Manajemen Bahan Skincare
//             </h1>
//             <p className="text-xs text-gray-400 mt-1">
//               Kelola database kandungan produk dan transparansi bahan konsumen.
//             </p>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-[#3D5532] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#2d4025] transition-all"
//           >
//             + Tambah Bahan Baru
//           </button>
//         </header>

//         {/* STATS OVERVIEW CARDS (IMAGE_300738) */}
//         <div className="grid grid-cols-4 gap-6 mb-10">
//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//             <p className="text-xs text-gray-400 font-bold uppercase">
//               Total Bahan
//             </p>
//             <p className="text-3xl font-bold text-gray-800 mt-2">
//               {ingredients.length}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//             <p className="text-xs text-gray-400 font-bold uppercase">
//               Bahan Aman
//             </p>
//             <p className="text-3xl font-bold text-emerald-600 mt-2">
//               {
//                 ingredients.filter((i) => i.status_publikasi === "Published")
//                   .length
//               }
//             </p>
//           </div>
//         </div>

//         {/* TABEL DATA MANAGEMENT (IMAGE_300738) */}
//         <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50/50 text-[11px] text-gray-400 font-bold uppercase border-b">
//               <tr>
//                 <th className="px-8 py-5">Nama Bahan</th>
//                 <th className="px-8 py-5">Kategori Utama</th>
//                 <th className="px-8 py-5">Cocok Untuk Kulit</th>
//                 <th className="px-8 py-5">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-xs font-medium text-gray-600">
//               {ingredients.map((ing) => (
//                 <tr
//                   key={ing.id_kandungan}
//                   className="border-b hover:bg-gray-50/40 transition-colors"
//                 >
//                   <td className="px-8 py-4 font-bold text-gray-800">
//                     {ing.nama_kandungan}
//                   </td>
//                   <td className="px-8 py-4 text-gray-400">
//                     {ing.kategori_bahan}
//                   </td>
//                   <td className="px-8 py-4">
//                     <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px]">
//                       {ing.jenis_kulit_cocok}
//                     </span>
//                   </td>
//                   <td className="px-8 py-4">
//                     <span
//                       className={`px-2 py-0.5 rounded-full text-[10px] ${ing.status_publikasi === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
//                     >
//                       ● {ing.status_publikasi}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* MODAL INPUT POPUP TAMBAH BAHAN BARU (IMAGE_3012FB) */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">
//                 Tambah Kandungan Baru
//               </h2>
//               <p className="text-xs text-gray-400 mt-0.5">
//                 Lengkapi detail bahan di bawah ini untuk menambahkannya ke
//                 database.
//               </p>
//             </div>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 text-xs font-bold text-gray-600"
//             >
//               <div>
//                 <label className="block mb-1">Nama Bahan</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="Contoh: Hyaluronic Acid"
//                   className="w-full p-3 bg-gray-50 rounded-xl outline-none font-medium border focus:border-[#3D5532]"
//                   onChange={(e) =>
//                     setFormData({ ...formData, nama_kandungan: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1">Kategori Utama</label>
//                   <select
//                     className="w-full p-3 bg-gray-50 rounded-xl outline-none"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         kategori_bahan: e.target.value,
//                       })
//                     }
//                   >
//                     <option>Semua</option>
//                     <option>Anti-Aging</option>
//                     <option>Hydrating</option>
//                     <option>Brightening</option>
//                     <option>Menenangkan</option>
//                     <option>Eksfoliasi</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1">Status Publikasi</label>
//                   <select
//                     className="w-full p-3 bg-gray-50 rounded-xl outline-none"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         status_publikasi: e.target.value,
//                       })
//                     }
//                   >
//                     <option>Published</option>
//                     <option>Draft</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-1">
//                   Cocok Untuk Tipe Kulit (Pisahkan dengan Koma)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Contoh: Berminyak, Kering, Sensitif"
//                   className="w-full p-3 bg-gray-50 rounded-xl outline-none font-medium border"
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       jenis_kulit_cocok: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Fungsi / Ringkasan Utama</label>
//                 <textarea
//                   rows="3"
//                   placeholder="Deskripsikan fungsi bahan aktif ini secara ringkas..."
//                   className="w-full p-3 bg-gray-50 rounded-xl outline-none font-medium border resize-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, fungsi: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">
//                   Manfaat Utama (Pisahkan dengan Koma)
//                 </label>
//                 <textarea
//                   rows="2"
//                   placeholder="Contoh: Mengecilkan pori-pori, Menyamarkan noda hitam, Melembabkan"
//                   className="w-full p-3 bg-gray-50 rounded-xl outline-none font-medium border resize-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, manfaat: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">
//                   Efek Samping / Catatan Keamanan
//                 </label>
//                 <textarea
//                   rows="2"
//                   placeholder="Sebutkan risiko iritasi atau panduan takaran penggunaan..."
//                   className="w-full p-3 bg-gray-50 rounded-xl outline-none font-medium border resize-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, efek_samping: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Upload Gambar Ilustrasi</label>
//                 <input
//                   type="file"
//                   required
//                   className="w-full p-2 text-xs text-gray-400"
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       gambar_bahan: e.target.files[0],
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex gap-3 pt-4 border-t">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 py-3 border rounded-xl font-bold text-gray-400"
//                 >
//                   Batalkan
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 py-3 bg-[#3D5532] text-white rounded-xl font-bold hover:bg-[#2d4025]"
//                 >
//                   Simpan Bahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminKandunganManagement;

import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { Beaker, Eye, Plus, ShieldCheck, X } from "lucide-react";

const AdminKandunganManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const fetchIngredients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/kandungan");
      const result = await response.json();
      if (result.status === "success") setIngredients(result.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await fetch("http://localhost:5000/api/kandungan", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Bahan kandungan baru berhasil ditambahkan!");
        setShowModal(false);
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
        fetchIngredients();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500">
              Manajemen Bahan Skincare
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-medium">
              Kelola database kandungan produk dan transparansi bahan konsumen
              SkinCycle.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-brand-primary-300 text-neutral-default px-6 py-3 rounded-xl font-bold text-xs hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none shadow-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Bahan Baru
          </button>
        </header>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-neutral-default p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Total Bahan
              </p>
              <p className="text-3xl font-sans font-black text-brand-dark-500 mt-1">
                {ingredients.length}
              </p>
            </div>
            <Beaker className="w-8 h-8 text-brand-primary-300 opacity-40" />
          </div>

          <div className="bg-neutral-default p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Bahan Aktif Aman
              </p>
              <p className="text-3xl font-sans font-black text-feedback-success-300 mt-1">
                {
                  ingredients.filter((i) => i.status_publikasi === "Published")
                    .length
                }
              </p>
            </div>
            <ShieldCheck className="w-8 h-8 text-feedback-success-300 opacity-40" />
          </div>
        </div>

        {/* TABEL DATA MANAGEMENT */}
        <div className="bg-neutral-default rounded-[30px] shadow-sm border border-neutral-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50 text-[11px] text-neutral-400 font-bold uppercase border-b border-neutral-100">
              <tr>
                <th className="px-8 py-5">Nama Bahan</th>
                <th className="px-8 py-5">Kategori Utama</th>
                <th className="px-8 py-5">Cocok Untuk Kulit</th>
                <th className="px-8 py-5">Status</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL POPUP TAMBAH BAHAN BARU */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[250] flex items-center justify-center p-4">
          <div className="bg-neutral-default w-full max-w-xl rounded-3xl p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto border border-neutral-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-sans font-bold text-brand-dark-500">
                  Tambah Kandungan Baru
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Lengkapi detail bahan di bawah ini untuk database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
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
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-transparent focus:border-brand-primary-300 text-brand-dark-500"
                  onChange={(e) =>
                    setFormData({ ...formData, nama_kandungan: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Kategori Utama</label>
                  <select
                    className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none cursor-pointer text-brand-dark-500"
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
                    className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none cursor-pointer text-brand-dark-500"
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
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-transparent text-brand-dark-500"
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
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-transparent resize-none text-brand-dark-500"
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
                  className="w-full p-3.5 bg-neutral-50 rounded-xl outline-none font-medium border border-transparent resize-none text-brand-dark-500"
                  onChange={(e) =>
                    setFormData({ ...formData, manfaat: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Upload Gambar Ilustrasi</label>
                <input
                  type="file"
                  required
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
                  className="flex-1 py-4 bg-brand-primary-300 hover:bg-brand-primary-500 text-neutral-default rounded-xl font-bold uppercase tracking-wider outline-none"
                >
                  Simpan Bahan
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
