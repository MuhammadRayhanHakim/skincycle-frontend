

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Scale,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Info,
  ShieldCheck,
} from "lucide-react";

// Batas kapasitas karung dalam kg (100% = karung penuh)
const MAX_CAPACITY_KG = 30;

const RecycleSavePage = () => {
  // --- PERBAIKAN SINKRONISASI INITIAL STATE DARI LOCALSTORAGE ---
  const [counts, setCounts] = useState(() => {
    const savedCounts = localStorage.getItem("sc_recycle_counts");
    return savedCounts ? JSON.parse(savedCounts) : { 1: 0, 2: 0, 3: 0 };
  });

  const [droppedItems, setDroppedItems] = useState(() => {
    const savedItems = localStorage.getItem("sc_recycle_dropped_items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [fallingItem, setFallingItem] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const navigate = useNavigate();
  const itemIdRef = useRef(
    droppedItems.length > 0 ? Math.max(...droppedItems.map((i) => i.uid)) : 0,
  );

  const trashTypes = [
    {
      id: 1,
      name: "Botol Plastik",
      weight: 0.03,
      label: "30g",
      color: "bg-brand-secondary-300",
      emoji: "🧴",
    },
    {
      id: 2,
      name: "Botol Kaca",
      weight: 0.05,
      label: "50g",
      color: "bg-brand-primary-100/30",
      emoji: "🧪",
    },
    {
      id: 3,
      name: "Alumunium",
      weight: 0.02,
      label: "20g",
      color: "bg-neutral-100",
      emoji: "🥫",
    },
  ];

  const totalWeight = trashTypes.reduce(
    (sum, t) => sum + counts[t.id] * t.weight,
    0,
  );

  const fillLevel = Math.min(10 + (totalWeight / MAX_CAPACITY_KG) * 82, 92);
  const fillPercent = Math.round((totalWeight / MAX_CAPACITY_KG) * 100);
  const isFull = fillLevel >= 92;

  const bagColor = isFull
    ? "bg-feedback-error-200"
    : fillLevel > 60
      ? "bg-brand-primary-500"
      : "bg-brand-primary-300";

  // --- EFFECT UNTUK MENJAGA DATA TIDAK HILANG SAAT REFRESH ---
  useEffect(() => {
    localStorage.setItem("sc_recycle_counts", JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    localStorage.setItem(
      "sc_recycle_dropped_items",
      JSON.stringify(droppedItems),
    );
  }, [droppedItems]);

  const handleAdd = (trash) => {
    if (isFull) return;

    const uid = ++itemIdRef.current;
    const xPos = 20 + Math.random() * 60;

    setFallingItem({ uid, emoji: trash.emoji, x: xPos });

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
    setDroppedItems((prev) => {
      const idx = [...prev].reverse().findIndex((i) => i.emoji === trash.emoji);
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return prev.filter((_, i) => i !== realIdx);
    });
  };

  const handleReset = () => {
    if (window.confirm("Kosongkan isi seluruh karung virtual?")) {
      setCounts({ 1: 0, 2: 0, 3: 0 });
      setDroppedItems([]);
      setFallingItem(null);
      localStorage.removeItem("sc_recycle_counts");
      localStorage.removeItem("sc_recycle_dropped_items");
    }
  };

  const handleTriggerSubmit = (e) => {
    e.preventDefault();
    if (totalWeight === 0) return;
    setShowInfoModal(true);
  };

  // --- PERBAIKAN: MENGIRIM BERAT ASLI KG SECARA OTOMATIS KE HALAMAN FORM ---
  const handleConfirmNavigate = () => {
    setShowInfoModal(false);
    navigate("/daur-ulang/drop", {
      state: {
        automaticWeight: totalWeight,
        detailedSummary: `Botol Plastik: ${counts[1]} unit, Botol Kaca: ${counts[2]} unit, Alumunium: ${counts[3]} unit`,
      },
    });
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-[calc(100vh-64px)] py-12 px-6 lg:px-20 text-brand-dark-500 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Tombol Kembali */}
        <div className="mb-6 pl-1 animate-in fade-in duration-300">
          <button
            type="button"
            onClick={() => navigate("/daur-ulang")}
            className="text-brand-primary-300 font-bold text-xs md:text-sm uppercase tracking-widest hover:text-brand-primary-500 transition-all w-fit flex items-center gap-2 outline-none group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Kembali </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ── SISI KIRI: Visual Karung ── */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isFull ? "text-feedback-error-200" : "text-brand-primary-300"}`}
              >
                {isFull ? "🚫 Karung Penuh!" : `${fillPercent}% terisi`}
              </span>
            </div>

            <div
              className="relative w-full max-w-[300px] aspect-[4/5] bg-neutral-default rounded-t-[180px] rounded-b-[80px] shadow-2xl flex flex-col justify-end overflow-hidden border-[6px] border-neutral-default"
              style={{ isolation: "isolate" }}
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-8 border-[3px] border-brand-primary-300 rounded-full flex items-center justify-center font-black text-brand-primary-300 text-[11px] z-20 bg-neutral-default/90">
                ID: 021
              </div>

              {fallingItem && (
                <span
                  key={fallingItem.uid}
                  className="absolute z-30 text-2xl animate-fall pointer-events-none"
                  style={{ left: `${fallingItem.x}%`, top: 0 }}
                >
                  {fallingItem.emoji}
                </span>
              )}

              <div
                className={`${bagColor} w-full transition-all duration-700 ease-out relative overflow-hidden`}
                style={{ height: `${fillLevel}%` }}
              >
                <div
                  className="absolute top-0 left-0 w-full overflow-hidden leading-none"
                  style={{ height: "20px" }}
                >
                  <svg
                    viewBox="0 0 400 20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,10 C100,0 300,20 400,10 L400,0 L0,0 Z"
                      fill="white"
                      fillOpacity="0.15"
                    />
                  </svg>
                </div>

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

            <div className="w-full max-w-[300px]">
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${isFull ? "bg-feedback-error-200" : "bg-brand-primary-300"}`}
                  style={{ width: `${Math.min(fillPercent, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-neutral-400 mt-1 uppercase tracking-wider">
                <span>Kosong</span>
                <span>
                  {totalWeight.toFixed(2)} kg / {MAX_CAPACITY_KG} kg
                </span>
                <span>Penuh</span>
              </div>
            </div>
          </div>

          {/* ── SISI KANAN: Panel Kontrol ── */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-default/60 backdrop-blur-md p-8 rounded-[40px] shadow-sm border border-neutral-default">
              <div className="bg-neutral-default p-5 rounded-2xl shadow-sm border border-neutral-50 mb-6 flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center font-black text-sm shrink-0 transition-colors duration-500 ${isFull ? "border-feedback-error-200 text-feedback-error-200" : "border-brand-primary-300 text-brand-primary-300"}`}
                >
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
                  onClick={handleReset}
                  className="ml-auto text-[9px] font-black text-feedback-error-200 uppercase hover:underline flex items-center gap-1 outline-none"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

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
                        {trash.emoji}
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

              <button
                type="button"
                onClick={handleTriggerSubmit}
                disabled={totalWeight === 0}
                className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-brand-primary-500 flex items-center justify-center gap-2 transition-colors outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Truck className="w-4 h-4" /> AJUKAN PENJEMPUTAN SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL INFORMASI */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-brand-dark-500/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setShowInfoModal(false)}
          ></div>
          <div className="relative bg-[#F2EDE4] w-full max-w-2xl rounded-[35px] py-8 px-10 shadow-2xl border border-neutral-100/40 flex flex-col justify-between space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] my-auto">
            <div className="w-14 h-14 bg-brand-primary-300/10 text-brand-primary-300 rounded-full flex items-center justify-center mx-auto shadow-inner shrink-0">
              <Info className="w-6 h-6" />
            </div>

            <div className="space-y-5 text-left bg-neutral-default/40 py-6 px-6 rounded-2xl border border-neutral-100/60 shadow-inner overflow-y-auto w-full scrollbar-thin">
              <div className="text-center space-y-1.5 mb-2">
                <h3 className="text-xl font-marcellus text-brand-dark-500 font-bold tracking-tight">
                  Ketentuan Saldo Eco-Points
                </h3>
                <p className="text-[11px] text-neutral-400 font-medium font-sans uppercase tracking-wider">
                  Mekanisme Dompet Sirkular SkinCycle
                </p>
              </div>
              <div className="h-[1px] bg-neutral-200/60 w-full"></div>
              <div className="space-y-4 font-sans pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-feedback-error-100/20 text-feedback-error-200 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                    ✕
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black uppercase tracking-wide text-brand-dark-500">
                      Tidak Dapat Diuangkan
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                      Saldo <em>reward</em> hasil akumulasi massa daur ulang ini{" "}
                      <span className="text-feedback-error-200 font-bold">
                        tidak dapat dicairkan ke dalam bentuk uang tunai
                      </span>{" "}
                      (<em>non-withdrawable</em>).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary-300/10 text-brand-primary-300 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black uppercase tracking-wide text-brand-dark-500">
                      Metode Pembayaran Katalog
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                      Saldo sepenuhnya bersifat sirkular dan{" "}
                      <span className="text-brand-primary-300 font-bold">
                        hanya dapat digunakan kembali sebagai metode potongan
                        harga atau alat pembayaran sah
                      </span>{" "}
                      untuk membeli produk skincare pilihan Anda di platform
                      SkinCycle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-default/60 border border-neutral-100/50 p-4 rounded-2xl text-left flex items-start gap-3 shadow-inner shrink-0">
              <ShieldCheck className="w-4 h-4 text-brand-primary-300 shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-400 font-bold leading-normal uppercase tracking-wide">
                Misi berkelanjutan ini mendukung pembatasan emisi & nol sampah
                kosmetik ke alam.
              </p>
            </div>

            <div className="flex sm:flex-row gap-3 pt-2 w-full shrink-0">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-8 py-4 bg-neutral-default text-neutral-400 border border-neutral-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#3a5b22]/30 hover:text-[#3a5b22] transition-all outline-none"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmNavigate}
                className="flex-1 py-3.5 bg-brand-primary-300 text-neutral-default rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-all outline-none active:scale-98"
              >
                Setuju & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

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
