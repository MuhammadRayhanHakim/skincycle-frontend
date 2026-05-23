import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const ArtikelDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* TOP BAR / NAVIGATION BACK */}
        <div className="flex items-center gap-4 mb-8 text-neutral-400">
          <button
            type="button"
            onClick={() => navigate("/ensiklopedia/kumpulan")}
            className="flex items-center gap-2 text-sm font-bold text-brand-primary-300 hover:text-brand-primary-500 transition-colors outline-none"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <span className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center gap-1">
            • <BookOpen className="w-3 h-3 inline" /> 8 menit baca • Skincare
          </span>
        </div>

        {/* TITLE HEADLINE */}
        <h1 className="text-5xl font-sans text-brand-dark-500 mb-4 leading-tight">
          Seni Rutinitas Skincare
        </h1>
        <p className="text-sm font-bold text-brand-primary-300 mb-10 tracking-wide uppercase">
          oleh SkinCycle
        </p>

        {/* CONTAINER HERO IMAGE COMPONENT */}
        <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-12 shadow-xl border-8 border-neutral-default">
          <img
            src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
            alt="Routine"
          />
        </div>

        {/* ARTICLE BODY CONTENT */}
        <article className="prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-8 text-lg font-medium">
          <p>
            Rutinitas skincare bukan cuma soal banyaknya produk, tapi bagaimana
            kamu menggabungkannya dengan tepat...
          </p>

          {/* QUOTE BLOCK - MENGGUNAKAN WARNA BRAND DAN NETRAL SYSTEM */}
          <div className="bg-neutral-default/50 p-8 rounded-3xl border-l-4 border-brand-primary-300 italic my-10 text-brand-dark-500">
            "Kualitas kulitmu adalah investasi jangka panjang. Memahami urutan
            pemakaian adalah kunci utama efektivitas produk alami."
          </div>
        </article>

        {/* TAGS FOOTER CONTAINER */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap gap-3">
          {["Edukasi", "Rutinitas", "Alami"].map((tag) => (
            <span
              key={tag}
              className="bg-neutral-default border border-neutral-100 px-4 py-1.5 rounded-full text-xs font-bold text-brand-primary-300 shadow-sm uppercase tracking-wider"
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
