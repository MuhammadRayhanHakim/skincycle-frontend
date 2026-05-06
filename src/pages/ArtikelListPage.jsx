import React from "react";

const ArtikelListPage = ({ setPage }) => {
  const articles = [
    { title: "Sun Defense Beyond SPF", cat: "Prevention", img: "https://images.unsplash.com/photo-1526045612212-70caf35c11bc?w=500" },
    { title: "Pro-Aging Philosophy", cat: "Longevity", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500" },
    { title: "The Lifecycle of a Bottle", cat: "Sustainability", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d520?w=500" },
    { title: "Mindful Massaging Techniques", cat: "Rituals", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500" },
    { title: "The Microbiome Balance", cat: "Longevity", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500" },
    { title: "Internal Hydration Myths", cat: "Rituals", img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500" },
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19] pb-20">
      <header className="px-10 py-16 max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif mb-12 text-[#3D5532]">
          Jendela Edukasi Skincare
        </h1>

        {/* Featured Article Card */}
        <div className="bg-white rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-white">
          <div 
            className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden"
            onClick={() => setPage("Detail Artikel")} // Pastikan string ini sama dengan case di App.jsx
          >
            <img
              src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              alt="Featured"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-[10px] font-black text-[#3D5532] uppercase tracking-[0.2em] mb-4">
              Featured Ritual
            </span>
            <h2 
              className="text-3xl md:text-4xl font-serif mb-6 leading-tight cursor-pointer hover:text-[#3D5532] transition-colors"
              onClick={() => setPage("Detail Artikel")}
            >
              The Art of the Layered Routine
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Temukan bagaimana urutan produk mempengaruhi penyerapan bahan aktif secara maksimal ke dalam kulit.
            </p>
            <button
              onClick={() => setPage("Detail Artikel")}
              className="text-sm font-bold text-[#3D5532] underline underline-offset-8 text-left hover:opacity-70 transition"
            >
              Baca Artikel →
            </button>
          </div>
        </div>
      </header>

      <main className="px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#1e2b19]">
              Artikel Edukasi Terkini
            </h2>
            <p className="text-sm text-gray-400 font-medium">
              Kumpulan artikel bermanfaat untuk kesehatan kulit tanpa merusak lingkungan.
            </p>
          </div>
          <span className="text-xl opacity-30">📰</span>
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((art, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={() => setPage("Detail Artikel")} // Trigger navigasi saat card diklik
            >
              <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-md border-4 border-white transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                <img
                  src={art.img}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={art.title}
                />
              </div>
              <span className="text-[10px] font-bold text-[#3D5532] uppercase tracking-widest mb-3 block opacity-60">
                {art.cat}
              </span>
              <h4 className="text-xl font-bold mb-3 group-hover:text-[#3D5532] transition-colors">
                {art.title}
              </h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">
                Pelajari lebih dalam mengenai filosofi perawatan kulit berkelanjutan dan ramah lingkungan.
              </p>
              <div className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                ⏱️ 5 min read
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-4">
          <button className="text-xs font-bold text-gray-400 hover:text-[#3D5532] transition">
            ‹ Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  n === 1 ? "bg-[#3D5532] text-white" : "text-gray-400 hover:bg-gray-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button className="text-xs font-bold text-[#3D5532] hover:opacity-70 transition">
            Next ›
          </button>
        </div>
      </main>
    </div>
  );
};

export default ArtikelListPage;