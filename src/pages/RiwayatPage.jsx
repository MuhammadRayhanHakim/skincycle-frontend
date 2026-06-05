// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Search,
//   Loader2,
//   Wallet,
//   Leaf,
//   Clock,
//   Truck,
//   CheckCircle2,
//   Inbox,
// } from "lucide-react";

// const RiwayatPage = () => {
//   // State dinamis untuk menampung data riil dari database
//   const [transactions, setTransactions] = useState([]);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // --- 1. AMBIL DATA DARI BACKEND ---
//   const fetchUserHistory = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:5000/api/recycle/user-history",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();

//       if (result.status === "success") {
//         // 🎯 FIX UTAMA FRONTEND: Dahulukan membaca properti array 'riwayat' dari server
//         setTransactions(result.data.riwayat || result.data.laporan || []);
//         // Menyimpan total saldo riil pengguna
//         setWalletBalance(result.data.total_saldo || 0);
//       }
//     } catch (error) {
//       console.error("Kesalahan jaringan/server riwayat:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUserHistory();
//     // Polling interval 10 detik agar status berubah real-time ketika diubah oleh admin
//     const interval = setInterval(fetchUserHistory, 10000);
//     return () => clearInterval(interval);
//   }, [fetchUserHistory]);

//   // --- 2. LOGIKA SEARCH FILTER ---
//   // 🛠️ PERBAIKAN: Menambahkan safety check string agar tidak crash saat membaca riwayat Belanja Checkout
//   const filteredTransactions = transactions.filter((item) => {
//     const aktivitasTeks = (
//       item.aktivitas ||
//       `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`
//     ).toLowerCase();
//     return aktivitasTeks.includes(searchQuery.toLowerCase());
//   });

//   // --- 3. HELPER INDIKATOR TRACKING STATUS DINAMIS ---
//   const renderTrackingStatus = (status) => {
//     const normalisasiStatus = status ? status.trim().toUpperCase() : "";

//     if (
//       normalisasiStatus === "PENDING" ||
//       normalisasiStatus === "MENUNGGU_VERIFIKASI" ||
//       normalisasiStatus === "MENUNGGU VERIFIKASI"
//     ) {
//       return (
//         <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200/40 animate-pulse flex items-center gap-1 w-fit">
//           <Clock className="w-3 h-3" /> Baru / Pending
//         </span>
//       );
//     }
//     if (normalisasiStatus === "PROCESSING") {
//       return (
//         <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/40 flex items-center gap-1 w-fit">
//           <Clock className="w-3 h-3" /> Sedang Diproses
//         </span>
//       );
//     }
//     if (
//       normalisasiStatus === "SHIPPED" ||
//       normalisasiStatus === "SEDANG_DIJEMPUT" ||
//       normalisasiStatus === "SEDANG DIJEMPUT"
//     ) {
//       return (
//         <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 border border-blue-200/40 flex items-center gap-1 w-fit">
//           <Truck className="w-3 h-3" /> Dalam Pengiriman / Perjalanan
//         </span>
//       );
//     }

//     return (
//       <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-brand-primary-100/30 text-brand-primary-300 border border-brand-primary-100/40 flex items-center gap-1 w-fit">
//         <CheckCircle2 className="w-3 h-3" /> Selesai
//       </span>
//     );
//   };

//   const formatTanggal = (dateString) => {
//     if (!dateString) return "Baru saja";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString("id-ID", options);
//   };

//   if (isLoading && transactions.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-brand-secondary-100 font-sans">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 border-4 border-brand-primary-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//           <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">
//             Sinkronisasi Dompet Lingkungan...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-brand-secondary-100 font-sans min-h-[calc(100vh-64px)] text-brand-dark-500">
//       <div className="max-w-7xl mx-auto px-10 flex flex-col py-6 gap-6">
//         {/* Top Wallet Overview & Impact Score Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 flex justify-between items-center relative overflow-hidden">
//             <div className="relative z-10">
//               <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-1">
//                 <Wallet className="w-3.5 h-3.5 text-brand-primary-300" /> Wallet
//                 Overview
//               </p>
//               <h2 className="text-5xl font-sans text-brand-dark-500 mb-6 leading-none">
//                 Rp {walletBalance.toLocaleString("id-ID")}
//               </h2>
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   // 🚀 3. Tambahkan handler onClick untuk berpindah halaman secara otomatis
//                   onClick={() => navigate("/produk")}
//                   className="bg-brand-primary-300 text-white px-6 py-2.5 rounded-full text-[10px] font-bold shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
//                 >
//                   Belanja
//                 </button>
//               </div>
//             </div>
//             <Wallet className="w-44 h-44 opacity-[0.03] text-brand-primary-300 absolute right-4 top-1/2 -translate-y-1/2 rotate-12 select-none pointer-events-none" />
//           </div>

//           <div className="lg:col-span-4 bg-brand-primary-100/30 p-8 rounded-[40px] shadow-sm border border-brand-primary-100/20 text-brand-dark-500 flex flex-col justify-between">
//             <div>
//               <p className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-4 flex items-center gap-1">
//                 <Leaf className="w-3.5 h-3.5" /> Impact Score
//               </p>
//               <div className="flex items-end gap-2 mb-4">
//                 <span className="text-4xl font-sans font-black leading-none text-brand-primary-500">
//                   84
//                 </span>
//                 <span className="text-sm font-bold opacity-60">/ 100</span>
//               </div>
//               <div className="w-full bg-white shadow-inner h-1.5 rounded-full mb-4 overflow-hidden">
//                 <div
//                   className="bg-brand-primary-300 h-full rounded-full transition-all duration-500"
//                   style={{ width: "84%" }}
//                 ></div>
//               </div>
//             </div>
//             <p className="text-[10px] leading-relaxed font-medium italic text-neutral-500">
//               "Kontribusi daur ulangmu bulan ini telah menyelamatkan 12.4kg
//               limbah plastik abadi dari ekosistem."
//             </p>
//           </div>
//         </div>

//         {/* Detailed History Log Table */}
//         <div className="bg-white rounded-[40px] shadow-sm border border-neutral-100">
//           <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
//             <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">
//               Riwayat Transaksi Dompet
//             </h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Cari transaksi..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="bg-neutral-50 text-[10px] pl-9 pr-4 py-2.5 rounded-full border border-neutral-100 focus:border-brand-primary-100 font-bold outline-none w-48 text-brand-dark-500"
//               />
//               <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3.5" />
//             </div>
//           </div>

//           <div className="px-6">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
//                   <th className="py-4 px-2">Tanggal</th>
//                   <th className="py-4 px-2">Aktivitas Deskripsi</th>
//                   <th className="py-4 px-2">Status Pelacakan</th>
//                   <th className="py-4 px-2">Kategori</th>
//                   <th className="py-4 px-2 text-right">Jumlah Saldo</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-neutral-50/50 text-xs font-semibold text-neutral-600">
//                 {filteredTransactions.length > 0 ? (
//                   filteredTransactions.map((item, i) => {
//                     const isBelanja =
//                       item.tipe_transaksi === "keluar" ||
//                       parseInt(item.jumlah_saldo) < 0;

//                     // 🛠️ FIX DATA GANDA: Memastikan status membaca property gabungan secara runtut
//                     const statusAktif =
//                       item.status ||
//                       item.status_jemput ||
//                       item.detail_laporan?.status_jemput ||
//                       "";

//                     return (
//                       <tr
//                         key={item.id_riwayat || item.id_laporan || i}
//                         className="hover:bg-neutral-50/50 transition-colors group"
//                       >
//                         <td className="py-4 px-2 text-[11px] font-medium text-neutral-400">
//                           {formatTanggal(item.tanggal || item.createdAt)}
//                         </td>
//                         <td className="py-4 px-2">
//                           <div className="flex items-center gap-3">
//                             <span className="text-base shrink-0">
//                               {isBelanja ? "🛍️" : "🌱"}
//                             </span>
//                             <span className="text-[11px] font-bold text-brand-dark-500">
//                               {item.aktivitas ||
//                                 `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`}
//                             </span>
//                           </div>
//                         </td>

//                         {/* Status Pelacakan Dinamis */}
//                         <td className="py-4 px-2">
//                           {renderTrackingStatus(statusAktif)}
//                         </td>

//                         <td className="py-4 px-2">
//                           <span
//                             className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-wider ${
//                               isBelanja
//                                 ? "bg-amber-50 text-amber-600 border-amber-200/40"
//                                 : "bg-brand-primary-100/30 text-brand-primary-300 border-brand-primary-100/10"
//                             }`}
//                           >
//                             {isBelanja ? "BELANJA" : "RECYCLE"}
//                           </span>
//                         </td>
//                         <td
//                           className={`py-4 px-2 text-[11px] font-black text-right font-sans text-sm ${
//                             isBelanja
//                               ? "text-feedback-error-200"
//                               : "text-feedback-success-300"
//                           }`}
//                         >
//                           {isBelanja
//                             ? `-Rp ${Math.abs(parseInt(item.jumlah_saldo || 0)).toLocaleString("id-ID")}`
//                             : `+Rp ${parseInt(item.jumlah_saldo || item.saldo_cair || 0).toLocaleString("id-ID")}`}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="py-20 text-center text-neutral-400 italic text-[11px] uppercase tracking-wide font-bold"
//                     >
//                       <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-2 opacity-60" />
//                       Belum ada aktivitas transaksi yang tercatat.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="p-4 bg-neutral-50/50 text-center border-t border-neutral-100">
//             <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
//               Menampilkan {filteredTransactions.length} dari{" "}
//               {transactions.length} total log aktivitas
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiwayatPage;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 FIX MUTLAK 1: Impor hook useNavigate dari react-router-dom
import {
  Search,
  Loader2,
  Wallet,
  Leaf,
  Clock,
  Truck,
  CheckCircle2,
  Inbox,
} from "lucide-react";

const RiwayatPage = () => {
  const navigate = useNavigate(); // 🚀 FIX MUTLAK 2: Inisialisasi hook navigate di dalam komponen utama

  // State dinamis untuk menampung data riil dari database
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. AMBIL DATA DARI BACKEND ---
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
        // 🎯 FIX UTAMA FRONTEND: Dahulukan membaca properti array 'riwayat' dari server
        setTransactions(result.data.riwayat || result.data.laporan || []);
        // Menyimpan total saldo riil pengguna
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
    // Polling interval 10 detik agar status berubah real-time ketika diubah oleh admin
    const interval = setInterval(fetchUserHistory, 10000);
    return () => clearInterval(interval);
  }, [fetchUserHistory]);

  // --- 2. LOGIKA SEARCH FILTER ---
  const filteredTransactions = transactions.filter((item) => {
    const aktivitasTeks = (
      item.aktivitas ||
      `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`
    ).toLowerCase();
    return aktivitasTeks.includes(searchQuery.toLowerCase());
  });

  // --- 3. HELPER INDIKATOR TRACKING STATUS DINAMIS ---
  const renderTrackingStatus = (status) => {
    const normalisasiStatus = status ? status.trim().toUpperCase() : "";

    if (
      normalisasiStatus === "PENDING" ||
      normalisasiStatus === "MENUNGGU_VERIFIKASI" ||
      normalisasiStatus === "MENUNGGU VERIFIKASI"
    ) {
      return (
        <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200/40 animate-pulse flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> Baru / Pending
        </span>
      );
    }
    if (normalisasiStatus === "PROCESSING") {
      return (
        <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/40 flex items-center gap-1 w-fit">
          <Clock className="w-3 h-3" /> Sedang Diproses
        </span>
      );
    }
    if (
      normalisasiStatus === "SHIPPED" ||
      normalisasiStatus === "SEDANG_DIJEMPUT" ||
      normalisasiStatus === "SEDANG DIJEMPUT"
    ) {
      return (
        <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-blue-50 text-blue-500 border border-blue-200/40 flex items-center gap-1 w-fit">
          <Truck className="w-3 h-3" /> Dalam Pengiriman / Perjalanan
        </span>
      );
    }

    return (
      <span className="text-[9px] font-black uppercase px-3 py-1.5 rounded-full bg-brand-primary-100/30 text-brand-primary-300 border border-brand-primary-100/40 flex items-center gap-1 w-fit">
        <CheckCircle2 className="w-3 h-3" /> Selesai
      </span>
    );
  };

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
        {/* Top Wallet Overview & Impact Score Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 flex justify-between items-center relative overflow-hidden">
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
                  onClick={() => navigate("/produk")} // 🚀 SEKARANG SUDAH AKTIF BERFUNGSI: Berpindah rute ke halaman katalog produk
                  className="bg-brand-primary-300 text-white px-6 py-2.5 rounded-full text-[10px] font-bold shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
                >
                  Belanja
                </button>
              </div>
            </div>
            <Wallet className="w-44 h-44 opacity-[0.03] text-brand-primary-300 absolute right-4 top-1/2 -translate-y-1/2 rotate-12 select-none pointer-events-none" />
          </div>

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
              <div className="w-full bg-white shadow-inner h-1.5 rounded-full mb-4 overflow-hidden">
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

        {/* Detailed History Log Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-neutral-100">
          <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">
              Riwayat Transaksi Dompet
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-50 text-[10px] pl-9 pr-4 py-2.5 rounded-full border border-neutral-100 focus:border-brand-primary-100 font-bold outline-none w-48 text-brand-dark-500"
              />
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
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item, i) => {
                    const isBelanja =
                      item.tipe_transaksi === "keluar" ||
                      parseInt(item.jumlah_saldo) < 0;

                    const statusAktif =
                      item.status ||
                      item.status_jemput ||
                      item.detail_laporan?.status_jemput ||
                      "";

                    return (
                      <tr
                        key={item.id_riwayat || item.id_laporan || i}
                        className="hover:bg-neutral-50/50 transition-colors group"
                      >
                        <td className="py-4 px-2 text-[11px] font-medium text-neutral-400">
                          {formatTanggal(item.tanggal || item.createdAt)}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <span className="text-base shrink-0">
                              {isBelanja ? "🛍️" : "🌱"}
                            </span>
                            <span className="text-[11px] font-bold text-brand-dark-500">
                              {item.aktivitas ||
                                `Recycling: ${item.detail_laporan?.estimasi_berat || 0}kg Sampah Skincare`}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-2">
                          {renderTrackingStatus(statusAktif)}
                        </td>

                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border tracking-wider ${
                              isBelanja
                                ? "bg-amber-50 text-amber-600 border-amber-200/40"
                                : "bg-brand-primary-100/30 text-brand-primary-300 border-brand-primary-100/10"
                            }`}
                          >
                            {isBelanja ? "BELANJA" : "RECYCLE"}
                          </span>
                        </td>
                        <td
                          className={`py-4 px-2 text-[11px] font-black text-right font-sans text-sm ${
                            isBelanja
                              ? "text-feedback-error-200"
                              : "text-feedback-success-300"
                          }`}
                        >
                          {isBelanja
                            ? `-Rp ${Math.abs(parseInt(item.jumlah_saldo || 0)).toLocaleString("id-ID")}`
                            : `+Rp ${parseInt(item.jumlah_saldo || item.saldo_cair || 0).toLocaleString("id-ID")}`}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-20 text-center text-neutral-400 italic text-[11px] uppercase tracking-wide font-bold"
                    >
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
              Menampilkan {filteredTransactions.length} dari{" "}
              {transactions.length} total log aktivitas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPage;
