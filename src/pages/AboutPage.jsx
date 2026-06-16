import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 🚀 IMPOR SWEETALERT2
import {
  Leaf,
  Mountain,
  Microscope,
  Infinity,
  Users,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  // 🚀 STATE FORM KONTAK
  const [contactForm, setContactForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  // 🚀 DATA TIM LENGKAP (Membaca langsung dari folder /public sesuai berkas Anda)
  const teamMembers = [
    {
      name: "Chejjah",
      role: "Project Manager",
      img: "/chejjah.jpeg",
      desc: "Mengarsiteki sistem inti backend dan mengoptimalkan fungsionalitas antarmuka SkinCycle.",
    },
    {
      name: "Zaki",
      role: "UI/UX DESIGNER",
      img: "/zaki.jpeg",
      desc: "Mengarahkan visi sirkular SkinCycle dalam menyatukan kecantikan dan kelestarian alam.",
    },
    {
      name: "Arum",
      role: "UI/UX DESIGNER",
      img: "/arum.WEBP",
      desc: "Mengembangkan ekosistem Virtual Karung dan mengelola jalur logistik daur ulang sampah.",
    },
    {
      name: "Dona",
      role: "WEB DEVELOPER",
      img: "/dona.jpeg",
      desc: "Membedah formulasi bahan aktif kosmetik untuk transparansi data Ensiklopedia bahan.",
    },
    {
      name: "Laras",
      role: "WEB DEVELOPER",
      img: "/laras.jpeg",
      desc: "Menyusun pengalaman dan estetika visual antarmuka platform digital SkinCycle.",
    },
    {
      name: "Muhammad Rayhan Hakim",
      role: "WEB DEVELOPER",
      img: "/rayhan.jpeg",
      desc: "Menjembatani kebutuhan operasional pengguna dengan tim teknis eksekusi fitur platform.",
    },
  ];

  // 🚀 LOGIKA AUTO-SCROLL CAROUSEL
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = teamMembers.length - 3;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [teamMembers.length]);

  // 🚀 HANDLER SUBMIT FORM KONTAK DENGAN SWEETALERT2
  const handleContactSubmit = (e) => {
    e.preventDefault();

    // Validasi field kosong
    if (!contactForm.nama.trim() || !contactForm.email.trim() || !contactForm.pesan.trim()) {
      Swal.fire({
        title: "Data Tidak Lengkap",
        text: "Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Oke, Mengerti",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      Swal.fire({
        title: "Format Email Salah",
        text: "Pastikan alamat email yang Anda masukkan sudah benar.",
        icon: "error",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Perbaiki",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }

    // 🚀 SWEETALERT2 SUKSES KIRIM PESAN
    Swal.fire({
      title: "Pesan Terkirim!",
      text: `Terima kasih, ${contactForm.nama}! Kami akan segera menghubungi Anda melalui ${contactForm.email}.`,
      icon: "success",
      confirmButtonColor: "#3D5532",
      confirmButtonText: "Tutup",
      customClass: { popup: "rounded-[30px]" },
    }).then(() => {
      // Reset form setelah konfirmasi ditutup
      setContactForm({ nama: "", email: "", pesan: "" });
    });
  };

  // 🚀 HANDLER NAVIGASI PILAR DENGAN SWEETALERT2 TOAST
  const handlePilarNavigate = (pilar) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "info",
      title: `Membuka halaman ${pilar.title}...`,
    });

    setTimeout(() => navigate(pilar.path), 400);
  };

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen">
      {/* SECTION 1: HERO - VISI UTAMA */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-80"
            alt="Nature background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary-100 via-brand-secondary-100/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-start items-center">
          <div className="max-w-xl bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-[40px] border border-white/50 shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans mb-4 leading-tight text-brand-dark-500 uppercase tracking-wide">
              Kulit Glowing Tanpa Harus Merusak Bumi.
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-neutral-700 mb-6 leading-relaxed font-medium">
              Banyak skincare di luar sana yang menjanjikan hasil instan tapi
              merusak skin barrier, bahkan meninggalkan sampah plastik yang
              abadi. Di sini kami membantumu memahami apa yang kulitmu butuhkan.
            </p>
            <button
              type="button"
              onClick={() => navigate("/produk")}
              className="bg-brand-primary-300 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-brand-primary-500 transition transform hover:scale-105 outline-none active:scale-98"
            >
              Mulai Hidup Mempesona
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: FILOSOFI */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-20 py-20 bg-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="text-xs font-black text-brand-primary-300 uppercase tracking-[0.3em] mb-6 block">
              MENGAPA SKINCYCLE ADA?
            </span>
            <h2 className="text-4xl md:text-5xl font-sans mb-8 leading-tight text-brand-dark-500">
              Berhenti Membeli Botol, Mulailah Berinvestasi pada Kulit & Bumi.
            </h2>
            <h3 className="text-xl md:text-2xl italic text-neutral-500 mb-8 font-serif leading-relaxed">
              Mengedukasi bahwa "Cantik" dan "Sampah" adalah dua masalah yang
              harus selesai bersamaan.
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-medium font-sans">
              Kami memahami kenyataan pahit bahwa orang salah menggunakan bahan
              aktif yang justru merusak wajah, sementara miliaran botol bekasnya
              menumpuk di lautan. SkinCycle hadir sebagai jembatan ilmu.
            </p>
          </div>
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-xl relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] md:h-[500px] border border-neutral-100 bg-white">
                <img
                  src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="w-full h-full object-cover"
                  alt="Produk skincare alami"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-secondary-300 p-6 rounded-3xl max-w-xs shadow-xl border border-neutral-100/50">
                <p className="text-xs italic font-black text-brand-primary-500 tracking-wide">
                  "Nothing is the ultimate form of luxury."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VISI & MISI */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-20 py-12 bg-white/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="bg-white p-10 md:p-16 rounded-[50px] shadow-sm border border-neutral-100">
            <div className="w-12 h-12 bg-feedback-info-100 text-brand-primary-300 rounded-2xl flex items-center justify-center mb-8">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="text-3xl md:text-4xl font-sans mb-6 text-brand-dark-500">
              Misi Kami
            </h4>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-medium font-sans">
              Memberikan transparansi penuh. Kami mengedukasi masyarakat tentang
              bahan berbahaya (seperti paraben atau alkohol yang keras) dan
              menyediakan sistem daur ulang yang memudahkan siapa saja untuk
              tidak menyampah.
            </p>
          </div>
          <div className="bg-brand-primary-300 p-10 md:p-16 rounded-[50px] shadow-xl text-white border border-brand-primary-400">
            <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8">
              <Mountain className="w-6 h-6" />
            </div>
            <h4 className="text-3xl md:text-4xl font-sans mb-6 text-white">
              Visi Kami
            </h4>
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium font-sans">
              Menciptakan masyarakat Indonesia yang paham kesehatan kulit jangka
              panjang dan menjadikan daur ulang sebagai gaya hidup harian, bukan
              sekadar tren sesaat.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: PILAR UTAMA */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-20 py-20 text-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-sans mb-4 text-brand-dark-500">
            Pilar Utama SkinCycle
          </h2>
          <p className="text-base md:text-xl text-neutral-500 mb-20 max-w-3xl mx-auto font-medium font-sans">
            Edukasi untukmu, Kesehatan untuk kulitmu, dan Keberlanjutan untuk
            bumi kita.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                title: "Ensiklopedia",
                icon: <Microscope className="w-8 h-8 text-brand-primary-300" />,
                desc: "Lupakan istilah kimia yang rumit. Kami bedah setiap kandungan skincare dengan bahasa manusia.",
                path: "/ensiklopedia",
              },
              {
                title: "Daur Ulang",
                icon: <Infinity className="w-8 h-8 text-brand-primary-300" />,
                desc: "Sistem daur ulang kami dirancang agar kamu tidak merasa repot. Kirim sampahmu, dapatkan poin.",
                path: "/daur-ulang",
              },
              {
                title: "Forum",
                icon: <Users className="w-8 h-8 text-brand-primary-300" />,
                desc: "Tanya apa saja tentang kesehatan kulit dan bahaya bahan kimia. Belajar bareng ribuan orang lainnya.",
                path: "/forum",
              },
            ].map((pilar) => (
              <div
                key={pilar.title}
                className="bg-white border border-neutral-100 rounded-[40px] p-10 flex flex-col items-center text-center cursor-pointer group hover:shadow-2xl hover:border-brand-primary-100/60 hover:-translate-y-2 hover:bg-brand-secondary-100/60 transition-all duration-500 ease-out shadow-sm"
                // 🚀 GANTI: onClick pakai handler dengan SweetAlert toast
                onClick={() => handlePilarNavigate(pilar)}
              >
                <div className="w-14 h-14 bg-brand-secondary-100 rounded-2xl border border-neutral-100 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-brand-primary-100/30 group-hover:border-brand-primary-100 group-hover:scale-110 shadow-sm">
                  {pilar.icon}
                </div>
                <h5 className="text-2xl font-sans mb-3 text-brand-dark-500 transition-colors duration-500 group-hover:text-brand-primary-300">
                  {pilar.title}
                </h5>
                <p className="text-sm text-neutral-400 leading-relaxed font-medium font-sans transition-colors duration-500 group-hover:text-neutral-500">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TIM KAMI (Auto-scroll Slider Canvas) */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-20 py-20 bg-neutral-100 border-y border-neutral-200/50 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-black text-brand-primary-300 uppercase tracking-widest mb-4 block">
            SOSOK DI BALIK LAYAR
          </span>
          <h2 className="text-4xl md:text-5xl font-sans mb-16 text-brand-dark-500">
            Tim Kami
          </h2>

          <div className="w-full overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%`,
              }}
            >
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 group bg-white p-6 rounded-[40px] border border-neutral-200/60 shadow-sm"
                >
                  <div className="rounded-[30px] overflow-hidden h-80 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-md border border-neutral-100 bg-white">
                    <img
                      src={member.img}
                      className="w-full h-full object-cover"
                      alt={member.name}
                    />
                  </div>
                  <h5 className="text-lg font-bold mb-1 text-brand-dark-500 font-sans truncate">
                    {member.name}
                  </h5>
                  <p className="text-[10px] font-black text-brand-primary-300 tracking-widest uppercase mb-4">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-medium font-sans">
                    {member.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Indikator Titik Slider */}
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: teamMembers.length - 2 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-brand-primary-300" : "w-2 bg-neutral-300"}`}
                  aria-label={`Slide ke-${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-20 py-20 bg-brand-secondary-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-start">
          <div>
            <span className="text-xs font-black text-brand-primary-300 uppercase tracking-widest mb-6 block">
              KONTAK KAMI
            </span>
            <h2 className="text-4xl md:text-5xl font-sans mb-8 text-brand-dark-500">
              Sapa SkinCycle
            </h2>
            <p className="text-sm md:text-lg text-neutral-500 mb-12 leading-relaxed font-medium font-sans">
              Punya pertanyaan tentang kandungan produk, pengiriman sampahmu,
              atau ingin tahu lebih lanjut tentang cara kerja sistem daur ulang
              kami? Kami siap membantumu memulai perjalanan menuju kulit sehat
              yang ramah lingkungan.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-neutral-100 text-brand-primary-300 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-brand-primary-300 uppercase mb-1">
                    Email Support
                  </p>
                  <p className="text-lg md:text-xl font-medium text-brand-dark-500 font-sans">
                    hello@skincycle.id
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-neutral-100 text-brand-primary-300 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-brand-primary-300 uppercase mb-1">
                    Kantor Operasional
                  </p>
                  <p className="text-lg md:text-xl font-medium text-brand-dark-500 font-sans">
                    Surabaya, Jawa Timur
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-neutral-100 w-full">
            {/* 🚀 GANTI: onSubmit pakai handler baru, input pakai controlled state */}
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase mb-2 block tracking-widest">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={contactForm.nama}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, nama: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-primary-300 text-brand-dark-500 outline-none font-medium placeholder-neutral-300 transition-all"
                  placeholder="Masukkan namamu..."
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase mb-2 block tracking-widest">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-primary-300 text-brand-dark-500 outline-none font-medium placeholder-neutral-300 transition-all"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase mb-2 block tracking-widest">
                  Pesan Anda
                </label>
                <textarea
                  rows="4"
                  value={contactForm.pesan}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, pesan: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-brand-primary-300 text-brand-dark-500 outline-none font-medium placeholder-neutral-300 resize-none leading-relaxed transition-all"
                  placeholder="Apa yang bisa kami bantu?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-primary-300 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-brand-primary-500 transition-all flex items-center justify-center gap-2 outline-none active:scale-98"
              >
                <Send className="w-4 h-4" /> Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;