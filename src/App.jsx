import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EnsiklopediaPage from "./pages/EnsiklopediaPage";
import RecyclePage from "./pages/RecyclePage";
import ForumPage from "./pages/ForumPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArtikelListPage from "./pages/ArtikelListPage"; // 1. Tambahkan import halaman baru
import ArtikelDetailPage from "./pages/ArtikelDetailPage";
import RecycleSavePage from "./pages/RecycleSavePage";
import RecycleDropPage from "./pages/RecycleDropPage";
import HistoryPage from "./pages/HistoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateForumPage from "./pages/CreateForumPage";

function App() {
  // State untuk melacak halaman mana yang sedang aktif
  const [currentPage, setCurrentPage] = useState("Beranda");

  // Fungsi pembantu untuk merender konten berdasarkan state currentPage
  const renderContent = () => {
    switch (currentPage) {
      case "Beranda":
        return <Home setPage={setCurrentPage} />;
      case "Ensiklopedia":
        return <EnsiklopediaPage setPage={setCurrentPage} />;
      case "Kumpulan Artikel":
        return <ArtikelListPage setPage={setCurrentPage} />;
      case "Detail Artikel":
        return <ArtikelDetailPage setPage={setCurrentPage} />;
      case "Daur Ulang":
        return <RecyclePage setPage={setCurrentPage} />;
      case "Recycle Save":
        return <RecycleSavePage setPage={setCurrentPage} />;
      case "Recycle Drop":
        // Daftarkan halaman Antar & Verifikasi
        return <RecycleDropPage setPage={setCurrentPage} />;
      case "Riwayat":
        return <HistoryPage setPage={setCurrentPage} />;
      case "Forum Diskusi":
        return <ForumPage setPage={setCurrentPage} />;
      case "Buat Forum":
        return <CreateForumPage setPage={setCurrentPage} />;
      case "Produk":
        return <ProductPage setPage={setCurrentPage} />;
      case "Produk Detail":
        return <ProductDetailPage setPage={setCurrentPage} />;
      case "Tentang Kami":
        return <AboutPage />;
      case "Masuk":
        return <LoginPage setPage={setCurrentPage} />;
      case "Daftar":
        return <RegisterPage setPage={setCurrentPage} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4]">
      {/* Navbar menerima state dan fungsi pengubahnya sebagai props */}
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      <main>
        {/* Menampilkan konten sesuai halaman yang dipilih */}
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
