import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Lock, X } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import EnsiklopediaPage from "./pages/EnsiklopediaPage";
import RecyclePage from "./pages/RecyclePage";
import ForumPage from "./pages/ForumPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArtikelListPage from "./pages/ArtikelListPage";
import ArtikelDetailPage from "./pages/ArtikelDetailPage";
import RecycleSavePage from "./pages/RecycleSavePage";
import RecycleDropPage from "./pages/RecycleDropPage";
import RiwayatPage from "./pages/RiwayatPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateForumPage from "./pages/CreateForumPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import KandunganPage from "./pages/KandunganPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductManagement from "./pages/AdminProductManagement";
import AdminRecycleReport from "./pages/AdminRecycleReport";
import AdminKandunganManagement from "./pages/AdminKandunganManagement";
import AdminArticleManagement from "./pages/AdminArticleManagement";
import AdminOrderManagement from "./pages/AdminOrderManagement";

// KOMPONEN AUTO RESET SCROLL TO TOP
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent user={user} setUser={setUser} isLoading={isLoading} />
    </Router>
  );
}

function AppContent({ user, setUser, isLoading }) {
  const location = useLocation();
  const navigate = useNavigate();

  // STATE MANAJEMEN CUSTOM TOAST
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  // 🌟 STATE BARU: Menandai apakah pengguna sedang dalam proses logout
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // 🌟 REVISI LOGIKA LOGOUT: Set tanda isLoggingOut menjadi true terlebih dahulu
  const handleLogout = () => {
    setIsLoggingOut(true); // Mengunci guard agar tidak memicu alert salah
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    triggerToast(
      "Anda telah berhasil keluar dari akun. Sampai jumpa kembali! 🍃",
    );

    navigate("/");

    // Kembalikan status guard setelah navigasi rute utama selesai aman diakses
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 500);
  };

  const isAuthPage = ["/masuk", "/daftar"].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  const shouldHideNavbar = isAuthPage;
  const shouldHideFooter = isAuthPage || isAdminPage;

  // 🔐 ROUTE GUARD YANG SUDAH DIPERBAIKI SINKRONISASINYA
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (isLoading) {
      return <div className="opacity-0 min-h-screen bg-[#F2EDE4]" />;
    }

    // 🌟 REVISI UTAMA: Jika status sedang logout, abaikan pengecekan rute agar toast logout tidak tertimpa
    if (isLoggingOut) {
      return <div className="opacity-0 min-h-screen bg-[#F2EDE4]" />;
    }

    if (!user) {
      triggerToast("Silakan masuk ke akun Anda terlebih dahulu.");
      return <Navigate to="/masuk" replace />;
    }

    if (adminOnly && user.role !== "admin") {
      triggerToast("Akses ditolak! Khusus halaman Administrator.");
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] flex flex-col relative">
      {/* UI COMPONENT: KUSTOM TOAST NOTIFICATION PREMIUM */}
      {toast.show && (
        <div className="fixed top-24 right-6 z-[99999] flex items-center gap-3 bg-brand-dark-500/95 text-white backdrop-blur px-4 py-3 rounded-xl shadow-xl border border-white/10 max-w-sm animate-in slide-in-from-right-5 fade-in duration-300">
          <Lock className="w-4 h-4 text-[#8EA883] shrink-0" />
          <p className="text-[11px] font-bold tracking-wide text-neutral-100 leading-none">
            {toast.message}
          </p>
          <button
            type="button"
            onClick={() => setToast({ show: false, message: "" })}
            className="text-neutral-400 hover:text-white transition-colors ml-2 p-0.5 outline-none shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Navbar Tunggal */}
      {!shouldHideNavbar && <Navbar user={user} onLogout={handleLogout} />}

      {/* Main Content Area */}
      <main
        key={location.pathname}
        className={`flex-grow animate-in fade-in zoom-in-95 duration-300 ease-out ${isAuthPage ? "pt-0" : "pt-16"}`}
      >
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/ensiklopedia" element={<EnsiklopediaPage />} />
          <Route path="/ensiklopedia/kumpulan" element={<ArtikelListPage />} />
          <Route
            path="/ensiklopedia/detail/:id"
            element={<ArtikelDetailPage />}
          />
          <Route path="/ensiklopedia/kandungan" element={<KandunganPage />} />
          <Route path="/daur-ulang" element={<RecyclePage user={user} />} />
          <Route
            path="/produk"
            element={<ProductPage user={user} triggerToast={triggerToast} />}
          />
          <Route
            path="/produk/detail/:id"
            element={<ProductDetailPage user={user} />}
          />
          <Route path="/tentang-kami" element={<AboutPage />} />

          {/* AUTH ROUTES */}
          <Route
            path="/masuk"
            element={
              <LoginPage setUser={setUser} triggerToast={triggerToast} />
            }
          />
          <Route path="/daftar" element={<RegisterPage />} />

          {/* PROTECTED USER ROUTES */}
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <ForumPage user={user} triggerToast={triggerToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/buat"
            element={
              <ProtectedRoute>
                <CreateForumPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/daur-ulang/simpan"
            element={
              <ProtectedRoute>
                <RecycleSavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/daur-ulang/drop"
            element={
              <ProtectedRoute>
                <RecycleDropPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/riwayat"
            element={
              <ProtectedRoute>
                <RiwayatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/keranjang"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <ProfilePage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage
                  user={user}
                  setUser={setUser}
                  triggerToast={triggerToast}
                />
              </ProtectedRoute>
            }
          />

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manajemen-produk"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/laporan-daur-ulang"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminRecycleReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manajemen-kandungan"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminKandunganManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manajemen-artikel"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminArticleManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manajemen-pemesanan"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminOrderManagement />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;
