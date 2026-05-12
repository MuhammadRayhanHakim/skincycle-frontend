import React from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini

const ProfilePage = ({ user }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] py-10 px-6 lg:px-20 font-sans text-[#1e2b19]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ROW 1: STATS CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saldo Utama Card */}
          <div className="bg-[#3D5532] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                Saldo Saat Ini
              </p>
              <h2 className="text-4xl font-serif font-bold mt-4">
                {formatRupiah(user?.total_saldo || 0)}
              </h2>
              <p className="text-xs mt-2 opacity-70">
                Total saldo dari hasil daur ulang
              </p>

              <div className="mt-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                <p className="text-[10px] font-bold uppercase italic">
                  Status Verifikasi: Aman
                </p>
                <button
                  onClick={() => navigate("/keranjang")} // Migrasi navigasi
                  className="text-[9px] bg-white text-[#3D5532] px-3 py-1 rounded-full font-black uppercase"
                >
                  Belanja
                </button>
              </div>
            </div>
            <div className="absolute bottom-[-10%] right-[-5%] text-[150px] opacity-10 italic font-serif pointer-events-none">
              Rp
            </div>
          </div>

          {/* Level Progress Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Level Pengguna
                  </p>
                  <h3 className="text-xl font-bold mt-1">Pahlawan Eco</h3>
                  <p className="text-[10px] text-[#3D5532] font-bold uppercase">
                    {user?.level_pengguna || "Level 1"}
                  </p>
                </div>
                <span className="text-2xl font-bold">75%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#3D5532] h-full w-[75%] rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              {["Tunas", "Hijau", "Eco", "Penjaga"].map((lvl, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${i <= 2 ? "bg-[#3D5532] text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {i === 3 ? "🔒" : "✓"}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    {lvl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pencapaian Terbaru */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">
              Pencapaian Terbaru
            </h4>
            <div className="space-y-4">
              {[
                { title: "Daur Ulang Pertama", icon: "💰" },
                { title: "Level Pahlawan Eco", icon: "⭐" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl border border-gray-50"
                >
                  <div className="w-10 h-10 bg-[#F2EDE4] rounded-xl flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <p className="text-[11px] font-bold flex-1">{item.title}</p>
                  <span className="text-[8px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: PROFILE INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-5 items-center">
                <div className="w-20 h-20 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-3xl font-serif font-bold border-4 border-[#F2EDE4] uppercase">
                  {user?.username?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">
                    {user?.username || "Guest"}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1 italic">
                    📍 Bekasi Regency • 🗓️ Member SkinCycle
                  </p>
                </div>
              </div>
              {/* PERBAIKAN: Tombol Edit Profil sekarang berfungsi */}
              <button
                onClick={() => navigate("/profil/edit")}
                className="px-6 py-2 rounded-full border border-[#3D5532] text-[11px] font-bold uppercase tracking-widest text-[#3D5532] bg-white transition-all hover:bg-[#3D5532] hover:text-white active:scale-95"
              >
                Edit Profil
              </button>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic mb-8">
              "Mari bersama membuat kecantikan lebih baik untuk bumi dengan
              mendaur ulang kemasan skincare."
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: 42, t: "Item" },
                { n: formatRupiah(user?.total_saldo || 0), t: "Saldo" },
                { n: 8, t: "Lencana" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#F9F9F7] p-5 rounded-3xl text-center border border-gray-50"
                >
                  <p className="text-sm font-serif font-bold">{stat.n}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">
                    {stat.t}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6">
              Dampak Komunitas
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50/50 p-6 rounded-[30px] text-center border border-green-100">
                <p className="text-3xl font-serif font-bold text-[#3D5532]">
                  12
                </p>
                <p className="text-[9px] font-bold text-[#3D5532]/60 uppercase">
                  Forum
                </p>
              </div>
              <div className="bg-[#F2EDE4]/50 p-6 rounded-[30px] text-center border border-[#F2EDE4]">
                <p className="text-3xl font-serif font-bold text-[#1e2b19]">
                  48
                </p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">
                  Upvote
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: RECENT ACTIVITY */}
        <div className="bg-white rounded-[50px] p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-lg">
                ♻️
              </div>
              <h4 className="text-xl font-serif font-bold uppercase tracking-tight">
                Riwayat Terbaru
              </h4>
            </div>
            <button
              onClick={() => navigate("/riwayat")}
              className="text-[10px] bg-[#3D5532] text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest"
            >
              Lihat Semua
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Serum", "Toner", "Minyak", "Botol Kaca", "Plastik"].map(
              (item, i) => (
                <div
                  key={i}
                  className="bg-[#F9F9F7] p-5 rounded-[30px] border border-gray-50 text-center"
                >
                  <span className="text-[8px] bg-white px-2 py-1 rounded-full font-black text-[#3D5532] border border-gray-100 uppercase">
                    + Rp 5.000
                  </span>
                  <div className="mt-4 mb-2 text-xl">🧴</div>
                  <p className="text-[11px] font-bold">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
