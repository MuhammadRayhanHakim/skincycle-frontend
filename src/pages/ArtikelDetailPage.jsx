import React from "react";

const ArtikelDetailPage = ({ setPage }) => {
  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Tombol Kembali & Info Singkat */}
        <div className="flex items-center gap-4 mb-8 text-gray-400">
          <button
            onClick={() => setPage("Kumpulan Artikel")}
            className="flex items-center gap-2 text-sm font-bold hover:text-[#3D5532] transition-colors"
          >
            ← Kembali
          </button>
          <span className="text-xs uppercase tracking-widest font-bold opacity-50">
            • 8 menit baca • Skincare • 3 hari yang lalu
          </span>
        </div>

        {/* Judul Artikel */}
        <h1 className="text-5xl font-serif text-[#1e2b19] mb-4 leading-tight">
          Seni Rutinitas Skincare
        </h1>
        <p className="text-sm font-bold text-[#3D5532] mb-10 tracking-wide">
          oleh SkinCycle
        </p>

        {/* Image Banner Besar */}
        <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-12 shadow-xl border-8 border-white">
          <img
            src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
            alt="Skincare Routine"
          />
        </div>

        {/* Konten Artikel */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8 text-lg">
          <p>
            Rutinitas skincare bukan cuma soal banyaknya produk yang kamu pakai,
            tapi bagaimana kamu menggabungkannya dengan tepat. Banyak orang
            langsung mencoba berbagai produk tanpa memahami urutan dan kebutuhan
            kulitnya, padahal hal kecil seperti ini bisa berpengaruh besar
            terhadap hasil yang didapatkan. Tanpa disadari, kebiasaan sederhana
            dalam merawat kulit bisa menentukan apakah kulitmu akan tetap sehat
            atau justru bermasalah.
          </p>

          <p>
            Setiap langkah dalam skincare punya perannya masing-masing, mulai
            dari membersihkan sisa kotoran, hingga melindungi kulit dari faktor
            luar. Sayangnya, masih banyak yang melewatkan urutan yang benar atau
            menggunakan produk yang kurang sesuai. Itulah kenapa penting untuk
            lebih memahami rutinitas skincare agar setiap produk bisa bekerja
            secara maksimal di kulitmu.
          </p>

          <div className="bg-white/50 p-8 rounded-3xl border-l-4 border-[#3D5532] italic my-10">
            "Kualitas kulitmu adalah investasi jangka panjang. Memahami urutan
            pemakaian adalah kunci utama efektivitas produk alami."
          </div>

          <p>
            Kabar baiknya, kamu nggak perlu langsung melakukan perubahan besar.
            Mulailah dari langkah sederhana, seperti memahami jenis kulitmu dan
            memilih produk yang tepat. Dengan rutinitas yang konsisten dan
            sesuai, kamu bisa mendapatkan kulit yang lebih sehat, terawat, dan
            bercahaya secara alami tanpa merusak ekosistem lingkungan di sekitar
            kita.
          </p>
        </article>

        {/* Tag & Footer Artikel */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-3">
          {["Edukasi", "Rutinitas", "Alami", "Tips"].map((tag) => (
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
