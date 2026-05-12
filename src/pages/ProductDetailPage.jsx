import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL jika nanti data ditarik dari API

  const productImages = [
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1570172619661-096964234f40?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-10 pt-8">
        <button
          onClick={() => navigate("/produk")}
          className="text-[#3D5532] text-xl mb-6 hover:scale-110 transition-transform flex items-center gap-2"
        >
          ←{" "}
          <span className="text-xs font-black uppercase tracking-widest">
            Kembali ke Galeri
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Gallery Kiri */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImg === idx ? "border-[#3D5532]" : "border-transparent opacity-60"}`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="lg:col-span-5">
            <div className="rounded-[40px] overflow-hidden shadow-2xl bg-white aspect-square">
              <img
                src={productImages[selectedImg]}
                className="w-full h-full object-cover"
                alt="Main Product"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              <span className="bg-[#E1E6DC] text-[#3D5532] px-4 py-1 rounded-full text-[10px] font-black uppercase">
                Bersumber Berkelanjutan
              </span>
              <span className="bg-[#F4F1EE] text-gray-400 px-4 py-1 rounded-full text-[10px] font-black uppercase">
                Vegan
              </span>
            </div>

            <h1 className="text-4xl font-serif text-[#1e2b19] mb-2 leading-tight">
              Innisfree Super Vulcanic Pore Clay Mask
            </h1>
            <div className="text-yellow-400 mb-6 text-sm">
              ★★★★☆ <span className="text-gray-400 ml-1">(128 Ulasan)</span>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-serif text-[#3D5532] font-bold">
                Rp 190.000
              </h2>
              <p className="text-[11px] text-gray-500 font-medium mt-1 italic">
                ✨ Beli dengan 64 Poin Botanical
              </p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Masker clay untuk detoksifikasi yang membantu mengangkat kotoran
              dan minyak berlebih. Diperkaya ekstrak lava Jeju untuk menyegarkan
              kulit.
            </p>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => alert("Berhasil masuk keranjang!")}
                className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-[#2d4025]"
              >
                <span>🛒</span> Tambahkan Ke Keranjang
              </button>
              <button className="w-full bg-white text-[#3D5532] py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-gray-100 shadow-sm hover:bg-gray-50">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* SECTION MANFAAT & KANDUNGAN (Tetap sama secara visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-2xl font-serif text-[#1e2b19] mb-8">
              Manfaat Utama
            </h3>
            <div className="space-y-6">
              {[
                "Membersihkan Pori-Pori",
                "Kontrol Minyak Berlebih",
                "Menenangkan Kulit",
              ].map((m, i) => (
                <div key={m} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#3D5532] rounded-xl flex items-center justify-center text-xl shrink-0 text-white">
                    {i === 0 ? "🧼" : i === 1 ? "🌿" : "🌙"}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#1e2b19]">{m}</h5>
                    <p className="text-xs text-gray-400">
                      Diformulasikan untuk hasil maksimal harian.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
