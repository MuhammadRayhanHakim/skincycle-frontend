import React, { useState } from "react";

const ProductDetailPage = ({ setPage }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  const productImages = [
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1570172619661-096964234f40?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-10 pt-8">
        {/* Tombol Kembali */}
        <button
          onClick={() => setPage("Beranda")}
          className="text-[#3D5532] text-xl mb-6 hover:scale-110 transition-transform"
        >
          ←
        </button>

        {/* SECTION 1: PEMBELIAN & VISUAL */}
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

          {/* Product Info & Cart */}
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
            <div className="flex items-center gap-2 mb-6">
              <div className="text-yellow-400">★★★★☆</div>
              <span className="text-xs text-gray-400">(128 Ulasan)</span>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-serif text-[#3D5532] font-bold">
                Rp 190.000
              </h2>
              <p className="text-[11px] text-gray-500 font-medium mt-1 italic">
                ✨ Beli dengan 64 Poin Botanical (Sustainable Balance)
              </p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Masker clay untuk detoksifikasi yang membantu mengangkat kotoran
              dan minyak berlebih dari pori-pori. Diperkaya ekstrak lava Jeju
              untuk menyegarkan kulit, membersihkan pori, dan membuat wajah
              terasa lebih halus serta bersih.
            </p>

            <div className="space-y-3 mb-8">
              <button className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-[#2d4025]">
                <span>🛒</span> Tambahkan Ke Keranjang
              </button>
              <button className="w-full bg-white text-[#3D5532] py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-gray-100 shadow-sm hover:bg-gray-50">
                Beli Sekarang
              </button>
            </div>

            {/* Impact Score Box */}
            <div className="bg-white/60 p-6 rounded-[30px] border border-white flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border-4 border-[#3D5532] flex items-center justify-center text-[#3D5532] font-black text-sm">
                92%
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#1e2b19]">
                  Skor Keberlanjutan
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Produk ini menggunakan kemasan daur ulang dan produksi rendah
                  emisi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: MANFAAT & KANDUNGAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Manfaat Utama */}
          <div>
            <h3 className="text-2xl font-serif text-[#1e2b19] mb-8">
              Manfaat Utama
            </h3>
            <div className="space-y-6 mb-10">
              {[
                {
                  i: "🧼",
                  t: "Membersihkan Pori-Pori",
                  d: "Membantu mengangkat kotoran, debu, dan sisa polusi yang menyumbat pori.",
                },
                {
                  i: "🌿",
                  t: "Kontrol Minyak Berlebih",
                  d: "Menyerap sebum berlebih agar kulit terasa segar dan bebas kilap.",
                },
                {
                  i: "🌙",
                  t: "Menenangkan Kulit",
                  d: "Membantu menenangkan kulit iritasi dan membuat wajah terasa lebih lembut.",
                },
              ].map((m) => (
                <div key={m.t} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#3D5532] rounded-xl flex items-center justify-center text-xl shrink-0">
                    {m.i}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#1e2b19]">{m.t}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {m.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Kecocokan Kulit */}
            <div className="bg-white/60 p-8 rounded-[40px] border border-white">
              <h5 className="text-xs font-black uppercase tracking-widest text-[#3D5532] mb-4 italic">
                Kecocokan Kulit
              </h5>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Berminyak", "Kombinasi", "Normal"].map((s) => (
                  <span
                    key={s}
                    className="px-4 py-1.5 bg-[#EDF1EC] text-[#3D5532] rounded-full text-[10px] font-bold"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">
                Kurang Disarankan Untuk:
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-red-300">
                  Sangat Kering
                </span>
                <span className="text-[10px] font-bold text-red-300">
                  Sensitif Parah
                </span>
              </div>
            </div>
          </div>

          {/* Kandungan Utama */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-2xl font-serif text-[#1e2b19]">
                Kandungan Utama
              </h3>
              <span className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest border-b border-[#3D5532] cursor-pointer">
                Lihat Semua →
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                {
                  t: "Jeju Volcanic Sphere",
                  d: "Butiran lava vulkanik asli Jeju yang efektif menyerap minyak.",
                },
                {
                  t: "Bentonite",
                  d: "Membantu membersihkan pori dan mengurangi kilap wajah.",
                },
                {
                  t: "Kaolin Clay",
                  d: "Clay lembut untuk mengangkat kotoran tanpa membuat kulit kering.",
                },
                {
                  t: "Lactic Acid",
                  d: "Membantu eksfoliasi sel kulit mati agar wajah lebih cerah.",
                },
              ].map((k) => (
                <div
                  key={k.t}
                  className="bg-white p-5 rounded-3xl border border-gray-50"
                >
                  <h5 className="font-bold text-[11px] text-[#3D5532] mb-2">
                    {k.t}
                  </h5>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {k.d}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabel Detail Komponen */}
            <table className="w-full text-left text-[10px]">
              <thead className="text-gray-400 uppercase tracking-widest">
                <tr className="border-b border-gray-100">
                  <th className="pb-3">Komponen Inti</th>
                  <th className="pb-3">Manfaat</th>
                  <th className="pb-3">Sumber</th>
                </tr>
              </thead>
              <tbody className="text-[#1e2b19] font-medium">
                {[
                  {
                    k: "Jeju Vulcanic",
                    m: "Menyerap minyak & pori",
                    s: "Pulau Jeju",
                  },
                  {
                    k: "Kaolin Clay",
                    m: "Membersihkan kotoran",
                    s: "Mineral Alami",
                  },
                  {
                    k: "Lactic Acid",
                    m: "Eksfoliasi Ringan",
                    s: "Fermentasi Gula",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-3">{row.k}</td>
                    <td className="py-3">{row.m}</td>
                    <td className="py-3 text-gray-400">{row.s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
