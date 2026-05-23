// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CreateForumPage = ({ user }) => {
//   const navigate = useNavigate();

//   // 1. STATE UNTUK FORM DATA
//   const [forumData, setForumData] = useState({
//     judul_posting: "",
//     isi_posting: "",
//     kategori: "Pilih Kategori...", // Default value untuk validasi
//     anonim: false,
//     media_url: null,
//   });

//   // DAFTAR 5 KATEGORI YANG DISESUAIKAN DENGAN HALAMAN FORUM
//   const categories = [
//     "Rekomendasi",
//     "Daur Ulang",
//     "Bahan Alami",
//     "Tips & Trik",
//     "Produk Baru",
//   ];

//   const [tags, setTags] = useState([
//     "#SkincareHack",
//     "#Recycle",
//     "#SustainableBeauty",
//   ]);
//   const [newTag, setNewTag] = useState("");

//   // 2. FUNGSI HANDLE SUBMIT
//   const handlePublish = async () => {
//     // Validasi input wajib
//     if (
//       forumData.kategori === "Pilih Kategori..." ||
//       !forumData.judul_posting.trim() ||
//       !forumData.isi_posting.trim()
//     ) {
//       alert("Mohon lengkapi Kategori, Judul, dan Deskripsi diskusi Anda.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) return alert("Sesi berakhir, silakan login kembali.");

//     const payload = {
//       ...forumData,
//       tags: tags.join(","),
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/forum", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("🚀 Diskusi Anda telah berhasil dipublikasikan!");
//         return navigate("/forum");
//       }

//       alert("Gagal mempublikasikan: " + result.message);
//     } catch (error) {
//       console.error("Error publishing forum:", error);
//       alert("Gagal terhubung ke server. Pastikan backend menyala.");
//     }
//   };

//   // 3. FUNGSI MANAJEMEN TAG
//   const addTag = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (newTag.trim() !== "" && tags.length < 5) {
//         // Otomatis tambah '#' jika belum ada
//         const formattedTag = newTag.startsWith("#")
//           ? newTag.trim()
//           : `#${newTag.trim()}`;
//         if (!tags.includes(formattedTag)) {
//           setTags([...tags, formattedTag]);
//         }
//         setNewTag("");
//       }
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((t) => t !== tagToRemove));
//   };

//   return (
//     <div className="bg-[#F2EDE4] font-sans min-h-screen pb-10">
//       <div className="max-w-7xl mx-auto px-10 pt-8">
//         <header className="mb-8">
//           <div className="flex items-center gap-4 mb-2">
//             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
//               <span className="text-xl">📝</span>
//             </div>
//             <h1 className="text-3xl font-serif text-[#1e2b19]">
//               Buat Diskusi Baru
//             </h1>
//           </div>
//           <p className="text-gray-500 text-xs ml-14">
//             Bagikan kontribusi ramah lingkunganmu di sini.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           <div className="lg:col-span-8 space-y-6">
//             <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white space-y-6">
//               {/* Dropdown Kategori Baru */}
//               <div>
//                 <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
//                   Pilih Kategori *
//                 </label>
//                 <select
//                   value={forumData.kategori}
//                   onChange={(e) =>
//                     setForumData({ ...forumData, kategori: e.target.value })
//                   }
//                   className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-xs text-[#3D5532] font-bold outline-none border border-transparent focus:border-[#3D5532]/20 appearance-none cursor-pointer"
//                 >
//                   <option disabled>Pilih Kategori...</option>
//                   {categories.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Judul */}
//               <div>
//                 <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
//                   Judul Diskusi *
//                 </label>
//                 <input
//                   type="text"
//                   value={forumData.judul_posting}
//                   onChange={(e) =>
//                     setForumData({
//                       ...forumData,
//                       judul_posting: e.target.value,
//                     })
//                   }
//                   className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-xs text-gray-600 outline-none border border-transparent focus:border-[#3D5532]/20"
//                   placeholder="Apa topik diskusi Anda?"
//                 />
//               </div>

//               {/* Deskripsi */}
//               <div>
//                 <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
//                   Deskripsi *
//                 </label>
//                 <textarea
//                   value={forumData.isi_posting}
//                   onChange={(e) =>
//                     setForumData({ ...forumData, isi_posting: e.target.value })
//                   }
//                   className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-xs text-gray-600 outline-none border border-transparent focus:border-[#3D5532]/20 resize-none h-48"
//                   placeholder="Tulis detail pemikiran atau pertanyaan Anda di sini..."
//                 />
//               </div>

//               {/* Tag Management */}
//               <div>
//                 <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
//                   Tag (Maks. 5)
//                 </label>
//                 <div className="flex flex-wrap gap-2 p-3 bg-[#F9F9F7] rounded-2xl">
//                   {tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 bg-white text-[#3D5532] rounded-lg text-[10px] font-bold border border-gray-100 flex items-center gap-2"
//                     >
//                       {tag}
//                       <button
//                         onClick={() => removeTag(tag)}
//                         className="text-gray-300 hover:text-red-400 transition-colors"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                   <input
//                     type="text"
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyDown={addTag}
//                     className="bg-transparent outline-none text-[10px] flex-grow min-w-[120px]"
//                     placeholder={
//                       tags.length < 5
//                         ? "Ketik tag lalu Enter..."
//                         : "Maksimal 5 tag"
//                     }
//                     disabled={tags.length >= 5}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Anonim Toggle */}
//             <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white">
//               <div className="flex items-center justify-between p-4 bg-[#F9F9F7] rounded-2xl">
//                 <div>
//                   <h5 className="text-[11px] font-bold">
//                     Posting secara Anonim
//                   </h5>
//                   <p className="text-[9px] text-gray-400">
//                     Nama asli Anda tidak akan dipublikasikan.
//                   </p>
//                 </div>
//                 <div
//                   onClick={() =>
//                     setForumData({ ...forumData, anonim: !forumData.anonim })
//                   }
//                   className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${forumData.anonim ? "bg-[#3D5532]" : "bg-gray-200"}`}
//                 >
//                   <div
//                     className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${forumData.anonim ? "right-1" : "left-1"}`}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => navigate("/forum")}
//                 className="px-8 py-3 rounded-full text-[11px] font-bold text-gray-400 hover:text-[#1e2b19] transition-colors"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handlePublish}
//                 className="px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#3D5532] text-white shadow-lg active:scale-95 transition-all"
//               >
//                 🚀 Publikasikan Diskusi
//               </button>
//             </div>
//           </div>

//           {/* Sisi Kanan - Info User */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="bg-white p-6 rounded-[40px] shadow-sm border border-white flex items-center gap-4">
//               <div className="w-12 h-12 bg-[#3D5532] rounded-2xl flex items-center justify-center text-white font-bold uppercase shadow-inner">
//                 {user?.username?.substring(0, 2) || "U"}
//               </div>
//               <div>
//                 <h4 className="text-xs font-black text-[#1e2b19] uppercase tracking-tight">
//                   {user?.username || "Guest User"}
//                 </h4>
//                 <div className="flex items-center gap-1">
//                   <span className="text-[10px] text-[#3D5532]">📍</span>
//                   <p className="text-[9px] text-gray-400 font-medium">
//                     Kabupaten Bekasi
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateForumPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PenTool,
  Hash,
  X,
  User,
  MapPin,
  EyeOff,
  Eye,
  Send,
  ArrowLeft,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const CreateForumPage = ({ user }) => {
  const navigate = useNavigate();

  // 1. STATE UNTUK FORM DATA
  const [forumData, setForumData] = useState({
    judul_posting: "",
    isi_posting: "",
    kategori: "Pilih Kategori...", // Default value untuk validasi
    anonim: false,
    media_url: null,
  });

  // DAFTAR 5 KATEGORI YANG DISESUAIKAN DENGAN HALAMAN FORUM
  const categories = [
    "Rekomendasi",
    "Daur Ulang",
    "Bahan Alami",
    "Tips & Trik",
    "Produk Baru",
  ];

  const [tags, setTags] = useState([
    "#SkincareHack",
    "#Recycle",
    "#SustainableBeauty",
  ]);
  const [newTag, setNewTag] = useState("");

  // 2. FUNGSI HANDLE SUBMIT
  const handlePublish = async () => {
    // Validasi input wajib
    if (
      forumData.kategori === "Pilih Kategori..." ||
      !forumData.judul_posting.trim() ||
      !forumData.isi_posting.trim()
    ) {
      alert("Mohon lengkapi Kategori, Judul, dan Deskripsi diskusi Anda.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("Sesi berakhir, silakan login kembali.");

    const payload = {
      ...forumData,
      tags: tags.join(","),
    };

    try {
      const response = await fetch("http://localhost:5000/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("🚀 Diskusi Anda telah berhasil dipublikasikan!");
        return navigate("/forum");
      }

      alert("Gagal mempublikasikan: " + result.message);
    } catch (error) {
      console.error("Error publishing forum:", error);
      alert("Gagal terhubung ke server. Pastikan backend menyala.");
    }
  };

  // 3. FUNGSI MANAJEMEN TAG
  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTag.trim() !== "" && tags.length < 5) {
        // Otomatis tambah '#' jika belum ada
        const formattedTag = newTag.startsWith("#")
          ? newTag.trim()
          : `#${newTag.trim()}`;
        if (!tags.includes(formattedTag)) {
          setTags([...tags, formattedTag]);
        }
        setNewTag("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen pb-10 text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 pt-8">
        {/* HEADER HALAMAN */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-neutral-default rounded-xl flex items-center justify-center shadow-sm border border-neutral-100 text-brand-primary-300">
              <PenTool className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-sans text-brand-dark-500 tracking-tight">
              Buat Diskusi Baru
            </h1>
          </div>
          <p className="text-neutral-500 text-xs ml-14 font-medium">
            Bagikan kontribusi ramah lingkunganmu di sini dan bangun ekosistem
            hijau bersama.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: INPUT FORM UTAMA */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-100 space-y-6">
              {/* Dropdown Pemilihan Kategori */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-3 italic">
                  Pilih Kategori *
                </label>
                <select
                  value={forumData.kategori}
                  onChange={(e) =>
                    setForumData({ ...forumData, kategori: e.target.value })
                  }
                  className="w-full bg-neutral-50 rounded-2xl p-4 text-xs text-brand-primary-300 font-bold outline-none border border-transparent focus:border-brand-primary-100 appearance-none cursor-pointer"
                >
                  <option disabled>Pilih Kategori...</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Field: Judul */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-3 italic">
                  Judul Diskusi *
                </label>
                <input
                  type="text"
                  value={forumData.judul_posting}
                  onChange={(e) =>
                    setForumData({
                      ...forumData,
                      judul_posting: e.target.value,
                    })
                  }
                  className="w-full bg-neutral-50 rounded-2xl p-4 text-xs text-brand-dark-500 font-medium outline-none border border-transparent focus:border-brand-primary-100 placeholder-neutral-300 transition-all"
                  placeholder="Apa topik diskusi Anda?"
                />
              </div>

              {/* Input Field: Deskripsi Isi */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-3 italic">
                  Deskripsi *
                </label>
                <textarea
                  value={forumData.isi_posting}
                  onChange={(e) =>
                    setForumData({ ...forumData, isi_posting: e.target.value })
                  }
                  className="w-full bg-neutral-50 rounded-2xl p-4 text-xs text-brand-dark-500 font-medium outline-none border border-transparent focus:border-brand-primary-100 placeholder-neutral-300 resize-none h-48 leading-relaxed transition-all"
                  placeholder="Tulis detail pemikiran atau pertanyaan Anda di sini..."
                />
              </div>

              {/* Tag Management Metadata Block */}
              <div>
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-3 italic">
                  Tag (Maks. 5)
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-default text-brand-primary-300 rounded-lg text-[10px] font-bold border border-neutral-100 flex items-center gap-1.5 shadow-sm"
                    >
                      <Hash className="w-3 h-3 opacity-60" />{" "}
                      {tag.replace("#", "")}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-neutral-400 hover:text-feedback-error-200 transition-colors focus:outline-none"
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
                    className="bg-transparent outline-none text-[10px] font-semibold flex-grow min-w-[120px] text-brand-dark-500 placeholder-neutral-300"
                    placeholder={
                      tags.length < 5
                        ? "Ketik tag lalu Enter..."
                        : "Maksimal 5 tag tercapai"
                    }
                    disabled={tags.length >= 5}
                  />
                </div>
              </div>
            </div>

            {/* Anonim Toggle Panel Container */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-neutral-400">
                    {forumData.anonim ? (
                      <EyeOff className="w-4 h-4 text-brand-primary-300" />
                    ) : (
                      <Eye className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-dark-500">
                      Posting secara Anonim
                    </h5>
                    <p className="text-[9px] text-neutral-400 font-medium">
                      Nama asli profil Anda tidak akan dipublikasikan ke dalam
                      feed komunitas.
                    </p>
                  </div>
                </div>
                {/* Custom Toggle Box */}
                <div
                  onClick={() =>
                    setForumData({ ...forumData, anonim: !forumData.anonim })
                  }
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${forumData.anonim ? "bg-brand-primary-300" : "bg-neutral-200"}`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 bg-neutral-default rounded-full transition-all duration-300 ${forumData.anonim ? "right-1" : "left-1"}`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer Buttons */}
            <div className="flex justify-end gap-4 items-center">
              <button
                type="button"
                onClick={() => navigate("/forum")}
                className="px-8 py-3 rounded-full text-[11px] font-bold text-neutral-400 hover:text-brand-dark-500 transition-colors flex items-center gap-1 outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Batal
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest bg-brand-primary-300 text-neutral-default shadow-lg hover:bg-brand-primary-500 transition-all flex items-center gap-2 outline-none active:scale-98"
              >
                <Send className="w-3.5 h-3.5" /> Publikasikan Diskusi
              </button>
            </div>
          </div>

          {/* SISI KANAN: PREVIEW INFO USER CARD */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-default p-6 rounded-[40px] shadow-sm border border-neutral-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary-300 rounded-2xl flex items-center justify-center text-neutral-default font-sans font-black uppercase shadow-md">
                {user?.username?.substring(0, 2) || "U"}
              </div>
              <div>
                <h4 className="text-xs font-black text-brand-dark-500 uppercase tracking-tight font-sans">
                  {user?.username || "Guest User"}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-brand-primary-300" />
                  <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                    Bekasi Regency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForumPage;
