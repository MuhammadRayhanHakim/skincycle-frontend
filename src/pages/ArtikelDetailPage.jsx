import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Loader2, AlertCircle } from "lucide-react";

const ArtikelDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // STATE MANAGEMENT DATA ARTIKEL & LOADING
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📦 DATA KONTEN STATIS UNTUK BANNER UTAMA (ANTI-BENTROK ID)
  const staticArticle = {
    judul_artikel: "The Art of the Layered Routine",
    kategori: "Featured Ritual",
    isi_artikel: `Rutinitas skincare bukan cuma soal banyaknya produk, tapi bagaimana kamu menggabungkannya dengan tepat. Urutan pemakaian produk sangat menentukan seberapa efektif bahan aktif dapat meresap ke dalam lapisan kulit epidermis.

Langkah pertama selalu dimulai dengan pembersihan (cleansing), diikuti oleh toner untuk mengembalikan pH kulit. Setelah itu, aplikasikan produk dengan konsistensi paling cair seperti essence dan serum, sebelum menguncinya dengan pelembap (moisturizer) yang lebih kental.

Di pagi hari, jangan pernah melewatkan sunscreen sebagai pelindung utama dari radiasi sinar UV yang dapat merusak skin barrier Anda.`,
    gambar:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200",
    read_time: "8",
    isStatic: true,
  };

  // === EFFECT FETCH DATA DETAIL ARTIKEL ===
  useEffect(() => {
    const fetchArticleDetail = async () => {
      setIsLoading(true);
      setError(null);

      // ⚙️ PERBAIKAN UTAMA: Jika parameter URL adalah "featured-statis", langsung pasang data statis asli bawaan template
      if (id === "featured-statis") {
        setArticle(staticArticle);
        setIsLoading(false);
        return;
      }

      // 🌐 JIKA ID ADALAH ANGKA DATABASE (ID_ARTIKEL), AMBIL DARI BACKEND POSTGRESQL
      try {
        const response = await fetch(`http://localhost:5000/api/ensiklopedia`);
        const result = await response.json();

        if (result.status === "success" || result.data) {
          const allArticles = result.data || result;
          // Cari artikel rill buatan admin yang cocok dengan parameter id URL rute
          const foundArticle = allArticles.find(
            (art) => String(art.id_artikel || art.id) === String(id),
          );

          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            setError("Artikel tidak ditemukan dalam database.");
          }
        } else {
          setError("Gagal memuat respons data dari server.");
        }
      } catch (err) {
        console.error("Error fetching article details:", err);
        setError("Gagal terhubung ke server database SkinCycle.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticleDetail();
    }
  }, [id]);

  // ── STATE 1: LOADING ──
  if (isLoading) {
    return (
      <div className="bg-brand-secondary-100 min-h-screen flex flex-col justify-center items-center gap-3 text-[#3a5b22] font-sans font-bold text-xs">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span>Membuka dokumen ensiklopedia sirkular...</span>
      </div>
    );
  }

  // ── STATE 2: ERROR ──
  if (error || !article) {
    return (
      <div className="bg-brand-secondary-100 min-h-screen flex flex-col justify-center items-center gap-4 px-6 text-center font-sans">
        <AlertCircle className="w-12 h-12 text-feedback-error-200 opacity-60" />
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-brand-dark-500">
            Gagal Membaca Konten
          </h3>
          <p className="text-sm text-neutral-400 max-w-sm">
            {error || "Artikel tidak terdaftar."}
          </p>
        </div>
        <button
          onClick={() => navigate("/ensiklopedia/kumpulan")}
          className="mt-2 bg-[#3a5b22] text-neutral-default px-6 py-2.5 rounded-full font-bold text-xs hover:bg-brand-primary-500 transition-all outline-none shadow-md flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Jendela Pustaka
        </button>
      </div>
    );
  }

  // SINKRONISASI DATA VARIABEL
  const judul = article.judul_artikel || article.title;
  const kategori = article.kategori || "Edukasi";
  const isiKonten = article.isi_artikel || article.content;

  // Penanganan rute gambar: statis (URL langsung) vs database (uploads/)
  const linkGambar = article.isStatic
    ? article.gambar
    : article.gambar
      ? `http://localhost:5000/uploads/${article.gambar}`
      : "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200";

  const tanggal = article.tanggal_publish
    ? new Date(article.tanggal_publish).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Terbaru";

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20 text-left">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* TOP BAR / NAVIGATION BACK */}
        <div className="flex items-center gap-4 mb-8 text-neutral-400">
          <button
            type="button"
            onClick={() => navigate("/ensiklopedia/kumpulan")}
            className="flex items-center gap-2 text-sm font-bold text-[#3a5b22] hover:text-[#2e491b] transition-colors outline-none uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center gap-2">
            • <BookOpen className="w-3.5 h-3.5 text-neutral-300" />{" "}
            {article.read_time || "5"} menit baca • {kategori}
          </span>
        </div>

        {/* TITLE HEADLINE */}
        <h1 className="text-4xl md:text-5xl font-sans font-black text-brand-dark-500 mb-4 leading-tight uppercase tracking-tight">
          {judul}
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold uppercase tracking-wider mb-10">
          <span className="text-[#3a5b22]">oleh Admin SkinCycle</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {tanggal}
          </span>
        </div>

        {/* HERO IMAGE CONTAINER */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[40px] overflow-hidden mb-12 shadow-xl border-4 border-neutral-default bg-neutral-100">
          <img
            src={linkGambar}
            className="w-full h-full object-cover"
            alt="Article Header Banner"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200";
            }}
          />
        </div>

        {/* ARTICLE BODY CONTENT */}
        <article className="prose prose-lg max-w-none text-neutral-600 leading-relaxed text-base font-medium space-y-6">
          {isiKonten.split("\n").map(
            (paragraf, idx) =>
              paragraf.trim() && (
                <p key={idx} className="whitespace-pre-line leading-relaxed">
                  {paragraf}
                </p>
              ),
          )}

          {/* BLOCKQUOTE */}
          <div className="bg-neutral-default/50 p-8 rounded-3xl border-l-4 border-[#3a5b22] italic my-10 text-brand-dark-500 font-bold shadow-sm">
            "Kualitas kesehatan kulit serta kebersihan bumi adalah investasi
            sirkular jangka panjang kita bersama. Memahami kandungan produk
            kecantikan adalah awal dari aksi nyata menjaga ekosistem."
          </div>
        </article>

        {/* TAGS FOOTER CONTAINER */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap gap-3">
          {[kategori, "Edukasi", "SkinCycle"].map((tag) => (
            <span
              key={tag}
              className="bg-neutral-default border border-neutral-100 px-4 py-1.5 rounded-full text-[10px] font-black text-[#3a5b22] shadow-sm uppercase tracking-wider"
            >
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetailPage;
