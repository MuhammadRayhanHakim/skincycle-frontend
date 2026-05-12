import React from "react";
import { useNavigate } from "react-router-dom";

const ArtikelDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-4 mb-8 text-gray-400">
          <button
            onClick={() => navigate("/ensiklopedia/kumpulan")}
            className="flex items-center gap-2 text-sm font-bold hover:text-[#3D5532] transition-colors"
          >
            ← Kembali
          </button>
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">
            • 8 menit baca • Skincare
          </span>
        </div>

        <h1 className="text-5xl font-serif text-[#1e2b19] mb-4 leading-tight">
          Seni Rutinitas Skincare
        </h1>
        <p className="text-sm font-bold text-[#3D5532] mb-10 tracking-wide">
          oleh SkinCycle
        </p>

        <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-12 shadow-xl border-8 border-white">
          <img
            src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
            alt="Routine"
          />
        </div>

        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8 text-lg">
          <p>
            Rutinitas skincare bukan cuma soal banyaknya produk, tapi bagaimana
            kamu menggabungkannya dengan tepat...
          </p>
          <div className="bg-white/50 p-8 rounded-3xl border-l-4 border-[#3D5532] italic my-10">
            "Kualitas kulitmu adalah investasi jangka panjang. Memahami urutan
            pemakaian adalah kunci utama efektivitas produk alami."
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-3">
          {["Edukasi", "Rutinitas", "Alami"].map((tag) => (
            <span
              key={tag}
              className="bg-white px-4 py-1.5 rounded-full text-xs font-bold text-[#3D5532] shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetailPage;
