import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Heart,
  RefreshCw,
  ChevronDown,
  BookOpen,
  FileText,
  Recycle,
  Package,
  History,
} from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const notifRef = useRef(null);

  // Mengembalikan fungsionalitas state scroll khusus untuk user reguler
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // --- FUNGSI HELPER WAKTU REAL-TIME ---
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Baru saja";
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    const diffInMins = Math.floor(diffInMs / 60000);
    if (diffInMins < 1) return "Baru saja";
    if (diffInMins < 60) return `${diffInMins} menit yang lalu`;
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  // 🌟 LOGIKA SCROLL AKTIF: Navbar user akan otomatis menyembunyikan diri
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
        setShowNotif(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCartCount = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/keranjang", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status === "success") {
        const total =
          data.data?.reduce((sum, item) => sum + (item.kuantitas || 1), 0) || 0;
        setCartCount(total);
      }
    } catch (error) {
      console.error("Gagal mengambil data keranjang:", error);
    }
  };

  const fetchNotifData = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    try {
      const resList = await fetch("http://localhost:5000/api/notifikasi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataList = await resList.json();
      if (dataList.status === "success") setNotifications(dataList.data);

      const resCount = await fetch(
        "http://localhost:5000/api/notifikasi/unread",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const dataCount = await resCount.json();
      if (dataCount.status === "success") setNotifCount(dataCount.count);
    } catch (error) {
      console.error("Gagal mengambil notifikasi:", error);
    }
  };

  // Polling setiap 30 detik (fallback)
  useEffect(() => {
    fetchNotifData();
    fetchCartCount();
    const interval = setInterval(() => {
      fetchNotifData();
      fetchCartCount();
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // ✅ LISTENER INSTAN: Badge keranjang langsung update saat produk ditambahkan
  useEffect(() => {
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, [user]);

  // ✅ LISTENER INSTAN: Badge notifikasi langsung update saat ada notif baru
  useEffect(() => {
    const handleNotifUpdate = () => fetchNotifData();
    window.addEventListener("notif-updated", handleNotifUpdate);
    return () => window.removeEventListener("notif-updated", handleNotifUpdate);
  }, [user]);

  const handleToggleNotif = async () => {
    const nextShowState = !showNotif;
    setShowNotif(nextShowState);

    if (nextShowState && notifCount > 0) {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/notifikasi/read", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        const resData = await res.json();
        if (resData.status === "success") {
          setNotifCount(0);
        }
      } catch (error) {
        console.error("Gagal memperbarui status baca notifikasi:", error);
      }
    }
  };

  const handleNotifClick = (notif) => {
    setShowNotif(false);
    if (["suka", "like", "balasan", "komentar"].includes(notif.tipe)) {
      if (notif.id_posting) navigate(`/forum#post-${notif.id_posting}`);
      else navigate("/forum");
    } else if (notif.id_laporan || notif.tipe.includes("daur_ulang")) {
      navigate(user.role === "admin" ? "/admin/dashboard" : "/profil");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-primary-300/5 font-sans z-50 transition-transform duration-500 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="flex items-center h-full transition-transform hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="SkinCycle Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                  isActive
                    ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                    : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                }`
              }
            >
              Beranda
            </NavLink>

            {/* DROPDOWN: ENSIKLOPEDIA */}
            <div className="relative group">
              <NavLink
                to="/ensiklopedia"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all flex items-center gap-1 ${
                    isActive
                      ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                      : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                  }`
                }
              >
                Ensiklopedia{" "}
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </NavLink>
              <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-neutral-default shadow-2xl rounded-2xl p-2 border border-neutral-100 min-w-[200px]">
                  <Link
                    to="/ensiklopedia/kumpulan"
                    className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                    Artikel Edukasi
                  </Link>
                  <Link
                    to="/ensiklopedia/kandungan"
                    className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                    Kandungan Bahan
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <NavLink
                to="/daur-ulang"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all flex items-center gap-1 ${
                    isActive
                      ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                      : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                  }`
                }
              >
                Daur Ulang{" "}
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </NavLink>
              <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-neutral-default shadow-2xl rounded-2xl p-2 border border-neutral-100 min-w-[200px]">
                  <Link
                    to="/daur-ulang"
                    className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Recycle className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                    Edukasi Daur Ulang
                  </Link>
                  <Link
                    to="/daur-ulang/simpan"
                    className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Package className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                    Mulai Setor Sampah
                  </Link>
                  <Link
                    to="/riwayat"
                    className="w-full text-left px-4 py-2.5 text-[12px] font-bold text-neutral-600 hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <History className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                    Riwayat & Saldo
                  </Link>
                </div>
              </div>
            </div>

            <NavLink
              to="/forum"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                  isActive
                    ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                    : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                }`
              }
            >
              Forum Diskusi
            </NavLink>

            <NavLink
              to="/produk"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                  isActive
                    ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                    : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                }`
              }
            >
              Produk
            </NavLink>

            <NavLink
              to="/tentang-kami"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ${
                  isActive
                    ? "bg-brand-primary-300 text-neutral-default shadow-sm"
                    : "text-brand-primary-300 hover:bg-brand-primary-100/20"
                }`
              }
            >
              Tentang Kami
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-6 relative">
              <div className="relative" ref={notifRef}>
                <button
                  onClick={handleToggleNotif}
                  className="relative hover:scale-110 transition-transform text-brand-primary-300 outline-none pt-1 block"
                >
                  <Bell className="w-5 h-5 text-brand-primary-300" />
                  {notifCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-feedback-warning-300 text-brand-dark-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-neutral-default font-black">
                      {notifCount}
                    </span>
                  )}
                </button>

                {showNotif && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-neutral-default shadow-2xl rounded-2xl border border-neutral-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-neutral-50 bg-neutral-50">
                      <h3 className="text-[11px] font-black text-brand-primary-300 uppercase italic tracking-widest">
                        Pemberitahuan
                      </h3>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => {
                          let teksAksi = "";
                          let IconComponent = RefreshCw;
                          let iconColor = "text-brand-primary-300";

                          if (notif.tipe === "suka" || notif.tipe === "like") {
                            teksAksi = "menyukai postingan anda";
                            IconComponent = Heart;
                            iconColor = "text-feedback-error-200";
                          } else if (
                            notif.tipe === "balasan" ||
                            notif.id_komentar
                          ) {
                            teksAksi = "membalas komentar anda";
                            IconComponent = MessageSquare;
                            iconColor = "text-brand-primary-300";
                          } else if (notif.tipe === "komentar") {
                            teksAksi = "mengomentari postingan anda";
                            IconComponent = MessageSquare;
                            iconColor = "text-brand-primary-300";
                          } else if (
                            notif.id_laporan ||
                            notif.tipe?.includes("daur_ulang") ||
                            notif.tipe?.includes("penjemputan") ||
                            notif.tipe === "saldo_cair"
                          ) {
                            if (user.role === "admin") {
                              teksAksi = `Permintaan penjemputan baru dari ${
                                notif.pengirim?.username || "user"
                              } di wilayah Bekasi Regency.`;
                            } else {
                              if (notif.tipe === "saldo_cair") {
                                teksAksi =
                                  "telah mengirimkan sampah ke pengepul dan saldo sudah dikirim ke anda";
                              } else {
                                teksAksi = "sampah anda sedang dalam penjemputan";
                              }
                            }
                          } else {
                            teksAksi =
                              notif.pesan || "melakukan interaksi pada akun anda";
                          }

                          if (
                            notif.id_laporan &&
                            teksAksi === "melakukan interaksi pada akun anda"
                          ) {
                            return null;
                          }

                          return (
                            <div
                              key={notif.id_notifikasi}
                              onClick={() => handleNotifClick(notif)}
                              className={`p-4 border-b border-neutral-50 hover:bg-neutral-50 transition-all cursor-pointer flex items-center gap-3 ${
                                !notif.is_read ? "bg-brand-primary-100/10" : ""
                              }`}
                            >
                              <IconComponent
                                className={`w-4 h-4 shrink-0 ${iconColor}`}
                              />
                              <div className="flex flex-col">
                                <p className="text-[11px] text-neutral-700 leading-tight">
                                  <span className="font-black text-brand-primary-300">
                                    {user.role === "admin"
                                      ? notif.pengirim?.username || "User"
                                      : "Admin SkinCycle"}
                                  </span>{" "}
                                  {teksAksi}
                                </p>
                                <span className="text-[9px] text-neutral-400 font-bold uppercase mt-1 tracking-tighter">
                                  {formatTimeAgo(notif.tanggal)}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-10 text-center">
                          <p className="text-[10px] text-neutral-400 italic">
                            Tidak ada pemberitahuan baru.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/keranjang"
                className="relative hover:scale-110 transition-transform text-brand-primary-300 pt-1 block"
              >
                <ShoppingCart className="w-5 h-5 text-brand-primary-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-feedback-warning-300 text-brand-dark-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-neutral-default font-black">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center pl-5 border-l border-neutral-300">
                <div className="group relative cursor-pointer">
                  <div className="w-10 h-10 bg-brand-primary-300 rounded-full flex items-center justify-center text-neutral-default text-sm font-medium border-2 border-neutral-default shadow-md transition-transform group-hover:scale-105 overflow-hidden">
                    {user?.foto_profil ? (
                      <img
                        src={`http://localhost:5000/uploads/${user.foto_profil}`}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/40x40/3d5532/ffffff?text=${user.username?.charAt(0).toUpperCase()}`;
                        }}
                      />
                    ) : (
                      <span>{user.username?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="absolute right-0 top-full pt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="bg-neutral-default shadow-2xl rounded-2xl p-2 border border-neutral-100 min-w-[170px]">
                      {user.role === "admin" && (
                        <NavLink
                          to="/admin/dashboard"
                          className={({ isActive }) =>
                            `w-full text-left px-4 py-2 text-[11px] font-bold rounded-xl uppercase flex items-center gap-2 mb-1 transition-colors ${
                              isActive
                                ? "bg-[#3D5532] text-white hover:bg-[#3D5532]"
                                : "text-neutral-600 hover:bg-neutral-50"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <Settings
                                className={`w-3.5 h-3.5 ${
                                  isActive ? "text-white" : "text-brand-primary-300"
                                }`}
                              />
                              <span>Admin Panel</span>
                            </>
                          )}
                        </NavLink>
                      )}

                      <NavLink
                        to="/profil"
                        className={({ isActive }) =>
                          `w-full text-left px-4 py-2 text-[11px] font-bold rounded-xl uppercase flex items-center gap-2 mb-1 transition-colors ${
                            isActive
                              ? "bg-[#3D5532] text-white hover:bg-[#3D5532]"
                              : "text-neutral-600 hover:bg-neutral-50"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <User
                              className={`w-3.5 h-3.5 ${
                                isActive ? "text-white" : "text-brand-primary-300"
                              }`}
                            />
                            <span>Akun Saya</span>
                          </>
                        )}
                      </NavLink>

                      <hr className="my-1 border-neutral-50" />

                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-feedback-error-200 hover:bg-feedback-error-100/10 rounded-xl uppercase flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Keluar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/masuk")}
              className="bg-brand-primary-300 text-neutral-default px-8 py-2 rounded-full text-[13px] font-bold shadow-md hover:bg-brand-primary-500 transition-colors outline-none"
            >
              Masuk
            </button>
          )}
        </div>
      </nav>

      {/* Elemen Bayangan Penopang h-16 mengunci dokumen agar tidak terpotong */}
      <div className="h-16 w-full" />
    </>
  );
};

export default Navbar;