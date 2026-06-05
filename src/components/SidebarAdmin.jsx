// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const SidebarAdmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Fungsi pembantu mengecek apakah menu tersebut sedang aktif berdasarkan URL rute
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="w-64 bg-white min-h-screen fixed left-0 border-r border-gray-100 p-6 flex flex-col justify-between font-['DM_Sans'] z-50">
//       <div className="space-y-8">
//         {/* LOGO SKINCYCLE ADMIN */}
//         <div
//           className="flex items-center gap-3 px-2 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <div className="text-xl font-serif font-black text-[#3D5532]">
//             SkinCycle
//           </div>
//           <span className="text-[10px] bg-[#3D5532]/10 text-[#3D5532] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
//             Admin
//           </span>
//         </div>

//         {/* JALUR NAVIGASI UTAMA */}
//         <nav className="space-y-2">
//           {/* 1. Dashboard Utama */}
//           <button
//             onClick={() => navigate("/admin/dashboard")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/dashboard")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putiih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover: Latar Abu-abu, Teks Gelap
//             }`}
//           >
//             <span className="text-base">📊</span>
//             <span className="capitalize">Dashboard Utama</span>
//           </button>

//           {/* 2. Manajemen Produk */}
//           <button
//             onClick={() => navigate("/admin/manajemen-produk")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/manajemen-produk")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putiih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover: Latar Abu-abu, Teks Gelap
//             }`}
//           >
//             <span className="text-base">📦</span>
//             <span className="capitalize">Manajemen Produk</span>
//           </button>

//           {/* 🆕 3. Manajemen Order / Pemesanan Kosmetik */}
//           <button
//             onClick={() => navigate("/admin/manajemen-pemesanan")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/manajemen-pemesanan")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putiih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover: Latar Abu-abu, Teks Gelap
//             }`}
//           >
//             <span className="text-base">🛍️</span>
//             <span className="capitalize">Manajemen Order</span>
//           </button>

//           {/* 4. Bahan Skincare (Kandungan) */}
//           <button
//             onClick={() => navigate("/admin/manajemen-kandungan")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/manajemen-kandungan")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putiih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover: Latar Abu-abu, Teks Gelap
//             }`}
//           >
//             <span className="text-base">🧪</span>
//             <span className="capitalize">Bahan Skincare</span>
//           </button>

//           {/* 5. Laporan Daur Ulang */}
//           <button
//             onClick={() => navigate("/admin/laporan-daur-ulang")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/laporan-daur-ulang")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putiih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover: Latar Abu-abu, Teks Gelap
//             }`}
//           >
//             <span className="text-base">♻️</span>
//             <span className="capitalize">Laporan Daur Ulang</span>
//           </button>

//           {/* 6. Manajemen Artikel */}
//           <button
//             onClick={() => navigate("/admin/manajemen-artikel")}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
//               isActive("/admin/manajemen-artikel")
//                 ? "bg-[#3D5532] text-white shadow-sm" // Aktif: Hijau Tua penuh, Teks Putih
//                 : "text-gray-400 hover:bg-gray-100 hover:text-gray-700" // Standby & Hover
//             }`}
//           >
//             <span className="text-base">📰</span>
//             <span className="capitalize">Manajemen Artikel</span>
//           </button>
//         </nav>
//       </div>

//       {/* TOMBOL KELUAR DASHBOARD */}
//       <div className="pt-4 border-t border-gray-100">
//         <button
//           onClick={() => navigate("/")}
//           className="w-full text-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200"
//         >
//           Keluar Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SidebarAdmin;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// 🚀 Mengimpor koleksi ikon outline minimalis dari lucide-react sesuai standar UI/UX baru
import {
  LayoutGrid,
  Box,
  ShoppingCart,
  FlaskConical,
  RefreshCw,
  FileText,
} from "lucide-react";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi pembantu mengecek apakah menu tersebut sedang aktif berdasarkan URL rute
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white min-h-screen fixed left-0 border-r border-gray-100 p-6 flex flex-col justify-between font-['DM_Sans'] z-50">
      <div className="space-y-8">
        {/* LOGO SKINCYCLE ADMIN */}
        <div
          className="flex items-center gap-3 px-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="text-xl font-serif font-black text-[#3D5532]">
            SkinCycle
          </div>
          <span className="text-[10px] bg-[#3D5532]/10 text-[#3D5532] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            Admin
          </span>
        </div>

        {/* JALUR NAVIGASI UTAMA DENGAN IKON OUTLINE MINIMALIS */}
        <nav className="space-y-2">
          {/* 1. Dashboard Utama */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/dashboard")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span className="capitalize">Dashboard Utama</span>
          </button>

          {/* 2. Manajemen Produk */}
          <button
            onClick={() => navigate("/admin/manajemen-produk")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/manajemen-produk")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <Box className="w-4 h-4 shrink-0" />
            <span className="capitalize">Manajemen Produk</span>
          </button>

          {/* 3. Manajemen Order */}
          <button
            onClick={() => navigate("/admin/manajemen-pemesanan")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/manajemen-pemesanan")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span className="capitalize">Manajemen Order</span>
          </button>

          {/* 4. Bahan Skincare (Kandungan) */}
          <button
            onClick={() => navigate("/admin/manajemen-kandungan")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/manajemen-kandungan")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <FlaskConical className="w-4 h-4 shrink-0" />
            <span className="capitalize">Bahan Skincare</span>
          </button>

          {/* 5. Laporan Daur Ulang */}
          <button
            onClick={() => navigate("/admin/laporan-daur-ulang")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/laporan-daur-ulang")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span className="capitalize">Laporan Daur Ulang</span>
          </button>

          {/* 6. Manajemen Artikel */}
          <button
            onClick={() => navigate("/admin/manajemen-artikel")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              isActive("/admin/manajemen-artikel")
                ? "bg-[#3D5532] text-white shadow-sm"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="capitalize">Manajemen Artikel</span>
          </button>
        </nav>
      </div>

      {/* TOMBOL KELUAR DASHBOARD */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="w-full text-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200"
        >
          Keluar Dashboard
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
