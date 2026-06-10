// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   PenTool,
//   Hash,
//   X,
//   MapPin,
//   EyeOff,
//   Eye,
//   Send,
//   ArrowLeft,
//   Bold,
//   Italic,
//   Underline,
//   Link2,
//   Code,
//   List,
//   HelpCircle,
//   CheckCircle2,
//   AlertCircle,
//   ChevronRight,
//   MessageSquare,
//   Bell,
//   Loader2,
// } from "lucide-react";

// const CreateForumPage = ({ user }) => {
//   const navigate = useNavigate();

//   // Jalankan ekstraksi nama aman
//   const currentUsername = user?.username || user?.penulis?.username || "User";

//   // --- STATE FORUM ---
//   const [forumData, setForumData] = useState({
//     judul_posting: "",
//     isi_posting: "",
//     kategori: "Ulasan Produk",
//     anonim: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const categories = [
//     { label: "Rekomendasi", icon: "🌱" },
//     { label: "Daur Ulang", icon: "♻️" },
//     { label: "Kandungan", icon: "🧪" },
//     { label: "Tips & Trik", icon: "💡" },
//     { label: "Produk", icon: "📦" },
//   ];

//   const [tags, setTags] = useState([
//     "perawatan_kulit",
//     "organik",
//     "ramah_lingkungan",
//   ]);
//   const [newTag, setNewTag] = useState("");

//   // --- FUNGSI PUBLISH ---
//   const handlePublish = async () => {
//     if (!forumData.judul_posting.trim() || !forumData.isi_posting.trim()) {
//       alert("Mohon lengkapi Judul dan Deskripsi diskusi Anda.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) return alert("Sesi berakhir, silakan login kembali.");

//     setIsSubmitting(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/forum", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           judul_posting: forumData.judul_posting.trim(),
//           isi_posting: forumData.isi_posting.trim(),
//           kategori: forumData.kategori,
//           anonim: forumData.anonim,
//           tags: tags.map((t) => `#${t.trim()}`).join(","),
//         }),
//       });

//       const result = await response.json();

//       if (response.ok || result.status === "success") {
//         alert("🚀 Diskusi Anda telah berhasil dipublikasikan!");
//         return navigate("/forum");
//       }

//       alert(
//         "Gagal mempublikasikan: " +
//           (result.message || "Terjadi kesalahan internal"),
//       );
//     } catch (error) {
//       console.error("Error publishing forum:", error);
//       alert("Gagal terhubung ke server. Pastikan backend menyala.");
//     } finally {
//       // 🚀 FIX: Mengembalikan kata kunci finally yang benar agar tidak crash
//       setIsSubmitting(false);
//     }
//   };

//   const addTag = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (newTag.trim() !== "" && tags.length < 5) {
//         const cleanTag = newTag.replace(/#/g, "").trim().toLowerCase();
//         if (cleanTag && !tags.includes(cleanTag)) {
//           setTags([...tags, cleanTag]);
//         }
//         setNewTag("");
//       }
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((t) => t !== tagToRemove));
//   };

//   return (
//     <div className="bg-brand-secondary-100 font-sans min-h-screen pb-16 text-brand-dark-500">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
//         {/* HEADER HALAMAN */}
//         <header className="mb-8 pl-2">
//           <div className="flex items-center gap-3 mb-1">
//             <div className="w-9 h-9 bg-neutral-default rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 text-brand-primary-300">
//               <PenTool className="w-4 h-4" />
//             </div>
//             <h1 className="text-2xl font-marcellus text-brand-dark-500 tracking-tight">
//               Buat Diskusi Baru
//             </h1>
//           </div>
//           <p className="text-neutral-400 text-xs pl-12 font-medium max-w-3xl leading-relaxed">
//             Bagikan rutinitas ramah lingkunganmu, minta saran, atau ulas produk
//             berkelanjutan — suaramu membantu membangun komunitas ini.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* SISI KIRI: INPUT FORM UTAMA */}
//           <div className="lg:col-span-8 space-y-5">
//             <div className="bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-100 space-y-6">
//               {/* 1. SELEKSI KATEGORI & PIL BUTTONS */}
//               <div>
//                 <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2.5">
//                   Kategori <span className="text-feedback-error-200">*</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat.label}
//                       type="button"
//                       onClick={() =>
//                         setForumData({ ...forumData, kategori: cat.label })
//                       }
//                       className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1.5 uppercase tracking-wider outline-none ${
//                         forumData.kategori === cat.label
//                           ? "bg-brand-primary-300 text-neutral-default border-transparent shadow-sm"
//                           : "bg-neutral-50 text-neutral-400 border-neutral-100/70 hover:border-brand-primary-100"
//                       }`}
//                     >
//                       <span>{cat.icon}</span> {cat.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* 2. FIELD JUDUL DISKUSI */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest">
//                     Judul Diskusi{" "}
//                     <span className="text-feedback-error-200">*</span>
//                   </label>
//                   <span className="text-[9px] text-neutral-300 font-bold">
//                     {forumData.judul_posting.length} / 150
//                   </span>
//                 </div>
//                 <input
//                   type="text"
//                   maxLength={150}
//                   value={forumData.judul_posting}
//                   onChange={(e) =>
//                     setForumData({
//                       ...forumData,
//                       judul_posting: e.target.value,
//                     })
//                   }
//                   className="w-full bg-neutral-50 rounded-2xl p-4 text-xs text-brand-dark-500 font-medium outline-none border border-neutral-100 focus:border-brand-primary-100 placeholder-neutral-300 transition-all shadow-inner"
//                   placeholder="Contoh: Pelembab vegan terbaik untuk kulit kering saat musim dingin?"
//                 />
//                 <p className="text-[9px] text-neutral-400 font-medium mt-1.5 pl-1">
//                   💡 Judul yang jelas bisa mendapatkan hingga 3x lebih banyak
//                   interaksi dari komunitas.
//                 </p>
//               </div>

//               {/* 3. FIELD TEXTAREA DESKRIPSI */}
//               <div>
//                 <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2">
//                   Deskripsi <span className="text-feedback-error-200">*</span>
//                 </label>

//                 <div className="border border-neutral-100 rounded-3xl overflow-hidden bg-neutral-50 shadow-inner">
//                   <div className="flex items-center gap-1 p-2 bg-neutral-default border-b border-neutral-100 text-neutral-400 select-none">
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <Bold className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <Italic className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <Underline className="w-3.5 h-3.5" />
//                     </button>
//                     <div className="w-[1px] h-4 bg-neutral-100 mx-1"></div>
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <Link2 className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <Code className="w-3.5 h-3.5" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
//                     >
//                       <List className="w-3.5 h-3.5" />
//                     </button>
//                   </div>

//                   <textarea
//                     value={forumData.isi_posting}
//                     onChange={(e) =>
//                       setForumData({
//                         ...forumData,
//                         isi_posting: e.target.value,
//                       })
//                     }
//                     className="w-full bg-transparent p-4 text-xs text-brand-dark-500 font-medium outline-none h-48 resize-none leading-relaxed"
//                     placeholder="Bagikan pemikiran, masalah kulit, atau pertanyaanmu di sini. Jelaskan sejelas mungkin — semakin lengkap, semakin mudah komunitas membantu!"
//                   />
//                 </div>
//               </div>

//               {/* 4. MANAGEMENT TAGS */}
//               <div>
//                 <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2">
//                   Tag{" "}
//                   <span className="text-neutral-400 font-medium lowercase">
//                     (maks. 5)
//                   </span>
//                 </label>
//                 <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-inner">
//                   {tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 bg-neutral-default text-brand-primary-300 rounded-lg text-[10px] font-bold border border-neutral-100 flex items-center gap-1.5 shadow-sm"
//                     >
//                       <Hash className="w-2.5 h-2.5 opacity-50" /> {tag}
//                       <button
//                         type="button"
//                         onClick={() => removeTag(tag)}
//                         className="text-neutral-300 hover:text-feedback-error-200 transition-colors focus:outline-none"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyDown={addTag}
//                     className="bg-transparent outline-none text-[10px] font-semibold flex-grow min-w-[150px] text-brand-dark-500 placeholder-neutral-300 px-1"
//                     placeholder={
//                       tags.length < 5
//                         ? "Tambahkan tag..."
//                         : "Maksimal tag tercapai"
//                     }
//                     disabled={tags.length >= 5}
//                   />
//                 </div>
//                 <p className="text-[9px] text-neutral-400 font-medium mt-1.5 pl-1">
//                   ℹ️ Tekan Enter untuk menambahkan tag ({tags.length} dari 5
//                   digunakan)
//                 </p>
//               </div>
//             </div>

//             {/* PENGATURAN POSTINGAN PANEL ACTIONS */}
//             <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100 space-y-3.5">
//               <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.15em] pl-1 mb-1">
//                 Pengaturan Postingan
//               </p>

//               <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
//                 <div className="flex items-center gap-3">
//                   <EyeOff className="w-4 h-4 text-neutral-400" />
//                   <div>
//                     <h5 className="text-[11px] font-bold text-brand-dark-500">
//                       Posting Secara Anonim
//                     </h5>
//                     <p className="text-[9px] text-neutral-400 font-medium">
//                       Nama pengguna Anda akan disembunyikan dari diskusi ini.
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   onClick={() =>
//                     setForumData({ ...forumData, anonim: !forumData.anonim })
//                   }
//                   className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${forumData.anonim ? "bg-brand-primary-300" : "bg-neutral-200"}`}
//                 >
//                   <div
//                     className={`absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full transition-all duration-200 ${forumData.anonim ? "right-0.5" : "left-0.5"}`}
//                   ></div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
//                 <div className="flex items-center gap-3">
//                   <Bell className="w-4 h-4 text-neutral-400" />
//                   <div>
//                     <h5 className="text-[11px] font-bold text-brand-dark-500">
//                       Notifikasi Email
//                     </h5>
//                     <p className="text-[9px] text-neutral-400 font-medium">
//                       Dapatkan notifikasi saat seseorang membalas postingan
//                       Anda.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-9 h-5 rounded-full relative bg-brand-primary-300">
//                   <div className="absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full right-0.5"></div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
//                 <div className="flex items-center gap-3">
//                   <MessageSquare className="w-4 h-4 text-neutral-400" />
//                   <div>
//                     <h5 className="text-[11px] font-bold text-brand-dark-500">
//                       Izinkan Komentar
//                     </h5>
//                     <p className="text-[9px] text-neutral-400 font-medium">
//                       Izinkan anggota lain membalas dan berinteraksi dengan
//                       postingan Anda.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-9 h-5 rounded-full relative bg-brand-primary-300">
//                   <div className="absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full right-0.5"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Bar Buttons */}
//             <div className="flex justify-end gap-3 items-center pr-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/forum")}
//                 disabled={isSubmitting}
//                 className="px-6 py-2.5 rounded-full text-[11px] font-bold text-neutral-400 hover:text-brand-dark-500 transition-colors flex items-center gap-1 outline-none"
//               >
//                 Batal
//               </button>
//               <button
//                 type="button"
//                 onClick={handlePublish}
//                 disabled={isSubmitting}
//                 className="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest bg-brand-primary-300 text-neutral-default shadow-lg hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none active:scale-98 disabled:opacity-50"
//               >
//                 {isSubmitting ? (
//                   <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                 ) : (
//                   <Send className="w-3.5 h-3.5" />
//                 )}
//                 {isSubmitting ? "Mengunggah..." : "Publikasikan"}
//               </button>
//             </div>
//           </div>

//           {/* SISI KANAN: PREVIEW SIDEBAR LOGS INFO METRICS */}
//           <div className="lg:col-span-4 space-y-5">
//             <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
//               <p className="text-[9px] font-black text-neutral-300 uppercase tracking-wider mb-4">
//                 Posting Sebagai
//               </p>
//               <div className="flex items-center gap-3.5 mb-5">
//                 <div className="w-11 h-11 bg-brand-secondary-300 rounded-full flex items-center justify-center text-brand-primary-500 font-marcellus font-black uppercase text-base shadow-sm border border-brand-secondary-200">
//                   {currentUsername.substring(0, 1).toUpperCase()}
//                 </div>
//                 <div>
//                   <h4 className="text-xs font-black text-brand-dark-500 uppercase tracking-tight font-marcellus leading-none">
//                     {currentUsername}
//                   </h4>
//                   <p className="text-[9px] text-neutral-400 mt-1 font-bold">
//                     🍀 Level 4: Pecinta Skincare
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-1.5 border-t border-neutral-50 pt-4">
//                 <div className="flex justify-between text-[9px] font-bold text-neutral-400 uppercase tracking-wide">
//                   <span>Progres ke level 5</span>
//                   <span className="text-brand-primary-300 font-black">78%</span>
//                 </div>
//                 <div className="w-full bg-neutral-50 border border-neutral-100/50 rounded-full h-2 overflow-hidden shadow-inner">
//                   <div className="bg-brand-primary-300 h-full w-[78%] rounded-full"></div>
//                 </div>
//                 <p className="text-[8px] text-neutral-400 font-medium text-right pt-0.5 uppercase tracking-tighter">
//                   3.200 / 4.000 XP •{" "}
//                   <span className="text-brand-primary-300 font-bold">
//                     +50 XP
//                   </span>{" "}
//                   per posting
//                 </p>
//               </div>
//             </div>

//             <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
//               <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-4 flex items-center gap-1">
//                 <HelpCircle className="w-4 h-4 opacity-70" /> Tips Postingan
//                 yang Baik
//               </h4>
//               <ul className="text-[11px] text-neutral-500 space-y-3 font-medium leading-relaxed">
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
//                   <span>
//                     <strong className="text-brand-dark-500">
//                       Judul yang jelas:
//                     </strong>{" "}
//                     Buat judul yang ringkas dan spesifik agar orang langsung
//                     tahu topiknya.
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
//                   <span>
//                     <strong className="text-brand-dark-500">
//                       Gunakan tag:
//                     </strong>{" "}
//                     Gunakan tag yang relevan seperti{" "}
//                     <span className="text-brand-primary-300 font-bold">
//                       #skincarehack
//                     </span>{" "}
//                     agar post mudah ditemukan.
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
//                   <span>
//                     <strong className="text-brand-dark-500">
//                       Format yang rapi:
//                     </strong>{" "}
//                     Berikan poin-poin and spasi antar paragraf agar mudah
//                     dibaca.
//                   </span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-[#3D5532]/10 p-6 rounded-[32px] border border-[#3D5532]/20 text-brand-dark-500">
//               <h4 className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3.5 flex items-center gap-1">
//                 <AlertCircle className="w-4 h-4 opacity-70" /> Panduan Komunitas
//               </h4>
//               <ul className="text-[11px] text-neutral-500 space-y-2 font-medium list-disc pl-4 leading-relaxed">
//                 <li>Berbaik sopan dan menghargai anggota lain</li>
//                 <li>Dilarang promosi atau spam</li>
//                 <li>Jaga komunikasi tetap positif</li>
//                 <li>Cantumkan sumber untuk klaim medis</li>
//                 <li>Gunakan peringatan untuk topik sensitif</li>
//               </ul>
//               <button
//                 type="button"
//                 className="text-[10px] font-black text-brand-primary-300 hover:text-brand-primary-500 uppercase tracking-widest flex items-center gap-0.5 mt-4 transition-colors"
//               >
//                 Baca panduan lengkap <ChevronRight className="w-3.5 h-3.5" />
//               </button>
//             </div>

//             <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
//               <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
//                 Tag Populer
//               </h4>
//               <div className="flex flex-wrap gap-1.5">
//                 {[
//                   "Sunscreen",
//                   "SkincareIn",
//                   "AcneProne",
//                   "CrueltyFree",
//                   "VeganBeauty",
//                   "ZeroWaste",
//                   "GlassSkin",
//                 ].map((pop) => (
//                   <span
//                     key={pop}
//                     className="px-2.5 py-1 bg-neutral-50 border border-neutral-100 rounded-md text-[10px] text-neutral-400 font-bold transition-colors hover:border-brand-primary-100 hover:text-brand-primary-300 cursor-pointer"
//                   >
//                     #{pop}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateForumPage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  PenTool,
  Hash,
  X,
  MapPin,
  EyeOff,
  Eye,
  Send,
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  Link2,
  Code,
  List,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  MessageSquare,
  Bell,
  Loader2,
} from "lucide-react";

// 🌟 REVISI: Menangkap prop 'triggerToast' dari App.jsx
const CreateForumPage = ({ user, triggerToast }) => {
  const navigate = useNavigate();

  // Jalankan ekstraksi nama aman
  const currentUsername = user?.username || user?.penulis?.username || "User";

  // --- STATE FORUM ---
  const [forumData, setForumData] = useState({
    judul_posting: "",
    isi_posting: "",
    kategori: "Ulasan Produk",
    anonim: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { label: "Rekomendasi", icon: "🌱" },
    { label: "Daur Ulang", icon: "♻️" },
    { label: "Kandungan", icon: "🧪" },
    { label: "Tips & Trik", icon: "💡" },
    { label: "Produk", icon: "📦" },
  ];

  const [tags, setTags] = useState([
    "perawatan_kulit",
    "organik",
    "ramah_lingkungan",
  ]);
  const [newTag, setNewTag] = useState("");

  // --- FUNGSI PUBLISH DENGAN INTEGRASI TOAST ---
  const handlePublish = async () => {
    if (!forumData.judul_posting.trim() || !forumData.isi_posting.trim()) {
      // 🌟 REVISI: Mengganti alert kaku menjadi kustom Toast peringatan
      if (triggerToast)
        triggerToast("Mohon lengkapi Judul dan Deskripsi diskusi Anda.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      if (triggerToast) triggerToast("Sesi berakhir, silakan login kembali.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul_posting: forumData.judul_posting.trim(),
          isi_posting: forumData.isi_posting.trim(),
          kategori: forumData.kategori,
          anonim: forumData.anonim,
          tags: tags.map((t) => `#${t.trim()}`).join(","),
        }),
      });

      const result = await response.json();

      if (response.ok || result.status === "success") {
        // 🌟 REVISI: Mengganti alert kaku menjadi kustom Toast sukses
        if (triggerToast) {
          triggerToast("🚀 Diskusi Anda telah berhasil dipublikasikan!");
        }
        return navigate("/forum");
      }

      if (triggerToast) {
        triggerToast(
          "Gagal mempublikasikan: " +
            (result.message || "Terjadi kesalahan internal"),
        );
      }
    } catch (error) {
      console.error("Error publishing forum:", error);
      if (triggerToast) {
        triggerToast("Gagal terhubung ke server. Pastikan backend menyala.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag.trim() !== "" && tags.length < 5) {
        const cleanTag = newTag.replace(/#/g, "").trim().toLowerCase();
        if (cleanTag && !tags.includes(cleanTag)) {
          setTags([...tags, cleanTag]);
        }
        setNewTag("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen pb-16 text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
        {/* HEADER HALAMAN */}
        <header className="mb-8 pl-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-neutral-default rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 text-brand-primary-300">
              <PenTool className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-marcellus text-brand-dark-500 tracking-tight">
              Buat Diskusi Baru
            </h1>
          </div>
          <p className="text-neutral-400 text-xs pl-12 font-medium max-w-3xl leading-relaxed">
            Bagikan rutinitas ramah lingkunganmu, minta saran, atau ulas produk
            berkelanjutan — suaramu membantu membangun komunitas ini.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: INPUT FORM UTAMA */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-100 space-y-6">
              {/* 1. SELEKSI KATEGORI & PIL BUTTONS */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2.5">
                  Kategori <span className="text-feedback-error-200">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() =>
                        setForumData({ ...forumData, kategori: cat.label })
                      }
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all flex items-center gap-1.5 uppercase tracking-wider outline-none ${
                        forumData.kategori === cat.label
                          ? "bg-brand-primary-300 text-neutral-default border-transparent shadow-sm"
                          : "bg-neutral-50 text-neutral-400 border-neutral-100/70 hover:border-brand-primary-100"
                      }`}
                    >
                      <span>{cat.icon}</span> {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. FIELD JUDUL DISKUSI */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest">
                    Judul Diskusi{" "}
                    <span className="text-feedback-error-200">*</span>
                  </label>
                  <span className="text-[9px] text-neutral-300 font-bold">
                    {forumData.judul_posting.length} / 150
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={150}
                  value={forumData.judul_posting}
                  onChange={(e) =>
                    setForumData({
                      ...forumData,
                      judul_posting: e.target.value,
                    })
                  }
                  className="w-full bg-neutral-50 rounded-2xl p-4 text-xs text-brand-dark-500 font-medium outline-none border border-neutral-100 focus:border-brand-primary-100 placeholder-neutral-300 transition-all shadow-inner"
                  placeholder="Contoh: Pelembab vegan terbaik untuk kulit kering saat musim dingin?"
                />
                <p className="text-[9px] text-neutral-400 font-medium mt-1.5 pl-1">
                  💡 Judul yang jelas bisa mendapatkan hingga 3x lebih banyak
                  interaksi dari komunitas.
                </p>
              </div>

              {/* 3. FIELD TEXTAREA DESKRIPSI */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2">
                  Deskripsi <span className="text-feedback-error-200">*</span>
                </label>

                <div className="border border-neutral-100 rounded-3xl overflow-hidden bg-neutral-50 shadow-inner">
                  <div className="flex items-center gap-1 p-2 bg-neutral-default border-b border-neutral-100 text-neutral-400 select-none">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-neutral-100 mx-1"></div>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-neutral-50 hover:text-brand-dark-500 rounded transition-colors"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    value={forumData.isi_posting}
                    onChange={(e) =>
                      setForumData({
                        ...forumData,
                        isi_posting: e.target.value,
                      })
                    }
                    className="w-full bg-transparent p-4 text-xs text-brand-dark-500 font-medium outline-none h-48 resize-none leading-relaxed"
                    placeholder="Bagikan pemikiran, masalah kulit, atau pertanyaanmu di sini. Jelaskan sejelas mungkin — semakin lengkap, semakin mudah komunitas membantu!"
                  />
                </div>
              </div>

              {/* 4. MANAGEMENT TAGS */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2">
                  Tag{" "}
                  <span className="text-neutral-400 font-medium lowercase">
                    (maks. 5)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-inner">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-default text-brand-primary-300 rounded-lg text-[10px] font-bold border border-neutral-100 flex items-center gap-1.5 shadow-sm"
                    >
                      <Hash className="w-2.5 h-2.5 opacity-50" /> {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-neutral-300 hover:text-feedback-error-200 transition-colors focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={addTag}
                    className="bg-transparent outline-none text-[10px] font-semibold flex-grow min-w-[150px] text-brand-dark-500 placeholder-neutral-300 px-1"
                    placeholder={
                      tags.length < 5
                        ? "Tambahkan tag..."
                        : "Maksimal tag tercapai"
                    }
                    disabled={tags.length >= 5}
                  />
                </div>
                <p className="text-[9px] text-neutral-400 font-medium mt-1.5 pl-1">
                  ℹ️ Tekan Enter untuk menambahkan tag ({tags.length} dari 5
                  digunakan)
                </p>
              </div>
            </div>

            {/* PENGATURAN POSTINGAN PANEL ACTIONS */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100 space-y-3.5">
              <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.15em] pl-1 mb-1">
                Pengaturan Postingan
              </p>

              <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
                <div className="flex items-center gap-3">
                  <EyeOff className="w-4 h-4 text-neutral-400" />
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-dark-500">
                      Posting Secara Anonim
                    </h5>
                    <p className="text-[9px] text-neutral-400 font-medium">
                      Nama pengguna Anda akan disembunyikan dari diskusi ini.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() =>
                    setForumData({ ...forumData, anonim: !forumData.anonim })
                  }
                  className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${forumData.anonim ? "bg-brand-primary-300" : "bg-neutral-200"}`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full transition-all duration-200 ${forumData.anonim ? "right-0.5" : "left-0.5"}`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-neutral-400" />
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-dark-500">
                      Notifikasi Email
                    </h5>
                    <p className="text-[9px] text-neutral-400 font-medium">
                      Dapatkan notifikasi saat seseorang membalas postingan
                      Anda.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-5 rounded-full relative bg-brand-primary-300">
                  <div className="absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full right-0.5"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100/60 shadow-inner">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-neutral-400" />
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-dark-500">
                      Izinkan Komentar
                    </h5>
                    <p className="text-[9px] text-neutral-400 font-medium">
                      Izinkan anggota lain membalas dan berinteraksi dengan
                      postingan Anda.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-5 rounded-full relative bg-brand-primary-300">
                  <div className="absolute top-0.5 w-4 h-4 bg-neutral-default rounded-full right-0.5"></div>
                </div>
              </div>
            </div>

            {/* Action Bar Buttons */}
            <div className="flex justify-end gap-3 items-center pr-2">
              <button
                type="button"
                onClick={() => navigate("/forum")}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full text-[11px] font-bold text-neutral-400 hover:text-brand-dark-500 transition-colors flex items-center gap-1 outline-none"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest bg-brand-primary-300 text-neutral-default shadow-lg hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {isSubmitting ? "Mengunggah..." : "Publikasikan"}
              </button>
            </div>
          </div>

          {/* SISI KANAN: PREVIEW SIDEBAR LOGS INFO METRICS */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
              <p className="text-[9px] font-black text-neutral-300 uppercase tracking-wider mb-4">
                Posting Sebagai
              </p>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 bg-brand-secondary-300 rounded-full flex items-center justify-center text-brand-primary-500 font-marcellus font-black uppercase text-base shadow-sm border border-brand-secondary-200">
                  {currentUsername.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-black text-brand-dark-500 uppercase tracking-tight font-marcellus leading-none">
                    {currentUsername}
                  </h4>
                  <p className="text-[9px] text-neutral-400 mt-1 font-bold">
                    🍀 Level 4: Pecinta Skincare
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-neutral-50 pt-4">
                <div className="flex justify-between text-[9px] font-bold text-neutral-400 uppercase tracking-wide">
                  <span>Progres ke level 5</span>
                  <span className="text-brand-primary-300 font-black">78%</span>
                </div>
                <div className="w-full bg-neutral-50 border border-neutral-100/50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-brand-primary-300 h-full w-[78%] rounded-full"></div>
                </div>
                <p className="text-[8px] text-neutral-400 font-medium text-right pt-0.5 uppercase tracking-tighter">
                  3.200 / 4.000 XP •{" "}
                  <span className="text-brand-primary-300 font-bold">
                    +50 XP
                  </span>{" "}
                  per posting
                </p>
              </div>
            </div>

            <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
              <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-4 flex items-center gap-1">
                <HelpCircle className="w-4 h-4 opacity-70" /> Tips Postingan
                yang Baik
              </h4>
              <ul className="text-[11px] text-neutral-500 space-y-3 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-brand-dark-500">
                      Judul yang jelas:
                    </strong>{" "}
                    Buat judul yang ringkas dan spesifik agar orang langsung
                    tahu topiknya.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-brand-dark-500">
                      Gunakan tag:
                    </strong>{" "}
                    Gunakan tag yang relevan seperti{" "}
                    <span className="text-brand-primary-300 font-bold">
                      #skincarehack
                    </span>{" "}
                    agar post mudah ditemukan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success-300 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-brand-dark-500">
                      Format yang rapi:
                    </strong>{" "}
                    Berikan poin-poin and spasi antar paragraf agar mudah
                    dibaca.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#3D5532]/10 p-6 rounded-[32px] border border-[#3D5532]/20 text-brand-dark-500">
              <h4 className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3.5 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 opacity-70" /> Panduan Komunitas
              </h4>
              <ul className="text-[11px] text-neutral-500 space-y-2 font-medium list-disc pl-4 leading-relaxed">
                <li>Berbaik sopan dan menghargai anggota lain</li>
                <li>Dilarang promosi atau spam</li>
                <li>Jaga komunikasi tetap positif</li>
                <li>Cantumkan sumber untuk klaim medis</li>
                <li>Gunakan peringatan untuk topik sensitif</li>
              </ul>
              <button
                type="button"
                className="text-[10px] font-black text-brand-primary-300 hover:text-brand-primary-500 uppercase tracking-widest flex items-center gap-0.5 mt-4 transition-colors"
              >
                Baca panduan lengkap <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-neutral-default p-6 rounded-[32px] shadow-sm border border-neutral-100">
              <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
                Tag Populer
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Sunscreen",
                  "SkincareIn",
                  "AcneProne",
                  "CrueltyFree",
                  "VeganBeauty",
                  "ZeroWaste",
                  "GlassSkin",
                ].map((pop) => (
                  <span
                    key={pop}
                    className="px-2.5 py-1 bg-neutral-50 border border-neutral-100 rounded-md text-[10px] text-neutral-400 font-bold transition-colors hover:border-brand-primary-100 hover:text-brand-primary-300 cursor-pointer"
                  >
                    #{pop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForumPage;
