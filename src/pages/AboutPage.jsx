import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F2EDE4] font-sans text-[#1e2b19]">
      {/* SECTION 1: HERO - VISI UTAMA (Full Screen) */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-80"
            alt="Nature background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F2EDE4] via-[#F2EDE4]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl bg-white/30 backdrop-blur-md p-12 rounded-[50px] border border-white/50 shadow-2xl">
          <h1 className="text-6xl font-serif mb-6 leading-tight">
            Kulit Glowing Tanpa Harus Merusak Bumi.
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Banyak skincare di luar sana yang menjanjikan hasil instan tapi
            merusak skin barrier, bahkan meninggalkan sampah plastik yang abadi.
            Di sini kami membantumu memahami apa yang kulitmu butuhkan.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#3D5532] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition"
          >
            Mulai Hidup Mempesona
          </button>
        </div>
      </section>

      {/* SECTION 2: FILOSOFI (Full Screen) */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="text-xs font-bold text-[#3D5532] uppercase tracking-[0.3em] mb-6 block">
              MENGAPA SKINCYCLE ADA?
            </span>
            <h2 className="text-5xl font-serif mb-8 leading-tight">
              Berhenti Membeli Botol, Mulailah Berinvestasi pada Kulit & Bumi.
            </h2>
            <h3 className="text-2xl italic text-gray-500 mb-8 font-serif">
              Mengedukasi bahwa "Cantik" dan "Sampah" adalah dua masalah yang
              harus selesai bersamaan.
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Kami memahami kenyataan pahit bahwa orang salah menggunakan bahan
              aktif yang justru merusak wajah, sementara miliaran botol bekasnya
              menumpuk di lautan. SkinCycle hadir sebagai jembatan ilmu.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl h-[550px]">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d520?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Product"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#EDD9C1] p-8 rounded-3xl max-w-xs shadow-xl">
              <p className="text-xs italic font-bold">
                "Nothing is the ultimate form of luxury."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VISI & MISI (Full Screen) */}
      <section className="min-h-screen flex flex-col justify-center px-10 bg-white/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-white p-16 rounded-[50px] shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-8 text-2xl">
              🌿
            </div>
            <h4 className="text-4xl font-serif mb-6">Misi Kami</h4>
            <p className="text-lg text-gray-500 leading-relaxed">
              Memberikan transparansi penuh. Kami mengedukasi masyarakat tentang
              bahan berbahaya (seperti paraben atau alkohol yang keras) dan
              menyediakan sistem daur ulang yang memudahkan siapa saja untuk
              tidak menyampah.
            </p>
          </div>
          <div className="bg-[#3D5532] p-16 rounded-[50px] shadow-xl text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-2xl">
              ⛰️
            </div>
            <h4 className="text-4xl font-serif mb-6 text-white">Visi Kami</h4>
            <p className="text-lg text-white/80 leading-relaxed">
              Menciptakan masyarakat Indonesia yang paham kesehatan kulit jangka
              panjang dan menjadikan daur ulang sebagai gaya hidup harian, bukan
              sekadar tren sesaat.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PILAR UTAMA (Full Screen) */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20 text-center">
        <h2 className="text-5xl font-serif mb-4">Pilar Utama SkinCycle</h2>
        <p className="text-xl text-gray-500 mb-20">
          Edukasi untukmu, Kesehatan untuk kulitmu, dan Keberlanjutan untuk bumi
          kita.
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {[
            {
              title: "Ensiklopedia",
              icon: "🔬",
              desc: "Lupakan istilah kimia yang rumit. Kami bedah setiap kandungan skincare dengan bahasa manusia.",
              path: "/ensiklopedia",
            },
            {
              title: "Daur Ulang",
              icon: "♾️",
              desc: "Sistem daur ulang kami dirancang agar kamu tidak merasa repot. Kirim sampahmu, dapatkan poin.",
              path: "/daur-ulang",
            },
            {
              title: "Forum",
              icon: "👥",
              desc: "Tanya apa saja tentang kesehatan kulit dan bahaya bahan kimia. Belajar bareng ribuan orang lainnya.",
              path: "/forum",
            },
          ].map((pilar) => (
            <div
              key={pilar.title}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => navigate(pilar.path)}
            >
              <span className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                {pilar.icon}
              </span>
              <h5 className="text-2xl font-serif mb-4 group-hover:text-[#3D5532] transition-colors">
                {pilar.title}
              </h5>
              <p className="text-sm text-gray-400 leading-relaxed px-6">
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: TIM KAMI (Full Screen) */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20 bg-[#EBEBE6]">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-bold text-[#3D5532] uppercase tracking-widest mb-4 block">
            SOSOK DI BALIK LAYAR
          </span>
          <h2 className="text-5xl font-serif mb-16">Tim Kami</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Elena Yates",
                role: "FOUNDER & CEO",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "Dr. Aris Thorne",
                role: "HEAD OF SCIENCE",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "Maya Lin",
                role: "SUSTAINABILITY LEAD",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "Julian Reed",
                role: "PRODUCT DESIGNER",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
              },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="rounded-[30px] overflow-hidden h-80 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                  <img
                    src={member.img}
                    className="w-full h-full object-cover"
                    alt={member.name}
                  />
                </div>
                <h5 className="text-lg font-bold mb-1">{member.name}</h5>
                <p className="text-[10px] font-bold text-[#3D5532] tracking-widest uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Berdedikasi untuk menciptakan masa depan kecantikan yang lebih
                  hijau.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT (Full Screen) */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-start">
          <div>
            <span className="text-xs font-bold text-[#3D5532] uppercase tracking-widest mb-6 block">
              KONTAK KAMI
            </span>
            <h2 className="text-5xl font-serif mb-8">Sapa SkinCycle</h2>
            <p className="text-lg text-gray-500 mb-12 leading-relaxed">
              Punya pertanyaan tentang kandungan produk, pengiriman sampahmu,
              atau ingin tahu lebih lanjut tentang cara kerja sistem daur ulang
              kami? Kami siap membantumu memulai perjalanan menuju kulit sehat
              yang ramah lingkungan.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold text-[#3D5532] uppercase mb-2">
                  Email
                </p>
                <p className="text-xl font-medium">hello@skincycle.com</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#3D5532] uppercase mb-2">
                  Alamat
                </p>
                <p className="text-xl font-medium">
                  Cikarang Utara, Bekasi Regency
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-50">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full bg-[#F9F9F7] border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#3D5532] outline-none"
                  placeholder="Masukkan namamu..."
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                  Alamat Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#F9F9F7] border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#3D5532] outline-none"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                  Pesan Anda
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-[#F9F9F7] border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#3D5532] outline-none"
                  placeholder="Apa yang bisa kami bantu?"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={() => alert("Pesan berhasil dikirim!")}
                className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-[#2d4025] transition-all"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
