import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RecycleDropPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- STATE MANAGEMENT ---
  const [address, setAddress] = useState("");
  const [selectedSize, setSelectedSize] = useState("3-5 kg");
  const [detailTrash, setDetailTrash] = useState("");
  const [images, setImages] = useState([]); // Menyimpan file/preview gambar
  const [estimatedPoints] = useState(75);

  // --- HANDLER FUNGSI ---
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert("Maksimal 3 foto dokumentasi.");
      return;
    }

    // Membuat preview URL untuk ditampilkan di kotak abu-abu
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleConfirm = () => {
    if (!address.trim()) return alert("Mohon masukkan lokasi penjemputan.");

    // Simulasi pengiriman data ke backend
    console.log({
      alamat: address,
      kategori_berat: selectedSize,
      detail: detailTrash,
      foto_count: images.length,
    });

    alert(
      "🚀 Permintaan penjemputan berhasil dikirim! Kurir akan segera menghubungi Anda.",
    );
    navigate("/"); // Redirect ke beranda sesuai instruksi React Router
  };

  return (
    <div className="bg-[#F2EDE4] font-sans h-[calc(100vh-64px)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 h-full flex flex-col justify-center py-2">
        <header className="mb-4">
          <h1 className="text-4xl font-serif text-[#3D5532] mb-0 tracking-tight">
            Antar & Verifikasi
          </h1>
          <p className="text-gray-500 text-xs font-medium leading-relaxed">
            Selesaikan langkah akhir untuk mendapatkan reward.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* SISI KIRI: Formulir Input */}
          <div className="lg:col-span-8 space-y-3">
            {/* Input Lokasi */}
            <div className="bg-white p-4 rounded-[30px] shadow-sm border border-white">
              <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase tracking-[0.15em] mb-2 italic">
                📍 Lokasi Penjemputan
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#F9F9F7] rounded-xl p-3 text-sm text-gray-700 outline-none border border-transparent focus:border-[#3D5532]/20 resize-none h-16"
                placeholder="Masukkan alamat lengkap di Bekasi Regency..."
              ></textarea>
              <div className="mt-2">
                <button
                  onClick={() =>
                    setAddress(
                      "Cikarang Utara, Kabupaten Bekasi (Lokasi Terdeteksi)",
                    )
                  }
                  className="bg-[#EDD9C1] text-[#3D5532] px-4 py-1.5 rounded-full text-[10px] font-black uppercase hover:bg-[#e6ccad] transition-all"
                >
                  Deteksi Lokasi
                </button>
              </div>
            </div>

            {/* Input Detail Sampah */}
            <div className="bg-white p-4 rounded-[30px] shadow-sm border border-white">
              <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase tracking-[0.15em] mb-2 italic">
                📦 Informasi Sampah
              </label>
              <div className="flex gap-2 mb-3">
                {["1-2 kg", "3-5 kg", "5-10 kg", "10+ kg"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black border transition-all ${
                      selectedSize === size
                        ? "bg-[#3D5532] text-white border-[#3D5532]"
                        : "text-gray-400 border-gray-200 hover:border-[#3D5532]/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={detailTrash}
                onChange={(e) => setDetailTrash(e.target.value)}
                className="w-full bg-[#F9F9F7] rounded-lg p-3 text-sm text-gray-700 outline-none border border-transparent focus:border-[#3D5532]/20"
                placeholder="Detail kemasan (Contoh: 10 botol plastik, 2 kardus)..."
              />
            </div>

            {/* Unggah Foto */}
            <div className="bg-white p-4 rounded-[30px] shadow-sm border border-white">
              <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase tracking-[0.15em] mb-2 italic">
                📸 Dokumentasi Paket
              </label>
              <div className="flex gap-3">
                {/* Input File Tersembunyi */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept="image/*"
                />

                <div
                  onClick={handleUploadClick}
                  className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 cursor-pointer hover:border-[#3D5532] hover:text-[#3D5532] transition-all"
                >
                  <span className="text-xl">📷</span>
                </div>

                {/* Slot Preview Gambar */}
                {[0, 1].map((idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-50 flex items-center justify-center"
                  >
                    {images[idx] ? (
                      <img
                        src={images[idx]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[8px] text-gray-300 uppercase font-bold text-center px-1">
                        Pratinjau {idx + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SISI KANAN: Ringkasan Reward */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-[#3D5532] p-6 rounded-[40px] shadow-xl text-center relative overflow-hidden flex-grow flex flex-col justify-center">
              <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Estimasi Poin
              </p>

              <div className="inline-flex items-center justify-center w-36 h-36 rounded-full border-[8px] border-white/10 mb-4 mx-auto relative">
                <div className="text-white">
                  <span className="text-6xl font-black">{estimatedPoints}</span>
                  <p className="text-xs font-black uppercase tracking-widest">
                    Skin Points
                  </p>
                </div>
              </div>

              <div className="text-left space-y-2 mb-2 text-white/80 text-xs font-bold italic px-4">
                <p>✅ Verifikasi Kemasan Siap</p>
                <p>✅ Alamat Terjangkau Kurir</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleConfirm}
                className="w-full bg-[#3D5532] text-white py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.3em] shadow-lg hover:bg-[#2d4025] transition-all active:scale-95"
              >
                KONFIRMASI & KIRIM
              </button>
              <button
                onClick={() => navigate("/daur-ulang/simpan")}
                className="w-full bg-white text-[#3D5532] py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.3em] border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
              >
                KEMBALI KE KARUNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleDropPage;
