// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ArtikelListPage = () => {
//   const navigate = useNavigate();
//   const articles = [
//     {
//       title: "Sun Defense Beyond SPF",
//       cat: "Prevention",
//       img: "https://images.unsplash.com/photo-1526045612212-70caf35c11bc?w=500",
//     },
//     {
//       title: "Pro-Aging Philosophy",
//       cat: "Longevity",
//       img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500",
//     },
//     {
//       title: "The Lifecycle of a Bottle",
//       cat: "Sustainability",
//       img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d520?w=500",
//     },
//     {
//       title: "Mindful Massaging Techniques",
//       cat: "Rituals",
//       img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500",
//     },
//     {
//       title: "The Microbiome Balance",
//       cat: "Longevity",
//       img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500",
//     },
//     {
//       title: "Internal Hydration Myths",
//       cat: "Rituals",
//       img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
//     },
//   ];

//   return (
//     <div className="bg-[#F2EDE4] font-sans text-[#1e2b19] pb-20">
//       <header className="px-10 py-16 max-w-7xl mx-auto">
//         <h1 className="text-5xl font-serif mb-12 text-[#3D5532]">
//           Jendela Edukasi Skincare
//         </h1>
//         <div className="bg-white rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-white">
//           <div
//             className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden"
//             onClick={() => navigate("/ensiklopedia/detail/1")}
//           >
//             <img
//               src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//               alt="Featured"
//             />
//           </div>
//           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//             <span className="text-[10px] font-black text-[#3D5532] uppercase tracking-[0.2em] mb-4">
//               Featured Ritual
//             </span>
//             <h2
//               className="text-3xl md:text-4xl font-serif mb-6 leading-tight cursor-pointer hover:text-[#3D5532] transition-colors"
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//             >
//               The Art of the Layered Routine
//             </h2>
//             <p className="text-gray-500 text-base leading-relaxed mb-8">
//               Temukan bagaimana urutan produk mempengaruhi penyerapan bahan
//               aktif secara maksimal.
//             </p>
//             <button
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//               className="text-sm font-bold text-[#3D5532] underline underline-offset-8 text-left hover:opacity-70 transition"
//             >
//               Baca Artikel →
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="px-10 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-2xl font-bold text-[#1e2b19]">
//             Artikel Edukasi Terkini
//           </h2>
//           <span className="text-xl opacity-30">📰</span>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {articles.map((art, i) => (
//             <div
//               key={i}
//               className="group cursor-pointer"
//               onClick={() => navigate("/ensiklopedia/detail/1")}
//             >
//               <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-md border-4 border-white transition-all group-hover:shadow-xl group-hover:-translate-y-1">
//                 <img
//                   src={art.img}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   alt={art.title}
//                 />
//               </div>
//               <span className="text-[10px] font-bold text-[#3D5532] uppercase tracking-widest mb-3 block opacity-60">
//                 {art.cat}
//               </span>
//               <h4 className="text-xl font-bold mb-3 group-hover:text-[#3D5532] transition-colors">
//                 {art.title}
//               </h4>
//               <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">
//                 Pelajari lebih dalam mengenai filosofi perawatan kulit
//                 berkelanjutan.
//               </p>
//               <div className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
//                 ⏱️ 5 min read
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ArtikelListPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Newspaper, ArrowRight } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const ArtikelListPage = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "Sun Defense Beyond SPF",
      cat: "Prevention",
      img: "https://images.unsplash.com/photo-1526045612212-70caf35c11bc?w=500",
    },
    {
      title: "Pro-Aging Philosophy",
      cat: "Longevity",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500",
    },
    {
      title: "The Lifecycle of a Bottle",
      cat: "Sustainability",
      img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500",
    },
    {
      title: "Mindful Massaging Techniques",
      cat: "Rituals",
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500",
    },
    {
      title: "The Microbiome Balance",
      cat: "Longevity",
      img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500",
    },
    {
      title: "Internal Hydration Myths",
      cat: "Rituals",
      img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500",
    },
  ];

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20">
      {/* --- HEADER FEATURED POST --- */}
      <header className="px-10 py-16 max-w-7xl mx-auto">
        <h1 className="text-5xl font-sans mb-12 text-brand-dark-500 tracking-tight">
          Jendela Edukasi Skincare
        </h1>

        <div className="bg-neutral-default rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[450px] border border-neutral-default">
          <div
            className="md:w-1/2 h-64 md:h-full cursor-pointer overflow-hidden bg-neutral-50"
            onClick={() => navigate("/ensiklopedia/detail/1")}
          >
            <img
              src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800"
              className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
              alt="Featured"
            />
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-[10px] font-black text-brand-primary-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Featured Ritual
            </span>
            <h2
              className="text-3xl md:text-4xl font-sans mb-6 leading-tight cursor-pointer hover:text-brand-primary-300 transition-colors text-brand-dark-500"
              onClick={() => navigate("/ensiklopedia/detail/1")}
            >
              The Art of the Layered Routine
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-8 font-medium">
              Temukan bagaimana urutan produk mempengaruhi penyerapan bahan
              aktif secara maksimal.
            </p>
            <button
              type="button"
              onClick={() => navigate("/ensiklopedia/detail/1")}
              className="text-sm font-bold text-brand-primary-300 underline underline-offset-8 text-left hover:text-brand-primary-500 transition flex items-center gap-1 outline-none"
            >
              Baca Artikel <ArrowRight className="w-4 h-4 inline" />
            </button>
          </div>
        </div>
      </header>

      {/* --- GRID LIST ARTIKEL --- */}
      <main className="px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-2xl font-bold text-brand-dark-500 tracking-tight">
            Artikel Edukasi Terkini
          </h2>
          <Newspaper className="w-5 h-5 text-neutral-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((art, i) => (
            <div
              key={i}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => navigate("/ensiklopedia/detail/1")}
            >
              <div>
                {/* Image Container Card */}
                <div className="rounded-[35px] overflow-hidden h-64 md:h-72 mb-6 shadow-sm border-4 border-neutral-default transition-all group-hover:shadow-xl group-hover:border-brand-primary-100/30">
                  <img
                    src={art.img}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={art.title}
                  />
                </div>

                {/* Meta Tag Kategori */}
                <span className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2 block opacity-70">
                  {art.cat}
                </span>

                {/* Judul Sub-Artikel - Menggunakan Marcellus SC */}
                <h4 className="text-xl font-sans mb-3 text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors leading-tight">
                  {art.title}
                </h4>

                <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-medium line-clamp-2 italic">
                  Pelajari lebih dalam mengenai filosofi perawatan kulit
                  berkelanjutan yang aman untuk sel epidermis.
                </p>
              </div>

              {/* Footer Badge Waktu Baca */}
              <div className="text-[10px] font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider pt-2">
                <Clock className="w-3.5 h-3.5 text-neutral-300" /> 5 min read
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtikelListPage;
