

// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// const Navbar = ({ user, onLogout }) => {
//   const [showNotif, setShowNotif] = useState(false);
//   const [notifCount, setNotifCount] = useState(0); // State untuk angka notifikasi
//   const [notifications, setNotifications] = useState([]); // State untuk list notif
//   const navigate = useNavigate();

//   const menus = [
//     { name: "Beranda", path: "/" },
//     { name: "Ensiklopedia", path: "/ensiklopedia" },
//     { name: "Daur Ulang", path: "/daur-ulang" },
//     { name: "Forum Diskusi", path: "/forum" },
//     { name: "Produk", path: "/produk" },
//     { name: "Tentang Kami", path: "/tentang-kami" },
//   ];

//   // --- 1. FETCH JUMLAH NOTIFIKASI UNREAD ---
//   const fetchNotifData = async () => {
//     if (!user) return;
//     const token = localStorage.getItem("token");
//     try {
//       // Ambil List Notifikasi
//       const resList = await fetch("http://localhost:5000/api/notifikasi", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const dataList = await resList.json();
//       if (dataList.status === "success") setNotifications(dataList.data);

//       // Ambil Count Unread
//       const resCount = await fetch(
//         "http://localhost:5000/api/notifikasi/unread",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       const dataCount = await resCount.json();
//       if (dataCount.status === "success") setNotifCount(dataCount.count);
//     } catch (error) {
//       console.error("Gagal mengambil notifikasi:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifData();
//     // Polling setiap 30 detik untuk notifikasi berjalan
//     const interval = setInterval(fetchNotifData, 30000);
//     return () => clearInterval(interval);
//   }, [user]);

//   // --- 2. TANDAI SUDAH DIBACA SAAT DROPDOWN DIBUKA ---
//   const handleToggleNotif = async () => {
//     setShowNotif(!showNotif);
//     if (!showNotif && notifCount > 0) {
//       const token = localStorage.getItem("token");
//       try {
//         await fetch("http://localhost:5000/api/notifikasi/read", {
//           method: "PUT",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotifCount(0); // Reset angka di UI
//       } catch (error) {
//         console.error("Gagal update status baca:", error);
//       }
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#3D5532]/5">
//       <div className="flex items-center gap-12">
//         <Link to="/" className="flex items-center h-full">
//           <img
//             src="/logo.png"
//             alt="SkinCycle Logo"
//             className="h-14 w-auto cursor-pointer object-contain transition-transform hover:scale-105"
//           />
//         </Link>

//         <div className="hidden md:flex gap-1">
//           {menus.map((menu) => (
//             <NavLink
//               key={menu.name}
//               to={menu.path}
//               className={({ isActive }) =>
//                 `px-4 py-1.5 rounded-lg text-[13px] tracking-wide transition-all outline-none font-bold ${
//                   isActive
//                     ? "bg-[#3D5532] text-white shadow-sm"
//                     : "text-[#3D5532] hover:bg-[#3D5532]/5"
//                 }`
//               }
//             >
//               {menu.name}
//             </NavLink>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center gap-5">
//         {user ? (
//           <div className="flex items-center gap-6 relative">
//             {/* ICON NOTIFIKASI DENGAN BADGE DINAMIS */}
//             <div className="relative">
//               <button
//                 onClick={handleToggleNotif}
//                 className="relative hover:scale-110 transition-transform active:scale-95 block"
//               >
//                 <img
//                   src="/icon notifikasi.png"
//                   alt="Notifikasi"
//                   className="w-6 h-6 object-contain"
//                 />
//                 {notifCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">
//                     {notifCount}
//                   </span>
//                 )}
//               </button>

//               {/* DROPDOWN NOTIFIKASI REAL DATA */}
//               {showNotif && (
//                 <div className="absolute right-0 mt-4 w-80 bg-white rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-5 duration-300">
//                   <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#F2EDE4]/30">
//                     <h4 className="text-sm font-serif font-bold text-[#1e2b19]">
//                       Notifikasi
//                     </h4>
//                     {notifCount > 0 && (
//                       <span className="text-[10px] bg-[#3D5532] text-white px-2 py-0.5 rounded-full font-bold">
//                         {notifCount} BARU
//                       </span>
//                     )}
//                   </div>
//                   <div className="max-h-80 overflow-y-auto">
//                     {notifications.length > 0 ? (
//                       notifications.map((n) => (
//                         <div
//                           key={n.id_notifikasi}
//                           className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
//                         >
//                           <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-lg">
//                             {n.tipe === "like" ? "👍" : "💬"}
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-[11px] leading-snug text-gray-700">
//                               <span className="font-bold">
//                                 {n.pengirim?.username}
//                               </span>{" "}
//                               {n.tipe === "like"
//                                 ? "menyukai postingan Anda."
//                                 : "membalas diskusi Anda."}
//                             </p>
//                             <p className="text-[9px] text-gray-400 mt-1">
//                               {new Date(n.tanggal).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-10 text-center text-gray-400 text-[11px]">
//                         Belum ada notifikasi
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ICON KERANJANG */}
//             <Link
//               to="/keranjang"
//               className="relative hover:scale-110 transition-transform active:scale-95"
//             >
//               <img
//                 src="/icon keranjang.png"
//                 alt="Keranjang"
//                 className="w-6 h-6 object-contain"
//               />
//               <span className="absolute -top-1 -right-1 bg-[#3D5532] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">
//                 2
//               </span>
//             </Link>

//             {/* PROFILE & DROPDOWN */}
//             <div className="flex items-center pl-5 border-l border-gray-200">
//               <div className="group relative cursor-pointer">
//                 <div className="w-10 h-10 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md overflow-hidden transition-transform hover:scale-105">
//                   {user.fotoUrl ? (
//                     <img
//                       src={user.fotoUrl}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span>
//                       {user.username
//                         ? user.username.charAt(0).toUpperCase()
//                         : "U"}
//                     </span>
//                   )}
//                 </div>

//                 <div className="absolute right-0 top-full pt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
//                   <div className="bg-white shadow-xl rounded-2xl p-2 border border-gray-100 min-w-[150px]">
//                     <Link
//                       to="/profil"
//                       className="w-full block text-left px-4 py-2 text-[11px] font-bold text-gray-500 hover:bg-gray-50 hover:text-[#3D5532] rounded-xl transition-colors uppercase"
//                     >
//                       👤 Akun Saya
//                     </Link>
//                     <hr className="my-1 border-gray-50" />
//                     <button
//                       onClick={onLogout}
//                       className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors uppercase"
//                     >
//                       🚪 Keluar
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/masuk")}
//             className="bg-[#3D5532] text-white px-8 py-2 rounded-full text-[13px] font-bold shadow-md hover:bg-[#2d4025] transition-all transform active:scale-95"
//           >
//             Masuk
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const menus = [
    { name: "Beranda", path: "/" },
    { name: "Ensiklopedia", path: "/ensiklopedia" },
    { name: "Daur Ulang", path: "/daur-ulang" },
    { name: "Forum Diskusi", path: "/forum" },
    { name: "Produk", path: "/produk" },
    { name: "Tentang Kami", path: "/tentang-kami" },
  ];

  const fetchNotifData = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    try {
      const resList = await fetch("http://localhost:5000/api/notifikasi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataList = await resList.json();
      if (dataList.status === "success") setNotifications(dataList.data);

      const resCount = await fetch("http://localhost:5000/api/notifikasi/unread", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataCount = await resCount.json();
      if (dataCount.status === "success") setNotifCount(dataCount.count);
    } catch (error) {
      console.error("Gagal mengambil notifikasi:", error);
    }
  };

  useEffect(() => {
    fetchNotifData();
    const interval = setInterval(fetchNotifData, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleToggleNotif = async () => {
    setShowNotif(!showNotif);
    if (!showNotif && notifCount > 0) {
      const token = localStorage.getItem("token");
      try {
        await fetch("http://localhost:5000/api/notifikasi/read", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifCount(0);
      } catch (error) {
        console.error("Gagal update status baca:", error);
      }
    }
  };

  // --- FUNGSI KLIK NOTIFIKASI (Arahkan ke Postingan) ---
  const handleNotifClick = (id_posting) => {
    setShowNotif(false);
    // Arahkan ke halaman forum dengan hash ID
    navigate(`/forum#post-${id_posting}`);

    // Berikan sedikit delay agar navigasi selesai sebelum melakukan scroll
    setTimeout(() => {
      const element = document.getElementById(`post-${id_posting}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Tambahkan highlight sementara agar user tahu postingan mana yang dimaksud
        element.classList.add("ring-4", "ring-[#3D5532]/20");
        setTimeout(() => element.classList.remove("ring-4", "ring-[#3D5532]/20"), 3000);
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#3D5532]/5">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center h-full">
          <img src="/logo.png" alt="SkinCycle Logo" className="h-14 w-auto object-contain transition-transform hover:scale-105" />
        </Link>

        <div className="hidden md:flex gap-1">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-[13px] tracking-wide transition-all font-bold ${
                  isActive ? "bg-[#3D5532] text-white shadow-sm" : "text-[#3D5532] hover:bg-[#3D5532]/5"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5">
        {user ? (
          <div className="flex items-center gap-6 relative">
            <div className="relative">
              <button onClick={handleToggleNotif} className="relative hover:scale-110 transition-transform active:scale-95 block">
                <img src="/icon notifikasi.png" alt="Notifikasi" className="w-6 h-6 object-contain" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">
                    {notifCount}
                  </span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-5 duration-300">
                  <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#F2EDE4]/30">
                    <h4 className="text-sm font-serif font-bold text-[#1e2b19]">Notifikasi</h4>
                    {notifCount > 0 && <span className="text-[10px] bg-[#3D5532] text-white px-2 py-0.5 rounded-full font-bold">{notifCount} BARU</span>}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id_notifikasi}
                          onClick={() => handleNotifClick(n.id_posting)}
                          className="p-4 flex gap-4 hover:bg-[#F2EDE4]/40 cursor-pointer border-b border-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-gray-100">
                            {n.tipe === "like" ? "👍" : "💬"}
                          </div>
                          <div className="flex-1">
                            <p className="text-[11px] leading-snug text-gray-700">
                              <span className="font-bold">{n.pengirim?.username}</span>{" "}
                              {n.tipe === "like" ? "menyukai postingan Anda." : "membalas diskusi Anda."}
                            </p>
                            <p className="text-[9px] text-gray-400 mt-1 italic">
                              {new Date(n.tanggal).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center text-gray-400 text-[11px]">Belum ada notifikasi</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/keranjang" className="relative hover:scale-110 transition-transform active:scale-95">
              <img src="/icon keranjang.png" alt="Keranjang" className="w-6 h-6 object-contain" />
              <span className="absolute -top-1 -right-1 bg-[#3D5532] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border-2 border-white">2</span>
            </Link>

            <div className="flex items-center pl-5 border-l border-gray-200">
              <div className="group relative cursor-pointer">
                <div className="w-10 h-10 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md overflow-hidden transition-transform hover:scale-105">
                  {user.fotoUrl ? <img src={user.fotoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span>{user.username?.charAt(0).toUpperCase()}</span>}
                </div>
                <div className="absolute right-0 top-full pt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
                  <div className="bg-white shadow-xl rounded-2xl p-2 border border-gray-100 min-w-[150px]">
                    <Link to="/profil" className="w-full block text-left px-4 py-2 text-[11px] font-bold text-gray-500 hover:bg-gray-50 hover:text-[#3D5532] rounded-xl transition-colors uppercase">👤 Akun Saya</Link>
                    <hr className="my-1 border-gray-50" />
                    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors uppercase">🚪 Keluar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/masuk")} className="bg-[#3D5532] text-white px-8 py-2 rounded-full text-[13px] font-bold shadow-md hover:bg-[#2d4025] transition-all transform active:scale-95">Masuk</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;