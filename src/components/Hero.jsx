const Hero = () => {
  return (
    <section className="bg-skincycle-beige py-16 px-8 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Kiri: Teks */}
      <div className="flex-1">
        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-skincycle-green uppercase tracking-widest">
          Consious Care
        </span>
        <h1 className="text-5xl font-serif text-gray-800 mt-6 leading-tight">
          Ubah Rutinitas Skincare <br /> Menjadi Aksi Nyata <br /> Untuk Bumi
        </h1>
        <p className="text-gray-600 mt-6 max-w-md">
          Dapatkan reward dengan mendaur ulang kemasan skincare kamu...
        </p>
        <div className="flex gap-4 mt-10">
          <button className="bg-skincycle-green text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
            Ayo Mulai!
          </button>
          <button className="border border-skincycle-green text-skincycle-green px-8 py-3 rounded-full font-semibold hover:bg-skincycle-green hover:text-white transition">
            Jelajahi Fitur Kami
          </button>
        </div>
      </div>

      {/* Kanan: Gambar & Grafik */}
      <div className="flex-1 relative">
        <img
          src="/images/hero-skincare.jpg"
          alt="Skincare"
          className="rounded-3xl shadow-2xl"
        />
        {/* Card Grafik (Floating) */}
        <div className="absolute top-10 -right-5 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Impact Dashboard
          </p>
          {/* Masukkan Library Chart.js atau Recharts disini nanti */}
          <div className="h-32 w-48 bg-gray-200 mt-2 rounded flex items-end p-2 gap-1">
            <div className="bg-skincycle-green w-3 h-10"></div>
            <div className="bg-skincycle-green w-3 h-16"></div>
            <div className="bg-skincycle-green w-3 h-12"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
{
  /* Komponen Karung di dalam RecycleSection.jsx */
}
<div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
  <h3 className="font-bold text-gray-800 mb-4">Karung Anda</h3>
  <ul className="space-y-4">
    <li className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
      <span className="text-sm">Kemasan Plastik (HDPE)</span>
      <span className="font-bold text-skincycle-green">+10 Poin</span>
    </li>
    {/* Looping data dari state virtual bag disini */}
  </ul>
  <button className="w-full bg-skincycle-green text-white mt-6 py-3 rounded-xl font-bold">
    KIRIM SEKARANG KE TEMPAT DAUR ULANG
  </button>
</div>;
