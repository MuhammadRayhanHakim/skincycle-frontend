// import React, { useState, useEffect, useCallback } from "react";
// import SidebarAdmin from "../components/SidebarAdmin";

// const AdminRecycleReport = () => {
//   const [laporan, setLaporan] = useState([]);
//   const [selectedLaporan, setSelectedLaporan] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // --- STATE UNTUK POPUP MODAL & INPUT SALDO ---
//   const [showModal, setShowModal] = useState(false);
//   const [saldoInput, setSaldoInput] = useState("");
//   const [isKonfirmasiPengepul, setIsKonfirmasiPengepul] = useState(false);
//   const [isActionLoading, setIsActionLoading] = useState(false);

//   // --- LOGIKA FETCH DATA DARI BACKEND ---
//   const fetchLaporan = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:5000/api/admin/all-laporan",
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
//         setLaporan(result.data);

//         // Atur data terpilih otomatis di awal hanya jika belum ada yang dipilih
//         if (result.data.length > 0 && !selectedLaporan) {
//           // Cari data pertama yang statusnya belum selesai sebagai default
//           const defaultSelect = result.data.find(
//             (item) => item.status_jemput !== "selesai",
//           );
//           setSelectedLaporan(defaultSelect || result.data[0]);
//         }
//       } else {
//         console.error("Gagal sinkronisasi:", result.message);
//       }
//     } catch (error) {
//       console.error("Kesalahan jaringan/server:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedLaporan]);

//   const handleVerify = async () => {
//     if (!selectedLaporan) return;
//     setIsActionLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:5000/api/admin/verify-recycle",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             id_laporan: selectedLaporan.id_laporan,
//           }),
//         },
//       );

//       const result = await response.json();

//       if (result.status === "success") {
//         alert(result.message);
//         await fetchLaporan();
//       } else {
//         alert("Gagal verifikasi: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error verifikasi:", error);
//       alert("Terjadi kesalahan pada server.");
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   // --- LOGIKA KIRIM SALDO & FINALISASI ---
//   const handleKirimSaldoFinal = async (e) => {
//     e.preventDefault();
//     if (!saldoInput || parseInt(saldoInput) <= 0) {
//       alert("Silakan masukkan jumlah nominal saldo pencairan yang valid.");
//       return;
//     }
//     if (!isKonfirmasiPengepul) {
//       alert(
//         "Silakan aktifkan switch konfirmasi penyerahan ke pengepul terlebih dahulu.",
//       );
//       return;
//     }

//     setIsActionLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:5000/api/admin/final-recycle",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             id_laporan: selectedLaporan.id_laporan,
//             saldo_final: parseInt(saldoInput),
//           }),
//         },
//       );

//       const result = await response.json();

//       if (result.status === "success") {
//         alert("Sukses! " + result.message);
//         setShowModal(false);
//         setSaldoInput("");
//         setIsKonfirmasiPengepul(false);
//         setSelectedLaporan(null); // Kosongkan detail kanan karena laporan sudah selesai dan pindah ke tabel bawah
//         await fetchLaporan();
//       } else {
//         alert("Gagal memproses pengiriman saldo: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error finalisasi:", error);
//       alert("Terjadi masalah internal server backend.");
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   // --- AUTO-REFRESH SETIAP 30 DETIK (POLLING) ---
//   useEffect(() => {
//     fetchLaporan();
//     const interval = setInterval(() => {
//       fetchLaporan();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [fetchLaporan]);

//   // =========================================================================
//   // --- PROSES MENYARING DATA LAPORAN (FILTERING) ---
//   // =========================================================================
//   // 1. Menyaring antrean aktif (Hanya status pending / proses penjemputan)
//   const antreanAktif = laporan.filter(
//     (item) =>
//       item.status_jemput === "menunggu_verifikasi" ||
//       item.status_jemput === "sedang_dijemput",
//   );

//   // 2. Menyaring daftar arsip bawah (Hanya status yang sudah selesai)
//   const daftarLaporanSelesai = laporan.filter(
//     (item) => item.status_jemput === "selesai",
//   );

//   if (isLoading && laporan.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F8FBF9]">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-[#3D5532] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-[#3D5532] font-black uppercase text-[10px] tracking-widest">
//             Sinkronisasi Data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-[#F8FBF9] font-sans relative">
//       <SidebarAdmin />

//       <main className="flex-1 ml-64 p-8 overflow-y-auto">
//         <header className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 tracking-tighter uppercase">
//               Laporan Daur Ulang
//             </h1>
//             <p className="text-sm text-gray-400 italic">
//               Verifikasi kontribusi lingkungan dari pengguna SkinCycle.
//             </p>
//           </div>
//           <button className="bg-white border border-gray-100 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#3D5532] transition-all shadow-sm">
//             📥 Export Data
//           </button>
//         </header>

//         {/* --- LOGIKA LEVEL 1: GRID LIST ANTREAN KIRI & PANEL DETAIL KANAN --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//           {/* LIST ANTREAN (KIRI) - MEMAKAI DATA antreanAktif */}
//           <div className="bg-white p-6 rounded-[35px] shadow-sm border border-gray-50 h-fit">
//             <h3 className="font-black mb-6 text-[10px] flex justify-between items-center text-gray-300 uppercase tracking-widest">
//               Permintaan Terbaru 🕒
//               <span className="bg-[#3D5532] text-white px-2 py-0.5 rounded-full font-sans">
//                 {antreanAktif.length}
//               </span>
//             </h3>
//             <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
//               {antreanAktif.length > 0 ? (
//                 antreanAktif.map((item) => (
//                   <div
//                     key={item.id_laporan}
//                     onClick={() => setSelectedLaporan(item)}
//                     className={`p-5 rounded-2xl cursor-pointer transition-all border ${
//                       selectedLaporan?.id_laporan === item.id_laporan
//                         ? "bg-[#E9F2E7] border-[#3D5532]/20 shadow-inner"
//                         : "bg-gray-50 border-transparent hover:border-gray-100"
//                     }`}
//                   >
//                     <p className="text-xs font-black text-[#3D5532] uppercase tracking-tighter">
//                       {item.penulis_laporan?.username || "User Anonim"}
//                     </p>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-[10px] font-bold text-gray-400">
//                         ⚖️ {item.estimasi_berat} KG
//                       </p>
//                       <span
//                         className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
//                           item.status_jemput === "sedang_dijemput"
//                             ? "bg-blue-100 text-blue-600"
//                             : "bg-orange-100 text-orange-600"
//                         }`}
//                       >
//                         {item.status_jemput?.replace("_", " ")}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="py-20 text-center">
//                   <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
//                     Tidak ada antrean aktif
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* DETAIL VERIFIKASI (KANAN) */}
//           <div className="lg:col-span-2 bg-white p-10 rounded-[45px] shadow-sm border border-gray-50 flex flex-col md:flex-row gap-10 h-fit">
//             {selectedLaporan ? (
//               <>
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between items-start mb-8">
//                       <h3 className="font-black text-[10px] text-gray-300 uppercase tracking-[0.2em]">
//                         Detail Verifikasi Laporan
//                       </h3>
//                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
//                         ID: #RC-{selectedLaporan.id_laporan || "0"}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-5 mb-10">
//                       <div className="w-16 h-16 bg-[#3D5532] rounded-[22px] flex items-center justify-center text-white text-2xl font-black uppercase shadow-lg shadow-[#3D5532]/20">
//                         {selectedLaporan.penulis_laporan?.username?.charAt(0) ||
//                           "U"}
//                       </div>
//                       <div>
//                         <p className="font-black text-xl text-[#3D5532] uppercase tracking-tighter leading-none mb-1">
//                           {selectedLaporan.penulis_laporan?.username ||
//                             "Pilih Laporan"}
//                         </p>
//                         <p className="text-[10px] text-gray-300 font-bold tracking-widest">
//                           Administrator SkinCycle
//                         </p>
//                       </div>
//                     </div>

//                     <div className="space-y-4 mb-12">
//                       <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
//                         <p className="font-black text-[9px] text-gray-300 uppercase tracking-widest mb-2">
//                           Alamat Penjemputan
//                         </p>
//                         <p className="text-xs text-gray-600 leading-relaxed font-medium">
//                           {selectedLaporan.alamat_penjemputan}
//                         </p>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 text-center">
//                           <p className="font-black text-[9px] text-gray-300 uppercase tracking-widest mb-1">
//                             Berat Estimasi
//                           </p>
//                           <p className="font-black text-[#3D5532] text-lg">
//                             {selectedLaporan.estimasi_berat || 0} KG
//                           </p>
//                         </div>
//                         <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100 text-center">
//                           <p className="font-black text-[9px] text-gray-300 uppercase tracking-widest mb-1">
//                             Status
//                           </p>
//                           <p className="font-black text-[#3D5532] text-[10px] uppercase">
//                             {selectedLaporan.status_jemput?.replace("_", " ") ||
//                               "-"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={handleVerify}
//                       disabled={
//                         selectedLaporan.status_jemput !==
//                           "menunggu_verifikasi" || isActionLoading
//                       }
//                       className="w-full bg-[#3D5532] text-white py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#2d4025] transition-all transform active:scale-95 disabled:opacity-20 disabled:grayscale"
//                     >
//                       Selesaikan Verifikasi
//                     </button>

//                     {selectedLaporan.status_jemput === "sedang_dijemput" && (
//                       <button
//                         onClick={() => setShowModal(true)}
//                         className="w-full bg-orange-500 text-white py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all transform active:scale-95"
//                       >
//                         Kirim Saldo
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* BUKTI FOTO SAMPAH */}
//                 <div className="w-full md:w-72">
//                   <p className="text-[9px] font-black text-gray-300 uppercase mb-4 tracking-[0.2em]">
//                     Bukti Visual Sampah
//                   </p>
//                   <div className="w-full aspect-[4/5] bg-gray-100 rounded-[35px] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center shadow-inner group transition-all">
//                     {selectedLaporan.foto_bukti_fisik ? (
//                       <img
//                         src={`http://localhost:5000/uploads/${selectedLaporan.foto_bukti_fisik}`}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                         alt="Bukti Sampah User"
//                       />
//                     ) : (
//                       <div className="text-center p-8">
//                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-loose text-center">
//                           Belum ada foto
//                           <br />
//                           yang dilampirkan
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="w-full py-28 text-center text-gray-300 text-xs italic font-bold">
//                 Silakan pilih antrean aktif di sebelah kiri untuk melihat detail
//                 laporan.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ========================================================================= */}
//         {/* --- LOGIKA LEVEL 2: DAFTAR LAPORAN DAUR ULANG SELESAI (TABEL BAWAH) --- */}
//         {/* ========================================================================= */}
//         <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 w-full mt-6">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="font-bold text-gray-800 text-sm uppercase tracking-widest">
//               Daftar Laporan Daur Ulang ✅
//             </h3>
//             <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
//               Total {daftarLaporanSelesai.length} Laporan Selesai
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
//                   <th className="py-4 px-4">ID Laporan</th>
//                   <th className="py-4 px-4">User</th>
//                   <th className="py-4 px-4">Status</th>
//                   <th className="py-4 px-4">Berat</th>
//                   <th className="py-4 px-4 text-right">Saldo Cair</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-600">
//                 {daftarLaporanSelesai.length > 0 ? (
//                   daftarLaporanSelesai.map((item) => (
//                     <tr
//                       key={item.id_laporan}
//                       className="hover:bg-gray-50/70 transition-colors"
//                     >
//                       <td className="py-4 px-4 font-bold text-[#3D5532]">
//                         #RC-{item.id_laporan}
//                       </td>
//                       <td className="py-4 px-4 uppercase">
//                         {item.penulis_laporan?.username || "N/A"}
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="px-3 py-1 rounded-full text-[9px] font-black bg-green-50 text-green-600 border border-green-100 uppercase tracking-wider">
//                           {item.status_jemput}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 font-bold">
//                         {item.estimasi_berat} KG
//                       </td>
//                       <td className="py-4 px-4 text-right font-black text-emerald-600 text-sm">
//                         +Rp{" "}
//                         {parseInt(item.saldo_cair || 0).toLocaleString("id-ID")}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="py-12 text-center text-gray-400 italic text-[11px] font-bold uppercase tracking-wide"
//                     >
//                       Belum ada laporan daur ulang yang berstatus selesai.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* --- POP-UP MODAL INPUT SALDO --- */}
//         {showModal && selectedLaporan && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
//             <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
//               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F9FBF9]">
//                 <h4 className="text-[12px] font-black text-[#3D5532] uppercase italic tracking-wider">
//                   Konfirmasi Penyerahan Sampah
//                 </h4>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-400 hover:text-gray-600 text-sm font-bold"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="p-6">
//                 <div className="bg-[#3D5532]/5 p-4 rounded-2xl border border-[#3D5532]/10 mb-5 grid grid-cols-2 gap-y-3 text-[11px]">
//                   <div>
//                     <span className="text-gray-400 font-bold block">User</span>
//                     <p className="font-black text-gray-700 uppercase">
//                       {selectedLaporan.penulis_laporan?.username || "N/A"}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-gray-400 font-bold block">Berat</span>
//                     <p className="font-black text-gray-700">
//                       {selectedLaporan.estimasi_berat} kg
//                     </p>
//                   </div>
//                   <div className="col-span-2">
//                     <span className="text-gray-400 font-bold block">
//                       Jenis Sampah
//                     </span>
//                     <p className="font-black text-[#3D5532] uppercase tracking-wider">
//                       Plastik & Kertas
//                     </p>
//                   </div>
//                 </div>

//                 <form onSubmit={handleKirimSaldoFinal}>
//                   <div className="mb-5">
//                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2">
//                       Total Nilai (Rp)
//                     </label>
//                     <input
//                       type="number"
//                       value={saldoInput}
//                       onChange={(e) => setSaldoInput(e.target.value)}
//                       placeholder="Masukkan jumlah saldo..."
//                       required
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#3D5532] focus:ring-2 focus:ring-[#3D5532]/10"
//                     />
//                     <span className="text-[9px] text-gray-400 italic mt-2 block leading-tight">
//                       *Saldo akan otomatis dikirim ke dompet user setelah
//                       konfirmasi.
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100 mb-6">
//                     <span className="text-[10px] font-black text-gray-500 uppercase">
//                       Konfirmasi Penyerahan ke Pengepul
//                     </span>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isKonfirmasiPengepul}
//                         onChange={(e) =>
//                           setIsKonfirmasiPengepul(e.target.checked)
//                         }
//                         className="sr-only peer"
//                       />
//                       <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
//                     </label>
//                   </div>

//                   <div className="flex gap-3 border-t border-gray-100 pt-4">
//                     <button
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                       className="w-1/2 bg-gray-100 text-gray-500 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
//                     >
//                       Batalkan
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isActionLoading}
//                       className="w-1/2 bg-emerald-600 text-white py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
//                     >
//                       {isActionLoading
//                         ? "Mengirim..."
//                         : "Konfirmasi & Kirim Saldo"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminRecycleReport;

import React, { useState, useEffect, useCallback } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {
  CheckCircle2,
  Clock,
  Inbox,
  FileText,
  Check,
  X,
  ShieldAlert,
  Loader2,
  Award,
  Banknote,
  MapPin,
  Scale,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const AdminRecycleReport = () => {
  const [laporan, setLaporan] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE UNTUK POPUP MODAL & INPUT SALDO ---
  const [showModal, setShowModal] = useState(false);
  const [saldoInput, setSaldoInput] = useState("");
  const [isKonfirmasiPengepul, setIsKonfirmasiPengepul] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // --- LOGIKA FETCH DATA DARI BACKEND ---
  const fetchLaporan = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/all-laporan",
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
        setLaporan(result.data);

        // Atur data terpilih otomatis di awal hanya jika belum ada yang dipilih
        if (result.data.length > 0 && !selectedLaporan) {
          // Cari data pertama yang statusnya belum selesai sebagai default
          const defaultSelect = result.data.find(
            (item) => item.status_jemput !== "selesai",
          );
          setSelectedLaporan(defaultSelect || result.data[0]);
        }
      } else {
        console.error("Gagal sinkronisasi:", result.message);
      }
    } catch (error) {
      console.error("Kesalahan jaringan/server:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLaporan]);

  useEffect(() => {
    fetchLaporan();
  }, [fetchLaporan]);

  const handleVerify = async () => {
    if (!selectedLaporan) return;
    setIsActionLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/verify-recycle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_laporan: selectedLaporan.id_laporan,
          }),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        alert(result.message);
        await fetchLaporan();
      } else {
        alert("Gagal verifikasi: " + result.message);
      }
    } catch (error) {
      console.error("Error verifikasi:", error);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- LOGIKA KIRIM SALDO & FINALISASI ---
  const handleKirimSaldoFinal = async (e) => {
    e.preventDefault();
    if (!saldoInput || parseInt(saldoInput) <= 0) {
      alert("Silakan masukkan jumlah nominal saldo pencairan yang valid.");
      return;
    }
    if (!isKonfirmasiPengepul) {
      alert(
        "Silakan aktifkan switch konfirmasi penyerahan ke pengepul terlebih dahulu.",
      );
      return;
    }

    setIsActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/final-recycle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_laporan: selectedLaporan.id_laporan,
            saldo_final: parseInt(saldoInput),
          }),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        alert("Sukses! " + result.message);
        setShowModal(false);
        setSaldoInput("");
        setIsKonfirmasiPengepul(false);
        setSelectedLaporan(null); // Kosongkan detail kanan karena laporan sudah selesai dan pindah ke tabel bawah
        await fetchLaporan();
      } else {
        alert("Gagal memproses pengiriman saldo: " + result.message);
      }
    } catch (error) {
      console.error("Error finalisasi:", error);
      alert("Terjadi masalah internal server backend.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- AUTO-REFRESH SETIAP 30 DETIK (POLLING) ---
  useEffect(() => {
    fetchLaporan();
    const interval = setInterval(() => {
      fetchLaporan();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchLaporan]);

  // =========================================================================
  // --- PROSES MENYARING DATA LAPORAN (FILTERING) ---
  // =========================================================================
  // 1. Menyaring antrean aktif (Hanya status pending / proses penjemputan)
  const antreanAktif = laporan.filter(
    (item) =>
      item.status_jemput === "menunggu_verifikasi" ||
      item.status_jemput === "sedang_dijemput",
  );

  // 2. Menyaring daftar arsip bawah (Hanya status yang sudah selesai)
  const daftarLaporanSelesai = laporan.filter(
    (item) => item.status_jemput === "selesai",
  );

  if (isLoading && laporan.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 font-sans">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-primary-300 animate-spin mx-auto mb-4" />
          <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">
            Sinkronisasi Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans relative text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-marcellus text-brand-dark-500 uppercase tracking-tight">
              Laporan Daur Ulang
            </h1>
            <p className="text-sm text-neutral-400 font-medium mt-0.5">
              Verifikasi kontribusi lingkungan dari pengguna sirkular SkinCycle.
            </p>
          </div>
          <button className="bg-neutral-default border border-neutral-100 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-brand-primary-300 transition-all shadow-sm flex items-center gap-1.5 outline-none">
            📥 Export Data
          </button>
        </header>

        {/* --- LOGIKA LEVEL 1: GRID LIST ANTREAN KIRI & PANEL DETAIL KANAN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          {/* LIST ANTREAN (KIRI) - MEMAKAI DATA antreanAktif */}
          <div className="lg:col-span-4 bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100 h-fit">
            <h3 className="font-black mb-6 text-[10px] flex justify-between items-center text-neutral-400 uppercase tracking-widest">
              Permintaan Terbaru <Clock className="w-4 h-4 text-neutral-300" />
              <span className="bg-brand-primary-300 text-neutral-default px-2.5 py-0.5 rounded-full font-sans font-black">
                {antreanAktif.length}
              </span>
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {antreanAktif.length > 0 ? (
                antreanAktif.map((item) => (
                  <div
                    key={item.id_laporan}
                    onClick={() => setSelectedLaporan(item)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                      selectedLaporan?.id_laporan === item.id_laporan
                        ? "bg-brand-primary-100/20 border-brand-primary-300 shadow-inner"
                        : "bg-neutral-50 border-transparent hover:border-neutral-100"
                    }`}
                  >
                    <p className="text-xs font-black text-brand-primary-500 uppercase tracking-tight">
                      {item.penulis_laporan?.username || "User Anonim"}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-bold text-neutral-400">
                        ⚖️ {item.estimasi_berat} KG
                      </p>
                      <span
                        className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                          item.status_jemput === "sedang_dijemput"
                            ? "bg-feedback-info-100 text-brand-primary-300"
                            : "bg-feedback-warning-100 text-feedback-warning-300"
                        }`}
                      >
                        {item.status_jemput?.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">
                    Tidak ada antrean aktif
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DETAIL VERIFIKASI (KANAN) */}
          <div className="lg:col-span-8 bg-neutral-default p-10 rounded-[45px] shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-10 h-fit">
            {selectedLaporan ? (
              <>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="font-black text-[10px] text-neutral-300 uppercase tracking-[0.2em]">
                        Detail Verifikasi Laporan
                      </h3>
                      <span className="text-[9px] font-black text-neutral-300 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-md uppercase tracking-widest">
                        ID: #RC-{selectedLaporan.id_laporan || "0"}
                      </span>
                    </div>

                    <div className="flex items-center gap-5 mb-10">
                      <div className="w-14 h-14 bg-brand-primary-300 rounded-[22px] flex items-center justify-center text-neutral-default text-xl font-marcellus font-black uppercase shadow-lg shadow-brand-primary-500/20">
                        {selectedLaporan.penulis_laporan?.username?.charAt(0) ||
                          "U"}
                      </div>
                      <div>
                        <p className="font-marcellus font-black text-xl text-brand-dark-500 uppercase tracking-tight leading-none mb-1">
                          {selectedLaporan.penulis_laporan?.username || "User"}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-bold tracking-widest">
                          MEMBER KONTRIBUTOR
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-12">
                      <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 flex gap-3 items-start">
                        <MapPin className="w-4 h-4 text-brand-primary-300 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-[9px] text-neutral-300 uppercase tracking-widest mb-1">
                            Alamat Penjemputan
                          </p>
                          <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                            {selectedLaporan.alamat_penjemputan}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 text-center">
                          <p className="font-black text-[9px] text-neutral-300 uppercase tracking-widest mb-1">
                            Berat Estimasi
                          </p>
                          <p className="font-marcellus font-black text-brand-primary-300 text-lg">
                            {selectedLaporan.estimasi_berat || 0} KG
                          </p>
                        </div>
                        <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 text-center">
                          <p className="font-black text-[9px] text-neutral-300 uppercase tracking-widest mb-1">
                            Status Alur
                          </p>
                          <p className="font-sans font-black text-brand-primary-300 text-[10px] uppercase tracking-wide">
                            {selectedLaporan.status_jemput?.replace("_", " ") ||
                              "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={
                        selectedLaporan.status_jemput !==
                          "menunggu_verifikasi" || isActionLoading
                      }
                      className="w-full bg-brand-primary-300 text-neutral-default py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-primary-500 transition-all outline-none disabled:opacity-20 disabled:grayscale"
                    >
                      Selesaikan Verifikasi
                    </button>

                    {selectedLaporan.status_jemput === "sedang_dijemput" && (
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="w-full bg-feedback-warning-300 text-brand-dark-500 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-feedback-warning-200 transition-all outline-none"
                      >
                        Kirim Saldo
                      </button>
                    )}
                  </div>
                </div>

                {/* BUKTI FOTO SAMPAH */}
                <div className="w-full md:w-64 shrink-0">
                  <p className="text-[9px] font-black text-neutral-300 uppercase mb-4 tracking-[0.2em]">
                    Bukti Visual Sampah
                  </p>
                  <div className="w-full aspect-[4/5] bg-neutral-50 rounded-[35px] overflow-hidden border-2 border-dashed border-neutral-200 flex items-center justify-center shadow-inner">
                    {selectedLaporan.foto_bukti_fisik ? (
                      <img
                        src={`http://localhost:5000/uploads/${selectedLaporan.foto_bukti_fisik}`}
                        className="w-full h-full object-cover"
                        alt="Bukti Sampah User"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <p className="text-[9px] font-black text-neutral-300 uppercase tracking-widest leading-loose text-center">
                          Belum ada foto
                          <br />
                          yang dilampirkan
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full py-28 text-center text-neutral-300 text-xs italic font-bold flex flex-col items-center justify-center gap-2">
                <FileText className="w-8 h-8 opacity-40" />
                Silakan pilih antrean aktif di sebelah kiri untuk melihat detail
                laporan.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* --- LOGIKA LEVEL 2: DAFTAR LAPORAN DAUR ULANG SELESAI (TABEL BAWAH) --- */}
        {/* ========================================================================= */}
        <div className="bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-100 w-full mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">
              Daftar Laporan Daur Ulang Selesai ✅
            </h3>
            <span className="text-[9px] font-black text-brand-primary-300 bg-brand-primary-100/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Total {daftarLaporanSelesai.length} Laporan Selesai
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
                  <th className="py-4 px-4">ID Laporan</th>
                  <th className="py-4 px-4">User</th>
                  <th className="py-4 px-4">Status Alur</th>
                  <th className="py-4 px-4">Berat</th>
                  <th className="py-4 px-4 text-right">Saldo Cair</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-xs font-semibold text-neutral-600">
                {daftarLaporanSelesai.length > 0 ? (
                  daftarLaporanSelesai.map((item) => (
                    <tr
                      key={item.id_laporan}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-brand-primary-300">
                        #RC-{item.id_laporan}
                      </td>
                      <td className="py-4 px-4 uppercase font-bold text-brand-dark-500">
                        {item.penulis_laporan?.username || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-[9px] font-black bg-brand-primary-100/20 text-brand-primary-300 border border-brand-primary-100/30 uppercase tracking-wider">
                          {item.status_jemput}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-neutral-500">
                        {item.estimasi_berat} KG
                      </td>
                      <td className="py-4 px-4 text-right font-marcellus font-black text-feedback-success-300 text-sm">
                        +Rp{" "}
                        {parseInt(item.saldo_cair || 0).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 text-center text-neutral-400 italic text-[11px] font-bold uppercase tracking-wide"
                    >
                      Belum ada laporan daur ulang yang berstatus selesai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- POP-UP MODAL INPUT DISBURSE REWARD SALDO --- */}
        {showModal && selectedLaporan && (
          <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-neutral-default rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-neutral-100 animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-neutral-50 flex justify-between items-center bg-neutral-50">
                <h4 className="text-[12px] font-black text-brand-primary-300 uppercase italic tracking-wider">
                  Konfirmasi Penyerahan Sampah
                </h4>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-neutral-400 hover:text-brand-dark-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-brand-primary-100/10 p-4 rounded-2xl border border-brand-primary-100/20 mb-5 grid grid-cols-2 gap-y-3 text-[11px]">
                  <div>
                    <span className="text-neutral-400 font-bold block">
                      Target User
                    </span>
                    <p className="font-black text-brand-dark-500 uppercase">
                      {selectedLaporan.penulis_laporan?.username || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block">
                      Berat Fisik
                    </span>
                    <p className="font-black text-brand-dark-500">
                      {selectedLaporan.estimasi_berat} kg
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-400 font-bold block">
                      Jenis Sampah
                    </span>
                    <p className="font-black text-brand-primary-300 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Plastik & Kertas
                    </p>
                  </div>
                </div>

                <form onSubmit={handleKirimSaldoFinal}>
                  <div className="mb-5">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <Banknote className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                      Total Nilai Pencairan (Rp)
                    </label>
                    <input
                      type="number"
                      value={saldoInput}
                      onChange={(e) => setSaldoInput(e.target.value)}
                      placeholder="Masukkan jumlah saldo rupiah..."
                      required
                      className="w-full px-4 py-3.5 bg-neutral-50 rounded-xl border border-transparent text-xs font-bold text-brand-dark-500 focus:outline-none focus:border-brand-primary-300"
                    />
                    <span className="text-[9px] text-neutral-400 italic mt-2 block leading-tight">
                      *Saldo reward otomatis dikirim langsung ke dompet digital
                      milik pengguna setelah konfirmasi disetujui.
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 mb-6">
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wide">
                      Fisik Diserahkan ke Pengepul
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isKonfirmasiPengepul}
                        onChange={(e) =>
                          setIsKonfirmasiPengepul(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-neutral-default after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-default after:border-neutral-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary-300"></div>
                    </label>
                  </div>

                  <div className="flex gap-3 border-t border-neutral-50 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-1/2 bg-neutral-50 text-neutral-400 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-neutral-100 outline-none"
                    >
                      Batalkan
                    </button>
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="w-1/2 bg-brand-primary-300 text-neutral-default py-3 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-md hover:bg-brand-primary-500 disabled:opacity-50 flex items-center justify-center gap-1 outline-none"
                    >
                      {isActionLoading ? (
                        "Mengirim..."
                      ) : (
                        <>
                          Konfirmasi <Check className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRecycleReport;
