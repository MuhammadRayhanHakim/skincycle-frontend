import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnsiklopediaPage = () => {
  // Hook untuk navigasi antar route
  const navigate = useNavigate();

  // State untuk mengontrol visibilitas Popup dan data yang terpilih
  const [showPopup, setShowPopup] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const skinTypes = [
    {
      name: "Kering",
      desc: "Kulit terasa kencang, kasar, dan tampak bersisik atau mudah mengelupas.",
      img: "🧪",
      details: {
        char: [
          "Pori-pori hampir tidak terlihat",
          "Permukaan kasar and kusam",
          "Kurang elastisitas",
        ],
        tips: [
          "Gunakan pembersih berbasis krim",
          "Pakai pelembap tekstur rich/oil-based",
          "Hindari mandi air terlalu panas",
        ],
        ingredients: "Ceramides, Glycerin",
        avoid: "Alcohol, Harsh Scrub",
      },
    },
    {
      name: "Berminyak",
      desc: "Tampak mengkilap karena produksi sebum berlebih, pori-pori besar, dan rentan komedo.",
      img: "🌿",
      details: {
        char: [
          "Pori-pori besar dan terbuka",
          "Wajah cepat mengkilap",
          "Rentan jerawat/komedo",
        ],
        tips: [
          "Double cleansing harian",
          "Pilih produk non-comedogenic",
          "Pakai pelembap water-based",
        ],
        ingredients: "Salicylic Acid, Niacinamide",
        avoid: "Mineral Oil, Paraben",
      },
    },
    {
      name: "Kombinasi",
      desc: "Area T-zone berminyak, namun area pipi tetap normal atau kering.",
      img: "✨",
      details: {
        char: [
          "T-Zone (dahi, hidung, dagu) berminyak",
          "Area pipi kering/normal",
          "Pori-pori besar di hidung",
        ],
        tips: [
          "Gunakan produk berbeda untuk area wajah",
          "Eksfoliasi fokus di T-zone",
          "Hydration seimbang",
        ],
        ingredients: "Hyaluronic Acid, Green Tea",
        avoid: "Produk terlalu berminyak",
      },
    },
    {
      name: "Sensitif",
      desc: "Mudah mengalami iritasi, kemerahan, atau perih terhadap produk tertentu.",
      img: "🌸",
      details: {
        char: [
          "Mudah merah/gatal",
          "Bereaksi pada wewangian",
          "Terasa perih saat ganti produk",
        ],
        tips: [
          "Uji tempel (patch test) selalu",
          "Gunakan bahan minimalis",
          "Cari label 'Fragrance-free'",
        ],
        ingredients: "Aloe Vera, Centella Asiatica",
        avoid: "Parfume, Essential Oils",
      },
    },
  ];

  const handleOpenPopup = (type) => {
    setSelectedType(type);
    setShowPopup(true);
  };

  return (
    <div className="bg-[#F2EDE4] font-sans relative">
      {/* SECTION 1: HEADER & JENIS KULIT */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-10 py-4">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-serif text-[#1e2b19] mb-3 leading-tight">
            Ensiklopedia Jenis Kulit
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Kenali kulitmu lebih dalam dengan panduan berbasis sains dan bahan
            alami yang aman untuk kesehatanmu dan bumi.
          </p>
        </header>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-bold text-[#1e2b19]">
              Kenali Jenis Kulitmu
            </h2>
            <span className="text-xs font-bold text-[#3D5532] uppercase tracking-[0.2em] cursor-pointer border-b-2 border-[#3D5532]">
              Pengantar Dasar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skinTypes.map((item) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-[35px] text-center shadow-sm border border-gray-100 flex flex-col items-center group transition-all hover:shadow-xl"
              >
                <div
                  onClick={() => handleOpenPopup(item)}
                  className="w-full h-32 bg-[#EBEBE6] rounded-[25px] mb-4 flex items-center justify-center text-4xl shadow-inner cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {item.img}
                </div>
                <h4 className="text-xl font-bold text-[#1e2b19] mb-2">
                  {item.name}
                </h4>
                <p className="text-[12px] text-gray-500 mb-4 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
                <button
                  onClick={() => handleOpenPopup(item)}
                  className="bg-[#3D5532] text-white w-full py-3 rounded-xl text-xs font-bold mt-auto hover:bg-[#2d4025] transition-colors"
                >
                  Pelajari Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- POPUP COMPONENT (Fixed Overlay) --- */}
      {showPopup && selectedType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          ></div>

          <div className="relative bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <div className="md:w-2/5 bg-gradient-to-br from-[#A3B18A] to-[#3D5532] p-10 flex flex-col justify-end text-white">
              <span className="text-6xl mb-6">{selectedType.img}</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                Skin Report
              </p>
              <h3 className="text-4xl font-serif leading-tight">
                Detail Tipe Kulit <br /> {selectedType.name}
              </h3>
            </div>

            <div className="md:w-3/5 p-10 max-h-[85vh] overflow-y-auto">
              <button
                className="absolute top-6 right-8 text-2xl text-gray-400 hover:text-black transition-colors"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </button>

              <div className="space-y-8">
                <section>
                  <h4 className="text-[#3D5532] font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#3D5532] rounded-full"></span>{" "}
                    Karakteristik
                  </h4>
                  <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 leading-relaxed">
                    {selectedType.details.char.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>

                <section className="bg-[#F9F9F7] p-6 rounded-3xl border border-gray-100">
                  <h4 className="text-[#3D5532] font-bold text-sm mb-4 flex items-center gap-2">
                    💡 Tips Perawatan Berkelanjutan
                  </h4>
                  <div className="space-y-4">
                    {selectedType.details.tips.map((tip, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-5 h-5 bg-[#3D5532] text-white rounded-full flex items-center justify-center text-[10px] shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#EDF1EC] p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Kandungan Utama
                    </h5>
                    <p className="text-xs font-bold text-[#3D5532]">
                      {selectedType.details.ingredients}
                    </p>
                  </div>
                  <div className="bg-[#FDF2F2] p-4 rounded-2xl">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Hindari Bahan
                    </h5>
                    <p className="text-xs font-bold text-red-400">
                      {selectedType.details.avoid}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ARTIKEL EDUKASI */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10 bg-white/20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-[#1e2b19]">
              Artikel Edukasi
            </h2>
            <span
              onClick={() => navigate("/ensiklopedia/kumpulan")}
              className="text-xs font-bold text-[#3D5532] uppercase tracking-widest cursor-pointer hover:underline"
            >
              Lihat Semua
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[550px]">
            <div
              onClick={() => navigate("/ensiklopedia/detail/1")}
              className="lg:col-span-8 relative rounded-[40px] overflow-hidden group shadow-2xl h-full cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Skincare Art"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <span className="bg-[#3D5532] text-white px-4 py-1 rounded-full text-[10px] font-bold w-fit mb-4">
                  PANDUAN
                </span>
                <h3 className="text-white text-4xl font-serif mb-4 leading-tight">
                  Seni Rutinitas Skincare Berkelanjutan
                </h3>
                <p className="text-white/80 text-base max-w-xl mb-6">
                  Pelajari urutan penggunaan produk alami secara tepat untuk
                  mendapatkan hasil maksimal.
                </p>
                <button className="text-white text-sm font-bold underline underline-offset-4 text-left">
                  Baca Selengkapnya →
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 h-full">
              {[
                { cat: "Perlindungan", title: "Pentingnya Filter UV harian." },
                { cat: "Pembersih", title: "Double cleansing bahan alami." },
                { cat: "Nutrisi", title: "Antioksidan regenerasi sel." },
              ].map((item) => (
                <div
                  key={item.cat}
                  onClick={() => navigate("/ensiklopedia/detail/1")}
                  className="bg-[#EDD9C1] p-6 rounded-[30px] border border-[#3D5532]/10 hover:bg-[#e6ccad] transition-all flex-1 flex flex-col justify-center cursor-pointer"
                >
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#3D5532] mb-2">
                    {item.cat}
                  </h5>
                  <p className="text-base font-bold text-[#1e2b19] leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: KANDUNGAN BAHAN */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10">
        <div className="max-w-7xl mx-auto w-full bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-[#1e2b19] mb-4">
              Kandungan Bahan Skincare
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Cari tahu manfaat dari setiap kandungan alami yang paling tepat
              untukmu.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-[#F9F9F7] rounded-full p-2 flex items-center shadow-inner mb-12 border border-gray-100">
            <input
              type="text"
              placeholder="Cari kandungan bahan..."
              className="flex-grow px-6 text-base bg-transparent outline-none"
            />
            <button className="bg-[#3D5532] text-white px-8 py-3 rounded-full text-sm font-bold">
              Cari
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Bakuchiol",
                tag: "Anti-Aging",
                icon: "🌱",
                desc: "Alternatif alami retinol untuk merangsang kolagen.",
              },
              {
                name: "Niacinamide",
                tag: "Brightening",
                icon: "✨",
                desc: "Mengecilkan pori dan memperkuat skin barrier.",
              },
              {
                name: "Hyaluronic Acid",
                tag: "Hydrating",
                icon: "💧",
                desc: "Menjaga hidrasi kulit sepanjang hari.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-[#F9F9F7] p-6 rounded-[35px] hover:bg-[#F2EDE4] transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold text-[#1e2b19] group-hover:text-[#3D5532] transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <span className="bg-white text-[#3D5532] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnsiklopediaPage;
