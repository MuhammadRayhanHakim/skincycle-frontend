import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  Wallet,
  Leaf,
  ArrowUpRight,
  Clock,
  Truck,
  CheckCircle2,
  Inbox,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const HistoryPage = () => {
  // State dinamis untuk menampung data riil dari database
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. AMBIL DATA DARI BACKEND (AKURAT & REAL-TIME) ---
  const fetchUserHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/recycle/user-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        // laporan daur ulang masuk ke state transactions
        setTransactions(result.data.laporan || []);
        // total saldo riil masuk ke wallet balance
        setWalletBalance(result.data.total_saldo || 0);
      } else {
        console.error("Gagal sinkronisasi data riwayat:", result.message);
      }
    } catch (error) {
      console.error("Kesalahan jaringan/server riwayat:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserHistory();
    // Polling otomatis setiap 10 detik agar status pelacakan sampah langsung terupdate jika admin klik tombol aksi
    const interval = setInterval(fetchUserHistory, 10000);
    return () => clearInterval(interval);
  }, [fetchUserHistory]);

  // --- 2. LOGIKA SEARCH FILTER ---
  const filteredTransactions = transactions.filter((item) => {
    const description =
      `Recycling: ${item.estimasi_berat}kg Sampah Skincare`.toLowerCase();
    return description.includes(searchQuery.toLowerCase());
  });

  // --- 3. HELPER INDIKATOR TRACKING STATUS ---
  const renderTrackingStatus = (status) => {
    if (status === "menunggu_verifikasi") {
      return (
        <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-feedback-warning-100 text-feedback-warning-300 border border-feedback-warning-300/10 animate-pulse flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
    }
    if (status === "sedang_dijemput") {
      return (
        <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-feedback-info-100 text-brand-primary-300 border border-brand-primary-100/20 flex items-center gap-1 w-fit">
          <Truck className="w-3 h-3" /> Dalam Penjemputan
        </span>
      );
    }
    return (
      <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-brand-primary-100/30 text-brand-primary-300 border border-brand-primary-100/40 flex items-center gap-1 w-fit">
        <CheckCircle2 className="w-3 h-3" /> Selesai
      </span>
    );
  };

  // Helper format tanggal
  const formatTanggal = (dateString) => {
    if (!dateString) return "Baru saja";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-secondary-100 font-sans">
        <div className="text-center">
          <Loader2 className="w-12 h-12 border-4 border-brand-primary-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">
            Sinkronisasi Dompet Lingkungan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-[calc(100vh-64px)] text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 flex flex-col py-6 gap-6">
        {/* --- TOP SECTION: WALLET OVERVIEW & IMPACT SCORE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-8 bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-default flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-brand-primary-300" /> Wallet
                Overview
              </p>
              <h2 className="text-5xl font-sans text-brand-dark-500 mb-6 leading-none">
                Rp {walletBalance.toLocaleString("id-ID")}
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-brand-primary-300 text-neutral-default px-6 py-2.5 rounded-full text-[10px] font-bold shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
                >
                  Top Up
                </button>
                <button
                  type="button"
                  className="bg-neutral-default text-brand-primary-300 px-6 py-2.5 rounded-full text-[10px] font-bold border border-neutral-100 shadow-sm hover:bg-neutral-50 transition-colors outline-none"
                >
                  Redeem Rewards
                </button>
              </div>
            </div>
            <Wallet className="w-44 h-44 opacity-[0.03] text-brand-primary-300 absolute right-4 top-1/2 -translate-y-1/2 rotate-12 select-none pointer-events-none" />
          </div>

          {/* Impact Score Tracking Card */}
          <div className="lg:col-span-4 bg-brand-primary-100/30 p-8 rounded-[40px] shadow-sm border border-brand-primary-100/20 text-brand-dark-500 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-4 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> Impact Score
              </p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-sans font-black leading-none text-brand-primary-500">
                  84
                </span>
                <span className="text-sm font-bold opacity-60">/ 100</span>
              </div>
              <div className="w-full bg-neutral-default shadow-inner h-1.5 rounded-full mb-4 overflow-hidden">
                <div
                  className="bg-brand-primary-300 h-full rounded-full transition-all duration-500"
                  style={{ width: "84%" }}
                ></div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed font-medium italic text-neutral-500">
              "Kontribusi daur ulangmu bulan ini telah menyelamatkan 12.4kg
              limbah plastik abadi dari ekosistem."
            </p>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DETAILED HISTORY LOG TABLE --- */}
        <div className="bg-neutral-default rounded-[40px] shadow-sm border border-neutral-100">
          <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">
              Riwayat
            </h3>

            {/* Input Search Block */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-50 text-[10px] pl-9 pr-4 py-2.5 rounded-full border border-neutral-100 focus:border-brand-primary-100 font-bold outline-none w-48 text-brand-dark-500 transition-all placeholder-neutral-400 shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary-300 transition-colors" />
            </div>
          </div>

          {/* Table Container Body */}
          <div className="px-6">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-neutral-50">
                <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  <th className="py-4 px-2">Date</th>
                  <th className="py-4 px-2">Description</th>
                  <th className="py-4 px-2">Tracking Status</th>
                  <th className="py-4 px-2">Category</th>
                  <th className="py-4 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50/50 text-xs font-semibold text-neutral-600">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr
                      key={item.id_laporan}
                      className="hover:bg-neutral-50/50 transition-colors group"
                    >
                      {/* Tanggal Kirim */}
                      <td className="py-4 px-2 text-[11px] font-medium text-neutral-400">
                        {formatTanggal(item.createdAt || item.tanggal)}
                      </td>

                      {/* Deskripsi Sampah */}
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <ArrowUpRight className="w-4 h-4 text-brand-primary-300 opacity-60 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-bold text-brand-dark-500">
                            Recycling: {item.estimasi_berat}kg Sampah Skincare
                          </span>
                        </div>
                      </td>

                      {/* Status Daur Ulang Real-time */}
                      <td className="py-4 px-2">
                        {renderTrackingStatus(item.status_jemput)}
                      </td>

                      {/* Kategori */}
                      <td className="py-4 px-2">
                        <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full bg-brand-primary-100/30 text-brand-primary-300 border border-brand-primary-100/10 tracking-wider">
                          Recycle
                        </span>
                      </td>

                      {/* Jumlah Saldo */}
                      <td className="py-4 px-2 text-[11px] font-black text-right">
                        {item.status_jemput === "selesai" ? (
                          <span className="text-feedback-success-300 font-sans text-sm font-black">
                            +Rp{" "}
                            {parseInt(item.saldo_cair).toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span className="text-feedback-warning-300 italic text-[10px] font-bold">
                            Dalam Proses Kurir
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-20 text-center text-neutral-400 italic text-[11px] uppercase tracking-wide font-bold"
                    >
                      <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-2 opacity-60" />
                      Belum ada transaksi daur ulang yang tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary Count */}
          <div className="p-4 bg-neutral-50/50 text-center border-t border-neutral-100">
            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions log
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;