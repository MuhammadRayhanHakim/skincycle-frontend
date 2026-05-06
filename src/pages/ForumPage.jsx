import React, { useState } from "react";

const ForumPage = ({ setPage }) => {
  // State untuk mengontrol visibilitas popup balasan
  const [showReplyModal, setShowReplyModal] = useState(false);

  return (
    <div
      className={`bg-[#F2EDE4] font-sans text-[#1e2b19] ${showReplyModal ? "overflow-hidden" : ""}`}
    >
      {/* --- POPUP MODAL (BALASAN) --- */}
      {showReplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay Gelap Transparan */}
          <div
            className="absolute inset-0 bg-[#1e2b19]/60 backdrop-blur-sm"
            onClick={() => setShowReplyModal(false)}
          ></div>

          {/* Konten Modal */}
          <div className="relative bg-[#F2EDE4] w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/50">
              <h3 className="font-serif text-xl font-bold text-[#1e2b19]">
                Forum Diskusi
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Area Isi Balasan */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  RAY
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-tight">
                    Rayhan Hakim{" "}
                    <span className="text-[8px] bg-[#3D5532] text-white px-2 py-0.5 rounded-full ml-1 font-black">
                      MEMBER
                    </span>
                  </h5>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                    2 Jam yang lalu • Rekomendasi
                  </p>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 leading-tight italic text-[#3D5532]">
                "Sunscreen ramah lingkungan terbaik untuk kulit sensitif?"
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-6 border-l-4 border-[#3D5532]/20 pl-4">
                Aku lagi cari SPF mineral tanpa whitecast yang aman buat terumbu
                karang...
              </p>

              {/* Editor Balasan Sederhana */}
              <div className="bg-white rounded-3xl p-6 shadow-inner border border-gray-100">
                <div className="flex gap-4 mb-4 text-gray-400 border-b border-gray-50 pb-3">
                  {["B", "I", "🔗", "🖼️"].map((icon) => (
                    <button
                      key={icon}
                      className="hover:text-[#3D5532] font-black text-xs"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full bg-transparent text-xs text-gray-600 outline-none resize-none h-32"
                  placeholder="Berikan wawasan ilmiah atau pengalamanmu di sini..."
                ></textarea>
              </div>
            </div>

            {/* Footer Modal dengan Tombol Aksi */}
            <div className="p-6 bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="anon" className="accent-[#3D5532]" />
                <label
                  htmlFor="anon"
                  className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                  Posting Anonim
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-6 py-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#1e2b19]"
                >
                  Batal
                </button>
                <button className="bg-[#3D5532] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#2d4025]">
                  Kirim Balasan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO & KATEGORI (Satu Layar Penuh) */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-10 py-6">
        <header className="w-full max-w-7xl bg-gradient-to-r from-[#D9E2D5] to-[#EBEBE6] rounded-[40px] p-10 text-center mb-10 shadow-sm border border-white/50">
          <div className="bg-[#3D5532] text-white text-[10px] font-bold px-4 py-1.5 rounded-full w-fit mx-auto mb-4 tracking-widest">
            COMMUNITY HUB
          </div>
          <h1 className="text-4xl font-serif mb-4">
            Selamat Datang di Forum Diskusi{" "}
            <span className="text-[#3D5532]">SkinCycle</span>
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mb-8">
            Berinteraksi dengan 15.000+ member komunitas. Tanya, bagikan
            pengalaman, dan cari solusi tentang skincare berkelanjutan bersama.
          </p>

          <div className="flex max-w-2xl mx-auto gap-3">
            <div className="flex-grow bg-white rounded-full px-6 py-3 flex items-center shadow-inner border border-gray-100">
              <input
                type="text"
                placeholder="Cari diskusi, topik, atau anggota..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            <button
              onClick={() => setPage("Buat Forum")}
              className="bg-[#3D5532] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#2d4025] transition shadow-lg"
            >
              + Buat Diskusi
            </button>
          </div>
        </header>

        <div className="w-full max-w-7xl">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-xl font-bold">Kategori Diskusi</h3>
            <span className="text-xs font-bold text-[#3D5532] cursor-pointer hover:underline">
              Lihat Semua →
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                label: "Rekomendasi",
                icon: "🌱",
                color: "bg-green-100",
                count: "1.2k",
              },
              {
                label: "Daur Ulang",
                icon: "♻️",
                color: "bg-blue-100",
                count: "850",
              },
              {
                label: "Bahan Alami",
                icon: "🧪",
                color: "bg-yellow-100",
                count: "2.1k",
              },
              {
                label: "Tips & Trik",
                icon: "💡",
                color: "bg-purple-100",
                count: "3.4k",
              },
              {
                label: "Produk Baru",
                icon: "📦",
                color: "bg-orange-100",
                count: "500",
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className="bg-white p-6 rounded-[30px] border border-gray-100 text-center hover:shadow-md transition cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl group-hover:scale-110 transition`}
                >
                  {cat.icon}
                </div>
                <h5 className="font-bold text-sm mb-1">{cat.label}</h5>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  {cat.count} Diskusi
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEED DISKUSI & SIDEBAR (Satu Layar Penuh) */}
      <section className="min-h-screen flex justify-center px-10 py-10">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100">
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 bg-[#3D5532] text-white p-4 rounded-2xl text-sm font-bold shadow-md">
                  🏠 Forum Diskusi
                </button>
                <button className="w-full flex items-center gap-3 hover:bg-gray-50 p-4 rounded-2xl text-sm font-medium text-gray-500">
                  🔥 Diskusi Populer
                </button>
                <button className="w-full flex items-center gap-3 hover:bg-gray-50 p-4 rounded-2xl text-sm font-medium text-gray-500">
                  🏷️ Topik Saya
                </button>
              </nav>
            </div>
            <div className="bg-[#3D5532] text-white rounded-[35px] p-8 shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-serif text-xl mb-4">
                  Pahlawan Hijau Bulan Ini
                </h4>
                <p className="text-[11px] opacity-80 mb-6 leading-relaxed">
                  Berikan kontribusi terbaikmu dan dapatkan badge eksklusif.
                </p>
                <button className="bg-white text-[#3D5532] px-6 py-2.5 rounded-full text-[11px] font-bold">
                  Lihat Peringkat
                </button>
              </div>
              <span className="absolute -bottom-4 -right-4 text-8xl opacity-10 group-hover:rotate-12 transition">
                🌿
              </span>
            </div>
          </aside>

          <div className="lg:col-span-6 space-y-4">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="bg-white p-8 rounded-[40px] border border-gray-100 hover:border-[#3D5532]/20 transition shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <h5 className="text-sm font-bold">
                      Rayhan Hakim{" "}
                      <span className="bg-green-100 text-green-700 text-[8px] px-2 py-0.5 rounded-full ml-2">
                        MEMBER
                      </span>
                    </h5>
                    <p className="text-[10px] text-gray-400 font-bold">
                      2 Jam yang lalu • Kategori: Rekomendasi
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 leading-tight">
                  Sunscreen ramah lingkungan terbaik untuk kulit sensitif?
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">
                  Aku lagi cari SPF mineral tanpa whitecast yang aman buat
                  terumbu karang...
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <div className="flex gap-6">
                    <span className="flex items-center gap-2 text-xs font-bold text-gray-400 cursor-pointer hover:text-green-600">
                      👍 48 Suka
                    </span>

                    {/* TRIGGER POPUP BALASAN */}
                    <span
                      onClick={() => setShowReplyModal(true)}
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 cursor-pointer hover:text-blue-600"
                    >
                      💬 12 Balasan
                    </span>
                  </div>
                  <button className="text-[11px] font-bold text-[#3D5532] uppercase tracking-widest">
                    Detail →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-3">
            <div className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100 sticky top-24">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                🎯 Topik Teratas
              </h4>
              <div className="space-y-6">
                {[
                  "Bahan Berbahaya Skincare",
                  "Tips Daur Ulang Kemasan",
                  "Zero Waste Routine",
                ].map((topic, i) => (
                  <div key={topic} className="flex gap-4 group cursor-pointer">
                    <span className="text-lg font-serif text-[#3D5532] opacity-30 group-hover:opacity-100 transition">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-snug group-hover:text-[#3D5532] transition">
                        {topic}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">
                        124 Diskusi Hari ini
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ForumPage;
