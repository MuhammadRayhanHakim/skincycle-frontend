// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix icon marker Leaflet
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const RecycleDropPage = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   // --- STATE MANAGEMENT ---
//   const [address, setAddress] = useState("");
//   const [selectedSize, setSelectedSize] = useState("3-5 kg");
//   const [detailTrash, setDetailTrash] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [estimatedBalance] = useState(7500);

//   // --- MAP STATE ---
//   const [position, setPosition] = useState([-6.261, 107.152]); // Default Cikarang
//   const [showMap, setShowMap] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);

//   // Helper: Update view peta
//   function ChangeView({ center }) {
//     const map = useMap();
//     map.setView(center, 16);
//     return null;
//   }

//   // Helper: Handle klik di peta
//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//         reverseGeocode(lat, lng);
//       },
//     });
//     return position ? <Marker position={position} /> : null;
//   }

//   // --- HANDLER FUNGSI ---
//   const reverseGeocode = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//       );
//       const data = await response.json();
//       setAddress(data.display_name || `Koordinat: ${lat}, ${lng}`);
//     } catch (error) {
//       setAddress(`Koordinat: ${lat}, ${lng}`);
//     }
//   };

//   const handleDetectLocation = () => {
//     if (!navigator.geolocation)
//       return alert("Geolocation tidak didukung browser ini.");
//     setIsDetecting(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         reverseGeocode(latitude, longitude);
//         setShowMap(true);
//         setIsDetecting(false);
//       },
//       () => {
//         alert("Gagal mendeteksi lokasi.");
//         setShowMap(true);
//         setIsDetecting(false);
//       },
//     );
//   };

//   const handleUploadClick = () => fileInputRef.current.click();

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + imageFiles.length > 3) return alert("Maksimal 3 foto.");
//     setImageFiles([...imageFiles, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews([...previews, ...newPreviews]);
//   };

//   const handleConfirm = async () => {
//     // 1. Validasi
//     if (!address.trim()) return alert("Mohon tentukan lokasi penjemputan.");
//     if (imageFiles.length === 0) return alert("Mohon unggah foto dokumentasi.");

//     const token = localStorage.getItem("token");
//     if (!token) return alert("Sesi habis, silakan login kembali.");

//     try {
//       const formData = new FormData();
//       formData.append("alamat_penjemputan", address);
//       formData.append("estimasi_berat", selectedSize);
//       formData.append("estimasi_saldo", estimatedBalance);

//       // Mengirimkan rincian_karung dalam format string JSON agar aman masuk ke JSONB
//       formData.append(
//         "rincian_karung",
//         JSON.stringify({ detail: detailTrash }),
//       );

//       // Append file (Key harus 'foto_bukti' sesuai upload.single di backend)
//       if (imageFiles[0]) {
//         formData.append("foto_bukti", imageFiles[0]);
//       }

//       // Gunakan URL dari .env jika sudah dibuat, jika belum gunakan localhost statis
//       const API_URL =
//         import.meta.env.VITE_API_URL || "http://localhost:5000/api";

//       const response = await fetch(`${API_URL}/recycle/drop-verify`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData, // Jangan set Content-Type manual untuk FormData
//       });

//       const res = await response.json();
//       if (response.ok) {
//         alert("🚀 Berhasil! " + res.message);
//         navigate("/");
//       } else {
//         alert("Gagal: " + res.message);
//       }
//     } catch (error) {
//       alert("Gagal terhubung ke server. Pastikan backend menyala.");
//     }
//   };

//   return (
//     <div className="bg-[#F2EDE4] font-sans min-h-screen overflow-y-auto">
//       <div className="max-w-7xl mx-auto px-10 flex flex-col justify-center py-10">
//         <header className="mb-6">
//           <h1 className="text-4xl font-serif text-[#3D5532] mb-2 tracking-tight">
//             Antar & Verifikasi
//           </h1>
//           <p className="text-gray-500 text-sm font-medium">
//             Selesaikan langkah akhir untuk mendapatkan reward.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           <div className="lg:col-span-8 space-y-4">
//             {/* Lokasi & Peta */}
//             <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white">
//               <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase mb-3 italic">
//                 📍 Lokasi Penjemputan
//               </label>
//               <textarea
//                 value={address}
//                 readOnly
//                 className="w-full bg-[#F9F9F7] rounded-2xl p-4 text-sm text-gray-700 outline-none h-20 resize-none mb-3"
//                 placeholder="Klik deteksi atau pilih di peta..."
//               />
//               <button
//                 onClick={handleDetectLocation}
//                 className="mb-4 bg-[#EDD9C1] text-[#3D5532] px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-[#e6ccad] transition-all"
//               >
//                 {isDetecting ? "Mendeteksi..." : "Deteksi Lokasi & Buka Peta"}
//               </button>

//               {showMap && (
//                 <div className="h-64 w-full rounded-2xl overflow-hidden border-2 border-[#3D5532]/10">
//                   <MapContainer
//                     center={position}
//                     zoom={16}
//                     style={{ height: "100%", width: "100%" }}
//                   >
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     <ChangeView center={position} />
//                     <LocationMarker />
//                   </MapContainer>
//                 </div>
//               )}
//             </div>

//             {/* Info Sampah */}
//             <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white">
//               <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase mb-4 italic">
//                 📦 Informasi Sampah
//               </label>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {["1-2 kg", "3-5 kg", "5-10 kg", "10+ kg"].map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-6 py-2 rounded-full text-[10px] font-black border transition-all ${selectedSize === size ? "bg-[#3D5532] text-white border-[#3D5532]" : "text-gray-400 border-gray-100"}`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <input
//                 type="text"
//                 value={detailTrash}
//                 onChange={(e) => setDetailTrash(e.target.value)}
//                 className="w-full bg-[#F9F9F7] rounded-xl p-4 text-sm outline-none border border-transparent focus:border-[#3D5532]/20"
//                 placeholder="Detail kemasan (Contoh: 10 botol plastik, 2 kardus)..."
//               />
//             </div>

//             {/* Upload Foto */}
//             <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white">
//               <label className="flex items-center gap-2 text-xs font-black text-[#3D5532] uppercase mb-4 italic">
//                 📸 Dokumentasi Paket
//               </label>
//               <div className="flex gap-4">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   accept="image/*"
//                 />
//                 <div
//                   onClick={handleUploadClick}
//                   className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 cursor-pointer hover:border-[#3D5532] transition-all"
//                 >
//                   <span className="text-2xl">📷</span>
//                 </div>
//                 {previews.map((src, i) => (
//                   <div
//                     key={i}
//                     className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden border border-gray-50"
//                   >
//                     <img
//                       src={src}
//                       className="w-full h-full object-cover"
//                       alt="preview"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Reward Section */}
//           <div className="lg:col-span-4 flex flex-col gap-4">
//             <div className="bg-[#3D5532] p-8 rounded-[50px] shadow-xl text-center flex-grow flex flex-col justify-center">
//               <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-6 italic">
//                 Estimasi Saldo
//               </p>
//               <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border-[10px] border-white/10 mb-6 mx-auto">
//                 <div className="text-white">
//                   <p className="text-sm font-black italic">Rp</p>
//                   <span className="text-5xl font-black">
//                     {estimatedBalance.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-left space-y-3 text-white/80 text-xs font-bold italic px-4">
//                 <p>✅ Verifikasi Kemasan Siap</p>
//                 <p>✅ Alamat Terjangkau Kurir</p>
//               </div>
//             </div>
//             <div className="space-y-3">
//               <button
//                 onClick={handleConfirm}
//                 className="w-full bg-[#3D5532] text-white py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
//               >
//                 KONFIRMASI & KIRIM
//               </button>
//               <button
//                 onClick={() => navigate("/daur-ulang/simpan")}
//                 className="w-full bg-white text-[#3D5532] py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] border border-gray-100 active:scale-95 transition-all"
//               >
//                 KEMBALI KE KARUNG
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecycleDropPage;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  ArrowLeft,
  MapPin,
  Package,
  Camera,
  Banknote,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

// Fix icon marker Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecycleDropPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- STATE MANAGEMENT ---
  const [address, setAddress] = useState("");
  const [selectedSize, setSelectedSize] = useState("3-5 kg");
  const [detailTrash, setDetailTrash] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [estimatedBalance] = useState(7500);

  // --- MAP STATE ---
  const [position, setPosition] = useState([-6.261, 107.152]); // Default Cikarang
  const [showMap, setShowMap] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Helper: Update view peta
  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 16);
    return null;
  }

  // Helper: Handle klik di peta
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  // --- HANDLER FUNGSI ---
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await response.json();
      setAddress(data.display_name || `Koordinat: ${lat}, ${lng}`);
    } catch (error) {
      setAddress(`Koordinat: ${lat}, ${lng}`);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation)
      return alert("Geolocation tidak didukung browser ini.");
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
      reverseGeocode(latitude, longitude);
      setShowMap(true);
      setIsDetecting(false);
    });
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 3) return alert("Maksimal 3 foto.");
    setImageFiles([...imageFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleConfirm = async () => {
    if (!address.trim()) return alert("Mohon tentukan lokasi penjemputan.");
    if (imageFiles.length === 0) return alert("Mohon unggah foto dokumentasi.");

    const token = localStorage.getItem("token");
    if (!token) return alert("Sesi habis, silakan login kembali.");

    try {
      const formData = new FormData();
      formData.append("alamat_penjemputan", address);
      formData.append("estimasi_berat", selectedSize);
      formData.append("estimasi_saldo", estimatedBalance);
      formData.append(
        "rincian_karung",
        JSON.stringify({ detail: detailTrash }),
      );

      if (imageFiles[0]) {
        formData.append("foto_bukti", imageFiles[0]);
      }

      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const response = await fetch(`${API_URL}/recycle/drop-verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const res = await response.json();
      if (response.ok) {
        alert("🚀 Berhasil! " + res.message);
        navigate("/");
      } else {
        alert("Gagal: " + res.message);
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan backend menyala.");
    }
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen overflow-y-auto text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 flex flex-col justify-center py-10">
        {/* HEADER PANEL */}
        <header className="mb-6">
          <h1 className="text-4xl font-sans text-brand-dark-500 mb-2 tracking-tight">
            Antar & Verifikasi
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            Selesaikan langkah akhir untuk mendapatkan reward dompet elektronik
            sirkular Anda.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SISI KIRI: PANEL INPUT UTAMA */}
          <div className="lg:col-span-8 space-y-4">
            {/* 1. Komponen Peta & Lokasi Geocoding */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
              <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-3 tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> Lokasi Penjemputan
              </label>
              <textarea
                value={address}
                readOnly
                className="w-full bg-neutral-50 rounded-2xl p-4 text-sm text-neutral-700 outline-none h-20 resize-none mb-3 font-medium placeholder-neutral-300"
                placeholder="Klik deteksi atau tentukan pin rute koordinat di peta bawah..."
              />
              <button
                type="button"
                onClick={handleDetectLocation}
                className="mb-4 bg-brand-secondary-300 text-brand-primary-500 border border-brand-primary-100/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-brand-secondary-200 transition-all outline-none"
              >
                {isDetecting ? "Mendeteksi..." : "Deteksi Lokasi & Buka Peta"}
              </button>

              {showMap && (
                <div className="h-64 w-full rounded-2xl overflow-hidden border-2 border-brand-primary-100/20 shadow-inner">
                  <MapContainer
                    center={position}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ChangeView center={position} />
                    <LocationMarker />
                  </MapContainer>
                </div>
              )}
            </div>

            {/* 2. Informasi Rincian Karung Sampah */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
              <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-4 tracking-wider">
                <Package className="w-3.5 h-3.5" /> Informasi Sampah
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {["1-2 kg", "3-5 kg", "5-10 kg", "10+ kg"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all outline-none ${
                      selectedSize === size
                        ? "bg-brand-primary-300 text-neutral-default border border-transparent shadow-sm"
                        : "text-neutral-400 bg-neutral-50 border border-neutral-100"
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
                className="w-full bg-neutral-50 rounded-xl p-4 text-sm text-brand-dark-500 outline-none border border-transparent focus:border-brand-primary-100 font-medium placeholder-neutral-300"
                placeholder="Detail kemasan (Contoh: 10 botol plastik, 2 kardus)..."
              />
            </div>

            {/* 3. Unggah Dokumen Bukti Paket */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
              <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-4 tracking-wider">
                <Camera className="w-3.5 h-3.5" /> Dokumentasi Paket
              </label>
              <div className="flex gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div
                  onClick={handleUploadClick}
                  className="w-20 h-20 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center text-neutral-300 cursor-pointer hover:border-brand-primary-300 hover:text-brand-primary-300 transition-all shadow-inner"
                >
                  <Camera className="w-6 h-6" />
                </div>
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 shadow-sm"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt="preview"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SISI KANAN: PANEL MONITOR ESTIMASI REWARD */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-brand-primary-300 p-8 rounded-[50px] shadow-xl text-center flex-grow flex flex-col justify-center border border-brand-primary-400">
              <p className="text-neutral-default/60 text-xs font-black uppercase tracking-widest mb-6 italic flex items-center justify-center gap-1">
                <Banknote className="w-4 h-4" /> Estimasi Saldo
              </p>

              <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border-[10px] border-neutral-default/10 mb-6 mx-auto bg-brand-primary-400/20 shadow-inner">
                <div className="text-neutral-default">
                  <p className="text-sm font-black italic mb-0.5">Rp</p>
                  <span className="text-5xl font-sans font-black block leading-none">
                    {estimatedBalance.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="text-left space-y-3 text-neutral-default/80 text-xs font-bold italic px-4">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-feedback-success-100" />{" "}
                  Verifikasi Kemasan Siap
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-feedback-success-100" />{" "}
                  Alamat Terjangkau Kurir
                </p>
              </div>
            </div>

            {/* Aksi Konfirmasi Tombol */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
              >
                KONFIRMASI & KIRIM
              </button>
              <button
                type="button"
                onClick={() => navigate("/daur-ulang/simpan")}
                className="w-full bg-neutral-default text-brand-primary-300 py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] border border-neutral-100 shadow-sm hover:bg-neutral-50 active:scale-95 transition-all outline-none flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali Ke Karung
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleDropPage;
