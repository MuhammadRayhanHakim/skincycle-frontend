import React from "react";

const ProductPage = ({ setPage }) => {
  const products = [
    {
      name: "Cetaphil Gentle Skin Cleanser",
      price: "Rp 169.000",
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
      desc: "Pembersih wajah lembut untuk kulit sensitif, membersihkan tanpa mengiritasi.",
    },
    {
      name: "The Ordinary Hyaluronic Acid",
      price: "Rp 145.000",
      img: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&q=80&w=400",
      desc: "Serum dengan kandungan asam hialuronat untuk hidrasi kulit yang mendalam.",
    },
    {
      name: "Innisfree Super Volcanic Mask",
      price: "Rp 150.000",
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400",
      desc: "Masker clay untuk membersihkan pori dan menyegarkan kulit dengan mineral Jeju.",
    },
    {
      name: "Wardah Lightening Face Mask",
      price: "Rp 45.000",
      img: "https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&q=80&w=400",
      desc: "Masker wajah dengan kandungan ekstrak licorice dan vitamin B3.",
    },
    {
      name: "Pond's Pure White Facial Foam",
      price: "Rp 30.000",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
      desc: "Pembersih wajah dengan formula karbon aktif untuk membersihkan kotoran.",
    },
    {
      name: "Olay Regenerist Micro-Sculpting",
      price: "Rp 380.000",
      img: "https://images.unsplash.com/photo-1620917670397-dc7bc43e813e?auto=format&fit=crop&q=80&w=400",
      desc: "Krim anti-aging dengan teknologi amino-peptide untuk mengencangkan kulit.",
    },
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19]">
      {/* SECTION 1: HEADER & FILTER */}
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
        <div className="bg-white/50 backdrop-blur-md p-6 rounded-[30px] border border-white mb-10 flex flex-wrap items-center gap-8 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">
              Kategori:
            </span>
            {["All", "Cleansers", "Serums", "Moisturizers"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-[#3D5532]"
                  defaultChecked={cat === "All"}
                />{" "}
                {cat}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">
              Tipe Kulit:
            </span>
            <div className="flex gap-2">
              {["Kering", "Berminyak", "Sensitif", "Normal"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${type === "Kering" ? "bg-[#3D5532] text-white" : "bg-white text-[#3D5532] border border-gray-100"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, index) => (
            <div
              key={index}
              /* MODIFIKASI: Navigasi ke halaman detail saat card diklik */
              onClick={() => setPage("Produk Detail")}
              className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-50 cursor-pointer"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#3D5532]">
                  TERUJI KLINIS
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#3D5532] transition-colors">
                  {p.name}
                </h4>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed line-clamp-2">
                  {p.desc}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold text-[#3D5532]">
                    {p.price}
                  </span>
                  {/* MODIFIKASI: Mencegah tombol keranjang memicu navigasi detail (stopPropagation) */}
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#3D5532] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#2d4025] shadow-lg shadow-green-900/10"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${n === 1 ? "bg-[#3D5532] text-white" : "bg-white border border-gray-100"}`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
