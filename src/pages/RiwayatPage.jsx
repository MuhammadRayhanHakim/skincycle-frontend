import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, Wallet, Trophy, Clock, Truck, CheckCircle2, Inbox } from "lucide-react";
import Swal from "sweetalert2";

const RiwayatPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/recycle/user-history", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status === "success") {
        setTransactions(result.data.riwayat || result.data.laporan || []);
        setWalletBalance(result.data.total_saldo || 0);
      }
    } catch (error) {
      console.error("Kesalahan jaringan/server riwayat:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserHistory();
    const interval = setInterval(fetchUserHistory, 10000);
    return () => clearInterval(interval);
  }, [fetchUserHistory]);

  const filteredTransactions = transactions.filter((item) => {
    const aktivitasTeks = (item.aktivitas || `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`).toLowerCase();
    return aktivitasTeks.includes(searchQuery.toLowerCase());
  });

  const renderTrackingStatus = (status) => {
    const s = status ? status.trim().toUpperCase() : "";
    if (s === "PENDING" || s === "MENUNGGU_VERIFIKASI" || s === "MENUNGGU VERIFIKASI")
      return <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200/40 animate-pulse flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Baru / Pending</span>;
    if (s === "PROCESSING")
      return <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/40 flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Sedang Diproses</span>;
    if (s === "SHIPPED" || s === "SEDANG_DIJEMPUT" || s === "SEDANG DIJEMPUT")
      return <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 border border-blue-200/40 flex items-center gap-1 w-fit"><Truck className="w-3 h-3" /> Dalam Pengiriman</span>;
    return <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-brand-primary-100/30 text-brand-primary-300 border border-brand-primary-100/40 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3" /> Selesai</span>;
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "Baru saja";
    return new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
  };

  // Kalkulasi level
  const totalBeratLive = (transactions || []).reduce((acc, item) => {
    const statusAktif = (item.status || item.status_jemput || item.detail_laporan?.status_jemput || "").trim().toUpperCase();
    if (statusAktif === "SELESAI") {
      let berat = parseFloat(item.berat_asli || item.detail_laporan?.berat_asli || 0);
      if (berat === 0 && item.aktivitas) {
        const match = item.aktivitas.match(/(\d+(?:\.\d+)?)\s*kg/i);
        if (match) berat = parseFloat(match[1]);
      }
      return acc + berat;
    }
    return acc;
  }, 0);

  let levelNama = "Tunas", levelAngka = "Lv. 1", targetBerikutnya = 30, minimalLevelSekarang = 0;
  if (totalBeratLive >= 90) { levelNama = "Penjaga"; levelAngka = "Lv. 4 (Max)"; targetBerikutnya = 90; minimalLevelSekarang = 90; }
  else if (totalBeratLive >= 60) { levelNama = "Eco"; levelAngka = "Lv. 3"; targetBerikutnya = 90; minimalLevelSekarang = 60; }
  else if (totalBeratLive >= 30) { levelNama = "Pahlawan Hijau"; levelAngka = "Lv. 2"; targetBerikutnya = 60; minimalLevelSekarang = 30; }

  const selisihBobot = targetBerikutnya - minimalLevelSekarang;
  const progressMurni = totalBeratLive - minimalLevelSekarang;
  const persentaseProgress = totalBeratLive > 0 && selisihBobot > 0 ? Math.min(100, Math.max(0, Math.round((progressMurni / selisihBobot) * 100))) : 0;

  // Handler tombol Belanja dengan konfirmasi SweetAlert
  const handleBelanja = () => {
    if (walletBalance === 0) {
      Swal.fire({
        icon: "info",
        title: "Saldo Belum Cukup",
        text: "Setor sampah skincare terlebih dahulu untuk mendapatkan saldo dompet.",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Mengerti",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Saldo Siap Digunakan! 🛍️",
      html: `Saldo kamu <strong>Rp ${walletBalance.toLocaleString("id-ID")}</strong> siap digunakan untuk belanja produk eco-friendly.`,
      confirmButtonColor: "#3D5532",
      confirmButtonText: "Belanja Sekarang",
      showCancelButton: true,
      cancelButtonText: "Nanti Saja",
    }).then((result) => {
      if (result.isConfirmed) navigate("/produk");
    });
  };

  if (isLoading && transactions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-secondary-100 font-sans">
      <div className="text-center">
        <Loader2 className="w-12 h-12 border-4 border-brand-primary-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">Sinkronisasi Dompet Lingkungan...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-[calc(100vh-64px)] text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 flex flex-col py-6 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-10 rounded-[40px] shadow-sm border border-neutral-100 flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs font-black text-brand-primary-300 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> Dompet Digital
                </p>
                <h2 className="text-5xl font-sans font-black text-brand-dark-500 mb-8 leading-none tracking-tight">
                  Rp {walletBalance.toLocaleString("id-ID")}
                </h2>
              </div>
              <div>
                <button type="button" onClick={handleBelanja}
                  className="bg-brand-primary-300 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 outline-none">
                  Belanja Sekarang
                </button>
              </div>
            </div>
            <Wallet className="w-48 h-48 opacity-[0.04] text-brand-primary-300 absolute right-6 top-1/2 -translate-y-1/2 rotate-12 select-none pointer-events-none group-hover:rotate-6 transition-transform duration-500" />
          </div>

          <div className="lg:col-span-4 bg-brand-primary-100/30 p-8 rounded-[40px] shadow-sm border border-brand-primary-100/20 text-brand-dark-500 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-4 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> Level Kontribusi
              </p>
              <div className="flex items-end gap-1.5 mb-4">
                <span className="text-4xl font-sans font-black leading-none text-brand-primary-500">{totalBeratLive}</span>
                <span className="text-xs font-bold opacity-60">/ {targetBerikutnya} KG</span>
              </div>
              <p className="text-[10px] font-black text-brand-dark-500 uppercase tracking-wider mb-3">
                {levelNama} • <span className="text-brand-primary-300">{levelAngka}</span>
              </p>
              <div className="w-full bg-white shadow-inner h-2 rounded-full mb-4 overflow-hidden">
                <div className="bg-brand-primary-300 h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${persentaseProgress}%` }}></div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed font-medium italic text-neutral-500 border-t border-brand-primary-100/40 pt-3">
              {targetBerikutnya - totalBeratLive > 0
                ? <>"Kumpulkan <strong>{(targetBerikutnya - totalBeratLive).toFixed(1)} kg</strong> sampah skincare lagi untuk naik level."</>
                : `"Luar biasa! ${totalBeratLive} kg kontribusimu telah maksimal membantu ekosistem!"`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-neutral-100">
          <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">Riwayat Transaksi Dompet</h3>
            <div className="relative">
              <input type="text" placeholder="Cari transaksi..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-50 text-[10px] pl-9 pr-4 py-2.5 rounded-full border border-neutral-100 focus:border-brand-primary-100 font-bold outline-none w-48 text-brand-dark-500" />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="px-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
                  <th className="py-4 px-2">Tanggal</th>
                  <th className="py-4 px-2">Aktivitas Deskripsi</th>
                  <th className="py-4 px-2">Status Pelacakan</th>
                  <th className="py-4 px-2">Kategori</th>
                  <th className="py-4 px-2 text-right">Jumlah Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50/50 text-xs font-semibold text-neutral-600">
                {filteredTransactions.length > 0 ? filteredTransactions.map((item, i) => {
                  const isBelanja = item.tipe_transaksi === "keluar" || parseInt(item.jumlah_saldo) < 0;
                  const statusAktif = item.status || item.status_jemput || item.detail_laporan?.status_jemput || "";
                  return (
                    <tr key={item.id_riwayat || item.id_laporan || i} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="py-4 px-2 text-[11px] font-medium text-neutral-400">{formatTanggal(item.tanggal || item.createdAt)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <span className="text-base shrink-0">{isBelanja ? "🛍️" : "🌱"}</span>
                          <span className="text-[11px] font-bold text-brand-dark-500">
                            {item.aktivitas || `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2">{renderTrackingStatus(statusAktif)}</td>
                      <td className="py-4 px-2">
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-wider ${isBelanja ? "bg-amber-50 text-amber-600 border-amber-200/40" : "bg-brand-primary-100/30 text-brand-primary-300 border-brand-primary-100/10"}`}>
                          {isBelanja ? "BELANJA" : "RECYCLE"}
                        </span>
                      </td>
                      <td className={`py-4 px-2 text-[11px] font-black text-right font-sans text-sm ${isBelanja ? "text-feedback-error-200" : "text-feedback-success-300"}`}>
                        {isBelanja
                          ? `-Rp ${Math.abs(parseInt(item.jumlah_saldo || 0)).toLocaleString("id-ID")}`
                          : `+Rp ${parseInt(item.jumlah_saldo || item.saldo_cair || 0).toLocaleString("id-ID")}`}
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center text-neutral-400 italic text-[11px] uppercase tracking-wide font-bold">
                      <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-2 opacity-60" />
                      Belum ada aktivitas transaksi yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-neutral-50/50 text-center border-t border-neutral-100">
            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
              Menampilkan {filteredTransactions.length} dari {transactions.length} total log aktivitas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPage;