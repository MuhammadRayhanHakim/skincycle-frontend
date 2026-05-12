import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // Ditambahkan untuk fitur Scroll to Top
} from "react-router-dom";

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
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

// --- FITUR 1: SCROLL TO TOP ---
// Komponen ini akan memaksa browser kembali ke atas setiap kali URL berubah
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // --- FITUR 2: LOADING STATE ---

  // Persistence: Cek session user saat web di-refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Set loading false setelah pengecekan localStorage selesai
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect ke beranda
  };

  // --- PERBAIKAN PROTECTED ROUTE ---
  const ProtectedRoute = ({ children }) => {
    // Jika masih mengecek localStorage, tampilkan blank agar tidak memicu alert "Harus Login"
    if (isLoading) return null;

    if (!user) {
      // Alert hanya muncul jika user benar-benar tidak ada setelah loading selesai
      alert("Silakan masuk terlebih dahulu untuk mengakses fitur ini!");
      return <Navigate to="/masuk" replace />;
    }
    return children;
  };

  // Cegah render konten jika aplikasi belum siap (mencegah kedipan halaman login)
  if (isLoading) return <div className="min-h-screen bg-[#F2EDE4]" />;

  return (
    <Router>
      {/* Panggil ScrollToTop di dalam Router agar berfungsi */}
      <ScrollToTop />

      <div className="min-h-screen bg-[#F2EDE4]">
        <Navbar user={user} onLogout={handleLogout} />

        <main>
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
            <Route path="/produk" element={<ProductPage />} />
            <Route path="/produk/detail/:id" element={<ProductDetailPage />} />
            <Route path="/tentang-kami" element={<AboutPage />} />
            <Route path="/daur-ulang" element={<RecyclePage user={user} />} />

            {/* AUTH ROUTES */}
            <Route path="/masuk" element={<LoginPage setUser={setUser} />} />
            <Route path="/daftar" element={<RegisterPage />} />

            {/* PROTECTED ROUTES (HANYA UNTUK USER LOGIN) */}
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
