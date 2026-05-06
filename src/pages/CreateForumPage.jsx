import React, { useState } from "react";

const CreateForumPage = ({ setPage }) => {
  const [tags, setTags] = useState([
    "#SkincareHack",
    "Recycle",
    "#SustainableBeauty",
  ]);

  return (
    <div className="bg-[#F2EDE4] font-sans min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-10 pt-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
              <span className="text-xl">📝</span>
            </div>
            <h1 className="text-3xl font-serif text-[#1e2b19]">
              Buat Diskusi Baru
            </h1>
          </div>
          <p className="text-gray-500 text-xs ml-14">
            Bagikan kontribusi ramah lingkunganmu, pertanyaan, atau ulasan
            produk berkelanjutan.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: Formulir Postingan */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white space-y-6">
              {/* Kategori */}
              <div>
                <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
                  Pilih Kategori *
                </label>
                <select className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-xs text-gray-600 outline-none border border-transparent focus:border-[#3D5532]/20 appearance-none cursor-pointer">
                  <option>Pilih Kategori...</option>
                  <option>Tips & Trik</option>
                  <option>Ulasan Produk</option>
                  <option>Keberlanjutan</option>
                </select>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Tips & Trik",
                    "Ulasan Produk",
                    "Keberlanjutan",
                    "Pertanyaan",
                  ].map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-1.5 bg-[#EDF1EC] text-[#3D5532] rounded-full text-[9px] font-bold cursor-pointer hover:bg-[#3D5532] hover:text-white transition-all"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Judul Diskusi */}
              <div>
                <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
                  Judul Diskusi *
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-xs text-gray-600 outline-none border border-transparent focus:border-[#3D5532]/20"
                  placeholder="Contoh: Perbedaan wajah kering dan kusam saat musim dingin"
                />
              </div>

              {/* Deskripsi / Editor */}
              <div>
                <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
                  Deskripsi *
                </label>
                <div className="bg-[#F9F9F7] rounded-2xl border border-transparent focus-within:border-[#3D5532]/20">
                  <div className="flex gap-4 p-3 border-b border-gray-100 text-gray-400">
                    {["B", "I", "U", "🔗", "📋", "🔢"].map((tool) => (
                      <button key={tool} className="hover:text-[#3D5532]">
                        {tool}
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full bg-transparent p-4 text-xs text-gray-600 outline-none resize-none h-48"
                    placeholder="Bagikan pengalaman, masalah kulit, atau pertanyaanmu di sini..."
                  ></textarea>
                </div>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
                  Tag (Maks. 5)
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-[#F9F9F7] rounded-2xl">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white text-[#3D5532] rounded-lg text-[10px] font-bold border border-gray-100 flex items-center gap-2"
                    >
                      {tag}{" "}
                      <button className="text-gray-300 hover:text-red-400">
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="bg-transparent outline-none text-[10px] flex-grow"
                    placeholder="Tambah tag..."
                  />
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-[10px] font-black text-[#3D5532] uppercase tracking-widest mb-3 italic">
                  Media (Opsional)
                </label>
                <div className="border-2 border-dashed border-gray-100 rounded-[30px] p-10 flex flex-col items-center justify-center text-gray-300 hover:border-[#3D5532] hover:text-[#3D5532] transition-all cursor-pointer">
                  <span className="text-4xl mb-2">🖼️</span>
                  <p className="text-[10px] font-bold">
                    Klik untuk mengunggah atau seret & lepas
                  </p>
                  <p className="text-[8px] mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Pengaturan Privasi */}
            <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white space-y-4">
              {[
                {
                  t: "Posting secara Anonim",
                  d: "Nama Anda tidak akan ditampilkan pada diskusi ini.",
                  icon: "👤",
                },
                {
                  t: "Notifikasi Email",
                  d: "Dapatkan pemberitahuan saat seseorang menanggapi diskusi ini.",
                  icon: "📧",
                },
                {
                  t: "Izinkan Komentar",
                  d: "Orang lain dapat memberikan tanggapan pada diskusi Anda.",
                  icon: "💬",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-[#F9F9F7] rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg opacity-60">{item.icon}</span>
                    <div>
                      <h5 className="text-[11px] font-bold text-[#1e2b19]">
                        {item.t}
                      </h5>
                      <p className="text-[9px] text-gray-400">{item.d}</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-[#3D5532] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setPage("Forum Diskusi")}
                className="px-8 py-3 rounded-full text-[11px] font-bold text-gray-400 hover:text-[#1e2b19]"
              >
                Batal
              </button>
              <button className="px-8 py-3 rounded-full text-[11px] font-bold border border-[#3D5532] text-[#3D5532] hover:bg-[#3D5532] hover:text-white transition-all">
                Simpan Draft
              </button>
              <button className="px-8 py-3 rounded-full text-[11px] font-bold bg-[#3D5532] text-white shadow-lg hover:bg-[#2d4025]">
                🚀 Publikasikan Diskusi
              </button>
            </div>
          </div>

          {/* SISI KANAN: Sidebar Panduan */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profil Ringkas */}
            <div className="bg-white p-6 rounded-[40px] shadow-sm border border-white flex items-center gap-4">
              <div className="w-12 h-12 bg-[#3D5532] rounded-2xl flex items-center justify-center text-white font-bold">
                RAY
              </div>
              <div>
                <h4 className="text-xs font-black text-[#1e2b19] uppercase tracking-wider">
                  Muhammad Rayhan
                </h4>
                <p className="text-[9px] text-gray-400">
                  Level 2 - Green Contributor
                </p>
              </div>
            </div>

            {/* Tips Menulis */}
            <div className="bg-[#EDF1EC] p-8 rounded-[40px] border border-[#3D5532]/10">
              <h4 className="text-[10px] font-black text-[#3D5532] uppercase tracking-[0.2em] mb-6 italic">
                💡 Tips Menulis
              </h4>
              <ul className="space-y-4">
                {[
                  "Gunakan judul yang spesifik agar mudah ditemukan.",
                  "Berikan detail pengalamanmu secara jujur.",
                  "Tambahkan tag yang relevan dengan topik.",
                  "Sertakan foto jika membahas ulasan produk.",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[10px] text-[#3D5532]/70 leading-relaxed font-medium"
                  >
                    <span>•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Panduan Komunitas */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-white">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 italic">
                ⚖️ Panduan Komunitas
              </h4>
              <ul className="space-y-3">
                {[
                  "Bersikaplah sopan dan saling menghargai.",
                  "Dilarang menyebarkan berita bohong (hoax).",
                  "Hindari konten promosi atau spam.",
                ].map((rule, i) => (
                  <li
                    key={i}
                    className="text-[9px] text-gray-500 flex items-center gap-2"
                  >
                    <span className="text-green-500">✔</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForumPage;
