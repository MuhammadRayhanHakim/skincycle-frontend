import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EnsiklopediaPage = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showIngredientPopup, setShowIngredientPopup] = useState(false);

  const [articles, setArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  const skinTypes = [
    {
      name: "Kering",
      desc: "Kulit terasa kencang, kasar, dan tampak bersisik atau mudah mengelupas.",
      img: "/kulit-kering.jpg",
      details: {
        char: [
          "Pori-pori hampir tidak terlihat",
          "Permukaan kasar and kusam",
          "Kurang elastisitas",
        ],
        tips: [
          "Gunakan pembersih berbasis krim",
          "Pakai pelembap tekstur rich/oil-based",
          "Hindari mandi air terlalu panas",
        ],
        ingredients: "Ceramides, Glycerin",
        avoid: "Alcohol, Harsh Scrub",
      },
    },
    {
      name: "Berminyak",
      desc: "Tampak mengkilap karena produksi sebum berlebih, pori-pori besar, dan rentan komedo.",
      img: "/kulit-berminyak.jpg",
      details: {
        char: [
          "Pori-pori besar and terbuka",
          "Wajah cepat mengkilap",
          "Rentan jerawat/komedo",
        ],
        tips: [
          "Double cleansing harian",
          "Pilih produk non-comedogenic",
          "Pakai pelembap water-based",
        ],
        ingredients: "Salicylic Acid, Niacinamide",
        avoid: "Mineral Oil, Paraben",
      },
    },
    {
      name: "Kombinasi",
      desc: "Area T-zone berminyak, namun area pipi tetap normal atau kering.",
      img: "/kulit-kombinasi.jpg",
      details: {
        char: [
          "T-Zone (dahi, hidung, dagu) berminyak",
          "Area pipi kering/normal",
          "Pori-pori besar di hidung",
        ],
        tips: [
          "Gunakan produk berbeda untuk area wajah",
          "Eksfoliasi fokus di T-zone",
          "Hydration seimbang",
        ],
        ingredients: "Hyaluronic Acid, Green Tea",
        avoid: "Produk terlalu berminyak",
      },
    },
    {
      name: "Sensitif",
      desc: "Mudah mengalami iritasi, kemerahan, atau perih terhadap produk tertentu.",
      img: "/kulit-sensitif.jpg",
      details: {
        char: [
          "Mudah merah/gatal",
          "Bereaksi pada wewangian",
          "Terasa perih saat ganti produk",
        ],
        tips: [
          "Uji tempel (patch test) selalu",
          "Gunakan bahan minimalis",
          "Cari label 'Fragrance-free'",
        ],
        ingredients: "Aloe Vera, Centella Asiatica",
        avoid: "Parfume, Essential Oils",
      },
    },
  ];

  // =============================================
  // FETCH ARTIKEL DARI DATABASE — SEMUA DINAMIS
  // =============================================
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const response = await fetch("http://localhost:5000/api/ensiklopedia");
      const result = await response.json();
      if (result.status === "success" || result.data) {
        const allData = result.data || result;
        // Hanya ambil artikel yang berstatus Published
        const published = allData.filter(
          (art) => art.status === "Published" || !art.status,
        );
        setArticles(published);
      } else {
        Swal.fire({
          title: "Artikel Tidak Tersedia",
          text: "Gagal memuat daftar artikel edukasi.",
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
      setIsLoadingArticles(false);
    }
  };

  const fetchIngredients = async (search = "") => {
    setIsLoadingIngredients(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/kandungan?q=${search}`,
      );
      const result = await response.json();
      if (result.status === "success") {
        setIngredients(result.data);
      } else {
        Swal.fire({
          title: "Data Tidak Tersedia",
          text: "Gagal memuat data kandungan dari server.",
          icon: "warning",
          confirmButtonColor: "#3d5532",
        });
      }
    } catch (error) {
      console.error("Gagal memuat data kandungan:", error);
      Swal.fire({
        title: "Koneksi Gagal",
        text: "Tidak dapat terhubung ke server. Pastikan backend aktif.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
    fetchArticles();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchIngredients(searchQuery);
  };

  const handleOpenPopup = (type) => {
    setSelectedType(type);
    setShowPopup(true);
  };

  // Helper ambil field artikel secara aman (fleksibel nama field dari backend)
  const getArticleId = (art) => art.id_artikel || art.id;
  const getArticleTitle = (art) => art.judul_artikel || art.judul || art.title || "Tanpa Judul";
  const getArticleCategory = (art) => art.kategori || art.kategori_artikel || "Edukasi";
  const getArticleDesc = (art) => art.ringkasan || art.deskripsi || art.excerpt || "";
  const getArticleImage = (art) => {
    const raw = art.gambar_artikel || art.thumbnail || art.gambar || "";
    if (!raw) return null;
    // Jika URL sudah lengkap (https://...) pakai langsung, selainnya prefix uploads
    if (raw.startsWith("http")) return raw;
    return `http://localhost:5000/uploads/${raw}`;
  };

  // Artikel pertama jadi banner utama, sisanya jadi list kanan
  const featuredArticle = articles[0] || null;
  const sideArticles = articles.slice(1, 4); // max 3 artikel di kanan

  return (
    <div className="bg-brand-secondary-100 font-sans relative text-brand-dark-500">
      {/* SECTION 1: HEADER & JENIS KULIT */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-10 py-4">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-sans text-brand-dark-500 mb-3 leading-tight">
            Ensiklopedia Jenis Kulit
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Kenali kulitmu lebih dalam dengan panduan berbasis sains dan bahan
            alami yang aman untuk kesehatanmu dan bumi.
          </p>
        </header>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-bold text-brand-dark-500">
              Kenali Jenis Kulitmu
            </h2>
            <span className="text-xs font-bold text-brand-primary-300 uppercase tracking-[0.2em] cursor-pointer border-b-2 border-brand-primary-300">
              Pengantar Dasar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skinTypes.map((item) => (
              <div
                key={item.name}
                className="bg-neutral-default p-6 rounded-[35px] text-center shadow-sm border border-neutral-100 flex flex-col items-center group transition-all hover:shadow-xl"
              >
                <div
                  onClick={() => handleOpenPopup(item)}
                  className="w-full h-36 rounded-[25px] mb-4 overflow-hidden cursor-pointer shadow-sm group-hover:shadow-md transition-all bg-brand-primary-100/20"
                >
                  <img
                    src={item.img}
                    alt={`Kulit ${item.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = "#a8bdac";
                    }}
                  />
                </div>
                <h4 className="text-xl font-bold text-brand-dark-500 mb-2">
                  {item.name}
                </h4>
                <p className="text-[12px] text-neutral-500 mb-4 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenPopup(item)}
                  className="bg-brand-primary-300 text-neutral-default w-full py-3 rounded-xl text-xs font-bold mt-auto hover:bg-brand-primary-500 transition-colors"
                >
                  Pelajari Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP: JENIS KULIT */}
      {showPopup && selectedType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-brand-dark-500/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="relative bg-neutral-default w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <div className="md:w-2/5 relative flex flex-col justify-end text-neutral-default overflow-hidden">
              <img
                src={selectedType.img}
                alt={`Kulit ${selectedType.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, #a8bdac, #4e635a)";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-500/90 via-brand-primary-400/40 to-transparent"></div>
              <div className="relative z-10 p-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                  Skin Report
                </p>
                <h3 className="text-4xl font-sans leading-tight">
                  Detail Tipe Kulit <br /> {selectedType.name}
                </h3>
              </div>
            </div>
            <div className="md:w-3/5 p-10 max-h-[85vh] overflow-y-auto">
              <button
                className="absolute top-6 right-8 text-2xl text-neutral-400 hover:text-neutral-900 transition-colors"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>
              <div className="space-y-8">
                <section>
                  <h4 className="text-brand-primary-300 font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-brand-primary-300 rounded-full"></span>
                    Karakteristik
                  </h4>
                  <ul className="text-xs text-neutral-500 space-y-2 list-disc pl-4 leading-relaxed">
                    {selectedType.details.char.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
                <section className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                  <h4 className="text-brand-primary-300 font-bold text-sm mb-4 flex items-center gap-2">
                    💡 Tips Perawatan Berkelanjutan
                  </h4>
                  <div className="space-y-4">
                    {selectedType.details.tips.map((tip, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-brand-primary-300 text-neutral-default rounded-full flex items-center justify-center text-[10px] shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-primary-100/20 p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">
                      Kandungan Utama
                    </h5>
                    <p className="text-xs font-bold text-brand-primary-300">
                      {selectedType.details.ingredients}
                    </p>
                  </div>
                  <div className="bg-feedback-error-100/10 p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">
                      Hindari Bahan
                    </h5>
                    <p className="text-xs font-bold text-feedback-error-200">
                      {selectedType.details.avoid}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 2: ARTIKEL EDUKASI — 100% DATA DARI DATABASE             */}
      {/* Banner kiri  = artikel[0] (featured/terbaru)                     */}
      {/* List kanan   = artikel[1..3]                                     */}
      {/* ================================================================ */}
      <section className="min-h-[100vh] flex flex-col justify-center px-10 py-10 bg-neutral-default/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-brand-dark-500">
              Artikel Edukasi
            </h2>
            <span
              onClick={() => navigate("/ensiklopedia/kumpulan")}
              className="text-xs font-bold text-brand-primary-300 uppercase tracking-widest cursor-pointer hover:underline"
            >
              Lihat Semua
            </span>
          </div>

          {isLoadingArticles ? (
            /* Loading skeleton */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
              <div className="lg:col-span-8 rounded-[40px] bg-neutral-200 animate-pulse h-full" />
              <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 rounded-[30px] bg-neutral-200 animate-pulse" />
                ))}
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-neutral-400 italic font-medium">
              Belum ada artikel yang dipublikasikan.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">

              {/* ── BANNER UTAMA KIRI: artikel[0] dari database ── */}
              <div
                onClick={() => navigate(`/ensiklopedia/detail/${getArticleId(featuredArticle)}`)}
                className="lg:col-span-8 relative rounded-[40px] overflow-hidden group shadow-2xl h-full cursor-pointer bg-brand-primary-500"
              >
                {/* Gambar artikel — jika ada */}
                {getArticleImage(featuredArticle) ? (
                  <img
                    src={getArticleImage(featuredArticle)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={getArticleTitle(featuredArticle)}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  /* Placeholder gradien jika tidak ada gambar */
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary-300 via-brand-primary-400 to-brand-primary-500" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent p-10 flex flex-col justify-end text-left">
                  <span className="bg-brand-primary-300 text-neutral-default px-4 py-1 rounded-full text-[10px] font-bold w-fit mb-4 uppercase tracking-wider">
                    {getArticleCategory(featuredArticle)}
                  </span>
                  <h3 className="text-neutral-default text-4xl font-sans mb-4 leading-tight line-clamp-2">
                    {getArticleTitle(featuredArticle)}
                  </h3>
                  {getArticleDesc(featuredArticle) && (
                    <p className="text-neutral-default/80 text-base max-w-xl mb-6 line-clamp-2">
                      {getArticleDesc(featuredArticle)}
                    </p>
                  )}
                  <button
                    type="button"
                    className="text-neutral-default text-sm font-bold underline underline-offset-4 text-left outline-none"
                  >
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>

              {/* ── LIST KANAN: artikel[1..3] dari database ── */}
              <div className="lg:col-span-4 flex flex-col gap-4 h-full text-left">
                {sideArticles.length > 0 ? (
                  sideArticles.map((art) => (
                    <div
                      key={getArticleId(art)}
                      onClick={() => navigate(`/ensiklopedia/detail/${getArticleId(art)}`)}
                      className="bg-brand-secondary-300/80 p-6 rounded-[30px] border border-brand-primary-300/10 hover:bg-brand-secondary-300 transition-all flex-1 flex flex-col justify-center cursor-pointer group shadow-sm"
                    >
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-primary-300 mb-1">
                        {getArticleCategory(art)}
                      </h5>
                      <p className="text-base font-bold text-brand-dark-500 leading-snug group-hover:text-brand-primary-300 transition-colors line-clamp-2 uppercase tracking-tight">
                        {getArticleTitle(art)}
                      </p>
                    </div>
                  ))
                ) : (
                  /* Jika hanya 1 artikel di DB, isi kanan dengan placeholder kosong */
                  <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 italic bg-neutral-100/40 rounded-[30px]">
                    Belum ada artikel lainnya.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: KANDUNGAN BAHAN */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10">
        <div className="max-w-7xl mx-auto w-full bg-neutral-default p-12 rounded-[50px] shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-sans text-brand-dark-500 mb-4">
              Kandungan Bahan Skincare
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Cari tahu manfaat dari setiap kandungan alami yang paling tepat
              untukmu.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto bg-neutral-50 rounded-full p-2 flex items-center shadow-inner mb-12 border border-neutral-100"
          >
            <input
              type="text"
              placeholder="Cari kandungan bahan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-6 text-base bg-transparent outline-none font-medium text-neutral-700 placeholder-neutral-400"
            />
            <button
              type="submit"
              className="bg-brand-primary-300 text-neutral-default px-8 py-3 rounded-full text-sm font-bold hover:bg-brand-primary-500 transition-all"
            >
              Cari
            </button>
          </form>

          {isLoadingIngredients ? (
            <div className="text-center py-10 font-bold text-brand-primary-300 italic animate-pulse">
              Menghubungkan ke basis data laboratorium SkinCycle...
            </div>
          ) : ingredients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ingredients.slice(0, 3).map((item) => (
                <div
                  key={item.id_kandungan}
                  onClick={() => {
                    setSelectedIngredient(item);
                    setShowIngredientPopup(true);
                  }}
                  className="bg-neutral-50 p-6 rounded-[35px] hover:bg-brand-secondary-100 transition-colors group cursor-pointer border border-transparent hover:border-neutral-100 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors">
                      {item.nama_kandungan}
                    </h4>
                    <span className="text-2xl">
                      {item.kategori_bahan === "Hydrating"
                        ? "💧"
                        : item.kategori_bahan === "Brightening"
                          ? "✨"
                          : "🌱"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-6 leading-relaxed line-clamp-2">
                    {item.fungsi ||
                      "Klik untuk melihat analisis fungsional struktur kimia dan formulasi kecocokan kulit."}
                  </p>
                  <span className="bg-neutral-default text-brand-primary-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {item.kategori_bahan || "General"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-400 italic">
              Bahan aktif skincare tidak ditemukan dalam pustaka koleksi ini.
            </div>
          )}

          <div className="text-center mt-12 pt-4 border-t border-neutral-100">
            <span
              onClick={() => navigate("/ensiklopedia/kandungan")}
              className="text-xs font-bold text-brand-primary-300 uppercase tracking-[0.2em] cursor-pointer border-b-2 border-brand-primary-300 pb-0.5 hover:text-brand-dark-500 hover:border-brand-dark-500 transition-all"
            >
              Jelajahi 150+ Kandungan Bahan
            </span>
          </div>
        </div>
      </section>

      {/* POPUP: DETAIL KANDUNGAN */}
      {showIngredientPopup && selectedIngredient && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-neutral-default w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
            <div className="md:col-span-4 bg-neutral-50 p-8 border-r flex flex-col justify-between overflow-y-auto border-neutral-100">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                  Profil Kandungan
                </span>
                <h2 className="text-2xl font-sans text-brand-dark-500 mb-6 uppercase tracking-tight">
                  {selectedIngredient.nama_kandungan}
                </h2>
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-neutral-default border p-2 flex items-center justify-center text-5xl shadow-sm border-neutral-100">
                  {selectedIngredient.kategori_bahan === "Hydrating"
                    ? "💧"
                    : selectedIngredient.kategori_bahan === "Brightening"
                      ? "✨"
                      : "🌱"}
                </div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Ringkasan
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-6 italic">
                  {selectedIngredient.fungsi ||
                    "Berperan sebagai molekul aktif penyeimbang kadar pH serta mempercepat pemulihan hidrasi sel kulit."}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">
                  Jenis Kulit
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(selectedIngredient.jenis_kulit_cocok
                    ? selectedIngredient.jenis_kulit_cocok.split(",")
                    : ["Semua Jenis Kulit"]
                  ).map((skin, idx) => (
                    <span
                      key={idx}
                      className="bg-neutral-default border border-neutral-100 text-neutral-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
                    >
                      <span className="w-1 h-1 bg-feedback-success-200 rounded-full"></span>
                      {skin.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
              <button
                onClick={() => setShowIngredientPopup(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 font-bold text-sm bg-neutral-50 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <div className="space-y-6 pr-2">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-feedback-info-100 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0">
                    🔬
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Fungsi Utama
                    </h4>
                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      {selectedIngredient.fungsi}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-feedback-info-100 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0">
                    ✨
                  </div>
                  <div className="w-full">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Manfaat Efektif
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(selectedIngredient.manfaat
                        ? selectedIngredient.manfaat.split(",")
                        : ["Mengoptimalkan tingkat kecerahan serta kelembapan wajah harian."]
                      ).map((manfaat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                          <span className="text-feedback-success-200 font-bold">✓</span>
                          <span>{manfaat.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex gap-4 items-start mt-4">
                  <div className="w-7 h-7 bg-brand-primary-300 text-neutral-default rounded-lg flex items-center justify-center text-xs shadow-md shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 mb-0.5">
                      Catatan Keamanan / Efek Samping
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                      {selectedIngredient.efek_samping ||
                        "Secara umum terbukti klinis aman digunakan untuk pemakaian skincare harian jangka panjang."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-neutral-100 text-right text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                SkinCycle Botanical Content Library
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnsiklopediaPage;