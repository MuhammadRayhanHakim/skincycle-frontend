// const Navbar = ({ currentPage, setPage }) => {
//   const menus = [
//     "Beranda",
//     "Ensiklopedia",
//     "Daur Ulang",
//     "Forum Diskusi",
//     "Produk",
//     "Tentang Kami",
//   ];

//   // Fungsi pembantu untuk menentukan apakah menu harus terlihat aktif
//   const isMenuActive = (menu) => {
//     // Kondisi default jika nama menu sama dengan halaman aktif
//     if (currentPage === menu) return true;

//     // Logika khusus untuk Daur Ulang: Tetap aktif jika berada di Recycle Save
//     if (menu === "Daur Ulang" && currentPage === "Recycle Save") {
//       return true;
//     }

//     // Logika khusus untuk Ensiklopedia (Kumpulan & Detail Artikel)
//     if (
//       menu === "Ensiklopedia" &&
//       (currentPage === "Kumpulan Artikel" || currentPage === "Detail Artikel")
//     ) {
//       return true;
//     }

//     return false;
//   };

//   return (
//     <nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-10 bg-[#FFFFFF]/90 backdrop-blur-md shadow-sm border-b border-[#3D5532]/5">
//       <div className="flex items-center gap-12">
//         <div className="flex items-center h-full">
//           <img
//             src="/logo.png"
//             alt="SkinCycle Logo"
//             className="h-14 w-auto cursor-pointer object-contain transition-transform hover:scale-105"
//             onClick={() => setPage("Beranda")}
//           />
//         </div>

//         {/* Menu Navigasi */}
//         <div className="hidden md:flex gap-2 font-medium">
//           {menus.map((menu) => (
//             <button
//               key={menu}
//               type="button"
//               onClick={() => setPage(menu)}
//               className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all outline-none ${
//                 isMenuActive(menu) // Menggunakan fungsi logika baru
//                   ? "bg-[#3D5532] text-white shadow-sm"
//                   : "text-[#3D5532] hover:bg-[#3D5532]/10"
//               }`}
//             >
//               {menu}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={() => setPage("Masuk")}
//         className="bg-[#3D5532] text-white px-8 py-2 rounded-full text-[13px] font-bold shadow-md hover:bg-[#2d4025] transition-all"
//       >
//         Masuk
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";

const Navbar = ({ currentPage, setPage, user, onLogout }) => {
  const menus = [
    "Beranda",
    "Ensiklopedia",
    "Daur Ulang",
    "Forum Diskusi",
    "Produk",
    "Tentang Kami",
  ];

  const isMenuActive = (menu) => {
    if (currentPage === menu) return true;

    if (
      menu === "Daur Ulang" &&
      ["Recycle Save", "Recycle Drop", "Riwayat"].includes(currentPage)
    ) {
      return true;
    }

    if (
      menu === "Ensiklopedia" &&
      ["Kumpulan Artikel", "Detail Artikel"].includes(currentPage)
    ) {
      return true;
    }

    if (menu === "Produk" && currentPage === "Produk Detail") {
      return true;
    }

    return false;
  };

  return (
    <nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#3D5532]/5">
      <div className="flex items-center gap-12">
        <div className="flex items-center h-full">
          <img
            src="/logo.png"
            alt="SkinCycle Logo"
            className="h-14 w-auto cursor-pointer object-contain transition-transform hover:scale-105"
            onClick={() => setPage("Beranda")}
          />
        </div>

        {/* Menu Navigasi - Bold Dihapus */}
        <div className="hidden md:flex gap-1">
          {menus.map((menu) => (
            <button
              key={menu}
              type="button"
              onClick={() => setPage(menu)}
              className={`px-4 py-1.5 rounded-lg text-[13px] tracking-wide transition-all outline-none ${
                isMenuActive(menu)
                  ? "bg-[#3D5532] text-white shadow-sm font-bold"
                  : "text-[#3D5532] hover:bg-[#3D5532]/5 font-bold"
              }`}
            >
              {menu}
            </button>
          ))}
        </div>
      </div>

      {/* SISI KANAN: AUTH LOGIC */}
      <div className="flex items-center gap-5">
        {user ? (
          <div className="flex items-center gap-6">
            <button className="relative text-[#3D5532] hover:scale-110 transition-transform">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">
                5
              </span>
            </button>

            <button className="relative text-[#3D5532] hover:scale-110 transition-transform">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-[#3D5532] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">
                2
              </span>
            </button>

            <div className="flex items-center gap-3 pl-5 border-l border-gray-200 group relative cursor-pointer">
              <div className="text-right hidden lg:block">
                <p className="text-[11px] font-semibold text-[#1e2b19] leading-none uppercase">
                  {user.fullName ? user.fullName.split(" ")[0] : "User"}
                </p>
                <p className="text-[9px] text-[#3D5532] font-medium uppercase tracking-tighter mt-1">
                  Pahlawan Hijau
                </p>
              </div>

              <div className="w-9 h-9 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm overflow-hidden">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="absolute right-0 top-full pt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-xl rounded-2xl p-2 border border-gray-100 min-w-[140px]">
                  <button
                    onClick={() => setPage("Riwayat")}
                    className="w-full text-left px-4 py-2 text-[10px] font-medium text-gray-500 hover:bg-gray-50 hover:text-[#3D5532] rounded-xl transition-colors uppercase"
                  >
                    ⚙️ Akun Saya
                  </button>
                  <hr className="my-1 border-gray-50" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-[10px] font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors uppercase"
                  >
                    🚪 Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setPage("Masuk")}
            className="bg-[#3D5532] text-white px-8 py-2 rounded-full text-[13px] font-medium tracking-wide shadow-md hover:bg-[#2d4025] transition-all transform active:scale-95"
          >
            Masuk
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
