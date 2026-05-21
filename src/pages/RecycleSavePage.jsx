// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RecycleSavePage = () => {
//   const [totalWeight, setTotalWeight] = useState(0);
//   const navigate = useNavigate();

//   const trashTypes = [
//     {
//       id: 1,
//       name: "Botol Plastik",
//       weight: 0.03,
//       label: "30g",
//       color: "bg-[#EDD9C1]",
//     },
//     {
//       id: 2,
//       name: "Botol Kaca",
//       weight: 0.05,
//       label: "50g",
//       color: "bg-[#DDE5E0]",
//     },
//     {
//       id: 3,
//       name: "Alumunium",
//       weight: 0.02,
//       label: "20g",
//       color: "bg-[#F4F1EE]",
//     },
//   ];

//   const fillLevel = Math.min(10 + totalWeight * 2.73, 92);
//   const trashIcons = [
//     "🧴",
//     "🥫",
//     "🧪",
//     "💧",
//     "♻️",
//     "🧤",
//     "📦",
//     "🧴",
//     "🧪",
//     "🥫",
//     "🧴",
//     "♻️",
//     "🧪",
//     "💧",
//     "🥫",
//     "🧴",
//     "🧤",
//     "📦",
//     "♻️",
//     "🧴",
//     "🥫",
//     "🧪",
//     "💧",
//     "🧴",
//   ];

//   return (
//     <div className="bg-[#F2EDE4] font-sans h-[calc(100vh-64px)] overflow-hidden">
//       <div className="max-w-7xl mx-auto px-10 h-full flex flex-col justify-center">
//         <button
//           onClick={() => navigate("/daur-ulang")}
//           className="text-[#3D5532] font-black text-[10px] uppercase tracking-widest mb-4 hover:opacity-70 transition-all w-fit"
//         >
//           ← Kembali ke Edukasi
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
//           {/* SISI KIRI: Visual Karung */}
//           <div className="lg:col-span-5 flex flex-col items-center">
//             <div className="relative w-full max-w-[320px] aspect-[4/5] bg-white rounded-t-[180px] rounded-b-[80px] shadow-2xl flex flex-col justify-end overflow-hidden border-[6px] border-white">
//               <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-8 border-[3px] border-[#3D5532] rounded-full flex items-center justify-center font-black text-[#3D5532] text-[10px] z-10 bg-white/80">
//                 ID: 021
//               </div>
//               <div
//                 className="bg-[#3D5532] w-full transition-all duration-700 ease-out flex flex-col items-center justify-start pt-12 pb-6 px-6"
//                 style={{ height: `${fillLevel}%` }}
//               >
//                 <div className="grid grid-cols-4 gap-y-6 gap-x-4 opacity-20 invert brightness-0 w-full">
//                   {trashIcons.map((icon, index) => (
//                     <span
//                       key={index}
//                       className={`text-2xl text-center transform ${index % 2 === 0 ? "rotate-12" : "-rotate-12"}`}
//                     >
//                       {icon}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SISI KANAN: Panel Kontrol */}
//           <div className="lg:col-span-7">
//             <div className="bg-white/60 backdrop-blur-md p-8 rounded-[40px] shadow-sm border border-white">
//               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-5">
//                 <div className="w-14 h-14 rounded-full border-[3px] border-[#3D5532] flex items-center justify-center font-black text-[#3D5532] text-sm">
//                   {totalWeight.toFixed(2)}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-sm text-[#1e2b19]">
//                     Total Massa Sampah
//                   </h4>
//                   <p className="text-[10px] text-[#3D5532] uppercase tracking-wider font-bold">
//                     Satuan Kilogram (kg)
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setTotalWeight(0)}
//                   className="ml-auto text-[9px] font-black text-red-400 uppercase hover:underline"
//                 >
//                   Reset
//                 </button>
//               </div>

//               <div className="space-y-3 mb-8">
//                 {trashTypes.map((trash) => (
//                   <div
//                     key={trash.id}
//                     className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-10 h-10 rounded-xl ${trash.color} flex items-center justify-center text-lg`}
//                       >
//                         {trash.id === 1 ? "🧴" : trash.id === 2 ? "🧪" : "🥫"}
//                       </div>
//                       <div>
//                         <h5 className="font-bold text-xs text-[#1e2b19]">
//                           {trash.name}
//                         </h5>
//                         <p className="text-[9px] text-gray-400 font-bold">
//                           {trash.label} / unit
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() =>
//                         setTotalWeight((prev) => prev + trash.weight)
//                       }
//                       className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#3D5532] hover:text-white transition-colors font-bold"
//                     >
//                       +
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => navigate("/daur-ulang/drop")}
//                 className="w-full bg-[#3D5532] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-[#2d4025] flex items-center justify-center gap-3"
//               >
//                 <span>🚚</span> AJUKAN PENJEMPUTAN SEKARANG
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecycleSavePage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Scale, Plus, Truck, RotateCcw } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const RecycleSavePage = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const navigate = useNavigate();

  const trashTypes = [
    {
      id: 1,
      name: "Botol Plastik",
      weight: 0.03,
      label: "30g",
      color: "bg-brand-secondary-300", // Menggunakan token warna sekunder cream-orange hangat
    },
    {
      id: 2,
      name: "Botol Kaca",
      weight: 0.05,
      label: "50g",
      color: "bg-brand-primary-100/30", // Menggunakan token warna primer transparan
    },
    {
      id: 3,
      name: "Alumunium",
      weight: 0.02,
      label: "20g",
      color: "bg-neutral-100", // Menggunakan token abu netral
    },
  ];

  const fillLevel = Math.min(10 + totalWeight * 2.73, 92);
  const trashIcons = [
    "🧴",
    "🥫",
    "🧪",
    "💧",
    "♻️",
    "🧤",
    "📦",
    "🧴",
    "🧪",
    "🥫",
    "🧴",
    "♻️",
    "🧪",
    "💧",
    "🥫",
    "🧴",
    "🧤",
    "📦",
    "♻️",
    "🧴",
    "🥫",
    "🧪",
    "💧",
    "🧴",
  ];

  return (
    <div className="bg-brand-secondary-100 font-sans h-[calc(100vh-64px)] overflow-hidden text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 h-full flex flex-col justify-center">
        {/* BUTTON OUTLINE KEMBALI */}
        <button
          type="button"
          onClick={() => navigate("/daur-ulang")}
          className="text-brand-primary-300 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-brand-primary-500 transition-all w-fit flex items-center gap-1 outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Edukasi
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* SISI KIRI: Visual Karung Sampah */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[320px] aspect-[4/5] bg-neutral-default rounded-t-[180px] rounded-b-[80px] shadow-2xl flex flex-col justify-end overflow-hidden border-[6px] border-neutral-default">
              {/* ID Badge Karung - Menggunakan Marcellus SC */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-8 border-[3px] border-brand-primary-300 rounded-full flex items-center justify-center font-marcellus font-black text-brand-primary-300 text-[11px] z-10 bg-neutral-default/80">
                ID: 021
              </div>

              {/* Progress Level Isi Karung */}
              <div
                className="bg-brand-primary-300 w-full transition-all duration-700 ease-out flex flex-col items-center justify-start pt-12 pb-6 px-6"
                style={{ height: `${fillLevel}%` }}
              >
                <div className="grid grid-cols-4 gap-y-6 gap-x-4 opacity-20 invert brightness-0 w-full">
                  {trashIcons.map((icon, index) => (
                    <span
                      key={index}
                      className={`text-2xl text-center transform block ${index % 2 === 0 ? "rotate-12" : "-rotate-12"}`}
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Panel Kontrol Input */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-default/60 backdrop-blur-md p-8 rounded-[40px] shadow-sm border border-neutral-default">
              {/* Monitor Massa Atas */}
              <div className="bg-neutral-default p-5 rounded-2xl shadow-sm border border-neutral-50 mb-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border-[3px] border-brand-primary-300 flex items-center justify-center font-black text-brand-primary-300 text-sm shrink-0">
                  {totalWeight.toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-primary-300 opacity-60" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark-500">
                      Total Massa Sampah
                    </h4>
                    <p className="text-[10px] text-brand-primary-300 uppercase tracking-wider font-bold">
                      Satuan Kilogram (kg)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTotalWeight(0)}
                  className="ml-auto text-[9px] font-black text-feedback-error-200 uppercase hover:underline flex items-center gap-1 outline-none"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* List Button Input Unit */}
              <div className="space-y-3 mb-8">
                {trashTypes.map((trash) => (
                  <div
                    key={trash.id}
                    className="flex items-center justify-between p-4 bg-neutral-default rounded-2xl border border-neutral-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${trash.color} flex items-center justify-center text-lg`}
                      >
                        {trash.id === 1 ? "🧴" : trash.id === 2 ? "🧪" : "🥫"}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-brand-dark-500">
                          {trash.name}
                        </h5>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                          {trash.label} / unit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setTotalWeight((prev) => prev + trash.weight)
                      }
                      className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-brand-primary-300 hover:text-neutral-default text-brand-primary-300 transition-colors font-bold outline-none"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit Aksi */}
              <button
                type="button"
                onClick={() => navigate("/daur-ulang/drop")}
                className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-brand-primary-500 flex items-center justify-center gap-2 transition-colors outline-none active:scale-98"
              >
                <Truck className="w-4 h-4" /> AJUKAN PENJEMPUTAN SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleSavePage;
