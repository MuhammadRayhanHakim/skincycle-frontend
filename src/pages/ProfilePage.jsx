import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Trophy,
  Award,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Heart,
  History,
  Package,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  // --- STATE MANAJEMEN DATA RIIL DATABASE ---
  const [laporanDaurUlang, setLaporanDaurUlang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [impact, setImpact] = useState({ totalThreads: 0, totalUpvotes: 0 });
  // State penampung akumulasi angka statistik riil dari server
  const [profileStats, setProfileStats] = useState({
    total_berat_recycle: 0,
    total_thread: 0,
    total_likes_received: 0,
    riwayat_pembelian_count: 0,
    persentase_progress: 0,
    target_berikutnya: 30,
    teks_level_angka: "Lv. 1",
    level_pengguna: "Tunas",
    total_saldo: 0,
  });

  const baseUrl = "http://localhost:5000";
  const fetchImpact = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/forum/profil/dampak-komunitas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.status === "success") setImpact(result.data);
    } catch (err) {
      console.error("Gagal ambil dampak:", err);
    }
  };
  // --- AMBIL DATA RIWAYAT ASLI DARI BACKEND SKINCYCLE ---
  const fetchProfileHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      // 1. Ambil data riwayat setoran daur ulang
      const response = await fetch(`${baseUrl}/api/recycle/user-history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status === "success") {
        // Mengamankan pembacaan data baik dari properti laporan maupun riwayat
        setLaporanDaurUlang(result.data.laporan || result.data.riwayat || []);
      }

      // 2. Ambil data statistik akumulasi level timbangan asli dari Admin
      const statsResponse = await fetch(`${baseUrl}/api/profile/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const statsResult = await statsResponse.json();
      if (statsResult.status === "success") {
        setProfileStats(statsResult.data);
      }
    } catch (error) {
      console.error("Gagal sinkronisasi data riwayat di profil:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileHistory(); // Fungsi lama Anda
    fetchImpact(); // 🟢 Tambahkan ini agar data komunitas diambil
  }, [fetchProfileHistory]);

  const beratTotal = profileStats.total_berat_recycle || 0;

  // ─── 🏆 LOGIKA SISTEM SELEKSI LENCANA PENCAPAIAN TERBARU ───
  const daftarPencapaianSistem = [
    {
      title: "Daur Ulang Pertama",
      icon: <Wallet className="w-4 h-4 text-brand-primary-300" />,
      isUnlocked: beratTotal > 0,
    },
    {
      title: "Level Pahlawan Eco",
      icon: <Star className="w-4 h-4 text-brand-primary-300" />,
      isUnlocked: beratTotal >= 30,
    },
    {
      title: "Bintang Komunitas",
      icon: <Award className="w-4 h-4 text-brand-primary-300" />,
      isUnlocked: (profileStats.total_likes_received || 0) >= 5,
    },
    {
      title: "Konsumen Berkelanjutan",
      icon: <Trophy className="w-4 h-4 text-brand-primary-300" />,
      isUnlocked: (profileStats.riwayat_pembelian_count || 0) > 0,
    },
  ];

  const pencapaianTerbuka = daftarPencapaianSistem.filter(
    (ach) => ach.isUnlocked,
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-brand-secondary-100 py-10 px-6 lg:px-20 font-sans text-brand-dark-500">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ROW 1: STATS CARD OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saldo Utama Wallet Card */}
          <div className="bg-brand-primary-300 rounded-[40px] p-8 text-neutral-default relative overflow-hidden shadow-xl border border-brand-primary-400">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" /> Saldo Saat Ini
              </p>
              <h2 className="text-4xl font-sans font-bold mt-4">
                {formatRupiah(
                  profileStats.total_saldo !== undefined
                    ? profileStats.total_saldo
                    : user?.total_saldo || 0,
                )}
              </h2>
              <p className="text-xs mt-2 opacity-70 font-medium">
                Total saldo terkumpul dari hasil daur ulang sirkular
              </p>

              <div className="mt-10 bg-neutral-default/10 backdrop-blur-md p-4 rounded-2xl border border-neutral-default/10 flex justify-between items-center">
                <p className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-feedback-success-100" />{" "}
                  Status Verifikasi: Aman
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/keranjang")}
                  className="text-[9px] bg-neutral-default text-brand-primary-300 px-4 py-1.5 rounded-full font-black uppercase tracking-wider outline-none hover:bg-neutral-50 transition-colors"
                >
                  Belanja
                </button>
              </div>
            </div>
            <div className="absolute bottom-[-10%] right-[-5%] text-[150px] opacity-10 italic font-sans pointer-events-none select-none">
              Rp
            </div>
          </div>

          {/* Level Progress Gamification Card */}
          <div className="bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-brand-primary-300/60" />{" "}
                    Level Pengguna
                  </p>
                  <h3 className="text-xl font-bold mt-1 text-brand-dark-500">
                    {profileStats.level_pengguna || "Tunas"}
                  </h3>
                  <p className="text-[10px] text-brand-primary-300 font-black uppercase tracking-wider mt-0.5">
                    Tingkat: {profileStats.teks_level_angka || "Lv. 1"} (
                    {beratTotal} Kg)
                  </p>
                </div>
                <span className="text-2xl font-sans font-black text-brand-primary-300">
                  {profileStats.persentase_progress || 0}%
                </span>
              </div>

              <p className="text-[11px] text-neutral-500 font-medium mb-3">
                {(profileStats.target_berikutnya || 30) - beratTotal > 0 ? (
                  <>
                    <strong>
                      {(profileStats.target_berikutnya || 30) - beratTotal} KG
                    </strong>{" "}
                    sampah lagi menuju level berikutnya
                  </>
                ) : (
                  "Tingkat kontribusi maksimal telah tercapai! 🎉"
                )}
              </p>

              <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-brand-primary-300 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${profileStats.persentase_progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              {["Tunas", "Hijau", "Eco", "Penjaga"].map((lvl, i) => {
                const KATEGORI_BATAS = [0, 30, 60, 90];
                const isPassed = beratTotal >= KATEGORI_BATAS[i];

                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-sm font-bold ${
                        isPassed
                          ? "bg-brand-primary-300 text-neutral-default"
                          : "bg-neutral-50 border border-neutral-100 text-neutral-400"
                      }`}
                    >
                      {isPassed ? "✓" : "🔒"}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-neutral-400">
                      {lvl}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pencapaian Badges Terbaru Card */}
          <div className="bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-neutral-400 flex items-center gap-1">
              <Award className="w-4 h-4 text-brand-primary-300" /> Pencapaian
              Terbaru
            </h4>
            <div className="space-y-4 max-h-[160px] overflow-y-auto pr-1">
              {pencapaianTerbuka.length > 0 ? (
                pencapaianTerbuka.slice(0, 2).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl border border-neutral-50 bg-neutral-50/50"
                  >
                    <div className="w-10 h-10 bg-neutral-default rounded-xl flex items-center justify-center border border-neutral-100 shadow-sm">
                      {item.icon}
                    </div>
                    <p className="text-[11px] font-bold flex-1 text-brand-dark-500">
                      {item.title}
                    </p>
                    <span className="text-[9px] bg-brand-primary-100/30 text-brand-primary-300 px-2 py-0.5 rounded-full font-black">
                      ✓
                    </span>
                  </div>
                ))
              ) : (
                <div className="space-y-1 py-6 text-center text-[11px] text-neutral-400 italic">
                  Belum ada lencana pencapaian terbuka.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ROW 2: PROFILE DETAILS & SOCIAL ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex gap-5 items-center">
                <div className="w-20 h-20 bg-brand-primary-300 rounded-full flex items-center justify-center text-neutral-default text-3xl font-sans font-bold border-4 border-brand-secondary-100 uppercase shadow-md overflow-hidden shrink-0">
                  {user?.foto_profil ? (
                    <img
                      src={`${baseUrl}/uploads/${user.foto_profil}`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/80x80/3d5532/ffffff?text=${user.username?.charAt(0).toUpperCase()}`;
                      }}
                    />
                  ) : (
                    <span>{user?.username?.charAt(0) || "U"}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-sans font-bold text-brand-dark-500 capitalize">
                    {user?.username || "Guest"}
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-1 font-bold uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-primary-300" /> Bekasi
                    Regency •{" "}
                    <Calendar className="w-3 h-3 text-brand-primary-300" />{" "}
                    Member SkinCycle
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/profil/edit")}
                className="text-[10px] bg-brand-primary-300 text-neutral-default px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-all outline-none text-center"
              >
                Edit Profil
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed italic mb-8 font-medium border-l-4 border-brand-primary-100/40 pl-4">
              "
              {user?.bio ||
                "Mari bersama membuat kecantikan lebih baik untuk bumi dengan mendaur ulang kemasan skincare secara teratur."}
              "
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { n: `${laporanDaurUlang.length} Kali`, t: "Setor Sampah" },
                { n: `${beratTotal} Kg`, t: "Total Berat Kontribusi" },
                {
                  n: `${pencapaianTerbuka.length} Lencana`,
                  t: "Koleksi Reward",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-neutral-50 p-5 rounded-3xl text-center border border-neutral-100"
                >
                  <p className="text-sm font-sans font-black text-brand-dark-500 leading-none">
                    {stat.n}
                  </p>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase mt-1.5 tracking-wide">
                    {stat.t}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dampak Komunitas Card */}
          <div className="bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-neutral-400">
                Dampak Komunitas
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-primary-100/10 p-6 rounded-[30px] text-center border border-brand-primary-100/20 flex flex-col items-center justify-center gap-1">
                  <MessageSquare className="w-5 h-5 text-brand-primary-300" />
                  <p className="text-3xl font-sans font-black text-brand-primary-500 leading-none mt-1">
                    {impact.totalThreads}
                  </p>
                  <p className="text-[9px] font-black text-brand-primary-300 uppercase tracking-wider mt-1">
                    Thread Forum
                  </p>
                </div>
                <div className="bg-brand-secondary-100/40 p-6 rounded-[30px] text-center border border-brand-secondary-300/30 flex flex-col items-center justify-center gap-1">
                  <Heart className="w-5 h-5 text-brand-primary-300" />
                  <p className="text-3xl font-sans font-black text-brand-dark-500 leading-none mt-1">
                    {impact.totalUpvotes}
                  </p>
                  <p className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mt-1">
                    Upvote Suka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: LIST ITEM GRID RIWAYAT AKTIVITAS LIVE */}
        <div className="bg-neutral-default rounded-[50px] p-10 shadow-sm border border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary-100/30 rounded-full flex items-center justify-center text-brand-primary-300">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-sans font-bold text-brand-dark-500">
                  Riwayat Terbaru
                </h4>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                  Log aktivitas sirkular penyerahan sampah kosmetik Anda
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/riwayat")}
              className="text-[10px] bg-brand-primary-300 text-neutral-default px-6 py-3 rounded-full font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-all outline-none text-center"
            >
              Lihat Semua
            </button>
          </div>

          {isLoading ? (
            <div className="py-12 flex justify-center items-center gap-2 text-neutral-400 text-xs font-bold">
              <Loader2 className="w-4 h-4 animate-spin text-brand-primary-300" />{" "}
              Sinkronisasi data aktivitas...
            </div>
          ) : laporanDaurUlang.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {laporanDaurUlang.slice(0, 5).map((item, i) => {
                // 🟢 FIX LIVE SINKRONISASI: Ekstrak status dari RiwayatSaldo (item.status) atau Recycle (detail_laporan)
                const statusMurni = (
                  item.status ||
                  item.status_jemput ||
                  item.detail_laporan?.status_jemput ||
                  ""
                )
                  .trim()
                  .toUpperCase();

                const isSelesai = statusMurni === "SELESAI";

                // 🟢 FIX LIVE TIMBANGAN: Ambil berat_asli jika SELESAI, atau estimasi_berat jika masih PENDING
                const beratMurni = isSelesai
                  ? item.berat_asli || item.detail_laporan?.berat_asli || 0
                  : item.estimasi_berat ||
                    item.detail_laporan?.estimasi_berat ||
                    0;

                // Ekstrak angka murni dari data string/number (menghilangkan teks "kg" jika ada dari backend)
                const beratAngkaLive =
                  parseFloat(String(beratMurni).replace(/[^0-9.]/g, "")) || 0;

                // Mengambil nilai nominal saldo cair
                const nominalSaldoCair = parseInt(
                  item.saldo_cair ||
                    item.detail_laporan?.saldo_cair ||
                    item.jumlah_saldo ||
                    0,
                );

                return (
                  <div
                    key={item.id_riwayat || item.id_laporan || i}
                    className="bg-white p-5 rounded-[30px] border border-neutral-100 text-center flex flex-col justify-between items-center relative group hover:border-brand-primary-200 transition-all shadow-sm"
                  >
                    {/* Badge Saldo Atas: Reaktif membelah status SELESAI dan PENDING */}
                    <span
                      className={`text-[9px] border px-2.5 py-1 rounded-full font-black shadow-sm uppercase block tracking-wider ${
                        isSelesai
                          ? "bg-green-50 border-green-100 text-green-600"
                          : "bg-amber-50 border-amber-100 text-amber-600 animate-pulse"
                      }`}
                    >
                      {isSelesai
                        ? `+ Rp ${nominalSaldoCair.toLocaleString("id-ID")}`
                        : "Jemput/Pending"}
                    </span>

                    <div className="mt-5 mb-3 text-brand-primary-300/40 group-hover:scale-105 transition-transform">
                      <Package className="w-8 h-8 mx-auto" />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-brand-dark-500 uppercase tracking-tight">
                        Berat: {beratAngkaLive} KG
                      </p>
                      <p className="text-[8px] text-neutral-400 font-black uppercase tracking-widest flex items-center justify-center gap-0.5">
                        <ArrowUpRight className="w-2.5 h-2.5" />{" "}
                        {isSelesai ? "SELESAI" : "DI JEMPUT"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 border border-dashed border-neutral-200 rounded-3xl text-center text-neutral-400 text-xs italic font-medium">
              Belum ada aktivitas penyetoran sampah daur ulang yang tercatat di
              database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
