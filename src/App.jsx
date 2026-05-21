import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "leaflet/dist/leaflet.css";

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
import HistoryPage from "./pages/HistoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateForumPage from "./pages/CreateForumPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import KandunganPage from "./pages/KandunganPage"; // <-- 1. IMPORT KANDUNGANPAGE DI SINI

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductManagement from "./pages/AdminProductManagement";
import AdminRecycleReport from "./pages/AdminRecycleReport";
import AdminKandunganManagement from "./pages/AdminKandunganManagement";

// Fitur: Scroll To Top saat berpindah halaman
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
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && !token) {
          localStorage.removeItem("user");
          setUser(null);
        } else if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        localStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Anda telah berhasil keluar dari SkinCycle. Sampai jumpa!");
    setUser(null);
    window.location.href = "/";
  };

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (isLoading) return null;
    if (!user) {
      return <Navigate to="/masuk" replace />;
    }
    if (adminOnly && user.role !== "admin") {
      alert("Akses Ditolak! Anda bukan Administrator.");
      return <Navigate to="/" replace />;
    }
    return children;
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center text-[#3D5532] font-bold">
        Memuat SkinCycle...
      </div>
    );

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F2EDE4] flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/ensiklopedia" element={<EnsiklopediaPage />} />
            <Route
              path="/ensiklopedia/kumpulan"
              element={<ArtikelListPage />}
            />
            <Route
              path="/ensiklopedia/detail/:id"
              element={<ArtikelDetailPage />}
            />

            {/* 2. REGISTRASI ROUTE PUBLIC KANDUNGAN_PAGE USER DI SINI */}
            <Route path="/ensiklopedia/kandungan" element={<KandunganPage />} />

            <Route path="/produk" element={<ProductPage user={user} />} />
            <Route
              path="/produk/detail/:id"
              element={<ProductDetailPage user={user} />}
            />
            <Route path="/tentang-kami" element={<AboutPage />} />
            <Route path="/daur-ulang" element={<RecyclePage user={user} />} />

            {/* AUTH ROUTES */}
            <Route path="/masuk" element={<LoginPage setUser={setUser} />} />
            <Route path="/daftar" element={<RegisterPage />} />

            {/* PROTECTED ROUTES USER */}
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
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forum"
              element={
                <ProtectedRoute>
                  <ForumPage user={user} />
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
                  <EditProfilePage user={user} setUser={setUser} />
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
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            {/* ADMIN ROUTES */}
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

            {/* FALLBACK 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
