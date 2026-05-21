// import React, { useState, useEffect } from "react";

// const KandunganPage = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState("Semua");
//   const [isLoading, setIsLoading] = useState(true);

//   // State manajemen popup modal detail kandungan
//   const [selectedIngredient, setSelectedIngredient] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Ambil data dinamis dari database backend SkinCycle
//   const fetchIngredients = async (search = "") => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/kandungan?search=${search}`,
//       );
//       const result = await response.json();
//       if (result.status === "success") {
//         setIngredients(result.data);
//       }
//     } catch (error) {
//       console.error("Gagal memuat data ensiklopedia kandungan:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIngredients();
//   }, []);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     fetchIngredients(searchQuery);
//   };

//   const handleOpenModal = (bahan) => {
//     setSelectedIngredient(bahan);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedIngredient(null);
//   };

//   // Logika filtering kategori pill di atas grid
//   const filteredIngredients = ingredients.filter((ing) => {
//     if (activeFilter === "Semua") return true;
//     return ing.kategori_bahan?.toLowerCase() === activeFilter.toLowerCase();
//   });

//   // Ambil item pertama dari database untuk dijadikan Featured Card Utama di bagian atas
//   const featuredIngredient = ingredients[0] || {
//     nama_bahan: "Retinol",
//     kategori_bahan: "Anti-Aging",
//     ringkasan:
//       "Standar emas dalam perawatan dermatologis. Turunan Vitamin A yang kuat ini membantu mempercepat regenerasi sel dan produksi kolagen untuk menyamarkan garis halus serta memperbaiki tekstur kulit secara terlihat.",
//     fungsi:
//       "Mempercepat turnover sel kulit dan merangsang sintesis kolagen di lapisan dermis.",
//     manfaat_list:
//       "Menyamarkan garis halus, Memperbaiki tekstur kulit, Menyamarkan noda hitam",
//     jenis_kulit: "Berminyak, Kering, Kombinasi",
//     catatan_keamanan:
//       "Gunakan hanya pada malam hari. Wajib aplikasikan sunscreen di pagi hari karena retinol meningkatkan sensitivitas kulit terhadap sinar matahari.",
//     gambar_bahan: "retinol-featured.jpg",
//   };

//   return (
//     <div className="bg-[#F2EDE4] min-h-screen font-['DM_Sans'] text-[#1A2416] py-12 px-6 lg:px-20">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADER TEXT */}
//         <div className="text-center max-w-2xl mx-auto mb-10">
//           <h1 className="text-4xl font-serif font-black tracking-tight text-[#1A2416] mb-3">
//             Perpustakaan Kandungan
//           </h1>
//           <p className="text-gray-500 text-sm leading-relaxed">
//             Ensiklopedia terkurasi mengenai senyawa biosains dan ekstrak botani
//             yang menggabungkan efektivitas klinis dengan ketenangan alami.
//           </p>
//         </div>

//         {/* CONTAINER SEJAJAR: SEARCH BAR (KIRI) & KATEGORI (KANAN) */}
//         <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-10 max-w-6xl mx-auto border-b border-gray-200/50 pb-6">
//           {/* Form Input Pencarian */}
//           <form
//             onSubmit={handleSearchSubmit}
//             className="relative w-full lg:w-2/5"
//           >
//             <input
//               type="text"
//               placeholder="Cari kandungan, manfaat, atau masalah kulit..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-5 pr-12 py-3.5 bg-white border border-transparent rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532] shadow-sm transition-all"
//             />
//             <button
//               type="submit"
//               className="absolute right-4 top-3.5 text-gray-400 hover:text-[#3D5532] transition-colors"
//             >
//               🔍
//             </button>
//           </form>

//           {/* Tab Tombol Kategori Filter */}
//           <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-3/5">
//             {[
//               "Semua",
//               "Anti Penuaan",
//               "Hidrasi",
//               "Mencerahkan",
//               "Menangkan",
//               "Eksfoliasi",
//             ].map((filter) => {
//               const mappedFilter =
//                 filter === "Anti Penuaan"
//                   ? "Anti-Aging"
//                   : filter === "Mencerahkan"
//                     ? "Brightening"
//                     : filter === "Hidrasi"
//                       ? "Hydrating"
//                       : filter;
//               const isSelected =
//                 activeFilter.toLowerCase() === mappedFilter.toLowerCase();

//               return (
//                 <button
//                   key={filter}
//                   type="button"
//                   onClick={() => setActiveFilter(mappedFilter)}
//                   className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 outline-none ${
//                     isSelected
//                       ? "bg-[#3D5532] text-white shadow-sm"
//                       : "bg-white/60 border border-transparent text-gray-500 hover:bg-[#9BB786]/20 hover:text-[#3D5532]"
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ==================== 1. FEATURED COMPONENT CARD ATAS ==================== */}
//         {ingredients.length > 0 && activeFilter === "Semua" && !searchQuery && (
//           <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-gray-100/60 shadow-sm flex flex-col md:grid md:grid-cols-12 gap-8 items-center mb-12 transform transition-all duration-300">
//             <div className="md:col-span-6 space-y-4 order-2 md:order-1">
//               <span className="bg-[#3D5532]/10 text-[#3D5532] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
//                 Kandungan Utama
//               </span>
//               <h2 className="text-3xl font-serif font-black tracking-tight text-[#1A2416]">
//                 {featuredIngredient.nama_bahan ||
//                   featuredIngredient.nama_kandungan}
//               </h2>
//               <p className="text-xs text-gray-500 leading-relaxed font-medium">
//                 {featuredIngredient.ringkasan || featuredIngredient.fungsi}
//               </p>

//               <div className="flex flex-wrap gap-4 text-[11px] text-gray-400 font-medium pt-2">
//                 <span>👌 Cocok untuk kulit kering</span>
//                 <span>🧪 Halal & Vegan Klinis</span>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => handleOpenModal(featuredIngredient)}
//                 className="inline-block bg-[#3D5532] hover:bg-[#2d4025] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
//               >
//                 Lihat Detail Lengkap
//               </button>
//             </div>

//             <div className="md:col-span-6 w-full h-64 md:h-80 rounded-2xl overflow-hidden order-1 md:order-2 bg-gray-50 border border-gray-100">
//               <img
//                 src={
//                   featuredIngredient.gambar_bahan?.startsWith("http")
//                     ? featuredIngredient.gambar_bahan
//                     : `http://localhost:5000/uploads/${featuredIngredient.gambar_bahan || "default-ing.jpg"}`
//                 }
//                 className="w-full h-full object-cover"
//                 alt="Featured Ingredient"
//               />
//             </div>
//           </div>
//         )}

//         {/* ==================== 2. GRID LIST KANDUNGAN BAHAN BAWAH ==================== */}
//         {isLoading ? (
//           <div className="text-center py-10 font-bold text-[#3D5532] italic animate-pulse">
//             Menghubungkan ke basis data laboratorium SkinCycle...
//           </div>
//         ) : filteredIngredients.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredIngredients.map((ing) => {
//               const itemTitle = ing.nama_bahan || ing.nama_kandungan;
//               const itemDesc = ing.ringkasan || ing.fungsi;
//               const itemSkin = ing.jenis_kulit || ing.jenis_kulit_cocok;

//               return (
//                 <div
//                   key={ing.id_kandungan}
//                   onClick={() => handleOpenModal(ing)}
//                   className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-transparent hover:border-[#9BB786] cursor-pointer transition-all duration-300 flex flex-col group"
//                 >
//                   <div className="h-40 overflow-hidden bg-gray-50 relative border-b border-gray-100/50">
//                     <img
//                       src={`http://localhost:5000/uploads/${ing.gambar_bahan || "default-ing.jpg"}`}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       alt={itemTitle}
//                     />
//                     <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[16px] w-8 h-8 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
//                       {ing.kategori_bahan === "Hydrating"
//                         ? "💧"
//                         : ing.kategori_bahan === "Brightening"
//                           ? "✨"
//                           : "🌱"}
//                     </span>
//                   </div>

//                   <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
//                     <div>
//                       <h3 className="text-base font-bold text-[#1A2416] group-hover:text-[#3D5532] transition-colors uppercase tracking-tight">
//                         {itemTitle}
//                       </h3>
//                       <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1 line-clamp-2 italic">
//                         {itemDesc ||
//                           "Klik untuk melihat analisis fungsional struktur kimia dan formulasi kecocokan kulit."}
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-1.5 pt-1">
//                       {/* FIX SINTAKS `.split(",")` DI SINI */}
//                       {(itemSkin
//                         ? itemSkin.split(",").slice(0, 2)
//                         : ["Semua Kulit"]
//                       ).map((s, i) => (
//                         <span
//                           key={i}
//                           className="text-[9px] font-bold bg-gray-50 border border-gray-100 text-gray-400 px-2 py-1 rounded-md uppercase"
//                         >
//                           {s.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-400 font-medium italic bg-white/50 border border-dashed border-gray-200 rounded-3xl">
//             Bahan aktif skincare tidak ditemukan dalam pustaka koleksi ini.
//           </div>
//         )}

//         {/* ==================== POPUP MODAL DETAIL KANDUNGAN ==================== */}
//         {showModal && selectedIngredient && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fadeIn">
//             <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
//               {/* KOLOM KIRI */}
//               <div className="md:col-span-4 bg-[#FAFBF9]/60 p-8 border-r border-gray-100 flex flex-col justify-between overflow-y-auto">
//                 <div>
//                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
//                     Profil Kandungan
//                   </span>
//                   <h2 className="text-2xl font-serif font-black text-[#1A2416] mb-6">
//                     {selectedIngredient.nama_bahan ||
//                       selectedIngredient.nama_kandungan}
//                   </h2>

//                   <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-white border border-gray-200/40 shadow-sm p-1">
//                     <img
//                       src={`http://localhost:5000/uploads/${selectedIngredient.gambar_bahan || "default-ing.jpg"}`}
//                       className="w-full h-full object-cover rounded-xl"
//                       alt="img"
//                     />
//                   </div>

//                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                     Ringkasan
//                   </h4>
//                   <p className="text-xs text-gray-600 leading-relaxed font-medium mb-6 italic">
//                     {selectedIngredient.ringkasan || selectedIngredient.fungsi}
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
//                     Jenis Kulit
//                   </h4>
//                   <div className="flex flex-wrap gap-1.5">
//                     {(selectedIngredient.jenis_kulit ||
//                     selectedIngredient.jenis_kulit_cocok
//                       ? (
//                           selectedIngredient.jenis_kulit ||
//                           selectedIngredient.jenis_kulit_cocok
//                         ).split(",")
//                       : ["Semua Jenis Kulit"]
//                     ).map((skin, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-white border border-gray-200 text-gray-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
//                       >
//                         <span className="w-1 h-1 bg-green-500 rounded-full"></span>
//                         {skin.trim()}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* KOLOM KANAN */}
//               <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 font-bold text-xs bg-gray-50 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all"
//                 >
//                   ✕
//                 </button>

//                 <div className="space-y-6 pr-2">
//                   <div className="flex gap-4 items-start">
//                     <div className="w-8 h-8 rounded-xl bg-[#3D5532]/10 text-[#3D5532] flex items-center justify-center font-bold text-sm shrink-0">
//                       🔬
//                     </div>
//                     <div>
//                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
//                         Fungsi Utama
//                       </h4>
//                       <p className="text-xs text-gray-700 leading-relaxed font-medium">
//                         {selectedIngredient.fungsi}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-4 items-start">
//                     <div className="w-8 h-8 rounded-xl bg-[#3D5532]/10 text-[#3D5532] flex items-center justify-center font-bold text-sm shrink-0">
//                       ✨
//                     </div>
//                     <div className="w-full">
//                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                         Manfaat Efektif
//                       </h4>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                         {(selectedIngredient.manfaat_list ||
//                         selectedIngredient.manfaat
//                           ? (
//                               selectedIngredient.manfaat_list ||
//                               selectedIngredient.manfaat
//                             ).split(",")
//                           : [
//                               "Mengoptimalkan tingkat kecerahan serta kelembapan wajah harian.",
//                             ]
//                         ).map((manfaat, i) => (
//                           <div
//                             key={i}
//                             className="flex items-center gap-2 text-xs font-medium text-gray-600"
//                           >
//                             <span className="text-emerald-600 font-bold">
//                               ✓
//                             </span>
//                             <span>{manfaat.trim()}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-[#FAFBF9] border border-gray-100 rounded-2xl p-5 flex gap-4 items-start mt-4">
//                     <div className="w-7 h-7 bg-[#3D5532] text-white rounded-lg flex items-center justify-center text-xs shadow-md shrink-0 font-bold">
//                       ✓
//                     </div>
//                     <div>
//                       <h4 className="text-xs font-bold text-gray-800 mb-0.5">
//                         Catatan Keamanan / Efek Samping
//                       </h4>
//                       <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
//                         {selectedIngredient.catatan_keamanan ||
//                           selectedIngredient.efek_samping ||
//                           "Secara umum terbukti klinis aman digunakan untuk pemakaian skincare harian jangka panjang."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 pt-4 border-t border-gray-50 text-right text-[10px] font-bold text-gray-300 uppercase tracking-widest">
//                   SkinCycle Botanical Content Library
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default KandunganPage;

import React, { useState, useEffect } from "react";
import { Search, Info, CheckCircle2 } from "lucide-react"; // Menggunakan lucide-react agar ikon seragam

const KandunganPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchIngredients = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/kandungan?search=${search}`,
      );
      const result = await response.json();
      if (result.status === "success") setIngredients(result.data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchIngredients(searchQuery);
  };

  return (
    <div className="bg-brand-secondary-100 min-h-screen font-sans text-brand-dark-500 py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* HEADER TEXT - MENGGUNAKAN MARCELLUS SC */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-marcellus text-brand-dark-500 mb-3 tracking-tight">
            Perpustakaan Kandungan
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Ensiklopedia terkurasi mengenai senyawa biosains dan ekstrak botani
            yang menggabungkan efektivitas klinis dengan ketenangan alami.
          </p>
        </div>

        {/* CONTAINER SEJAJAR: SEARCH BAR & KATEGORI */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-10 max-w-6xl mx-auto border-b border-neutral-100 pb-6">
          {/* Form Pencarian */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full lg:w-2/5"
          >
            <input
              type="text"
              placeholder="Cari kandungan, manfaat, atau masalah kulit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 bg-neutral-default border border-transparent rounded-xl text-xs font-medium text-neutral-700 outline-none focus:border-brand-primary-300 shadow-sm transition-all"
            />
            <Search className="absolute right-4 top-3.5 w-4 h-4 text-neutral-400" />
          </form>

          {/* Tombol Filter Kategori */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-3/5">
            {[
              "Semua",
              "Anti Penuaan",
              "Hidrasi",
              "Mencerahkan",
              "Menangkan",
              "Eksfoliasi",
            ].map((filter) => {
              const mapped =
                filter === "Anti Penuaan"
                  ? "Anti-Aging"
                  : filter === "Mencerahkan"
                    ? "Brightening"
                    : filter === "Hidrasi"
                      ? "Hydrating"
                      : filter;
              const isSelected =
                activeFilter.toLowerCase() === mapped.toLowerCase();

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(mapped)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 outline-none ${
                    isSelected
                      ? "bg-brand-dark-200 text-neutral-default shadow-sm"
                      : "bg-neutral-default/60 border border-transparent text-neutral-500 hover:bg-brand-primary-100/30 hover:text-brand-dark-200"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================== CARD GRID LIST ==================== */}
        {isLoading ? (
          <div className="text-center py-10 font-bold text-brand-primary-300 italic animate-pulse">
            Memuat data...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients
              .filter(
                (ing) =>
                  activeFilter === "Semua" ||
                  ing.kategori_bahan?.toLowerCase() ===
                    activeFilter.toLowerCase(),
              )
              .map((ing) => (
                <div
                  key={ing.id_kandungan}
                  onClick={() => {
                    setSelectedIngredient(ing);
                    setShowModal(true);
                  }}
                  className="bg-neutral-default rounded-[24px] overflow-hidden shadow-sm border border-transparent hover:border-brand-primary-200 cursor-pointer transition-all duration-300 flex flex-col group"
                >
                  <div className="h-40 overflow-hidden bg-neutral-50 relative border-b border-neutral-100">
                    <img
                      src={`http://localhost:5000/uploads/${ing.gambar_bahan || "default-ing.jpg"}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={ing.nama_bahan}
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors uppercase tracking-tight">
                        {ing.nama_bahan || ing.nama_kandungan}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed mt-1 line-clamp-2 italic">
                        {ing.ringkasan || ing.fungsi}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(
                        ing.jenis_kulit ||
                        ing.jenis_kulit_cocok ||
                        "Semua Kulit"
                      )
                        .split(",")
                        .slice(0, 2)
                        .map((s, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-bold bg-neutral-50 border border-neutral-100 text-neutral-400 px-2 py-1 rounded-md uppercase"
                          >
                            {s.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ==================== POPUP MODAL 2 KOLOM ==================== */}
        {showModal && selectedIngredient && (
          <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-neutral-default w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-neutral-100 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
              {/* KOLOM KIRI */}
              <div className="md:col-span-4 bg-neutral-50 p-8 border-r border-neutral-100 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                    Profil Kandungan
                  </span>
                  <h2 className="text-2xl font-marcellus text-brand-dark-500 mb-6">
                    {selectedIngredient.nama_bahan ||
                      selectedIngredient.nama_kandungan}
                  </h2>
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-neutral-default border p-1 shadow-sm">
                    <img
                      src={`http://localhost:5000/uploads/${selectedIngredient.gambar_bahan || "default-ing.jpg"}`}
                      className="w-full h-full object-cover rounded-xl"
                      alt="img"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Ringkasan
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-6 italic">
                    {selectedIngredient.ringkasan || selectedIngredient.fungsi}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">
                    Jenis Kulit
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(
                      selectedIngredient.jenis_kulit ||
                      selectedIngredient.jenis_kulit_cocok ||
                      "Semua"
                    )
                      .split(",")
                      .map((skin, idx) => (
                        <span
                          key={idx}
                          className="bg-neutral-default border border-neutral-200 text-neutral-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
                        >
                          <span className="w-1 h-1 bg-feedback-success-200 rounded-full"></span>
                          {skin.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN */}
              <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedIngredient(null);
                  }}
                  className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 font-bold text-xs bg-neutral-50 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
                <div className="space-y-6 pr-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-feedback-info-100 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0">
                      🔬
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Fungsi Utama
                      </h4>
                      <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                        {selectedIngredient.fungsi}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-feedback-info-100 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0">
                      ✨
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Manfaat Efektif
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(
                          selectedIngredient.manfaat_list ||
                          selectedIngredient.manfaat ||
                          "Menjaga sel kulit"
                        )
                          .split(",")
                          .map((manfaat, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs font-medium text-neutral-600"
                            >
                              <span className="text-feedback-success-300 font-bold">
                                ✓
                              </span>
                              <span>{manfaat.trim()}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex gap-4 items-start mt-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-primary-300 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 mb-0.5">
                        Catatan Keamanan / Efek Samping
                      </h4>
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                        {selectedIngredient.catatan_keamanan ||
                          selectedIngredient.efek_samping ||
                          "Aman digunakan sesuai anjuran."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-100 text-right text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                  SkinCycle Botanical Content Library
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KandunganPage;
