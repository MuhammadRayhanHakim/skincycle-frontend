import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#3D5532]">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Container.png"
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F2EDE4]/80 via-[#F2EDE4]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          <div className="md:col-span-7">
            <span className="bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 shadow-sm">
              Conscious Care
            </span>
            <h2 className="text-6xl font-serif mt-8 leading-[1.1] text-gray-800">
              Ubah Rutinitas Skincare <br />
              Menjadi Aksi Nyata <br />
              <span className="italic text-[#3D5532]">Untuk Bumi</span>
            </h2>
            <p className="mt-8 text-gray-600 max-w-xl text-xl leading-relaxed font-medium">
              Dapatkan reward dengan mendaur ulang kemasan skincare kamu dan
              pelajari kandungan produk yang aman bagi kulit serta lingkungan.
            </p>
            <div className="flex gap-5 mt-12">
              <button
                onClick={() => navigate("/daur-ulang/simpan")}
                className="bg-[#3D5532] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#2d4025] transition-all transform hover:scale-105"
              >
                Ayo Mulai!
              </button>
              <button
                onClick={() => navigate("/ensiklopedia")}
                className="bg-white/50 backdrop-blur-sm border-2 border-[#3D5532] px-10 py-4 rounded-full font-bold hover:bg-[#3D5532] hover:text-white transition-all transform hover:scale-105"
              >
                Jelajahi Fitur
              </button>
            </div>
          </div>

          {/* Sisi Kanan: Impact Dashboard */}
          <div className="md:col-span-5 flex justify-center">
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[50px] shadow-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-bold uppercase text-sm tracking-wider text-[#3D5532]">
                  Impact Dashboard
                </h4>
                <span className="text-sm font-medium text-gray-600">
                  Mei 2026
                </span>
              </div>
              <div className="flex items-end gap-4 h-48 justify-center mb-4">
                <div className="w-10 bg-[#A3B18A] rounded-t-xl h-[40%] transition-all"></div>
                <div className="w-10 bg-[#588157] rounded-t-xl h-[70%] transition-all"></div>
                <div className="w-10 bg-[#3D5532] rounded-t-xl h-[90%] transition-all shadow-lg"></div>
                <div className="w-10 bg-[#DAD7CD] rounded-t-xl h-[55%] transition-all"></div>
                <div className="w-10 bg-[#344E41] rounded-t-xl h-[75%] transition-all"></div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/30 flex justify-between items-center text-sm">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Total Recycled
                  </p>
                  <p className="text-2xl font-black text-[#3D5532]">12.5 kg</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                    Carbon Saved
                  </p>
                  <p className="text-2xl font-black text-green-700">8.2 CO2e</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ENSIKLOPEDIA --- */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10 bg-white/40">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-serif text-[#1e2b19] mb-4">
              Ensiklopedia
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
              Kenali jenis kulitmu dan pelajari kandungan alami yang memberikan
              manfaat optimal sekaligus menjaga ekosistem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full max-h-[600px]">
            <div className="lg:col-span-7 bg-[#EBEBE6] p-10 rounded-[50px] flex flex-col justify-between shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#1e2b19]">
                  Struktur Jenis Kulit
                </h3>
                <span className="text-3xl">🧬</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Berminyak", "Kering", "Kombinasi", "Sensitif"].map(
                  (type) => (
                    <div
                      key={type}
                      onClick={() => navigate("/ensiklopedia")}
                      className="bg-white p-5 rounded-3xl border border-gray-50 hover:bg-[#3D5532]/5 transition-all cursor-pointer"
                    >
                      <h4 className="font-bold text-base text-[#3D5532] mb-2">
                        Kulit {type}
                      </h4>
                      <p className="text-xs text-gray-400">
                        Ketuk untuk mempelajari karakteristik kulit{" "}
                        {type.toLowerCase()}.
                      </p>
                    </div>
                  ),
                )}
              </div>
              <button
                onClick={() => navigate("/ensiklopedia")}
                className="mt-6 text-sm font-black text-[#3D5532] underline underline-offset-8 hover:text-[#1e2b19] transition-colors uppercase tracking-widest text-left"
              >
                Lihat panduan selengkapnya →
              </button>
            </div>

            <div className="lg:col-span-5 bg-[#EDD9C1] p-10 rounded-[50px] flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-2xl font-bold text-[#1e2b19] mb-3">
                  Bahan Alami
                </h3>
                <p className="text-sm text-[#3D5532]/80 mb-8 leading-relaxed">
                  Pelajari bahan alami 100% aman bagi kulit yang ramah terhadap
                  ekosistem.
                </p>
                <div className="space-y-4">
                  {[
                    { n: "Aloe Vera", i: "🌿", s: "Menenangkan & Menghidrasi" },
                    {
                      n: "Niacinamide",
                      i: "🧪",
                      s: "Memperbaiki Skin Barrier",
                    },
                  ].map((b) => (
                    <div
                      key={b.n}
                      onClick={() => navigate("/ensiklopedia")}
                      className="flex items-center gap-4 bg-white/50 p-4 rounded-3xl backdrop-blur-sm hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
                        {b.i}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#1e2b19]">
                          {b.n}
                        </h4>
                        <p className="text-xs text-gray-600 font-medium">
                          {b.s}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate("/ensiklopedia")}
                className="w-full mt-8 py-5 border-2 border-[#3D5532] text-[#3D5532] rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#3D5532] hover:text-white transition-all shadow-lg"
              >
                Cari semua kandungan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: DAUR ULANG --- */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-5xl font-serif text-[#1e2b19] leading-tight mb-8">
              Daur Ulang dan <br /> Dapatkan{" "}
              <span className="text-[#3D5532]">Reward</span>
            </h2>
            <p className="text-gray-500 text-lg mb-12 max-w-lg leading-relaxed">
              Jadilah bagian dari gerakan ekonomi sirkular kami. Pengembalian
              kemasan kosongmu memberikan keuntungan eksklusif.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {[
                "Kumpulkan Produk",
                "Akses Perhitungan",
                "Kirim Ke Lokasi",
                "Dapatkan Reward",
              ].map((step, i) => (
                <div key={step} className="flex gap-5">
                  <span className="text-3xl font-serif font-black text-[#3D5532]/20 italic">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="font-black text-[#1e2b19] text-sm mb-3 uppercase tracking-widest">
                      {step}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      Langkah optimal untuk menjaga rutinitas kecantikan yang
                      berkelanjutan.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <h3 className="text-center font-black text-[#1e2b19] text-xl mb-10 tracking-[0.1em] uppercase">
                Daftar Karung Sampah
              </h3>
              <div className="space-y-5 mb-12">
                {[
                  { n: "01", t: "Plastik Kemasan", p: "Rp12.000" },
                  { n: "02", t: "Kaca Bening", p: "Rp10.500" },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="flex justify-between items-center p-6 bg-[#F9F9F7] rounded-3xl border border-transparent hover:border-[#3D5532]/10 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-[#3D5532] text-white flex items-center justify-center text-xs font-black">
                        {item.n}
                      </div>
                      <span className="font-bold text-sm text-[#1e2b19] uppercase tracking-wide">
                        1 kg {item.t}
                      </span>
                    </div>
                    <span className="text-sm font-black text-[#3D5532]">
                      {item.p}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/daur-ulang/simpan")}
                className="w-full bg-[#3D5532] hover:bg-[#2d4025] text-white py-6 rounded-3xl font-black text-xs tracking-[0.3em] transition-all shadow-2xl uppercase active:scale-95"
              >
                Mulai Daur Ulang Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: FORUM DISKUSI --- */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20 bg-white/30">
        <div className="max-w-7xl mx-auto w-full text-center mb-16">
          <h2 className="text-5xl font-serif text-[#1e2b19] mb-4">
            Forum Diskusi
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
            Terhubung, berbagi, dan tumbuh bersama komunitas yang memiliki visi
            hijau yang sama.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contoh Preview Forum */}
          <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#3D5532] rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div>
                  <h5 className="text-sm font-bold">Sarah Cantik</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Kontributor Utama
                  </p>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-4 text-[#1e2b19]">
                Perjalanan 30 hari saya dengan serum alipik
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "Beralih ke rutinitas berkelanjutan mengubah segalanya..."
              </p>
            </div>
            <button
              onClick={() => navigate("/forum")}
              className="mt-10 text-[10px] font-black bg-[#F9F9F7] px-6 py-3 rounded-full uppercase tracking-widest hover:bg-[#3D5532] hover:text-white transition-all w-fit"
            >
              Lihat Detail
            </button>
          </div>

          <div className="lg:col-span-2 bg-[#EBEBE6] p-10 rounded-[50px] flex flex-col">
            <h3 className="font-black text-xs mb-8 uppercase tracking-[0.2em] text-[#3D5532]">
              🔥 Diskusi Populer
            </h3>
            <ul className="space-y-6 flex-grow">
              {[
                "Cara membersihkan kemasan",
                "Transisi skincare kulit sensitif",
                "Bahan alami hidrasi",
              ].map((t) => (
                <li
                  key={t}
                  onClick={() => navigate("/forum")}
                  className="cursor-pointer group border-b border-[#3D5532]/10 pb-4"
                >
                  <h5 className="text-sm font-bold text-[#1e2b19] group-hover:text-[#3D5532] transition-colors">
                    {t}
                  </h5>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/forum")}
              className="w-full mt-10 py-5 bg-[#3D5532] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2d4025] transition-all shadow-md"
            >
              Lihat Semua Forum →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
