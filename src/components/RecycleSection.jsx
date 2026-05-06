import React from "react";

const RecycleSection = () => {
  const steps = [
    {
      id: "01",
      title: "Kumpulkan Produk",
      desc: "Pilih produk skincare yang telah habis kemasannya dan bersihkan sisa isinya agar siap untuk didaur ulang dengan aman dan higienis.",
    },
    {
      id: "02",
      title: "Akses Perhitungan",
      desc: "Gunakan fitur kalkulator sampah kami untuk memilih jenis kemasan, hitung beratnya dan dapatkan estimasi koin yang akan kamu terima.",
    },
    {
      id: "03",
      title: "Kirim Ke Lokasi",
      desc: "Serahkan sampah kamu ke lokasi drop-off terdekat yang terintegrasi dengan mitra kami agar dapat diproses menjadi bahan baku baru.",
    },
    {
      id: "04",
      title: "Dapatkan Reward Kamu",
      desc: "Kumpulkan koin setiap kali kamu mendaur ulang. Tukarkan koinmu dengan berbagai voucher diskon untuk pembelian produk skincare berikutnya.",
    },
  ];

  const garbageList = [
    { name: "1 kg Plastik", points: "Rp12.000", id: "01" },
    { name: "1 kg Kaca Bening", points: "Rp10.500", id: "02" },
    { name: "1 kg Kardus/Kertas", points: "Rp3.000", id: "03" },
  ];

  return (
    <section className="px-10 py-24 bg-[#F2EDE4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* SISI KIRI: Alur Daur Ulang */}
        <div className="lg:col-span-6">
          <h2 className="text-4xl font-serif text-[#1e2b19] leading-tight mb-8">
            Daur Ulang dan Dapatkan <br /> Produk
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-lg leading-relaxed">
            Jadilah bagian dari gerakan ekonomi sirkular kami. Pengembalian
            kemasan kosongmu bukan hanya mengurangi limbah, tapi juga memberikan
            keuntungan eksklusif untuk perawatanmu berikutnya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-4">
                <span className="text-2xl font-serif font-bold text-[#3D5532]/30 italic leading-none">
                  {step.id}
                </span>
                <div>
                  <h4 className="font-bold text-[#1e2b19] text-sm mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SISI KANAN: Card Daftar Sampah */}
        <div className="lg:col-span-6">
          <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
            <h3 className="text-center font-bold text-[#1e2b19] text-lg mb-10">
              Daftar Sampah
            </h3>

            <div className="space-y-4 mb-10">
              {garbageList.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-5 bg-[#F9F9F7] rounded-3xl group hover:bg-[#F2EDE4] transition-colors cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#3D5532] text-white flex items-center justify-center text-[10px] font-bold">
                      {item.id}
                    </div>
                    <span className="font-bold text-xs text-[#1e2b19]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-[#3D5532]">
                    {item.points}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full bg-[#5F7454] hover:bg-[#3D5532] text-white py-5 rounded-3xl font-bold text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-green-900/10">
              DAUR ULANG SAMPAH SEKARANG
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecycleSection;
