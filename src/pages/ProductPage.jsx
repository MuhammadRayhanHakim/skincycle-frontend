import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  // State untuk filter (opsional, jika nanti ingin dibuat berfungsi menyaring data)
  const [activeType, setActiveType] = useState("Semua");

  const products = [
    {
      id: 1,
      name: "Cetaphil Gentle Skin Cleanser",
      price: "Rp 169.000",
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
      desc: "Pembersih wajah lembut untuk kulit sensitif, membersihkan tanpa mengiritasi.",
    },
    {
      id: 2,
      name: "The Ordinary Hyaluronic Acid",
      price: "Rp 145.000",
      img: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&q=80&w=400",
      desc: "Serum dengan kandungan asam hialuronat untuk hidrasi kulit yang mendalam.",
    },
    {
      id: 3,
      name: "Innisfree Super Volcanic Mask",
      price: "Rp 150.000",
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400",
      desc: "Masker clay untuk membersihkan pori dan menyegarkan kulit dengan mineral Jeju.",
    },
    {
      id: 4,
      name: "Wardah Lightening Face Mask",
      price: "Rp 45.000",
      img: "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&q=80&w=400",
      desc: "Masker wajah dengan kandungan ekstrak licorice dan vitamin B3.",
    },
    {
      id: 5,
      name: "Pond's Pure White Facial Foam",
      price: "Rp 30.000",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
      desc: "Pembersih wajah dengan formula karbon aktif untuk membersihkan kotoran.",
    },
    {
      id: 6,
      name: "Olay Regenerist Micro-Sculpting",
      price: "Rp 380.000",
      img: "https://images.unsplash.com/photo-1620917670397-dc7bc43e813e?auto=format&fit=crop&q=80&w=400",
      desc: "Krim anti-aging dengan teknologi amino-peptide untuk mengencangkan kulit.",
    },
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19]">
      <section className="min-h-[calc(100vh-64px)] flex flex-col px-10 py-10">
        <header className="mb-12">
          <h1 className="text-5xl font-serif mb-4">Galeri Produk</h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Diformulasikan secara ilmiah, terinspirasi secara botani. Temukan
            rangkaian produk perawatan kulit berkelanjutan yang dirancang untuk
            setiap siklus kulit.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="bg-white/50 backdrop-blur-md p-8 rounded-[40px] border border-white mb-10 flex flex-col gap-6 shadow-sm">
          {/* Kategori Produk */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D5532] opacity-50 w-24">
              Kategori:
            </span>
            <div className="flex flex-wrap gap-4">
              {["All", "Cleansers", "Serums", "Moisturizers"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm font-bold cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="accent-[#3D5532] w-4 h-4"
                    defaultChecked={cat === "All"}
                  />
                  <span className="group-hover:text-[#3D5532] transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* HR Divider tipis */}
          <div className="h-[1px] bg-[#3D5532]/10 w-full"></div>

          {/* TAMBAHAN: Tipe Kulit */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D5532] opacity-50 w-24">
              Tipe Kulit:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Berminyak", "Kering", "Kombinasi", "Sensitif"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeType === type
                        ? "bg-[#3D5532] text-white shadow-lg shadow-green-900/20"
                        : "bg-white text-[#3D5532] border border-[#3D5532]/10 hover:border-[#3D5532]/40"
                    }`}
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/produk/detail/${p.id}`)}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-50 cursor-pointer flex flex-col"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black text-[#3D5532] tracking-widest uppercase shadow-sm">
                  Teruji Klinis
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3 group-hover:text-[#3D5532] transition-colors leading-tight">
                  {p.name}
                </h4>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed line-clamp-2 italic">
                  {p.desc}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xl font-serif font-bold text-[#3D5532]">
                    {p.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Berhasil masuk keranjang!");
                    }}
                    className="bg-[#3D5532] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2d4025] transition-all shadow-lg active:scale-95"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
