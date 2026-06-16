// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import {
//   ArrowLeft,
//   MapPin,
//   Package,
//   Camera,
//   Banknote,
//   ShieldCheck,
//   CheckCircle2,
// } from "lucide-react";

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
//   const location = useLocation();
//   const fileInputRef = useRef(null);

//   const [address, setAddress] = useState("");
//   const [selectedSize, setSelectedSize] = useState("3-5 kg");
//   const [detailTrash, setDetailTrash] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [estimatedBalance, setEstimatedBalance] = useState(7500);

//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [position, setPosition] = useState([-6.261, 107.152]);
//   const [showMap, setShowMap] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);

//   // --- AUTOMATIC KATEGORISASI BERAT BERDASARKAN ISI KARUNG VIRTUAL ---
//   useEffect(() => {
//     if (location.state?.automaticWeight) {
//       const weight = location.state.automaticWeight;

//       if (weight <= 2) {
//         setSelectedSize("1-2 kg");
//         setEstimatedBalance(3000);
//       } else if (weight <= 5) {
//         setSelectedSize("3-5 kg");
//         setEstimatedBalance(7500);
//       } else if (weight <= 10) {
//         setSelectedSize("5-10 kg");
//         setEstimatedBalance(15000);
//       } else {
//         setSelectedSize("10+ kg");
//         setEstimatedBalance(25000);
//       }
//     }

//     if (location.state?.detailedSummary) {
//       setDetailTrash(location.state.detailedSummary);
//     }
//   }, [location.state]);

//   function ChangeView({ center }) {
//     const map = useMap();
//     map.setView(center, 16);
//     return null;
//   }

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
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const { latitude, longitude } = pos.coords;
//       setPosition([latitude, longitude]);
//       reverseGeocode(latitude, longitude);
//       setShowMap(true);
//       setIsDetecting(false);
//     });
//   };

//   const handleUploadClick = () => fileInputRef.current.click();

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + imageFiles.length > 3) return alert("Maksimal 3 foto.");
//     setImageFiles([...imageFiles, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews([...previews, ...newPreviews]);
//   };

//   // --- LOGIKA SETORAN SAMPAH DAUR ULANG DENGAN MODAL KUSTOM ---
//   const handleConfirm = async () => {
//     if (!address.trim()) return alert("Mohon tentukan lokasi penjemputan.");
//     if (imageFiles.length === 0) return alert("Mohon unggah foto dokumentasi.");

//     const token = localStorage.getItem("token");
//     if (!token) return alert("Sesi habis, silakan login kembali.");

//     try {
//       const formData = new FormData();
//       formData.append("alamat_penjemputan", address);
//       formData.append("estimasi_berat", selectedSize);
//       formData.append("estimasi_saldo", estimatedBalance);
//       formData.append(
//         "rincian_karung",
//         JSON.stringify({ detail: detailTrash }),
//       );

//       if (position && position.length === 2) {
//         formData.append("latitude", position[0]);
//         formData.append("longitude", position[1]);
//       }

//       if (imageFiles[0]) formData.append("foto_bukti", imageFiles[0]);

//       const API_URL =
//         import.meta.env.VITE_API_URL || "http://localhost:5000/api";
//       const response = await fetch(`${API_URL}/recycle/drop-verify`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const res = await response.json();
//       if (response.ok) {
//         localStorage.removeItem("sc_recycle_counts");
//         localStorage.removeItem("sc_recycle_dropped_items");

//         // 🟢 FIX UTAMA: Jangan langsung navigate, melainkan munculkan modal pop-up kustom terlebih dahulu
//         setShowSuccessModal(true);
//       } else {
//         alert("Gagal: " + res.message);
//       }
//     } catch (error) {
//       alert("Gagal terhubung ke server. Pastikan backend menyala.");
//     }
//   };

//   return (
//     <div className="bg-brand-secondary-100 font-sans min-h-screen overflow-y-auto text-brand-dark-500 relative">
//       <div className="max-w-7xl mx-auto px-10 flex flex-col justify-center py-10">
//         <header className="mb-6">
//           <h1 className="text-4xl font-sans text-brand-dark-500 mb-2 tracking-tight">
//             Antar &amp; Verifikasi
//           </h1>
//           <p className="text-neutral-500 text-sm font-medium">
//             Selesaikan langkah akhir untuk mendapatkan reward dompet elektronik
//             sirkular Anda.
//           </p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           <div className="lg:col-span-8 space-y-4">
//             {/* Lokasi Penjemputan Card */}
//             <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
//               <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-3 tracking-wider">
//                 <MapPin className="w-3.5 h-3.5" /> Lokasi Penjemputan
//               </label>
//               <textarea
//                 value={address}
//                 readOnly
//                 className="w-full bg-neutral-50 rounded-2xl p-4 text-sm text-neutral-700 outline-none h-20 resize-none mb-3 font-medium placeholder-neutral-300"
//                 placeholder="Klik deteksi atau tentukan pin rute koordinat di peta bawah..."
//               />
//               <button
//                 type="button"
//                 onClick={handleDetectLocation}
//                 className="mb-4 bg-brand-secondary-300 text-brand-primary-500 border border-brand-primary-100/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-brand-secondary-200 transition-all outline-none"
//               >
//                 {isDetecting
//                   ? "Mendeteksi..."
//                   : "Deteksi Lokasi &amp; Buka Peta"}
//               </button>

//               {showMap && (
//                 <div className="h-64 w-full rounded-2xl overflow-hidden border-2 border-brand-primary-100/20 shadow-inner">
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

//             {/* Informasi Sampah Card */}
//             <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
//               <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-4 tracking-wider">
//                 <Package className="w-3.5 h-3.5" /> Informasi Sampah
//               </label>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {["1-2 kg", "3-5 kg", "5-10 kg", "10+ kg"].map((size) => (
//                   <button
//                     key={size}
//                     type="button"
//                     onClick={() => {
//                       setSelectedSize(size);
//                       if (size === "1-2 kg") setEstimatedBalance(3000);
//                       if (size === "3-5 kg") setEstimatedBalance(7500);
//                       if (size === "5-10 kg") setEstimatedBalance(15000);
//                       if (size === "10+ kg") setEstimatedBalance(25000);
//                     }}
//                     className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all outline-none ${
//                       selectedSize === size
//                         ? "bg-brand-primary-300 text-neutral-default border border-transparent shadow-sm"
//                         : "text-neutral-400 bg-neutral-50 border border-neutral-100"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <input
//                 type="text"
//                 value={detailTrash}
//                 onChange={(e) => setDetailTrash(e.target.value)}
//                 className="w-full bg-neutral-50 rounded-xl p-4 text-sm text-brand-dark-500 outline-none border border-transparent focus:border-brand-primary-100 font-medium placeholder-neutral-300"
//                 placeholder="Detail kemasan (Contoh: 10 botol plastik, 2 kardus)..."
//               />
//             </div>

//             {/* Dokumentasi Paket Card */}
//             <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
//               <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-4 tracking-wider">
//                 <Camera className="w-3.5 h-3.5" /> Dokumentasi Paket
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
//                   className="w-20 h-20 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center text-neutral-300 cursor-pointer hover:border-brand-primary-300 hover:text-brand-primary-300 transition-all shadow-inner"
//                 >
//                   <Camera className="w-6 h-6" />
//                 </div>
//                 {previews.map((src, i) => (
//                   <div
//                     key={i}
//                     className="w-20 h-20 rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 shadow-sm"
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

//           {/* SISI KANAN PANEL REWARD (STICKY LOCK MELAYANG) */}
//           <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4 w-full">
//             <div className="bg-brand-primary-300 p-8 rounded-[50px] shadow-xl text-center flex-grow flex flex-col justify-center border border-brand-primary-400">
//               <p className="text-neutral-default/60 text-xs font-black uppercase tracking-widest mb-6 italic flex items-center justify-center gap-1">
//                 <Banknote className="w-4 h-4" /> Estimasi Saldo
//               </p>
//               <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border-[10px] border-neutral-default/10 mb-6 mx-auto bg-brand-primary-400/20 shadow-inner">
//                 <div className="text-neutral-default">
//                   <p className="text-sm font-black italic mb-0.5">Rp</p>
//                   <span className="text-5xl font-sans font-black block leading-none">
//                     {estimatedBalance.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-left space-y-3 text-neutral-default/80 text-xs font-bold italic px-4">
//                 <p className="flex items-center gap-2">
//                   <CheckCircle2 className="w-4 h-4 text-feedback-success-100" />{" "}
//                   Verifikasi Kemasan Siap
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <ShieldCheck className="w-4 h-4 text-feedback-success-100" />{" "}
//                   Alamat Terjangkau Kurir
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <button
//                 type="button"
//                 onClick={handleConfirm}
//                 className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
//               >
//                 KONFIRMASI &amp; KIRIM
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate("/daur-ulang/simpan")}
//                 className="w-full bg-neutral-default text-brand-primary-300 py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] border border-neutral-100 shadow-sm hover:bg-brand-primary-500 hover:text-white active:scale-95 transition-all outline-none flex items-center justify-center gap-1"
//               >
//                 <ArrowLeft className="w-4 h-4" /> Kembali Ke Karung
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🟢 MODAL SUKSES KUSTOM SKINCYCLE STYLE */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-brand-dark-500/80 backdrop-blur-md flex items-center justify-center z-[9999] animate-fade-in">
//           <div className="bg-neutral-default rounded-[40px] p-10 max-w-md w-full mx-4 text-center shadow-2xl border border-neutral-100 flex flex-col items-center justify-center relative transform scale-100 transition-transform duration-300">
//             {/* Visual Lingkaran Ikon Sukses */}
//             <div className="w-20 h-20 bg-brand-secondary-300 rounded-full flex items-center justify-center text-brand-primary-300 mb-6 border border-brand-primary-100/20 shadow-sm">
//               <svg
//                 className="w-10 h-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={3}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>

//             {/* Konten Teks Pesan - Kontras Putih Bersih */}
//             <h3 className="text-2xl font-sans font-black text-brand-dark-500 uppercase tracking-tight">
//               Laporan Terkirim!
//             </h3>

//             <p className="text-xs text-neutral-400 font-medium mt-3 leading-relaxed px-4">
//               🚀 Berhasil! Laporan setoran daur ulang Anda telah tercatat di
//               sistem. Kurir kami akan segera memverifikasi lokasi penjemputan
//               Anda.
//             </p>

//             {/* Tombol Aksi Konfirmasi Tutup */}
//             <button
//               type="button"
//               onClick={() => {
//                 setShowSuccessModal(false);
//                 navigate("/riwayat");
//               }}
//               className="mt-8 w-full text-[10px] bg-brand-primary-300 text-neutral-default py-4 rounded-full font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
//             >
//               Selesai &amp; Cek Riwayat
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecycleDropPage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
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
} from "lucide-react";

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
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [address, setAddress] = useState("");
  const [selectedSize, setSelectedSize] = useState("3-5 kg");
  const [detailTrash, setDetailTrash] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [estimatedBalance, setEstimatedBalance] = useState(7500);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [position, setPosition] = useState([-6.261, 107.152]);
  const [showMap, setShowMap] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // --- AUTOMATIC KATEGORISASI BERAT BERDASARKAN ISI KARUNG VIRTUAL ---
  useEffect(() => {
    if (location.state?.automaticWeight) {
      const weight = location.state.automaticWeight;

      if (weight <= 2) {
        setSelectedSize("1-2 kg");
        setEstimatedBalance(3000);
      } else if (weight <= 5) {
        setSelectedSize("3-5 kg");
        setEstimatedBalance(7500);
      } else if (weight <= 10) {
        setSelectedSize("5-10 kg");
        setEstimatedBalance(15000);
      } else {
        setSelectedSize("10+ kg");
        setEstimatedBalance(25000);
      }
    }

    if (location.state?.detailedSummary) {
      setDetailTrash(location.state.detailedSummary);
    }
  }, [location.state]);

  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 16);
    return null;
  }

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
    if (!navigator.geolocation) {
      Swal.fire({
        title: "Browser Tidak Didukung",
        text: "Geolocation tidak didukung oleh browser ini. Silakan gunakan browser modern.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }
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
    if (files.length + imageFiles.length > 3) {
      Swal.fire({
        title: "Batas Foto Tercapai",
        text: "Maksimal 3 foto dokumentasi yang dapat diunggah.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }
    setImageFiles([...imageFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  // --- LOGIKA SETORAN SAMPAH DAUR ULANG DENGAN MODAL KUSTOM ---
  const handleConfirm = async () => {
    if (!address.trim()) {
      Swal.fire({
        title: "Lokasi Belum Ditentukan",
        text: "Mohon tentukan lokasi penjemputan terlebih dahulu.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }
    if (imageFiles.length === 0) {
      Swal.fire({
        title: "Foto Belum Diunggah",
        text: "Mohon unggah minimal 1 foto dokumentasi paket sampah Anda.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Sesi Berakhir",
        text: "Sesi login Anda telah habis. Silakan masuk kembali.",
        icon: "error",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("alamat_penjemputan", address);
      formData.append("estimasi_berat", selectedSize);
      formData.append("estimasi_saldo", estimatedBalance);
      formData.append(
        "rincian_karung",
        JSON.stringify({ detail: detailTrash }),
      );

      if (position && position.length === 2) {
        formData.append("latitude", position[0]);
        formData.append("longitude", position[1]);
      }

      if (imageFiles[0]) formData.append("foto_bukti", imageFiles[0]);

      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${API_URL}/recycle/drop-verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const res = await response.json();
      if (response.ok) {
        localStorage.removeItem("sc_recycle_counts");
        localStorage.removeItem("sc_recycle_dropped_items");
        setShowSuccessModal(true);
      } else {
        Swal.fire({
          title: "Pengiriman Gagal",
          text: res.message || "Terjadi kesalahan saat memproses laporan Anda.",
          icon: "error",
          confirmButtonColor: "#3D5532",
          customClass: { popup: "rounded-[30px]" },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Koneksi Bermasalah",
        text: "Gagal terhubung ke server. Pastikan backend menyala dan coba lagi.",
        icon: "error",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
    }
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen text-brand-dark-500 relative">
      <div className="max-w-7xl mx-auto px-10 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-sans text-brand-dark-500 mb-2 tracking-tight">
            Antar &amp; Verifikasi
          </h1>
          <p className="text-neutral-500 text-sm font-medium">
            Selesaikan langkah akhir untuk mendapatkan reward dompet elektronik
            sirkular Anda.
          </p>
        </header>

        {/* 🚀 REFACTOR TERKUNCI: Ditambahkan h-full dan items-start agar kolom lengket berfungsi 100% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full w-full">
          {/* SISI KIRI: INPUT FORMULIR ALAMAT DAN DATA PAKET */}
          <div className="lg:col-span-8 space-y-4">
            {/* Lokasi Penjemputan Card */}
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
                {isDetecting
                  ? "Mendeteksi..."
                  : "Deteksi Lokasi &amp; Buka Peta"}
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

            {/* Informasi Sampah Card */}
            <div className="bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100">
              <label className="flex items-center gap-2 text-xs font-black text-brand-primary-300 uppercase mb-4 tracking-wider">
                <Package className="w-3.5 h-3.5" /> Informasi Sampah
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {["1-2 kg", "3-5 kg", "5-10 kg", "10+ kg"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      if (size === "1-2 kg") setEstimatedBalance(3000);
                      if (size === "3-5 kg") setEstimatedBalance(7500);
                      if (size === "5-10 kg") setEstimatedBalance(15000);
                      if (size === "10+ kg") setEstimatedBalance(25000);
                    }}
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

            {/* Dokumentasi Paket Card */}
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

          {/* 🚀 SISI KANAN PANEL REWARD: SEKARANG TERKUNCI STICKY SEMPURNA DENGAN TOP COORD */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 flex flex-col gap-4 w-full">
            <div className="bg-brand-primary-300 p-8 rounded-[50px] shadow-xl text-center flex-col justify-center border border-brand-primary-400">
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

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full bg-brand-primary-300 text-neutral-default py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
              >
                KONFIRMASI &amp; KIRIM
              </button>
              <button
                type="button"
                onClick={() => navigate("/daur-ulang/simpan")}
                className="w-full bg-neutral-default text-brand-primary-300 py-5 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] border border-neutral-100 shadow-sm hover:bg-brand-primary-500 hover:text-white active:scale-95 transition-all outline-none flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali Ke Karung
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL SUKSES KUSTOM --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-brand-dark-500/80 backdrop-blur-md flex items-center justify-center z-[9999] animate-fade-in">
          <div className="bg-neutral-default rounded-[40px] p-10 max-w-md w-full mx-4 text-center shadow-2xl border border-neutral-100 flex flex-col items-center justify-center relative transform scale-100 transition-transform duration-300">
            <div className="w-20 h-20 bg-brand-secondary-300 rounded-full flex items-center justify-center text-brand-primary-300 mb-6 border border-brand-primary-100/20 shadow-sm">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-sans font-black text-brand-dark-500 uppercase tracking-tight">
              Laporan Terkirim!
            </h3>
            <p className="text-xs text-neutral-400 font-medium mt-3 leading-relaxed px-4">
              🚀 Berhasil! Laporan setoran daur ulang Anda telah tercatat di
              sistem. Kurir kami akan segera memverifikasi lokasi penjemputan
              Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/riwayat");
              }}
              className="mt-8 w-full text-[10px] bg-brand-primary-300 text-neutral-default py-4 rounded-full font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
            >
              Selesai &amp; Cek Riwayat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecycleDropPage;