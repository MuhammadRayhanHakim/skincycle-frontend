// import React from "react";
// import { useNavigate } from "react-router-dom";

// const RecyclePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-[#F2EDE4] font-sans text-[#1e2b19]">
//       {/* SECTION 1: VISI & STATISTIK */}
//       <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center px-10 py-8">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
//           {/* Sisi Kiri: Teks */}
//           <div>
//             <span className="text-[12px] font-bold text-[#3D5532] uppercase tracking-[0.3em] mb-6 block">
//               Urgensi
//             </span>
//             <h1 className="text-6xl font-serif text-[#1e2b19] mb-8 leading-tight">
//               120 Miliar <br />
//               <span className="italic text-[#3D5532]">Sampah Kecantikan.</span>
//             </h1>
//             <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-lg">
//               Setiap tahun, industri kecantikan global menghasilkan miliaran
//               unit kemasan yang sebagian besar tidak dapat didaur ulang. Krisis
//               plastik ini mengancam ekosistem kita.
//             </p>

//             {/* Statistik */}
//             <div className="grid grid-cols-2 gap-8 border-t border-[#3D5532]/20 pt-8">
//               <div>
//                 <p className="text-4xl font-serif text-[#3D5532] font-bold mb-1">
//                   70%
//                 </p>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
//                   Limbah tak terkelola
//                 </p>
//               </div>
//               <div>
//                 <p className="text-4xl font-serif text-[#3D5532] font-bold mb-1">
//                   450 Tahun
//                 </p>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
//                   Plastik terurai
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Sisi Kanan: Image & Quote */}
//           <div className="relative">
//             <div className="rounded-[50px] overflow-hidden shadow-2xl h-[500px]">
//               <img
//                 src="https://images.unsplash.com/photo-1611080626919-7cf5a969fc24?auto=format&fit=crop&q=80&w=1000"
//                 alt="Skincare Products"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-xs border border-white">
//               <p className="text-xs italic text-[#3D5532] leading-relaxed">
//                 "Alam tidak menciptakan sampah, kita juga tidak seharusnya."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 2: AJAKAN BERGABUNG & MENU (NAVIGASI) */}
//       <section className="min-h-screen flex flex-col justify-center px-10 py-10 bg-[#E9E4D9]">
//         <div className="max-w-5xl mx-auto w-full bg-[#E1E6DC] p-16 rounded-[60px] shadow-sm flex flex-col md:flex-row items-center gap-12">
//           <div className="flex-1">
//             <h2 className="text-5xl font-serif text-[#1e2b19] mb-6 leading-tight">
//               Bergabung dengan Gerakan.
//             </h2>
//             <p className="text-gray-600 text-lg leading-relaxed">
//               Botol kosong Anda adalah awal dari perjalanan baru. Ikut serta
//               dalam misi hijau kami dengan mengirimkan botol kosong Anda hari
//               ini.
//             </p>
//           </div>

//           <div className="flex-1 flex flex-col gap-4 w-full">
//             {/* Navigasi ke /daur-ulang/simpan */}
//             <button
//               onClick={() => navigate("/daur-ulang/simpan")}
//               className="bg-[#3D5532] text-white p-8 rounded-[30px] flex justify-between items-center group hover:scale-105 transition-transform shadow-xl"
//             >
//               <div className="text-left">
//                 <h4 className="text-xl font-bold mb-1">Kumpulkan Sampah</h4>
//                 <p className="text-[10px] opacity-70 uppercase tracking-widest">
//                   Kirim paket anda & dapatkan poin
//                 </p>
//               </div>
//               <span className="text-2xl">♻️</span>
//             </button>

//             {/* Navigasi ke /riwayat */}
//             <button
//               onClick={() => navigate("/riwayat")}
//               className="bg-white text-[#3D5532] p-8 rounded-[30px] flex justify-between items-center group hover:scale-105 transition-transform shadow-md border border-gray-100"
//             >
//               <div className="text-left">
//                 <h4 className="text-xl font-bold mb-1">Riwayat & Saldo Poin</h4>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                   Pantau kontribusi & reward Anda
//                 </p>
//               </div>
//               <span className="text-2xl">📊</span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 3: SOLUSI KAMI */}
//       <section className="min-h-screen flex flex-col justify-center px-10 py-10">
//         <div className="max-w-7xl mx-auto w-full text-center mb-16">
//           <h2 className="text-4xl font-serif text-[#1e2b19] mb-4">
//             Solusi Daur Ulang Kami
//           </h2>
//           <p className="text-gray-500 text-lg max-w-2xl mx-auto">
//             Kami merancang ulang cara kerja riset perawatan kulit Anda untuk
//             memastikan setiap botol kembali ke bumi.
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
//           {/* Card Masalah */}
//           <div className="bg-[#F9F9F7] p-10 rounded-[45px] border border-gray-100 flex flex-col">
//             <span className="text-2xl mb-6">⚠️</span>
//             <h4 className="text-2xl font-bold text-[#1e2b19] mb-4">Masalah</h4>
//             <p className="text-sm text-gray-500 leading-relaxed grow">
//               Sistem daur ulang tradisional kesulitan dengan plastik campuran
//               dan komponen kecil yang akhirnya berujung pada pembuangan sampah.
//             </p>
//             <span className="mt-10 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
//               01 / Masalah
//             </span>
//           </div>

//           {/* Card Solusi */}
//           <div className="bg-[#F0F4EE] p-10 rounded-[45px] border border-[#3D5532]/10 flex flex-col shadow-lg shadow-green-900/5">
//             <span className="text-2xl mb-6">🌱</span>
//             <h4 className="text-2xl font-bold text-[#1e2b19] mb-4">
//               Solusi Kami
//             </h4>
//             <p className="text-sm text-gray-500 leading-relaxed grow">
//               Kami menggunakan sistem pengumpulan tertutup yang membersihkan,
//               memilah, dan mengolah kemasan menjadi bahan mentah berkualitas
//               tinggi.
//             </p>
//             <span className="mt-10 text-[10px] font-bold text-[#3D5532] uppercase tracking-widest">
//               02 / Solusi
//             </span>
//           </div>

//           {/* Card Dampak */}
//           <div className="bg-[#F9F9F7] p-10 rounded-[45px] border border-gray-100 flex flex-col">
//             <span className="text-2xl mb-6">📈</span>
//             <h4 className="text-2xl font-bold text-[#1e2b19] mb-4">
//               Dampaknya
//             </h4>
//             <p className="text-sm text-gray-500 leading-relaxed grow">
//               Sejauh ini, SkinCycle telah mengalihkan lebih dari 200+ ton
//               plastik, menghemat energi, dan mengurangi jejak karbon hingga 40%.
//             </p>
//             <span className="mt-10 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
//               03 / Dampak
//             </span>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default RecyclePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Leaf,
  BarChart3,
  ChevronRight,
  History,
} from "lucide-react"; // Menggunakan lucide-react agar seragam dengan design system

const RecyclePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500">
      {/* --- SECTION 1: VISI & STATISTIK --- */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Sisi Kiri: Teks */}
          <div>
            <span className="text-[12px] font-bold text-brand-primary-300 uppercase tracking-[0.3em] mb-6 block">
              Urgensi
            </span>
            <h1 className="text-6xl font-sans text-brand-dark-500 mb-8 leading-tight">
              120 Miliar <br />
              <span className="italic text-brand-primary-300">
                Sampah Kecantikan.
              </span>
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed mb-12 max-w-lg">
              Setiap tahun, industri kecantikan global menghasilkan miliaran
              unit kemasan yang sebagian besar tidak dapat didaur ulang. Krisis
              plastik ini mengancam ekosistem kita.
            </p>

            {/* Statistik */}
            <div className="grid grid-cols-2 gap-8 border-t border-brand-primary-300/20 pt-8">
              <div>
                <p className="text-4xl font-sans text-brand-primary-300 font-bold mb-1">
                  70%
                </p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                  Limbah tak terkelola
                </p>
              </div>
              <div>
                <p className="text-4xl font-sans text-brand-primary-300 font-bold mb-1">
                  450 Tahun
                </p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                  Plastik terurai
                </p>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Image & Quote */}
          <div className="relative">
            <div className="rounded-[50px] overflow-hidden shadow-2xl h-[500px] border border-neutral-100">
              <img
                src="/produk-skincare.jpg"
                alt="Skincare Products"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-neutral-default/90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-xs border border-neutral-100">
              <p className="text-xs italic text-brand-primary-300 leading-relaxed">
                "Alam tidak menciptakan sampah, kita juga tidak seharusnya."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: AJAKAN BERGABUNG & MENU (NAVIGASI) --- */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10 bg-neutral-100">
        <div className="max-w-5xl mx-auto w-full bg-neutral-200 p-16 rounded-[60px] shadow-sm flex flex-col md:flex-row items-center gap-12 border border-neutral-100/50">
          <div className="flex-1">
            <h2 className="text-5xl font-sans text-brand-dark-500 mb-6 leading-tight">
              Bergabung dengan Gerakan.
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Botol kosong Anda adalah awal dari perjalanan baru. Ikut serta
              dalam misi hijau kami dengan mengirimkan botol kosong Anda hari
              ini.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4 w-full">
            {/* Navigasi ke /daur-ulang/simpan */}
            <button
              onClick={() => navigate("/daur-ulang/simpan")}
              className="bg-brand-primary-300 text-neutral-default p-8 rounded-[30px] flex justify-between items-center group hover:scale-105 transition-all shadow-xl hover:bg-brand-primary-500 outline-none"
            >
              <div className="text-left">
                <h4 className="text-xl font-bold mb-1">Kumpulkan Sampah</h4>
                <p className="text-[10px] opacity-70 uppercase tracking-widest font-medium">
                  Kirim paket anda & dapatkan poin
                </p>
              </div>
              <ChevronRight className="w-6 h-6 opacity-80 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Navigasi ke /riwayat */}
            <button
              onClick={() => navigate("/riwayat")}
              className="bg-neutral-default text-brand-primary-300 p-8 rounded-[30px] flex justify-between items-center group hover:scale-105 transition-all shadow-md border border-neutral-100 outline-none"
            >
              <div className="text-left">
                <h4 className="text-xl font-bold mb-1 text-brand-dark-500">
                  Riwayat & Saldo Poin
                </h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                  Pantau kontribusi & reward Anda
                </p>
              </div>
              <History className="w-5 h-5 text-brand-primary-300" />
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SOLUSI KAMI --- */}
      <section className="min-h-screen flex flex-col justify-center px-10 py-10">
        <div className="max-w-7xl mx-auto w-full text-center mb-16">
          <h2 className="text-4xl font-sans text-brand-dark-500 mb-4">
            Solusi Daur Ulang Kami
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Kami merancang ulang cara kerja riset perawatan kulit Anda untuk
            memastikan setiap botol kembali ke bumi.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Card Masalah - Menggunakan Feedback Error */}
          <div className="bg-neutral-50 p-10 rounded-[45px] border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-feedback-error-100/20 flex items-center justify-center mb-6">
                <AlertTriangle className="w-5 h-5 text-feedback-error-200" />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark-500 mb-4">
                Masalah
              </h4>
              <p className="text-sm text-neutral-500 leading-relaxed italic">
                Sistem daur ulang tradisional kesulitan dengan plastik campuran
                dan komponen kecil yang akhirnya berujung pada pembuangan
                sampah.
              </p>
            </div>
            <span className="mt-10 text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
              01 / Masalah
            </span>
          </div>

          {/* Card Solusi - Menggunakan Feedback Info/Primary */}
          <div className="bg-feedback-info-100/30 p-10 rounded-[45px] border border-feedback-info-300/20 flex flex-col justify-between shadow-lg shadow-brand-primary-500/5 hover:shadow-xl transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-feedback-info-100 flex items-center justify-center mb-6">
                <Leaf className="w-5 h-5 text-brand-primary-300" />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark-500 mb-4">
                Solusi Kami
              </h4>
              <p className="text-sm text-neutral-500 leading-relaxed italic">
                Kami menggunakan sistem pengumpulan tertutup yang membersihkan,
                memilah, dan mengolah kemasan menjadi bahan mentah berkualitas
                tinggi.
              </p>
            </div>
            <span className="mt-10 text-[10px] font-bold text-brand-primary-300 uppercase tracking-widest">
              02 / Solusi
            </span>
          </div>

          {/* Card Dampak - Menggunakan Feedback Success */}
          <div className="bg-neutral-50 p-10 rounded-[45px] border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-feedback-success-100/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-5 h-5 text-feedback-success-300" />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark-500 mb-4">
                Dampaknya
              </h4>
              <p className="text-sm text-neutral-500 leading-relaxed italic">
                Sejauh ini, SkinCycle telah mengalihkan lebih dari 200+ ton
                plastik, menghemat energi, dan mengurangi jejak karbon hingga
                40%.
              </p>
            </div>
            <span className="mt-10 text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
              03 / Dampak
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecyclePage;
