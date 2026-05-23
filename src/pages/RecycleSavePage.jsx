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

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Scale, Plus, Minus, Truck, RotateCcw } from "lucide-react";

// Batas kapasitas karung dalam kg (100% = karung penuh)
const MAX_CAPACITY_KG = 30;

const RecycleSavePage = () => {
  const [counts, setCounts] = useState({ 1: 0, 2: 0, 3: 0 });
  // droppedItems: array of { id, icon, x, rotate } — ikon yang sudah dijatuhkan ke karung
  const [droppedItems, setDroppedItems] = useState([]);
  // fallingItem: item yang sedang animasi jatuh (sementara)
  const [fallingItem, setFallingItem] = useState(null);
  const navigate = useNavigate();
  const itemIdRef = useRef(0);

  const trashTypes = [
    { id: 1, name: "Botol Plastik", weight: 0.03, label: "30g", color: "bg-brand-secondary-300", emoji: "🧴" },
    { id: 2, name: "Botol Kaca",    weight: 0.05, label: "50g", color: "bg-brand-primary-100/30", emoji: "🧪" },
    { id: 3, name: "Alumunium",     weight: 0.02, label: "20g", color: "bg-neutral-100",           emoji: "🥫" },
  ];

  const totalWeight = trashTypes.reduce(
    (sum, t) => sum + counts[t.id] * t.weight,
    0
  );

  // fillLevel: 10% kosong, naik sampai 92% saat MAX_CAPACITY_KG tercapai
  const fillLevel = Math.min(10 + (totalWeight / MAX_CAPACITY_KG) * 82, 92);
  const fillPercent = Math.round((totalWeight / MAX_CAPACITY_KG) * 100);
  const isFull = fillLevel >= 92;

  // Warna karung berubah sesuai level isi
  const bagColor =
    isFull
      ? "bg-feedback-error-200"   // merah jika penuh
      : fillLevel > 60
      ? "bg-brand-primary-500"    // hijau tua jika > 60%
      : "bg-brand-primary-300";   // hijau normal

  const handleAdd = (trash) => {
    if (isFull) return;

    const uid = ++itemIdRef.current;
    const xPos = 20 + Math.random() * 60; // posisi horizontal acak (%)

    // Tampilkan animasi jatuh
    setFallingItem({ uid, emoji: trash.emoji, x: xPos });

    // Setelah animasi selesai (600ms), pindahkan ke droppedItems
    setTimeout(() => {
      setFallingItem(null);
      setDroppedItems((prev) => [
        ...prev,
        {
          uid,
          emoji: trash.emoji,
          x: xPos,
          rotate: Math.random() > 0.5 ? 12 : -12,
        },
      ]);
    }, 550);

    setCounts((prev) => ({ ...prev, [trash.id]: prev[trash.id] + 1 }));
  };

  const handleRemove = (trash) => {
    if (counts[trash.id] === 0) return;
    setCounts((prev) => ({ ...prev, [trash.id]: prev[trash.id] - 1 }));
    // Hapus ikon terakhir dari jenis ini
    setDroppedItems((prev) => {
      const idx = [...prev].reverse().findIndex((i) => i.emoji === trash.emoji);
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return prev.filter((_, i) => i !== realIdx);
    });
  };

  const handleReset = () => {
    setCounts({ 1: 0, 2: 0, 3: 0 });
    setDroppedItems([]);
    setFallingItem(null);
  };

  return (
    <div className="bg-brand-secondary-100 font-sans h-[calc(100vh-64px)] overflow-hidden text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 h-full flex flex-col justify-center">

        {/* Tombol Kembali */}
        <button
          type="button"
          onClick={() => navigate("/daur-ulang")}
          className="text-brand-primary-300 font-black text-[10px] uppercase tracking-widest mb-4 hover:text-brand-primary-500 transition-all w-fit flex items-center gap-1 outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Edukasi
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ── SISI KIRI: Visual Karung ── */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3">

            {/* Label status */}
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isFull ? "text-feedback-error-200" : "text-brand-primary-300"
                }`}
              >
                {isFull ? "🚫 Karung Penuh!" : `${fillPercent}% terisi`}
              </span>
            </div>

            {/* Karung */}
            <div
              className="relative w-full max-w-[300px] aspect-[4/5] bg-neutral-default rounded-t-[180px] rounded-b-[80px] shadow-2xl flex flex-col justify-end overflow-hidden border-[6px] border-neutral-default"
              style={{ isolation: "isolate" }}
            >
              {/* ID Badge */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-8 border-[3px] border-brand-primary-300 rounded-full flex items-center justify-center font-black text-brand-primary-300 text-[11px] z-20 bg-neutral-default/90">
                ID: 021
              </div>

              {/* Area jatuh — ikon animasi jatuh ke dalam karung */}
              {fallingItem && (
                <span
                  key={fallingItem.uid}
                  className="absolute z-30 text-2xl animate-fall pointer-events-none"
                  style={{ left: `${fallingItem.x}%`, top: 0 }}
                >
                  {fallingItem.emoji}
                </span>
              )}

              {/* Isi karung (naik dari bawah) */}
              <div
                className={`${bagColor} w-full transition-all duration-700 ease-out relative overflow-hidden`}
                style={{ height: `${fillLevel}%` }}
              >
                {/* Gelombang atas karung */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ height: "20px" }}>
                  <svg viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                    <path d="M0,10 C100,0 300,20 400,10 L400,0 L0,0 Z" fill="white" fillOpacity="0.15" />
                  </svg>
                </div>

                {/* Ikon sampah yang sudah masuk */}
                <div className="absolute inset-0 pt-6 px-4 flex flex-wrap content-end gap-1 pb-2">
                  {droppedItems.map((item) => (
                    <span
                      key={item.uid}
                      className="text-xl opacity-70"
                      style={{ transform: `rotate(${item.rotate}deg)` }}
                    >
                      {item.emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar bawah karung */}
            <div className="w-full max-w-[300px]">
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    isFull ? "bg-feedback-error-200" : "bg-brand-primary-300"
                  }`}
                  style={{ width: `${Math.min(fillPercent, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-neutral-400 mt-1 uppercase tracking-wider">
                <span>Kosong</span>
                <span>{totalWeight.toFixed(2)} kg / {MAX_CAPACITY_KG} kg</span>
                <span>Penuh</span>
              </div>
            </div>
          </div>

          {/* ── SISI KANAN: Panel Kontrol ── */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-default/60 backdrop-blur-md p-8 rounded-[40px] shadow-sm border border-neutral-default">

              {/* Monitor Massa */}
              <div className="bg-neutral-default p-5 rounded-2xl shadow-sm border border-neutral-50 mb-6 flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center font-black text-sm shrink-0 transition-colors duration-500 ${
                    isFull
                      ? "border-feedback-error-200 text-feedback-error-200"
                      : "border-brand-primary-300 text-brand-primary-300"
                  }`}
                >
                  {totalWeight.toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-primary-300 opacity-60" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-dark-500">Total Massa Sampah</h4>
                    <p className="text-[10px] text-brand-primary-300 uppercase tracking-wider font-bold">
                      Satuan Kilogram (kg)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="ml-auto text-[9px] font-black text-feedback-error-200 uppercase hover:underline flex items-center gap-1 outline-none"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* List Jenis Sampah */}
              <div className="space-y-3 mb-8">
                {trashTypes.map((trash) => (
                  <div
                    key={trash.id}
                    className="flex items-center justify-between p-4 bg-neutral-default rounded-2xl border border-neutral-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${trash.color} flex items-center justify-center text-lg`}>
                        {trash.emoji}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-brand-dark-500">{trash.name}</h5>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                          {trash.label} / unit
                        </p>
                      </div>
                    </div>

                    {/* Stepper +/- dengan counter */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemove(trash)}
                        disabled={counts[trash.id] === 0}
                        className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-feedback-error-100/20 hover:text-feedback-error-200 disabled:opacity-30 transition-colors outline-none"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-7 text-center font-black text-sm text-brand-dark-500 tabular-nums">
                        {counts[trash.id]}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAdd(trash)}
                        disabled={isFull}
                        className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-brand-primary-300 hover:text-neutral-default text-brand-primary-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors outline-none"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={() => navigate("/daur-ulang/drop")}
                disabled={totalWeight === 0}
                className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-brand-primary-500 flex items-center justify-center gap-2 transition-colors outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Truck className="w-4 h-4" /> AJUKAN PENJEMPUTAN SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animasi jatuh — inject via style tag */}
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(340px) rotate(30deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall 0.55s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default RecycleSavePage;