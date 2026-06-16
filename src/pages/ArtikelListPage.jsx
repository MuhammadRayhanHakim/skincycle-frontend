import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Newspaper, ArrowRight, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const ArtikelListPage = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/ensiklopedia");
        const result = await response.json();

        if (result.status === "success" || result.data) {
          const allData = result.data || result;
          const publishedArticles = allData.filter(
            (art) => art.status === "Published" || !art.status,
          );
          setArticles(publishedArticles);
        } else {
          Swal.fire({
            title: "Artikel Tidak Tersedia",
            text: "Gagal memuat daftar artikel dari server.",
            icon: "warning",
            confirmButtonColor: "#3d5532",
          });
        }
      } catch (error) {
        console.error("Gagal memuat daftar artikel edukasi:", error);
        Swal.fire({
          title: "Koneksi Gagal",
          text: "Tidak dapat memuat artikel. Pastikan server backend aktif.",
          icon: "error",
          confirmButtonColor: "#3d5532",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ── Helper ambil field secara aman (fleksibel nama field backend) ──
  const getArticleId = (art) => art.id_artikel || art.id;
  const getArticleTitle = (art) =>
    art.judul_artikel || art.judul || art.title || "Tanpa Judul";
  const getArticleCategory = (art) =>
    art.kategori || art.kategori_artikel || art.cat || "Edukasi";
  const getArticleDesc = (art) => {
    const raw = art.ringkasan || art.deskripsi || art.excerpt || art.isi_artikel || "";
    // Hapus tag HTML jika isi_artikel berisi HTML
    return raw.replace(/<[^>]*>/g, "");
  };
  const getArticleDate = (art) => {
    const raw = art.tanggal_publish || art.tanggal || art.date || "";
    if (!raw) return "Terbaru";
    return new Date(raw).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const getArticleImage = (art) => {
    const raw =
      art.gambar_artikel || art.gambar || art.thumbnail || art.img || "";
    if (!raw) return null;
    if (raw.startsWith("http")) return raw;
    return `http://localhost:5000/uploads/${raw}`;
  };

  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500";

  // artikel[0] = featured banner, artikel[1+] = grid
  const featuredArticle = articles[0] || null;
  const gridArticles = articles.slice(1);

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20">

      {/* ================================================================ */}
      {/* HEADER: FEATURED BANNER — 100% DARI DATABASE (artikel pertama)   */}
      {/* ================================================================ */}
      <header className="px-10 py-16 max-w-7xl mx-auto">
        <h1 className="text-5xl font-sans mb-12 text-brand-dark-500 tracking-tight">
          Jendela Edukasi Skincare
        </h1>

        {isLoading ? (
          /* Skeleton banner saat loading */
          <div className="rounded-[40px] overflow-hidden h-[450px] bg-neutral-200 animate-pulse" />
        ) : featuredArticle ? (
          /* Banner dari artikel[0] database */
          <div className="bg-neutral-default rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-neutral-default">
            {/* Gambar artikel */}
            <div
              className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden bg-neutral-50"
              onClick={() =>
                navigate(`/ensiklopedia/detail/${getArticleId(featuredArticle)}`)
              }
            >
              <img
                src={getArticleImage(featuredArticle) || FALLBACK_IMG}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt={getArticleTitle(featuredArticle)}
                onError={(e) => {
                  e.target.src = FALLBACK_IMG;
                }}
              />
            </div>

            {/* Konten teks */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
              <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-[0.2em] mb-4 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {getArticleCategory(featuredArticle)}
              </span>
              <h2
                className="text-3xl md:text-4xl font-sans mb-6 leading-tight cursor-pointer hover:text-[#3a5b22] transition-colors text-brand-dark-500 line-clamp-3"
                onClick={() =>
                  navigate(
                    `/ensiklopedia/detail/${getArticleId(featuredArticle)}`,
                  )
                }
              >
                {getArticleTitle(featuredArticle)}
              </h2>
              {getArticleDesc(featuredArticle) && (
                <p className="text-neutral-500 text-base leading-relaxed mb-8 font-medium line-clamp-3">
                  {getArticleDesc(featuredArticle)}
                </p>
              )}
              <div className="flex items-center gap-6 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-8">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-300" />
                  {featuredArticle.read_time || "5"} min read
                </span>
                <span>{getArticleDate(featuredArticle)}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/ensiklopedia/detail/${getArticleId(featuredArticle)}`,
                  )
                }
                className="text-sm font-bold text-[#3a5b22] underline underline-offset-8 text-left hover:text-[#2e491b] transition flex items-center gap-1 outline-none w-fit"
              >
                Baca Artikel <ArrowRight className="w-4 h-4 inline" />
              </button>
            </div>
          </div>
        ) : (
          /* Kosong jika DB belum ada artikel */
          <div className="text-center py-20 border border-dashed rounded-[40px] bg-neutral-default/30 border-neutral-200 text-neutral-400 italic text-sm font-medium">
            Belum ada artikel yang dipublikasikan.
          </div>
        )}
      </header>

      {/* ================================================================ */}
      {/* GRID ARTIKEL TERKINI — artikel[1+] dari database                 */}
      {/* ================================================================ */}
      <main className="px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-2xl font-bold text-brand-dark-500 tracking-tight">
            Artikel Edukasi Terkini
          </h2>
          <Newspaper className="w-5 h-5 text-neutral-300" />
        </div>

        {isLoading ? (
          /* Skeleton grid saat loading */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="rounded-[35px] h-72 bg-neutral-200 animate-pulse" />
                <div className="h-3 bg-neutral-200 animate-pulse rounded-full w-1/3" />
                <div className="h-5 bg-neutral-200 animate-pulse rounded-full w-3/4" />
                <div className="h-3 bg-neutral-200 animate-pulse rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {gridArticles.map((art) => (
              <div
                key={getArticleId(art)}
                className="group cursor-pointer flex flex-col justify-between animate-in fade-in duration-300"
                onClick={() =>
                  navigate(`/ensiklopedia/detail/${getArticleId(art)}`)
                }
              >
                <div>
                  {/* Gambar */}
                  <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-sm border-4 border-neutral-default transition-all group-hover:shadow-xl group-hover:border-[#3a5b22]/30">
                    <img
                      src={getArticleImage(art) || FALLBACK_IMG}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={getArticleTitle(art)}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                      }}
                    />
                  </div>

                  {/* Kategori */}
                  <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-widest mb-2 block opacity-70">
                    {getArticleCategory(art)}
                  </span>

                  {/* Judul */}
                  <h4 className="text-xl font-sans mb-3 text-brand-dark-500 group-hover:text-[#3a5b22] transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
                    {getArticleTitle(art)}
                  </h4>

                  {/* Deskripsi singkat */}
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-medium line-clamp-2 italic">
                    {getArticleDesc(art) ||
                      "Pelajari lebih dalam mengenai analisis fungsional dari bahan aktif dan gaya hidup sirkular."}
                  </p>
                </div>

                {/* Footer: waktu baca & tanggal */}
                <div className="text-[10px] font-bold text-neutral-400 flex items-center justify-between uppercase tracking-wider pt-2 border-t border-neutral-50">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-300" />
                    {art.read_time || "5"} min read
                  </span>
                  <span className="text-neutral-400/70 text-[9px]">
                    {getArticleDate(art)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && articles.length <= 1 ? (
          /* Hanya ada 1 artikel (jadi featured), grid kosong */
          <div className="text-center py-16 border border-dashed rounded-[35px] bg-neutral-default/30 border-neutral-200 text-neutral-400 italic text-xs font-medium max-w-lg mx-auto">
            Belum ada artikel lainnya yang diterbitkan.
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default ArtikelListPage;