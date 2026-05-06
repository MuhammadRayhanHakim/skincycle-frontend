import React from "react";

const RegisterPage = ({ setPage }) => {
  return (
    /* Mengunci tinggi halaman pada viewport tanpa scroll */
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-6 bg-[#F2EDE4] overflow-hidden">
      {/* Container Utama dengan max-height yang lebih fleksibel agar tidak memotong teks atas */}
      <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[720px]">
        {/* SISI KIRI: FORMULIR PENDAFTARAN (Disederhanakan vertikalnya) */}
        <div className="flex-1 px-8 lg:px-16 py-6 lg:py-8 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-1 leading-tight">
              Mulai Sekarang
            </h1>
            <p className="text-gray-400 text-[11px] lg:text-xs leading-relaxed">
              Buat akun langsung untuk bergabung dengan komunitas Skincycle.
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none transition-all"
                placeholder="Masukkan namamu..."
              />
            </div>

            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Alamat Email
              </label>
              <input
                type="email"
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none transition-all"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Kata Sandi
              </label>
              <input
                type="password"
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none transition-all"
                placeholder="Buat kata sandi..."
              />
            </div>

            <div className="flex items-start gap-3 py-1">
              <input
                type="checkbox"
                className="accent-[#3D5532] h-3.5 w-3.5 mt-0.5"
                id="terms"
              />
              <label
                htmlFor="terms"
                className="text-[10px] text-gray-500 leading-snug font-medium"
              >
                Saya menyetujui{" "}
                <span className="text-[#3D5532] font-black cursor-pointer uppercase text-[9px]">
                  Syarat
                </span>{" "}
                &{" "}
                <span className="text-[#3D5532] font-black cursor-pointer uppercase text-[9px]">
                  Privasi
                </span>
                .
              </label>
            </div>

            <button className="w-full bg-[#3D5532] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#2d4025] transition-all transform active:scale-95">
              Daftar Sekarang
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-gray-500">
            Sudah punya akun?{" "}
            <button
              onClick={() => setPage("Masuk")}
              className="text-[#3D5532] font-black hover:underline uppercase ml-1"
            >
              Masuk
            </button>
          </p>
        </div>

        {/* SISI KANAN: VISUAL (Dibuat mengikuti proporsi baru) */}
        <div className="flex-1 relative bg-[#EBEBE6] hidden lg:block h-full">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover"
            alt="Skincare"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D5532]/70 to-transparent p-10 flex flex-col justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-lg">
                ♻️
              </div>
              <span className="font-serif text-xl font-bold tracking-tight uppercase">
                SKINCYCLE
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[35px] border border-white/20">
              <h2 className="text-3xl font-serif leading-tight mb-4">
                Rawat <span className="italic">kulitmu</span>, <br /> lestarikan{" "}
                <span className="italic">bumi</span>.
              </h2>
              <div className="space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                  🌱 Daur ulang kemasan hari ini.
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                  ✨ Pilih produk alami terverifikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
