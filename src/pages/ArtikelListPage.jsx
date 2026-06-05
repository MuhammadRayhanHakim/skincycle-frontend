// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { BookOpen, Clock, Newspaper, ArrowRight, Loader2 } from "lucide-react";

// const ArtikelListPage = () => {
//   const navigate = useNavigate();

//   // === STATE DARI DATABASE BACKEND ===
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // === FETCH DATA DARI API BACKEND SKINCYCLE ===
//   useEffect(() => {
//     const fetchArticles = async () => {
//       setIsLoading(true);
//       try {
//         // ⚙️ PERBAIKAN UTAMA: Endpoint disesuaikan ke /api/ensiklopedia agar data riil database ditarik sempurna
//         const response = await fetch("http://localhost:5000/api/ensiklopedia");
//         const result = await response.json();

//         if (result.status === "success" || result.data) {
//           // Menyaring data agar hanya artikel berstatus 'Published' yang tampil ke konsumen
//           const allData = result.data || result;
//           const publishedArticles = allData.filter(
//             (art) => art.status === "Published" || !art.status,
//           );
//           setArticles(publishedArticles);
//         }
//       } catch (error) {
//         console.error("Gagal memuat daftar artikel edukasi sirkular:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20">
//       {/* --- HEADER FEATURED POST (DIKUNCI STATIS SESUAI GAMBAR ACUAN) --- */}
//       <header className="px-10 py-16 max-w-7xl mx-auto">
//         <h1 className="text-5xl font-sans mb-12 text-brand-dark-500 tracking-tight">
//           Jendela Edukasi Skincare
//         </h1>

//         <div className="bg-neutral-default rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-neutral-default">
//           <div
//             className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden bg-neutral-50"
//             onClick={() => navigate("/ensiklopedia/detail/1")}
//           >
//             <img
//               src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800"
//               className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
//               alt="Featured"
//             />
//           </div>

//           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
//             <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-[0.2em] mb-4 flex items-center gap-1">
//               <BookOpen className="w-3 h-3" /> Featured Ritual
//             </span>
//             <h2
//               className="text-3xl md:text-4xl font-sans mb-6 leading-tight cursor-pointer hover:text-[#3a5b22] transition-colors text-brand-dark-500"
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//             >
//               The Art of the Layered Routine
//             </h2>
//             <p className="text-neutral-500 text-base leading-relaxed mb-8 font-medium">
//               Temukan bagaimana urutan produk mempengaruhi penyerapan bahan
//               aktif secara maksimal.
//             </p>
//             <button
//               type="button"
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//               className="text-sm font-bold text-[#3a5b22] underline underline-offset-8 text-left hover:text-[#2e491b] transition flex items-center gap-1 outline-none"
//             >
//               Baca Artikel <ArrowRight className="w-4 h-4 inline" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* --- GRID LIST ARTIKEL TERKINI (DINAMIS DARI DATABASE) --- */}
//       <main className="px-10 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-10 border-b border-neutral-100 pb-4">
//           <h2 className="text-2xl font-bold text-brand-dark-500 tracking-tight">
//             Artikel Edukasi Terkini
//           </h2>
//           <Newspaper className="w-5 h-5 text-neutral-300" />
//         </div>

//         {isLoading ? (
//           /* State loading saat fetching data */
//           <div className="py-20 flex flex-col justify-center items-center gap-3 text-neutral-400 text-xs font-bold">
//             <Loader2 className="w-6 h-6 animate-spin text-[#3a5b22]" />
//             <span>Sinkronisasi basis data pustaka artikel...</span>
//           </div>
//         ) : articles.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
//             {articles.map((art) => {
//               // Penyesuaian mapping dengan kolom asli di table database PostgreSQL kamu
//               const idArtikel = art.id_artikel || art.id;
//               const judul = art.judul_artikel || art.title;
//               const kategori = art.kategori || art.cat;
//               const linkGambar = art.gambar
//                 ? `http://localhost:5000/uploads/${art.gambar}`
//                 : art.img ||
//                   "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500";

//               // Formatting Tanggal agar konsisten bersih
//               const tanggal = art.tanggal_publish
//                 ? new Date(art.tanggal_publish).toLocaleDateString("id-ID", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })
//                 : art.date || "Terbaru";

//               return (
//                 <div
//                   key={idArtikel}
//                   className="group cursor-pointer flex flex-col justify-between animate-in fade-in duration-300"
//                   onClick={() => navigate(`/ensiklopedia/detail/${idArtikel}`)}
//                 >
//                   <div>
//                     {/* Image Container Card */}
//                     <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-sm border-4 border-neutral-default transition-all group-hover:shadow-xl group-hover:border-[#3a5b22]/30">
//                       <img
//                         src={linkGambar}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         alt={judul}
//                         onError={(e) => {
//                           e.target.src =
//                             "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500";
//                         }}
//                       />
//                     </div>

//                     {/* Meta Tag Kategori */}
//                     <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-widest mb-2 block opacity-70">
//                       {kategori}
//                     </span>

//                     {/* Judul Sub-Artikel */}
//                     <h4 className="text-xl font-sans mb-3 text-brand-dark-500 group-hover:text-[#3a5b22] transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
//                       {judul}
//                     </h4>

//                     {/* Potongan Deskripsi/Isi Ringkas */}
//                     <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-medium line-clamp-2 italic">
//                       {art.isi_artikel
//                         ? art.isi_artikel.replace(/<[^>]*>/g, "")
//                         : "Pelajari lebih dalam mengenai analisis fungsional dari bahan aktif dan gaya hidup sirkular."}
//                     </p>
//                   </div>

//                   {/* Footer Badge Waktu & Tanggal Baca */}
//                   <div className="text-[10px] font-bold text-neutral-400 flex items-center justify-between uppercase tracking-wider pt-2 border-t border-neutral-50">
//                     <span className="flex items-center gap-1.5">
//                       <Clock className="w-3.5 h-3.5 text-neutral-300" />{" "}
//                       {art.read_time || "5"} min read
//                     </span>
//                     <span className="text-neutral-400/70 text-[9px]">
//                       {tanggal}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           /* Tampilan jika database admin belum menginput artikel apapun */
//           <div className="text-center py-16 border border-dashed rounded-[35px] bg-neutral-default/30 border-neutral-200 text-neutral-400 italic text-xs font-medium max-w-lg mx-auto">
//             Belum ada rincian artikel edukasi terkini yang diterbitkan dalam
//             sistem database.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ArtikelListPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Newspaper, ArrowRight, Loader2 } from "lucide-react";

const ArtikelListPage = () => {
  const navigate = useNavigate();

  // === STATE DARI DATABASE BACKEND ===
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // === FETCH DATA DARI API BACKEND SKINCYCLE ===
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
        }
      } catch (error) {
        console.error("Gagal memuat daftar artikel edukasi sirkular:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20">
      {/* --- HEADER FEATURED POST (DIKUNCI STATIS AMAN SINKRON) --- */}
      <header className="px-10 py-16 max-w-7xl mx-auto">
        <h1 className="text-5xl font-sans mb-12 text-brand-dark-500 tracking-tight">
          Jendela Edukasi Skincare
        </h1>

        <div className="bg-neutral-default rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-neutral-default">
          <div
            className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden bg-neutral-50"
            onClick={() => navigate("/ensiklopedia/detail/featured-statis")}
          >
            <img
              src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800"
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
              alt="Featured"
            />
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
            <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-[0.2em] mb-4 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Featured Ritual
            </span>
            <h2
              className="text-3xl md:text-4xl font-sans mb-6 leading-tight cursor-pointer hover:text-[#3a5b22] transition-colors text-brand-dark-500"
              onClick={() => navigate("/ensiklopedia/detail/featured-statis")}
            >
              The Art of the Layered Routine
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-8 font-medium">
              Temukan bagaimana urutan produk mempengaruhi penyerapan bahan
              aktif secara maksimal.
            </p>
            <button
              type="button"
              onClick={() => navigate("/ensiklopedia/detail/featured-statis")}
              className="text-sm font-bold text-[#3a5b22] underline underline-offset-8 text-left hover:text-[#2e491b] transition flex items-center gap-1 outline-none"
            >
              Baca Artikel <ArrowRight className="w-4 h-4 inline" />
            </button>
          </div>
        </div>
      </header>

      {/* --- GRID LIST ARTIKEL TERKINI (DINAMIS DARI DATABASE) --- */}
      <main className="px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-2xl font-bold text-brand-dark-500 tracking-tight">
            Artikel Edukasi Terkini
          </h2>
          <Newspaper className="w-5 h-5 text-neutral-300" />
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col justify-center items-center gap-3 text-neutral-400 text-xs font-bold">
            <Loader2 className="w-6 h-6 animate-spin text-[#3a5b22]" />
            <span>Sinkronisasi basis data pustaka artikel...</span>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {articles.map((art) => {
              const idArtikel = art.id_artikel || art.id;
              const judul = art.judul_artikel || art.title;
              const kategori = art.kategori || art.cat;
              const linkGambar = art.gambar
                ? `http://localhost:5000/uploads/${art.gambar}`
                : "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500";

              const tanggal = art.tanggal_publish
                ? new Date(art.tanggal_publish).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Terbaru";

              return (
                <div
                  key={idArtikel}
                  className="group cursor-pointer flex flex-col justify-between animate-in fade-in duration-300"
                  onClick={() => navigate(`/ensiklopedia/detail/${idArtikel}`)}
                >
                  <div>
                    <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-sm border-4 border-neutral-default transition-all group-hover:shadow-xl group-hover:border-[#3a5b22]/30">
                      <img
                        src={linkGambar}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={judul}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500";
                        }}
                      />
                    </div>

                    <span className="text-[10px] font-black text-[#3a5b22] uppercase tracking-widest mb-2 block opacity-70">
                      {kategori}
                    </span>

                    <h4 className="text-xl font-sans mb-3 text-brand-dark-500 group-hover:text-[#3a5b22] transition-colors leading-tight line-clamp-2 uppercase tracking-tight">
                      {judul}
                    </h4>

                    <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-medium line-clamp-2 italic">
                      {art.isi_artikel
                        ? art.isi_artikel.replace(/<[^>]*>/g, "")
                        : "Pelajari lebih dalam mengenai analisis fungsional dari bahan aktif."}
                    </p>
                  </div>

                  <div className="text-[10px] font-bold text-neutral-400 flex items-center justify-between uppercase tracking-wider pt-2 border-t border-neutral-50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-300" />{" "}
                      {art.read_time || "5"} min read
                    </span>
                    <span className="text-neutral-400/70 text-[9px]">
                      {tanggal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed rounded-[35px] bg-neutral-default/30 border-neutral-200 text-neutral-400 italic text-xs font-medium max-w-lg mx-auto">
            Belum ada rincian artikel edukasi terkini yang diterbitkan dalam
            sistem database.
          </div>
        )}
      </main>
    </div>
  );
};

export default ArtikelListPage;
