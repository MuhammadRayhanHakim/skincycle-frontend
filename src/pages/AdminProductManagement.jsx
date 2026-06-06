// import React, { useState, useEffect, useCallback } from "react";
// import SidebarAdmin from "../components/SidebarAdmin";
// import {
//   Plus,
//   Edit2,
//   Trash2,
//   Loader2,
//   X,
//   ShoppingBag,
//   Layers,
// } from "lucide-react";

// const AdminProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Serum",
//     skinType: "Semua",
//     price: "",
//     brand: "SkinCycle",
//     description: "",
//     benefits: "",
//     ingredients: "",
//     skinOily: "",
//     skinDry: "",
//     skinKombinasi: "",
//     skinSensitif: "",
//     gambar_produk: null,
//   });

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/produk");
//       const result = await response.json();
//       if (result.status === "success") setProducts(result.data || []);
//     } catch (error) {
//       console.error("Gagal memuat data produk:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const totalProduk = products.length;
//   const categories = products.map((p) => p.kategori).filter(Boolean);
//   const kategoriAktif = [...new Set(categories)].length;

//   const handleOpenEditModal = (produk) => {
//     setIsEditMode(true);
//     setEditingProductId(produk.id_produk);

//     const skinVals =
//       produk.ph_level && typeof product.ph_level === "string"
//         ? produk.ph_level.split(",")
//         : ["", "", "", ""];

//     setFormData({
//       name: produk.nama_produk || "",
//       category: produk.kategori || "Serum",
//       skinType: produk.suitable_skin_type || "Semua",
//       price: produk.harga_asli || "",
//       brand: produk.brand || "SkinCycle",
//       description: produk.deskripsi_produk || "",
//       benefits: produk.manfaat_utama || "",
//       ingredients: produk.bahan_kandungan || "",
//       skinOily: skinVals[0] || "",
//       skinDry: skinVals[1] || "",
//       skinKombinasi: skinVals[2] || "",
//       skinSensitif: skinVals[3] || "",
//       gambar_produk: null,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setIsEditMode(false);
//     setEditingProductId(null);
//     setFormData({
//       name: "",
//       category: "Serum",
//       skinType: "Semua",
//       price: "",
//       brand: "SkinCycle",
//       description: "",
//       benefits: "",
//       ingredients: "",
//       skinOily: "",
//       skinDry: "",
//       skinKombinasi: "",
//       skinSensitif: "",
//       gambar_produk: null,
//     });
//   };

//   const handleDelete = async (id, nama) => {
//     if (!window.confirm(`Hapus produk "${nama}" dari database secara permanen?`)) return;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` },
//       });
//       if (response.ok) {
//         alert("Produk berhasil dihapus!");
//         fetchProducts();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     const data = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key !== "gambar_produk" && formData[key] !== null && formData[key] !== undefined) {
//         data.append(key, formData[key]);
//       }
//     });

//     if (formData.gambar_produk && formData.gambar_produk.length > 0) {
//       for (let i = 0; i < formData.gambar_produk.length; i++) {
//         data.append("gambar_produk", formData.gambar_produk[i]);
//       }
//     }

//     const url = isEditMode
//       ? `http://localhost:5000/api/produk/${editingProductId}`
//       : "http://localhost:5000/api/produk";
//     const method = isEditMode ? "PUT" : "POST";

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(url, {
//         method: method,
//         body: data,
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await response.json();

//       if (response.ok || result.status === "success") {
//         alert("Data produk berhasil disimpan ke dalam katalog!");
//         handleCloseModal();
//         fetchProducts();
//       } else {
//         alert("Gagal memproses: " + result.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Gagal terhubung ke server backend.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f7f9f6] font-sans text-[#1e3316]">
//       <SidebarAdmin />
//       <main className="flex-1 ml-64 p-10">
//         <header className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-3xl font-bold uppercase tracking-tight">Manajemen Produk</h1>
//             <p className="text-xs text-neutral-400 mt-1 font-medium">Kelola data list katalog dan harga inventori SkinCycle.</p>
//           </div>
//           <button
//             type="button"
//             onClick={() => {
//               setIsEditMode(false);
//               setShowModal(true);
//             }}
//             className="bg-[#3D5532] hover:bg-[#2c4422] text-white px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 outline-none shadow-sm"
//           >
//             <Plus className="w-4 h-4" /> TAMBAH PRODUK BARU
//           </button>
//         </header>

//         {/* METRICS PANEL */}
//         <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-start">
//           <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
//             <div>
//               <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Produk</p>
//               <p className="text-3xl font-black mt-0.5">{totalProduk}</p>
//             </div>
//             <ShoppingBag className="w-6 h-6 text-[#3D5532] opacity-40 shrink-0 ml-4" />
//           </div>

//           <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
//             <div>
//               <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Kategori Aktif</p>
//               <p className="text-3xl font-black mt-0.5">{kategoriAktif}</p>
//             </div>
//             <Layers className="w-6 h-6 text-[#3D5532] opacity-40 shrink-0 ml-4" />
//           </div>
//         </div>

//         {/* DATA TABEL CATALOG */}
//         <div className="bg-white rounded-[40px] shadow-sm border border-neutral-100 overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-neutral-50 text-[10px] text-neutral-400 font-black uppercase border-b border-neutral-100">
//               <tr>
//                 <th className="px-8 py-6">Produk</th>
//                 <th className="px-8 py-6">Kategori</th>
//                 <th className="px-8 py-6">Harga</th>
//                 <th className="px-8 py-6 text-center">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="text-xs font-bold text-neutral-600 divide-y divide-neutral-50">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-12 text-[#3D5532] italic">
//                     <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1" /> Memuat Data...
//                   </td>
//                 </tr>
//               ) : products.length > 0 ? (
//                 products.map((p) => (
//                   <tr key={p.id_produk} className="hover:bg-neutral-50/50 transition-colors">
//                     <td className="px-8 py-5 flex items-center gap-4">
//                       <img
//                         src={p.gambar_produk ? `http://localhost:5000/uploads/${p.gambar_produk.split(",")[0]}` : "http://localhost:5000/uploads/default.jpg"}
//                         className="w-10 h-10 rounded-xl object-cover border border-neutral-100"
//                         alt="img"
//                         onError={(e) => { e.target.src = "http://localhost:5000/uploads/default.jpg"; }}
//                       />
//                       <p className="uppercase tracking-tight text-[#1e3316]">{p.nama_produk}</p>
//                     </td>
//                     <td className="px-8 py-5">
//                       <span className="bg-neutral-50 border px-3 py-1 rounded-full text-[9px] font-black uppercase text-neutral-400">{p.kategori}</span>
//                     </td>
//                     <td className="px-8 py-5 text-[#3D5532] text-sm">Rp {Number(p.harga_asli || 0).toLocaleString("id-ID")}</td>
//                     <td className="px-8 py-5 text-center flex justify-center items-center gap-4">
//                       <button type="button" onClick={() => handleOpenEditModal(p)} className="text-neutral-400 hover:text-[#3D5532]"><Edit2 className="w-3.5 h-3.5" /></button>
//                       <button type="button" onClick={() => handleDelete(p.id_produk, p.nama_produk)} className="text-neutral-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-10 text-neutral-400 italic text-[10px] tracking-wider uppercase">Katalog inventori kosong.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* MODAL POPUP FORM */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 border border-neutral-100">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-[#1e3316] uppercase tracking-tight">{isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}</h2>
//               <button type="button" onClick={handleCloseModal} className="text-neutral-400 hover:text-black"><X className="w-5 h-5" /></button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-neutral-600">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-1">Nama Produk</label>
//                   <input
//                     type="text"
//                     placeholder="Nama Produk Skincare"
//                     required
//                     value={formData.name}
//                     className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1">Brand</label>
//                   <input
//                     type="text"
//                     placeholder="Brand Skincare"
//                     value={formData.brand}
//                     className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
//                     onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block mb-1">Kategori</label>
//                   <select
//                     value={formData.category}
//                     className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black cursor-pointer"
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   >
//                     <option value="Serum">Serum</option>
//                     <option value="Sunscreen">Sunscreen</option>
//                     <option value="Facial Wash">Facial Wash</option>
//                     <option value="Moisturizer">Moisturizer</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1">Tipe Kulit Utama</label>
//                   <select
//                     value={formData.skinType}
//                     className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black cursor-pointer"
//                     onChange={(e) => setFormData({ ...formData, skinType: e.target.value })}
//                   >
//                     <option value="Semua">Semua</option>
//                     <option value="Berminyak">Berminyak</option>
//                     <option value="Kering">Kering</option>
//                     <option value="Kombinasi">Kombinasi</option>
//                     <option value="Sensitif">Sensitif</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block mb-1">Harga Jual (Rp)</label>
//                   <input
//                     type="number"
//                     placeholder="Harga Jual"
//                     required
//                     value={formData.price}
//                     className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   />
//                 </div>
//               </div>

//               {/* ANALISIS KOMPOSISI BAHAN (INGREDIENTS) */}
//               <div className="border-t border-dashed border-neutral-200 pt-3">
//                 <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">🧪 Komposisi Bahan Skincare (Pisahkan Dengan Koma)</label>
//                 <textarea
//                   placeholder="Contoh: Jeju Volcanic Cluster, Bentonite, Centella Asiatica"
//                   value={formData.ingredients}
//                   rows="2"
//                   className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs outline-none border border-neutral-200 font-bold text-black resize-none shadow-inner"
//                   onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
//                 />
//               </div>

//               {/* PERSENTASE KECOCOKAN KULIT */}
//               <div className="border-t border-dashed border-neutral-200 pt-3">
//                 <label className="block mb-2 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">📊 Input Analisis Persentase Kecocokan Kulit</label>
//                 <div className="grid grid-cols-4 gap-2">
//                   <div>
//                     <label className="block text-[10px] text-neutral-400 mb-1">Berminyak (%)</label>
//                     <input type="number" min="0" max="100" placeholder="95" value={formData.skinOily} className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none" onChange={(e) => setFormData({ ...formData, skinOily: e.target.value })} />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-neutral-400 mb-1">Kering (%)</label>
//                     <input type="number" min="0" max="100" placeholder="80" value={formData.skinDry} className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none" onChange={(e) => setFormData({ ...formData, skinDry: e.target.value })} />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-neutral-400 mb-1">Kombinasi (%)</label>
//                     <input type="number" min="0" max="100" placeholder="85" value={formData.skinKombinasi} className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none" onChange={(e) => setFormData({ ...formData, skinKombinasi: e.target.value })} />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-neutral-400 mb-1">Sensitif (%)</label>
//                     <input type="number" min="0" max="100" placeholder="65" value={formData.skinSensitif} className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none" onChange={(e) => setFormData({ ...formData, skinSensitif: e.target.value })} />
//                   </div>
//                 </div>
//               </div>

//               {/* 3 MANFAAT UTAMA PRODUK */}
//               <div className="border-t border-dashed border-neutral-200 pt-3">
//                 <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">✨ 3 Manfaat Utama (Pisahkan Dengan Koma)</label>
//                 <input
//                   type="text"
//                   placeholder="Contoh: Hidrasi Intensif, Memperkuat Skin Barrier, Menenangkan Kulit"
//                   value={formData.benefits}
//                   className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
//                   onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Deskripsi Singkat</label>
//                 <textarea
//                   placeholder="Deskripsi Ringkat Produk..."
//                   value={formData.description}
//                   rows="2"
//                   className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs outline-none border border-neutral-200 font-bold text-black resize-none shadow-inner"
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 />
//               </div>

//               {/* 🌟 LAYOUT BARU: AREA UPLOAD 4 GAMBAR MAKSIMAL MENJADI LEBIH LEBAR DAN LEVOAT */}
//               <div className="border-t border-dashed border-neutral-200 pt-3">
//                 <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">📸 Upload Multi Gambar Produk (Maksimal 4 file sekaligus)</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   required={!isEditMode}
//                   className="w-full text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-green-50 file:text-[#3D5532] hover:file:bg-green-100"
//                   onChange={(e) => setFormData({ ...formData, gambar_produk: e.target.files })}
//                 />
//                 <p className="text-[9px] text-neutral-400 mt-1 font-normal">* Gunakan tombol Ctrl / Shift di keyboard laptop Anda untuk menandai dan mengunggah hingga 4 file gambar sekaligus.</p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all outline-none mt-4 ${isSubmitting ? 'bg-neutral-300 cursor-not-allowed' : 'bg-[#3D5532] hover:bg-[#22351c]'}`}
//               >
//                 {isSubmitting ? "Memproses..." : isEditMode ? "SIMPAN PERUBAHAN" : "PUBLIKASIKAN PRODUK"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProductManagement;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial state bersih tanpa kolom link_pembelian / linkBeli sesuai request Anda
  const [formData, setFormData] = useState({
    name: "",
    category: "Serum",
    skinType: "Semua",
    price: "",
    brand: "SkinCycle",
    description: "",
    benefits: "",
    ingredients: "",
    skinOily: "",
    skinDry: "",
    skinKombinasi: "",
    skinSensitif: "",
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

  const totalProduk = products.length;
  const categories = products.map((p) => p.kategori).filter(Boolean);
  const kategoriAktif = [...new Set(categories)].length;

  const handleOpenEditModal = (produk) => {
    setIsEditMode(true);
    setEditingProductId(produk.id_produk);

    const skinVals =
      produk.ph_level && typeof produk.ph_level === "string"
        ? produk.ph_level.split(",")
        : ["", "", "", ""];

    setFormData({
      name: produk.nama_produk || "",
      category: produk.kategori || "Serum",
      skinType: produk.suitable_skin_type || "Semua",
      price: produk.harga_asli || "",
      brand: produk.brand || "SkinCycle",
      description: produk.deskripsi_produk || "",
      benefits: produk.manfaat_utama || "",
      ingredients: produk.bahan_kandungan || "",
      skinOily: skinVals[0] || "",
      skinDry: skinVals[1] || "",
      skinKombinasi: skinVals[2] || "",
      skinSensitif: skinVals[3] || "",
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
      skinOily: "",
      skinDry: "",
      skinKombinasi: "",
      skinSensitif: "",
      gambar_produk: null,
    });
  };

  const handleDelete = async (id, nama) => {
    if (
      !window.confirm(`Hapus produk "${nama}" dari database secara permanen?`)
    )
      return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();

    // Append data teks biasa ke FormData objek (kecuali berkas gambar)
    Object.keys(formData).forEach((key) => {
      if (
        key !== "gambar_produk" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        data.append(key, formData[key]);
      }
    });

    // Mengirimkan array berkas menggunakan penamaan bracket key "gambar_produk[]" agar sinkron dengan Multer Backend
    if (formData.gambar_produk && formData.gambar_produk.length > 0) {
      for (let i = 0; i < formData.gambar_produk.length; i++) {
        data.append("gambar_produk[]", formData.gambar_produk[i]);
      }
    }

    const url = isEditMode
      ? `http://localhost:5000/api/produk/${editingProductId}`
      : "http://localhost:5000/api/produk";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: method,
        body: data,
        headers: { Authorization: `Bearer ${token}` },
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
      alert("Gagal terhubung ke server backend.");
    } finally {
      // 🌟 FIX SINTAKS: Diubah dari verify menjadi kata kunci finally yang sah
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9f6] font-sans text-[#1e3316]">
      <SidebarAdmin />
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">
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
            className="bg-[#3D5532] hover:bg-[#2c4422] text-white px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 outline-none shadow-sm"
          >
            <Plus className="w-4 h-4" /> TAMBAH PRODUK BARU
          </button>
        </header>

        {/* BOX METRICS CONTAINER */}
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-start">
          <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Total Produk
              </p>
              <p className="text-3xl font-black mt-0.5">{totalProduk}</p>
            </div>
            <ShoppingBag className="w-6 h-6 text-[#3D5532] opacity-40 shrink-0 ml-4" />
          </div>

          <div className="bg-white px-6 py-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between min-h-[100px]">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Kategori Aktif
              </p>
              <p className="text-3xl font-black mt-0.5">{kategoriAktif}</p>
            </div>
            <Layers className="w-6 h-6 text-[#3D5532] opacity-40 shrink-0 ml-4" />
          </div>
        </div>

        {/* DATA TABEL CATALOG */}
        <div className="bg-white rounded-[40px] shadow-sm border border-neutral-100 overflow-hidden">
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
                    className="text-center py-12 text-[#3D5532] italic"
                  >
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1" />{" "}
                    Memuat Data...
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
                        src={
                          p.gambar_produk
                            ? `http://localhost:5000/uploads/${p.gambar_produk.split(",")[0]}`
                            : "http://localhost:5000/uploads/default.jpg"
                        }
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-100"
                        alt="img"
                        onError={(e) => {
                          e.target.src =
                            "http://localhost:5000/uploads/default.jpg";
                        }}
                      />
                      <p className="uppercase tracking-tight text-[#1e3316]">
                        {p.nama_produk}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-neutral-50 border px-3 py-1 rounded-full text-[9px] font-black uppercase text-neutral-400">
                        {p.kategori}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[#3D5532] text-sm">
                      Rp {Number(p.harga_asli || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-8 py-5 text-center flex justify-center items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="text-neutral-400 hover:text-[#3D5532]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id_produk, p.nama_produk)}
                        className="text-neutral-400 hover:text-red-500"
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
                    className="text-center py-10 text-neutral-400 italic text-[10px] tracking-wider uppercase"
                  >
                    Katalog inventori kosong.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* POPUP MODAL FORM INPUT */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 border border-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#1e3316] uppercase tracking-tight">
                {isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xs font-bold text-neutral-600"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Nama Produk</label>
                  <input
                    type="text"
                    placeholder="Nama Produk Skincare"
                    required
                    value={formData.name}
                    className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="Brand Skincare"
                    value={formData.brand}
                    className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black cursor-pointer"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Serum">Serum</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Facial Wash">Facial Wash</option>
                    <option value="Moisturizer">Moisturizer</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Tipe Kulit Utama</label>
                  <select
                    value={formData.skinType}
                    className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black cursor-pointer"
                    onChange={(e) =>
                      setFormData({ ...formData, skinType: e.target.value })
                    }
                  >
                    <option value="Semua">Semua</option>
                    <option value="Berminyak">Berminyak</option>
                    <option value="Kering">Kering</option>
                    <option value="Kombinasi">Kombinasi</option>
                    <option value="Sensitif">Sensitif</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    placeholder="Harga Jual"
                    required
                    value={formData.price}
                    className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* ANALISIS KOMPOSISI BAHAN (INGREDIENTS) */}
              <div className="border-t border-dashed border-neutral-200 pt-3">
                <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">
                  🧪 Komposisi Bahan Skincare (Pisahkan Dengan Koma)
                </label>
                <textarea
                  placeholder="Contoh: Jeju Volcanic Cluster, Bentonite, Centella Asiatica"
                  value={formData.ingredients}
                  rows="2"
                  className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs outline-none border border-neutral-200 font-bold text-black resize-none shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                />
              </div>

              {/* PERSENTASE KECOCOKAN KULIT */}
              <div className="border-t border-dashed border-neutral-200 pt-3">
                <label className="block mb-2 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">
                  📊 Input Analisis Persentase Kecocokan Kulit
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      Berminyak (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="80"
                      value={formData.skinOily}
                      className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none"
                      onChange={(e) =>
                        setFormData({ ...formData, skinOily: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      Kering (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="10"
                      value={formData.skinDry}
                      className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none"
                      onChange={(e) =>
                        setFormData({ ...formData, skinDry: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      Kombinasi (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="30"
                      value={formData.skinKombinasi}
                      className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skinKombinasi: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      Sensitif (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="40"
                      value={formData.skinSensitif}
                      className="w-full p-2 bg-neutral-50 rounded-xl text-center border border-neutral-200 text-black outline-none"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skinSensitif: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 3 MANFAAT UTAMA PRODUK */}
              <div className="border-t border-dashed border-neutral-200 pt-3">
                <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">
                  ✨ 3 Manfaat Utama (Pisahkan Dengan Koma)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Hidrasi Intensif, Memperkuat Skin Barrier, Menenangkan Kulit"
                  value={formData.benefits}
                  className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-neutral-200 text-black shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Deskripsi Singkat</label>
                <textarea
                  placeholder="Deskripsi Ringkat... produk Anda"
                  value={formData.description}
                  rows="2"
                  className="w-full p-3.5 bg-neutral-50 rounded-2xl text-xs outline-none border border-neutral-200 font-bold text-black resize-none shadow-inner"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* AREA UPLOAD MULTI-GAMBAR MAKSIMAL 4 FILE SEKALIGUS */}
              <div className="border-t border-dashed border-neutral-200 pt-3">
                <label className="block mb-1 text-[#3D5532] uppercase text-[10px] tracking-wider font-black">
                  📸 Upload Multi Gambar Produk (Maksimal 4 file sekaligus)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required={!isEditMode}
                  className="w-full text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 p-3 rounded-2xl cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-green-50 file:text-[#3D5532] hover:file:bg-green-100"
                  onChange={(e) =>
                    setFormData({ ...formData, gambar_produk: e.target.files })
                  }
                />
                <p className="text-[9px] text-neutral-400 mt-1 font-normal">
                  * Gunakan tombol Ctrl / Shift di keyboard laptop Anda untuk
                  menandai dan mengunggah hingga 4 file gambar sekaligus.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all outline-none mt-4 ${isSubmitting ? "bg-neutral-300 cursor-not-allowed" : "bg-[#3D5532] hover:bg-[#22351c]"}`}
              >
                {isSubmitting
                  ? "Memproses..."
                  : isEditMode
                    ? "SIMPAN PERUBAHAN"
                    : "PUBLIKASIKAN PRODUK"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
