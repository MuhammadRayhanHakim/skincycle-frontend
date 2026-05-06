import React from "react";

const LoginPage = ({ setPage }) => {
  return (
    /* Menggunakan h-[calc(100vh-64px)] agar pas dengan tinggi sisa layar setelah Navbar */
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-10 bg-[#F2EDE4] overflow-hidden">
      {/* Container Utama: Menggunakan h-full agar mengisi area frame yang tersedia */}
      <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px]">
        {/* SISI KIRI: FORMULIR LOGIN */}
        <div className="flex-1 px-8 lg:px-16 py-8 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-2 leading-tight">
              Selamat datang kembali
            </h1>
            <p className="text-gray-400 text-xs lg:text-sm">
              Masukkan kredensialmu untuk mengakses akun SkinCycle.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-[0.2em] italic">
                Alamat Email
              </label>
              <input
                type="email"
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none transition-all"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="text-[9px] font-black text-[#3D5532] hover:underline uppercase"
                >
                  Lupa?
                </button>
              </div>
              <input
                type="password"
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="accent-[#3D5532] h-4 w-4"
                id="remember"
              />
              <label
                htmlFor="remember"
                className="text-[10px] text-gray-500 font-medium"
              >
                Ingat saya selama 30 hari
              </label>
            </div>

            <button className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#2d4025] transition-all transform active:scale-95">
              Masuk Sekarang
            </button>
          </form>

          <div className="relative my-6 text-center">
            <hr className="border-gray-50" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[9px] text-gray-300 font-black uppercase tracking-widest">
              atau
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-3 border border-gray-100 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-gray-50 transition tracking-tighter">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4"
                alt="Google"
              />{" "}
              Google
            </button>
            <button className="flex items-center justify-center gap-3 border border-gray-100 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-gray-50 transition tracking-tighter">
              <img
                src="https://www.svgrepo.com/show/511330/apple-fill.svg"
                className="w-4 h-4"
                alt="Apple"
              />{" "}
            </button>
          </div>

          <p className="mt-6 text-center text-[11px] text-gray-500">
            Belum punya akun?{" "}
            <button
              onClick={() => setPage("Daftar")}
              className="text-[#3D5532] font-black hover:underline uppercase ml-1"
            >
              Daftar
            </button>
          </p>
        </div>

        {/* SISI KANAN: VISUAL EDUKASI */}
        <div className="flex-1 relative bg-[#EBEBE6] hidden lg:block h-full">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover"
            alt="Skincare education"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D5532]/60 to-transparent p-12 flex flex-col justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-xl">
                ♻️
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                SKINCYCLE
              </span>
            </div>

            <div className="mb-4">
              <h2 className="text-4xl font-serif leading-tight mb-6">
                Rawat <span className="italic">kulitmu</span>, <br /> lestarikan{" "}
                <span className="italic">bumi</span>.
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <span className="text-lg">🧴</span>
                  <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                    Daur ulang kemasan skincare kamu sekarang.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <span className="text-lg">✨</span>
                  <p className="text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                    Pilih produk ramah lingkungan masa depan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
