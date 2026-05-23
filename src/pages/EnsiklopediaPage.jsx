// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const EnsiklopediaPage = () => {
//   // Hook untuk navigasi antar route
//   const navigate = useNavigate();

//   // State untuk mengontrol visibilitas Popup Jenis Kulit (Statis)
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedType, setSelectedType] = useState(null);

//   // === DATA KANDUNGAN DINAMIS DATABASE (PERBAIKAN KELUHAN) ===
//   const [ingredients, setIngredients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
//   const [selectedIngredient, setSelectedIngredient] = useState(null);
//   const [showIngredientPopup, setShowIngredientPopup] = useState(false);

//   const skinTypes = [
//     {
//       name: "Kering",
//       desc: "Kulit terasa kencang, kasar, dan tampak bersisik atau mudah mengelupas.",
//       img: "🧪",
//       details: {
//         char: [
//           "Pori-pori hampir tidak terlihat",
//           "Permukaan kasar and kusam",
//           "Kurang elastisitas",
//         ],
//         tips: [
//           "Gunakan pembersih berbasis krim",
//           "Pakai pelembap tekstur rich/oil-based",
//           "Hindari mandi air terlalu panas",
//         ],
//         ingredients: "Ceramides, Glycerin",
//         avoid: "Alcohol, Harsh Scrub",
//       },
//     },
//     {
//       name: "Berminyak",
//       desc: "Tampak mengkilap karena produksi sebum berlebih, pori-pori besar, dan rentan komedo.",
//       img: "🌿",
//       details: {
//         char: [
//           "Pori-pori besar dan terbuka",
//           "Wajah cepat mengkilap",
//           "Rentan jerawat/komedo",
//         ],
//         tips: [
//           "Double cleansing harian",
//           "Pilih produk non-comedogenic",
//           "Pakai pelembap water-based",
//         ],
//         ingredients: "Salicylic Acid, Niacinamide",
//         avoid: "Mineral Oil, Paraben",
//       },
//     },
//     {
//       name: "Kombinasi",
//       desc: "Area T-zone berminyak, namun area pipi tetap normal atau kering.",
//       img: "✨",
//       details: {
//         char: [
//           "T-Zone (dahi, hidung, dagu) berminyak",
//           "Area pipi kering/normal",
//           "Pori-pori besar di hidung",
//         ],
//         tips: [
//           "Gunakan produk berbeda untuk area wajah",
//           "Eksfoliasi fokus di T-zone",
//           "Hydration seimbang",
//         ],
//         ingredients: "Hyaluronic Acid, Green Tea",
//         avoid: "Produk terlalu berminyak",
//       },
//     },
//     {
//       name: "Sensitif",
//       desc: "Mudah mengalami iritasi, kemerahan, atau perih terhadap produk tertentu.",
//       img: "🌸",
//       details: {
//         char: [
//           "Mudah merah/gatal",
//           "Bereaksi pada wewangian",
//           "Terasa perih saat ganti produk",
//         ],
//         tips: [
//           "Uji tempel (patch test) selalu",
//           "Gunakan bahan minimalis",
//           "Cari label 'Fragrance-free'",
//         ],
//         ingredients: "Aloe Vera, Centella Asiatica",
//         avoid: "Parfume, Essential Oils",
//       },
//     },
//   ];

//   // Ambil data bahan aktif dari database backend
//   const fetchIngredients = async (search = "") => {
//     setIsLoadingIngredients(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/kandungan?q=${search}`,
//       );
//       const result = await response.json();
//       if (result.status === "success") {
//         setIngredients(result.data);
//       }
//     } catch (error) {
//       console.error("Gagal memuat data kandungan:", error);
//     } finally {
//       setIsLoadingIngredients(false);
//     }
//   };

//   useEffect(() => {
//     fetchIngredients();
//   }, []);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     fetchIngredients(searchQuery);
//   };

//   const handleOpenPopup = (type) => {
//     setSelectedType(type);
//     setShowPopup(true);
//   };

//   return (
//     <div className="bg-[#F2EDE4] font-sans relative">
//       {/* SECTION 1: HEADER & JENIS KULIT */}
//       <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-10 py-4">
//         <header className="text-center mb-8">
//           <h1 className="text-5xl font-serif text-[#1e2b19] mb-3 leading-tight">
//             Ensiklopedia Jenis Kulit
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
//             Kenali kulitmu lebih dalam dengan panduan berbasis sains dan bahan
//             alami yang aman untuk kesehatanmu dan bumi.
//           </p>
//         </header>

//         <div className="max-w-7xl mx-auto w-full">
//           <div className="flex justify-between items-end mb-6">
//             <h2 className="text-3xl font-bold text-[#1e2b19]">
//               Kenali Jenis Kulitmu
//             </h2>
//             <span className="text-xs font-bold text-[#3D5532] uppercase tracking-[0.2em] cursor-pointer border-b-2 border-[#3D5532]">
//               Pengantar Dasar
//             </span>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {skinTypes.map((item) => (
//               <div
//                 key={item.name}
//                 className="bg-white p-6 rounded-[35px] text-center shadow-sm border border-gray-100 flex flex-col items-center group transition-all hover:shadow-xl"
//               >
//                 <div
//                   onClick={() => handleOpenPopup(item)}
//                   className="w-full h-32 bg-[#EBEBE6] rounded-[25px] mb-4 flex items-center justify-center text-4xl shadow-inner cursor-pointer hover:bg-gray-200 transition-colors"
//                 >
//                   {item.img}
//                 </div>
//                 <h4 className="text-xl font-bold text-[#1e2b19] mb-2">
//                   {item.name}
//                 </h4>
//                 <p className="text-[12px] text-gray-500 mb-4 leading-relaxed line-clamp-3">
//                   {item.desc}
//                 </p>
//                 <button
//                   onClick={() => handleOpenPopup(item)}
//                   className="bg-[#3D5532] text-white w-full py-3 rounded-xl text-xs font-bold mt-auto hover:bg-[#2d4025] transition-colors"
//                 >
//                   Pelajari Detail
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- POPUP COMPONENT: JENIS KULIT (Fixed Overlay) --- */}
//       {showPopup && selectedType && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
//             onClick={() => setShowPopup(false)}
//           ></div>

//           <div className="relative bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
//             <div className="md:w-2/5 bg-gradient-to-br from-[#A3B18A] to-[#3D5532] p-10 flex flex-col justify-end text-white">
//               <span className="text-6xl mb-6">{selectedType.img}</span>
//               <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
//                 Skin Report
//               </p>
//               <h3 className="text-4xl font-serif leading-tight">
//                 Detail Tipe Kulit <br /> {selectedType.name}
//               </h3>
//             </div>

//             <div className="md:w-3/5 p-10 max-h-[85vh] overflow-y-auto">
//               <button
//                 className="absolute top-6 right-8 text-2xl text-gray-400 hover:text-black transition-colors"
//                 onClick={() => setShowPopup(false)}
//               >
//                 ✕
//               </button>

//               <div className="space-y-8">
//                 <section>
//                   <h4 className="text-[#3D5532] font-bold text-sm mb-3 flex items-center gap-2">
//                     <span className="w-1 h-4 bg-[#3D5532] rounded-full"></span>{" "}
//                     Karakteristik
//                   </h4>
//                   <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 leading-relaxed">
//                     {selectedType.details.char.map((c, i) => (
//                       <li key={i}>{c}</li>
//                     ))}
//                   </ul>
//                 </section>

//                 <section className="bg-[#F9F9F7] p-6 rounded-3xl border border-gray-100">
//                   <h4 className="text-[#3D5532] font-bold text-sm mb-4 flex items-center gap-2">
//                     💡 Tips Perawatan Berkelanjutan
//                   </h4>
//                   <div className="space-y-4">
//                     {selectedType.details.tips.map((tip, i) => (
//                       <div key={i} className="flex gap-3">
//                         <div className="w-5 h-5 bg-[#3D5532] text-white rounded-full flex items-center justify-center text-[10px] shrink-0">
//                           {i + 1}
//                         </div>
//                         <p className="text-[11px] text-gray-600 leading-relaxed">
//                           {tip}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-[#EDF1EC] p-4 rounded-2xl">
//                     <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
//                       Kandungan Utama
//                     </h5>
//                     <p className="text-xs font-bold text-[#3D5532]">
//                       {selectedType.details.ingredients}
//                     </p>
//                   </div>
//                   <div className="bg-[#FDF2F2] p-4 rounded-2xl">
//                     <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
//                       Hindari Bahan
//                     </h5>
//                     <p className="text-xs font-bold text-red-400">
//                       {selectedType.details.avoid}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* SECTION 2: ARTIKEL EDUKASI */}
//       <section className="min-h-[100vh] flex flex-col justify-center px-10 py-10 bg-white/20">
//         <div className="max-w-7xl mx-auto w-full">
//           <div className="flex justify-between items-end mb-8">
//             <h2 className="text-3xl font-bold text-[#1e2b19]">
//               Artikel Edukasi
//             </h2>
//             <span
//               onClick={() => navigate("/ensiklopedia/kumpulan")}
//               className="text-xs font-bold text-[#3D5532] uppercase tracking-widest cursor-pointer hover:underline"
//             >
//               Lihat Semua
//             </span>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
//             <div
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//               className="lg:col-span-8 relative rounded-[40px] overflow-hidden group shadow-2xl h-full cursor-pointer"
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1000"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 alt="Skincare Art"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
//                 <span className="bg-[#3D5532] text-white px-4 py-1 rounded-full text-[10px] font-bold w-fit mb-4">
//                   PANDUAN
//                 </span>
//                 <h3 className="text-white text-4xl font-serif mb-4 leading-tight">
//                   Seni Rutinitas Skincare Berkelanjutan
//                 </h3>
//                 <p className="text-white/80 text-base max-w-xl mb-6">
//                   Pelajari urutan penggunaan produk alami secara tepat untuk
//                   mendapatkan hasil maksimal.
//                 </p>
//                 <button
//                   type="button"
//                   className="text-white text-sm font-bold underline underline-offset-4 text-left"
//                 >
//                   Baca Selengkapnya →
//                 </button>
//               </div>
//             </div>

//             <div className="lg:col-span-4 flex flex-col gap-4 h-full">
//               {[
//                 { cat: "Perlindungan", title: "Pentingnya Filter UV harian." },
//                 { cat: "Pembersih", title: "Double cleansing bahan alami." },
//                 { cat: "Nutrisi", title: "Antioksidan regenerasi sel." },
//               ].map((item) => (
//                 <div
//                   key={item.cat}
//                   onClick={() => navigate("/ensiklopedia/detail/1")}
//                   className="bg-[#EDD9C1] p-6 rounded-[30px] border border-[#3D5532]/10 hover:bg-[#e6ccad] transition-all flex-1 flex flex-col justify-center cursor-pointer"
//                 >
//                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#3D5532] mb-2">
//                     {item.cat}
//                   </h5>
//                   <p className="text-base font-bold text-[#1e2b19] leading-snug">
//                     {item.title}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= SECTION 3: KANDUNGAN BAHAN (TAMPILAN ASLI DINAMIS) ================= */}
//       <section className="min-h-screen flex flex-col justify-center px-10 py-10">
//         <div className="max-w-7xl mx-auto w-full bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-serif text-[#1e2b19] mb-4">
//               Kandungan Bahan Skincare
//             </h2>
//             <p className="text-gray-500 text-lg max-w-2xl mx-auto">
//               Cari tahu manfaat dari setiap kandungan alami yang paling tepat
//               untukmu.
//             </p>
//           </div>

//           <form
//             onSubmit={handleSearchSubmit}
//             className="max-w-2xl mx-auto bg-[#F9F9F7] rounded-full p-2 flex items-center shadow-inner mb-12 border border-gray-100"
//           >
//             <input
//               type="text"
//               placeholder="Cari kandungan bahan..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-grow px-6 text-base bg-transparent outline-none font-medium"
//             />
//             <button
//               type="submit"
//               className="bg-[#3D5532] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#2d4025] transition-all"
//             >
//               Cari
//             </button>
//           </form>

//           {isLoadingIngredients ? (
//             <div className="text-center py-10 font-bold text-[#3D5532] italic animate-pulse">
//               Menghubungkan ke basis data laboratorium SkinCycle...
//             </div>
//           ) : ingredients.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {ingredients.slice(0, 3).map((item) => (
//                 <div
//                   key={item.id_kandungan}
//                   onClick={() => {
//                     setSelectedIngredient(item);
//                     setShowIngredientPopup(true);
//                   }}
//                   className="bg-[#F9F9F7] p-6 rounded-[35px] hover:bg-[#F2EDE4] transition-colors group cursor-pointer border border-transparent hover:border-gray-100 shadow-sm"
//                 >
//                   <div className="flex justify-between items-center mb-4">
//                     <h4 className="text-lg font-bold text-[#1e2b19] group-hover:text-[#3D5532] transition-colors">
//                       {item.nama_kandungan}
//                     </h4>
//                     <span className="text-2xl">
//                       {item.kategori_bahan === "Hydrating"
//                         ? "💧"
//                         : item.kategori_bahan === "Brightening"
//                           ? "✨"
//                           : "🌱"}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mb-6 leading-relaxed line-clamp-2">
//                     {item.fungsi ||
//                       "Klik untuk melihat analisis fungsional struktur kimia dan formulasi kecocokan kulit."}
//                   </p>
//                   <span className="bg-white text-[#3D5532] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
//                     {item.kategori_bahan || "General"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-10 text-gray-400 italic">
//               Bahan aktif skincare tidak ditemukan dalam pustaka koleksi ini.
//             </div>
//           )}

//           {/* PERBAIKAN UTAMA: TOMBOL SEKARANG DAPAT DIKLIK DAN MENGARAHKAN KE HALAMAN KANDUNGAN SKINCRE RIIL */}
//           <div className="text-center mt-12 pt-4 border-t border-gray-100">
//             <span
//               onClick={() => navigate("/ensiklopedia/kandungan")} // <--- MENGARAHKAN KE HALAMAN KANDUNGANPAGE UTAMA
//               className="text-xs font-bold text-[#3D5532] uppercase tracking-[0.2em] cursor-pointer border-b-2 border-[#3D5532] pb-0.5 hover:text-[#1e2b19] hover:border-[#1e2b19] transition-all"
//             >
//               Jelajahi 150+ Kandungan Bahan
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* ================= --- POPUP BANNER: POPUP INTERAKTIF DETAIL KANDUNGAN (layout 2 kolom premium aslimu) --- ================= */}
//       {showIngredientPopup && selectedIngredient && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
//             {/* Kolom Kiri: Profil & Kategori */}
//             <div className="md:col-span-4 bg-[#FAFBF9]/60 p-8 border-r flex flex-col justify-between overflow-y-auto">
//               <div>
//                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
//                   Profil Kandungan
//                 </span>
//                 <h2 className="text-2xl font-serif font-black text-[#1A2416] mb-6 uppercase tracking-tight">
//                   {selectedIngredient.nama_kandungan}
//                 </h2>
//                 <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-white border p-2 flex items-center justify-center text-5xl shadow-sm">
//                   {selectedIngredient.kategori_bahan === "Hydrating"
//                     ? "💧"
//                     : selectedIngredient.kategori_bahan === "Brightening"
//                       ? "✨"
//                       : "🌱"}
//                 </div>
//                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                   Ringkasan
//                 </h4>
//                 <p className="text-xs text-gray-600 leading-relaxed font-medium mb-6 italic">
//                   {selectedIngredient.fungsi ||
//                     "Berperan sebagai molekul aktif penyeimbang kadar pH serta mempercepat pemulihan hidrasi sel kulit."}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
//                   Jenis Kulit
//                 </h4>
//                 <div className="flex flex-wrap gap-1">
//                   {(selectedIngredient.jenis_kulit_cocok
//                     ? selectedIngredient.jenis_kulit_cocok.split(",")
//                     : ["Semua Jenis Kulit"]
//                   ).map((skin, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-white border text-gray-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
//                     >
//                       <span className="w-1 h-1 bg-green-500 rounded-full"></span>
//                       {skin.trim()}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Kolom Kanan: Detail Analisis & Catatan */}
//             <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
//               <button
//                 onClick={() => setShowIngredientPopup(false)}
//                 className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 font-bold text-sm bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center"
//               >
//                 ✕
//               </button>
//               <div className="space-y-6 pr-2">
//                 <div className="flex gap-4 items-start">
//                   <div className="w-8 h-8 rounded-xl bg-[#3D5532]/10 text-[#3D5532] flex items-center justify-center font-bold text-sm shrink-0">
//                     🔬
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
//                       Fungsi Utama
//                     </h4>
//                     <p className="text-xs text-gray-700 leading-relaxed font-medium">
//                       {selectedIngredient.fungsi}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4 items-start">
//                   <div className="w-8 h-8 rounded-xl bg-[#3D5532]/10 text-[#3D5532] flex items-center justify-center font-bold text-sm shrink-0">
//                     ✨
//                   </div>
//                   <div className="w-full">
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                       Manfaat Efektif
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                       {(selectedIngredient.manfaat
//                         ? selectedIngredient.manfaat.split(",")
//                         : [
//                             "Mengoptimalkan tingkat kecerahan serta kelembapan wajah harian.",
//                           ]
//                       ).map((manfaat, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center gap-2 text-xs font-medium text-gray-600"
//                         >
//                           <span className="text-emerald-600 font-bold">✓</span>
//                           <span>{manfaat.trim()}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-[#FAFBF9] border rounded-2xl p-5 flex gap-4 items-start mt-4">
//                   <div className="w-7 h-7 bg-[#3D5532] text-white rounded-lg flex items-center justify-center text-xs shadow-md shrink-0 font-bold">
//                     ✓
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-bold text-gray-800 mb-0.5">
//                       Catatan Keamanan / Efek Samping
//                     </h4>
//                     <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
//                       {selectedIngredient.efek_samping}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8 pt-4 border-t text-right text-[10px] font-bold text-gray-300 uppercase tracking-widest">
//                 SkinCycle Botanical Content Library
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnsiklopediaPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EnsiklopediaPage = () => {
  // Hook untuk navigasi antar route
  const navigate = useNavigate();

  // State untuk mengontrol visibilitas Popup Jenis Kulit (Statis)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  // === DATA KANDUNGAN DINAMIS DATABASE ===
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showIngredientPopup, setShowIngredientPopup] = useState(false);

  const skinTypes = [
    {
      name: "Kering",
      desc: "Kulit terasa kencang, kasar, dan tampak bersisik atau mudah mengelupas.",
      img: "/kulit-kering.jpg",
      details: {
        char: [
          "Pori-pori hampir tidak terlihat",
          "Permukaan kasar and kusam",
          "Kurang elastisitas",
        ],
        tips: [
          "Gunakan pembersih berbasis krim",
          "Pakai pelembap tekstur rich/oil-based",
          "Hindari mandi air terlalu panas",
        ],
        ingredients: "Ceramides, Glycerin",
        avoid: "Alcohol, Harsh Scrub",
      },
    },
    {
      name: "Berminyak",
      desc: "Tampak mengkilap karena produksi sebum berlebih, pori-pori besar, dan rentan komedo.",
      img: "/kulit-berminyak.jpg",
      details: {
        char: [
          "Pori-pori besar and terbuka",
          "Wajah cepat mengkilap",
          "Rentan jerawat/komedo",
        ],
        tips: [
          "Double cleansing harian",
          "Pilih produk non-comedogenic",
          "Pakai pelembap water-based",
        ],
        ingredients: "Salicylic Acid, Niacinamide",
        avoid: "Mineral Oil, Paraben",
      },
    },
    {
      name: "Kombinasi",
      desc: "Area T-zone berminyak, namun area pipi tetap normal atau kering.",
      img: "/kulit-kombinasi.jpg",
      details: {
        char: [
          "T-Zone (dahi, hidung, dagu) berminyak",
          "Area pipi kering/normal",
          "Pori-pori besar di hidung",
        ],
        tips: [
          "Gunakan produk berbeda untuk area wajah",
          "Eksfoliasi fokus di T-zone",
          "Hydration seimbang",
        ],
        ingredients: "Hyaluronic Acid, Green Tea",
        avoid: "Produk terlalu berminyak",
      },
    },
    {
      name: "Sensitif",
      desc: "Mudah mengalami iritasi, kemerahan, atau perih terhadap produk tertentu.",
      img: "/kulit-sensitif.jpg",
      details: {
        char: [
          "Mudah merah/gatal",
          "Bereaksi pada wewangian",
          "Terasa perih saat ganti produk",
        ],
        tips: [
          "Uji tempel (patch test) selalu",
          "Gunakan bahan minimalis",
          "Cari label 'Fragrance-free'",
        ],
        ingredients: "Aloe Vera, Centella Asiatica",
        avoid: "Parfume, Essential Oils",
      },
    },
  ];

  // Ambil data bahan aktif dari database backend
  const fetchIngredients = async (search = "") => {
    setIsLoadingIngredients(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/kandungan?q=${search}`,
      );
      const result = await response.json();
      if (result.status === "success") {
        setIngredients(result.data);
      }
    } catch (error) {
      console.error("Gagal memuat data kandungan:", error);
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchIngredients(searchQuery);
  };

  const handleOpenPopup = (type) => {
    setSelectedType(type);
    setShowPopup(true);
  };

  return (
    <div className="bg-brand-secondary-100 font-sans relative text-brand-dark-500">
      {/* SECTION 1: HEADER & JENIS KULIT */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-10 py-4">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-sans text-brand-dark-500 mb-3 leading-tight">
            Ensiklopedia Jenis Kulit
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Kenali kulitmu lebih dalam dengan panduan berbasis sains dan bahan
            alami yang aman untuk kesehatanmu dan bumi.
          </p>
        </header>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-bold text-brand-dark-500">
              Kenali Jenis Kulitmu
            </h2>
            <span className="text-xs font-bold text-brand-primary-300 uppercase tracking-[0.2em] cursor-pointer border-b-2 border-brand-primary-300">
              Pengantar Dasar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skinTypes.map((item) => (
              <div
                key={item.name}
                className="bg-neutral-default p-6 rounded-[35px] text-center shadow-sm border border-neutral-100 flex flex-col items-center group transition-all hover:shadow-xl"
              >
                <div
                  onClick={() => handleOpenPopup(item)}
                  className="w-full h-36 rounded-[25px] mb-4 overflow-hidden cursor-pointer shadow-sm group-hover:shadow-md transition-all bg-brand-primary-100/20"
                >
                  <img
                    src={item.img}
                    alt={`Kulit ${item.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#a8bdac'; }}
                  />
                </div>
                <h4 className="text-xl font-bold text-brand-dark-500 mb-2">
                  {item.name}
                </h4>
                <p className="text-[12px] text-neutral-500 mb-4 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenPopup(item)}
                  className="bg-brand-primary-300 text-neutral-default w-full py-3 rounded-xl text-xs font-bold mt-auto hover:bg-brand-primary-500 transition-colors"
                >
                  Pelajari Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- POPUP COMPONENT: JENIS KULIT (Fixed Overlay) --- */}
      {showPopup && selectedType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-brand-dark-500/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          ></div>

          <div className="relative bg-neutral-default w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <div className="md:w-2/5 relative flex flex-col justify-end text-neutral-default overflow-hidden">
              <img
                src={selectedType.img}
                alt={`Kulit ${selectedType.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #a8bdac, #4e635a)'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-500/90 via-brand-primary-400/40 to-transparent"></div>
              <div className="relative z-10 p-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                  Skin Report
                </p>
                <h3 className="text-4xl font-sans leading-tight">
                  Detail Tipe Kulit <br /> {selectedType.name}
                </h3>
              </div>
            </div>

            <div className="md:w-3/5 p-10 max-h-[85vh] overflow-y-auto">
              <button
                className="absolute top-6 right-8 text-2xl text-neutral-400 hover:text-neutral-900 transition-colors"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>

              <div className="space-y-8">
                <section>
                  <h4 className="text-brand-primary-300 font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-primary-300 rounded-full"></span>{" "}
                    Karakteristik
                  </h4>
                  <ul className="text-xs text-neutral-500 space-y-2 list-disc pl-4 leading-relaxed">
                    {selectedType.details.char.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>

                <section className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                  <h4 className="text-brand-primary-300 font-bold text-sm mb-4 flex items-center gap-2">
                    💡 Tips Perawatan Berkelanjutan
                  </h4>
                  <div className="space-y-4">
                    {selectedType.details.tips.map((tip, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-brand-primary-300 text-neutral-default rounded-full flex items-center justify-center text-[10px] shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-primary-100/20 p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">
                      Kandungan Utama
                    </h5>
                    <p className="text-xs font-bold text-brand-primary-300">
                      {selectedType.details.ingredients}
                    </p>
                  </div>
                  <div className="bg-feedback-error-100/10 p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">
                      Hindari Bahan
                    </h5>
                    <p className="text-xs font-bold text-feedback-error-200">
                      {selectedType.details.avoid}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ARTIKEL EDUKASI */}
      <section className="min-h-[100vh] flex flex-col justify-center px-10 py-10 bg-neutral-default/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-brand-dark-500">
              Artikel Edukasi
            </h2>
            <span
              onClick={() => navigate("/ensiklopedia/kumpulan")}
              className="text-xs font-bold text-brand-primary-300 uppercase tracking-widest cursor-pointer hover:underline"
            >
              Lihat Semua
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
            <div
              onClick={() => navigate("/ensiklopedia/detail/1")}
              className="lg:col-span-8 relative rounded-[40px] overflow-hidden group shadow-2xl h-full cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Skincare Art"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent p-10 flex flex-col justify-end">
                <span className="bg-brand-primary-300 text-neutral-default px-4 py-1 rounded-full text-[10px] font-bold w-fit mb-4">
                  PANDUAN
                </span>
                <h3 className="text-neutral-default text-4xl font-sans mb-4 leading-tight">
                  Seni Rutinitas Skincare Berkelanjutan
                </h3>
                <p className="text-neutral-default/80 text-base max-w-xl mb-6">
                  Pelajari urutan penggunaan produk alami secara tepat untuk
                  mendapatkan hasil maksimal.
                </p>
                <button
                  type="button"
                  className="text-neutral-default text-sm font-bold underline underline-offset-4 text-left"
                >
                  Baca Selengkapnya →
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 h-full">
              {[
                { cat: "Perlindungan", title: "Pentingnya Filter UV harian." },
                { cat: "Pembersih", title: "Double cleansing bahan alami." },
                { cat: "Nutrisi", title: "Antioksidan regenerasi sel." },
              ].map((item) => (
                <div
                  key={item.cat}
                  onClick={() => navigate("/ensiklopedia/detail/1")}
                  className="bg-brand-secondary-300/80 p-6 rounded-[30px] border border-brand-primary-300/10 hover:bg-brand-secondary-300 transition-all flex-1 flex flex-col justify-center cursor-pointer"
                >
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary-300 mb-2">
                    {item.cat}
                  </h5>
                  <p className="text-base font-bold text-brand-dark-500 leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: KANDUNGAN BAHAN ================= */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10">
        <div className="max-w-7xl mx-auto w-full bg-neutral-default p-12 rounded-[50px] shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-sans text-brand-dark-500 mb-4">
              Kandungan Bahan Skincare
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Cari tahu manfaat dari setiap kandungan alami yang paling tepat
              untukmu.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto bg-neutral-50 rounded-full p-2 flex items-center shadow-inner mb-12 border border-neutral-100"
          >
            <input
              type="text"
              placeholder="Cari kandungan bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-6 text-base bg-transparent outline-none font-medium text-neutral-700 placeholder-neutral-400"
            />
            <button
              type="submit"
              className="bg-brand-primary-300 text-neutral-default px-8 py-3 rounded-full text-sm font-bold hover:bg-brand-primary-500 transition-all"
            >
              Cari
            </button>
          </form>

          {isLoadingIngredients ? (
            <div className="text-center py-10 font-bold text-brand-primary-300 italic animate-pulse">
              Menghubungkan ke basis data laboratorium SkinCycle...
            </div>
          ) : ingredients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ingredients.slice(0, 3).map((item) => (
                <div
                  key={item.id_kandungan}
                  onClick={() => {
                    setSelectedIngredient(item);
                    setShowIngredientPopup(true);
                  }}
                  className="bg-neutral-50 p-6 rounded-[35px] hover:bg-brand-secondary-100 transition-colors group cursor-pointer border border-transparent hover:border-neutral-100 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors">
                      {item.nama_kandungan}
                    </h4>
                    <span className="text-2xl">
                      {item.kategori_bahan === "Hydrating"
                        ? "💧"
                        : item.kategori_bahan === "Brightening"
                          ? "✨"
                          : "🌱"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-6 leading-relaxed line-clamp-2">
                    {item.fungsi ||
                      "Klik untuk melihat analisis fungsional struktur kimia dan formulasi kecocokan kulit."}
                  </p>
                  <span className="bg-neutral-default text-brand-primary-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {item.kategori_bahan || "General"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-400 italic">
              Bahan aktif skincare tidak ditemukan dalam pustaka koleksi ini.
            </div>
          )}

          {/* Tombol Arah Halaman Kandungan Consumer Side */}
          <div className="text-center mt-12 pt-4 border-t border-neutral-100">
            <span
              onClick={() => navigate("/ensiklopedia/kandungan")}
              className="text-xs font-bold text-brand-primary-300 uppercase tracking-[0.2em] cursor-pointer border-b-2 border-brand-primary-300 pb-0.5 hover:text-brand-dark-500 hover:border-brand-dark-500 transition-all"
            >
              Jelajahi 150+ Kandungan Bahan
            </span>
          </div>
        </div>
      </section>

      {/* ================= --- POPUP BANNER: POPUP INTERAKTIF DETAIL KANDUNGAN --- ================= */}
      {showIngredientPopup && selectedIngredient && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-neutral-default w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
            {/* Kolom Kiri: Profil & Kategori */}
            <div className="md:col-span-4 bg-neutral-50 p-8 border-r flex flex-col justify-between overflow-y-auto border-neutral-100">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                  Profil Kandungan
                </span>
                <h2 className="text-2xl font-sans text-brand-dark-500 mb-6 uppercase tracking-tight">
                  {selectedIngredient.nama_kandungan}
                </h2>
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-neutral-default border p-2 flex items-center justify-center text-5xl shadow-sm border-neutral-100">
                  {selectedIngredient.kategori_bahan === "Hydrating"
                    ? "💧"
                    : selectedIngredient.kategori_bahan === "Brightening"
                      ? "✨"
                      : "🌱"}
                </div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Ringkasan
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-6 italic">
                  {selectedIngredient.fungsi ||
                    "Berperan sebagai molekul aktif penyeimbang kadar pH serta mempercepat pemulihan hidrasi sel kulit."}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">
                  Jenis Kulit
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(selectedIngredient.jenis_kulit_cocok
                    ? selectedIngredient.jenis_kulit_cocok.split(",")
                    : ["Semua Jenis Kulit"]
                  ).map((skin, idx) => (
                    <span
                      key={idx}
                      className="bg-neutral-default border border-neutral-100 text-neutral-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
                    >
                      <span className="w-1 h-1 bg-feedback-success-200 rounded-full"></span>
                      {skin.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Detail Analisis & Catatan */}
            <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
              <button
                onClick={() => setShowIngredientPopup(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 font-bold text-sm bg-neutral-50 w-8 h-8 rounded-full flex items-center justify-center"
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
                      {(selectedIngredient.manfaat
                        ? selectedIngredient.manfaat.split(",")
                        : [
                            "Mengoptimalkan tingkat kecerahan serta kelembapan wajah harian.",
                          ]
                      ).map((manfaat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-medium text-neutral-600"
                        >
                          <span className="text-feedback-success-200 font-bold">
                            ✓
                          </span>
                          <span>{manfaat.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex gap-4 items-start mt-4">
                  <div className="w-7 h-7 bg-brand-primary-300 text-neutral-default rounded-lg flex items-center justify-center text-xs shadow-md shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 mb-0.5">
                      Catatan Keamanan / Efek Samping
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                      {selectedIngredient.efek_samping ||
                        "Secara umum terbukti klinis aman digunakan untuk pemakaian skincare harian jangka panjang."}
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
  );
};

export default EnsiklopediaPage;