// import React, { useState, useEffect, useCallback } from "react";
// import SidebarAdmin from "../components/SidebarAdmin";

// const AdminProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);

//   // Inisialisasi awal state form data
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Semua",
//     skinType: "Semua",
//     price: "",
//     brand: "SkinCycle",
//     description: "",
//     benefits: "",
//     ingredients: "",
//     skinOily: 90,
//     skinDry: 80,
//     skinKombinasi: 85,
//     skinSensitif: 65,
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,
//   });

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/produk");
//       const result = await response.json();
//       if (result.status === "success") setProducts(result.data);
//     } catch (error) {
//       console.error("Gagal memuat data produk:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleOpenEditModal = (produk) => {
//     setIsEditMode(true);
//     setEditingProductId(produk.id_produk);

//     // Pemisahan string koordinat persentase kulit dari properti ph_level database
//     const skinVals = produk.ph_level
//       ? produk.ph_level.split(",")
//       : [90, 80, 85, 65];

//     setFormData({
//       name: produk.nama_produk || "",
//       category: produk.kategori || "Semua",
//       skinType: produk.suitable_skin_type || "Semua",
//       price: produk.harga_asli || "",
//       brand: produk.brand || "SkinCycle",
//       description: produk.deskripsi_produk || "",
//       benefits: produk.link_pembelian || "",
//       ingredients: produk.bahan_kandungan || "",
//       skinOily: skinVals[0] || 90,
//       skinDry: skinVals[1] || 80,
//       skinKombinasi: skinVals[2] || 85,
//       skinSensitif: skinVals[3] || 65,
//       image1: null,
//       image2: null,
//       image3: null,
//       image4: null,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setIsEditMode(false);
//     setEditingProductId(null);
//     setFormData({
//       name: "",
//       category: "Semua",
//       skinType: "Semua",
//       price: "",
//       brand: "SkinCycle",
//       description: "",
//       benefits: "",
//       ingredients: "",
//       skinOily: 90,
//       skinDry: 80,
//       skinKombinasi: 85,
//       skinSensitif: 65,
//       image1: null,
//       image2: null,
//       image3: null,
//       image4: null,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     // Memasukkan seluruh data text & file secara aman ke FormData
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] !== null) {
//         data.append(key, formData[key]);
//       }
//     });

//     const url = isEditMode
//       ? `http://localhost:5000/api/produk/${editingProductId}`
//       : "http://localhost:5000/api/produk";

//     const method = isEditMode ? "PUT" : "POST";

//     try {
//       // === PERBAIKAN UTAMA: COCOKKAN HEADERS UNTUK MULTIPART + AUTHENTICATION ===
//       const response = await fetch(url, {
//         method: method,
//         body: data,
//         headers: {
//           // Kirim token otentikasi agar lolos dari middleware verifyToken & isAdmin backend
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           // JANGAN tulis Content-Type di sini, biarkan browser menyusun multipart boundary otomatis
//         },
//       });

//       const result = await response.json();

//       if (response.ok || result.status === "success") {
//         alert("Data produk berhasil disimpan ke dalam katalog!");
//         handleCloseModal();
//         fetchProducts();
//       } else {
//         alert("Gagal menyimpan produk: " + (result.message || "Unknown Error"));
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Terjadi kesalahan sistem atau jaringan server terputus.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8FBF9] font-sans">
//       <SidebarAdmin />
//       <main className="flex-1 ml-64 p-10">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 uppercase">
//             Manajemen Produk
//           </h1>
//           <button
//             onClick={() => {
//               setIsEditMode(false);
//               setShowModal(true);
//             }}
//             className="bg-[#3D5532] text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-[#2e4026] transition-all"
//           >
//             + TAMBAH PRODUK BARU
//           </button>
//         </header>

//         {/* DATA TABEL */}
//         <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50/50 text-[10px] text-gray-300 font-black uppercase border-b border-gray-50">
//               <tr>
//                 <th className="px-8 py-6">Produk</th>
//                 <th className="px-8 py-6">Kategori</th>
//                 <th className="px-8 py-6">Harga</th>
//                 <th className="px-8 py-6 text-center">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="text-xs font-bold text-gray-600">
//               {isLoading ? (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-10 text-gray-400 italic"
//                   >
//                     Memuat katalog...
//                   </td>
//                 </tr>
//               ) : products.length > 0 ? (
//                 products.map((p) => (
//                   <tr
//                     key={p.id_produk}
//                     className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
//                   >
//                     <td className="px-8 py-5 flex items-center gap-4">
//                       <img
//                         src={`http://localhost:5000/uploads/${p.gambar_produk?.split(",")[0]}`}
//                         className="w-10 h-10 rounded-xl object-cover border border-gray-100"
//                         alt="img"
//                       />
//                       <div>
//                         <p className="text-gray-800">{p.nama_produk}</p>
//                       </div>
//                     </td>
//                     <td className="px-8 py-5">
//                       <span className="bg-gray-100 px-3 py-1 rounded-full text-[9px] font-black uppercase text-gray-400">
//                         {p.kategori}
//                       </span>
//                     </td>
//                     <td className="px-8 py-5 text-[#3D5532]">
//                       Rp {p.harga_asli?.toLocaleString("id-ID")}
//                     </td>
//                     <td className="px-8 py-5 text-center flex justify-center gap-4 pt-6">
//                       <button
//                         onClick={() => handleOpenEditModal(p)}
//                         className="text-gray-400 hover:text-[#3D5532] text-sm"
//                       >
//                         ✏️
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-10 text-gray-400 italic"
//                   >
//                     Katalog kosong.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {/* EXPANDED INPUT FORM MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
//             <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-tight">
//               {isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Nama Produk"
//                 required
//                 value={formData.name}
//                 className="w-full p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-[#3D5532]"
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <select
//                   value={formData.category}
//                   className="p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none cursor-pointer"
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                 >
//                   <option>Semua</option>
//                   <option>Cleanser</option>
//                   <option>Facial Wash</option>
//                   <option>Serum</option>
//                   <option>Moisturizer</option>
//                 </select>
//                 <select
//                   value={formData.skinType}
//                   className="p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none cursor-pointer"
//                   onChange={(e) =>
//                     setFormData({ ...formData, skinType: e.target.value })
//                   }
//                 >
//                   <option>Semua</option>
//                   <option>Berminyak</option>
//                   <option>Kering</option>
//                   <option>Kombinasi</option>
//                   <option>Sensitif</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   placeholder="Harga Jual"
//                   required
//                   value={formData.price}
//                   className="p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, price: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Brand Skincare"
//                   value={formData.brand}
//                   className="p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, brand: e.target.value })
//                   }
//                 />
//               </div>

//               <textarea
//                 placeholder="Deskripsi Singkat..."
//                 value={formData.description}
//                 rows="2"
//                 className="w-full p-4 bg-gray-50 rounded-2xl text-xs outline-none font-bold resize-none"
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//               />
//               <textarea
//                 placeholder="Manfaat Utama (Pisahkan dengan tanda koma)..."
//                 value={formData.benefits}
//                 rows="2"
//                 className="w-full p-4 bg-gray-50 rounded-2xl text-xs outline-none font-bold resize-none"
//                 onChange={(e) =>
//                   setFormData({ ...formData, benefits: e.target.value })
//                 }
//               />

//               {/* INPUT CARDS DETAILS ANALYSIS */}
//               <div>
//                 <label className="text-[10px] text-gray-400 font-bold block mb-1 uppercase tracking-wider">
//                   Analisis Kandungan Bahan (Format - Nama Bahan:Deskripsi
//                   Fungsi, NamaBahan:Deskripsi)
//                 </label>
//                 <textarea
//                   placeholder="Contoh -> Bentonite:Membantu mengontrol minyak wajah, Kaolin Clay:Mengangkat sel kulit mati"
//                   value={formData.ingredients}
//                   rows="3"
//                   className="w-full p-4 bg-gray-50 rounded-2xl text-xs outline-none border border-green-100 font-bold resize-none"
//                   onChange={(e) =>
//                     setFormData({ ...formData, ingredients: e.target.value })
//                   }
//                 />
//               </div>

//               {/* SLIDER PERSENTASE KECOCOKAN KULIT */}
//               <div className="p-4 bg-gray-50 rounded-2xl space-y-2 text-xs font-bold text-gray-600">
//                 <span className="text-[10px] font-black text-gray-400 uppercase">
//                   Persentase Grafik Kecocokan Jenis Kulit User
//                 </span>
//                 <div className="grid grid-cols-2 gap-4 pt-2">
//                   <label>
//                     Oily: {formData.skinOily}%{" "}
//                     <input
//                       type="range"
//                       min="10"
//                       max="100"
//                       value={formData.skinOily}
//                       className="w-full accent-[#3D5532]"
//                       onChange={(e) =>
//                         setFormData({ ...formData, skinOily: e.target.value })
//                       }
//                     />
//                   </label>
//                   <label>
//                     Dry: {formData.skinDry}%{" "}
//                     <input
//                       type="range"
//                       min="10"
//                       max="100"
//                       value={formData.skinDry}
//                       className="w-full accent-[#3D5532]"
//                       onChange={(e) =>
//                         setFormData({ ...formData, skinDry: e.target.value })
//                       }
//                     />
//                   </label>
//                   <label>
//                     Kombinasi: {formData.skinKombinasi}%{" "}
//                     <input
//                       type="range"
//                       min="10"
//                       max="100"
//                       value={formData.skinKombinasi}
//                       className="w-full accent-[#3D5532]"
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           skinKombinasi: e.target.value,
//                         })
//                       }
//                     />
//                   </label>
//                   <label>
//                     Sensitif: {formData.skinSensitif}%{" "}
//                     <input
//                       type="range"
//                       min="10"
//                       max="100"
//                       value={formData.skinSensitif}
//                       className="w-full accent-[#3D5532]"
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           skinSensitif: e.target.value,
//                         })
//                       }
//                     />
//                   </label>
//                 </div>
//               </div>

//               <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
//                 <label className="text-[10px] font-black text-gray-400 uppercase block">
//                   Upload Gambar Grid (Maksimal 4 Slot Berbeda)
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="file"
//                     className="text-[10px] text-gray-400"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image1: e.target.files[0] })
//                     }
//                   />
//                   <input
//                     type="file"
//                     className="text-[10px] text-gray-400"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image2: e.target.files[0] })
//                     }
//                   />
//                   <input
//                     type="file"
//                     className="text-[10px] text-gray-400"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image3: e.target.files[0] })
//                     }
//                   />
//                   <input
//                     type="file"
//                     className="text-[10px] text-gray-400"
//                     onChange={(e) =>
//                       setFormData({ ...formData, image4: e.target.files[0] })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="flex-1 text-xs font-black text-gray-400 uppercase tracking-widest"
//                 >
//                   BATAL
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 py-4 bg-[#3D5532] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-md"
//                 >
//                   SIMPAN
//                 </button>
//               </div>
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
import { Plus, Edit2, Loader2, X } from "lucide-react";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Semua",
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
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/produk");
      const result = await response.json();
      if (result.status === "success") setProducts(result.data);
    } catch (error) {
      console.error("Gagal memuat data produk:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenEditModal = (produk) => {
    setIsEditMode(true);
    setEditingProductId(produk.id_produk);
    const skinVals = produk.ph_level
      ? produk.ph_level.split(",")
      : [90, 80, 85, 65];

    setFormData({
      name: produk.nama_produk || "",
      category: p.kategori || "Semua",
      skinType: produk.suitable_skin_type || "Semua",
      price: produk.harga_asli || "",
      brand: produk.brand || "SkinCycle",
      description: produk.deskripsi_produk || "",
      benefits: produk.link_pembelian || "",
      ingredients: p.bahan_kandungan || "",
      skinOily: skinVals[0] || 90,
      skinDry: skinVals[1] || 80,
      skinKombinasi: skinVals[2] || 85,
      skinSensitif: skinVals[3] || 65,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingProductId(null);
    setFormData({
      name: "",
      category: "Semua",
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
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[formData[key]]);
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
            <h1 className="text-3xl font-sans text-brand-dark-500 uppercase tracking-tight">
              Manajemen Produk
            </h1>
            <p className="text-xs text-neutral-400 font-medium mt-0.5">
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
                        src={`http://localhost:5000/uploads/${p.gambar_produk?.split(",")[0]}`}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-100"
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
                    <td className="px-8 py-5 text-center flex justify-center gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(p)}
                        className="text-neutral-400 hover:text-brand-primary-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
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

      {/* EXPANDED MODAL FORM INPUT */}
      {showModal && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-default w-full max-w-xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 border border-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-sans font-bold text-brand-dark-500 uppercase tracking-tight">
                {isEditMode ? "Edit Detail Produk" : "Tambah Produk Baru"}
              </h2>
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
              <input
                type="text"
                placeholder="Nama Produk"
                required
                value={formData.name}
                className="w-full p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none border border-transparent focus:border-brand-primary-300 text-brand-dark-500"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.category}
                  className="p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Semua</option>
                  <option>Cleanser</option>
                  <option>Facial Wash</option>
                  <option>Serum</option>
                  <option>Moisturizer</option>
                </select>
                <select
                  value={formData.skinType}
                  className="p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500 cursor-pointer"
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
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Harga Jual"
                  required
                  value={formData.price}
                  className="p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Brand Skincare"
                  value={formData.brand}
                  className="p-4 bg-neutral-50 rounded-2xl text-xs font-bold outline-none text-brand-dark-500"
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
              <textarea
                placeholder="Deskripsi Singkat..."
                value={formData.description}
                rows="2"
                className="w-full p-4 bg-neutral-50 rounded-2xl text-xs outline-none font-bold resize-none text-brand-dark-500 border border-transparent"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full py-4 bg-brand-primary-300 text-neutral-default rounded-2xl font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
              >
                SIMPAN PRODUK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
