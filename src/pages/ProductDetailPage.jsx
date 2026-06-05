import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Heart,
  Activity,
  CheckCircle2,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi design system

const ProductDetailPage = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produk/${id}`);
        const result = await response.json();
        if (result.status === "success") {
          setProduct(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat detail produk:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductData();
  }, [id]);

  if (loading)
    return (
      <div className="bg-brand-secondary-100 min-h-screen flex items-center justify-center text-brand-primary-300 font-bold font-sans">
        Memuat Detail Produk...
      </div>
    );

  if (!product)
    return (
      <div className="bg-brand-secondary-100 min-h-screen flex items-center justify-center text-feedback-error-200 font-bold font-sans">
        Produk tidak ditemukan dalam pustaka katalog.
      </div>
    );

  const arrayImages = product.gambar_produk
    ? product.gambar_produk.split(",")
    : ["default.jpg"];

  const listManfaat =
    product.link_pembelian && product.link_pembelian !== "#"
      ? product.link_pembelian.split(",")
      : [
          "Hidrasi Intensif",
          "Memperkuat Skin Barrier",
          "Menenangkan Kulit (Calming)",
        ];

  let listKandunganCards = [
    {
      nama: "Jeju Volcanic Cluster",
      deskripsi:
        "Butiran lava vulkanik dari Jeju yang efektif menyerap minyak berlebih dan membersihkan pori-pori secara mendalam.",
      status: "SAFE",
      textColor: "text-feedback-success-300",
      bgBadge: "bg-feedback-success-100/20",
    },
    {
      nama: "Bentonite",
      deskripsi:
        "Membantu membersihkan kotoran di pori-pori wajah dan mengurangi kilap minyak berlebih pada permukaan kulit.",
      status: "SAFE",
      textColor: "text-feedback-success-300",
      bgBadge: "bg-feedback-success-100/20",
    },
  ];

  if (product.bahan_kandungan && product.bahan_kandungan.trim() !== "") {
    try {
      const rawIngredients = product.bahan_kandungan.split(",");
      listKandunganCards = rawIngredients.map((item) => {
        if (item.includes(":")) {
          const [namePart, descPart] = item.split(":");
          return {
            nama: namePart.trim(),
            deskripsi: descPart.trim(),
            status: "SAFE",
            textColor: "text-feedback-success-300",
            bgBadge: "bg-feedback-success-100/20",
          };
        }
        return {
          nama: item.trim(),
          deskripsi:
            "Bahan aktif pilihan laboratorium kurasi SkinCycle untuk mengoptimalkan kesehatan jaringan sel kulit harian.",
          status: "SAFE",
          textColor: "text-feedback-success-300",
          bgBadge: "bg-feedback-success-100/20",
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  const skinVals = product.ph_level
    ? product.ph_level.split(",")
    : [95, 80, 85, 65];

  const iconsManfaat = [
    <ShieldCheck key="sh" className="w-4 h-4 text-neutral-default" />,
    <Sparkles key="gl" className="w-4 h-4 text-neutral-default" />,
    <Heart key="so" className="w-4 h-4 text-neutral-default" />,
  ];

  // Fungsi penanganan klik Tombol Tambah ke Keranjang dengan proteksi auth
  const handleAddToCart = () => {
    // === VALIDASI: CEK STATUS LOGIN ===
    if (!user) {
      alert(
        "⚠️ Akses Ditolak! Silakan masuk (login) ke akun Anda terlebih dahulu untuk menggunakan fitur keranjang belanja.",
      );
      navigate("/masuk");
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = currentCart.find(
      (item) => item.id_produk === product.id_produk,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(
      `📦 ${product.nama_produk} berhasil dimasukkan ke keranjang belanja!`,
    );
  };

  // Fungsi penanganan klik Tombol Beli Sekarang dengan proteksi auth
  const handleBuyNow = () => {
    // === VALIDASI: CEK STATUS LOGIN ===
    if (!user) {
      alert(
        "⚠️ Akses Ditolak! Silakan masuk (login) terlebih dahulu untuk melanjutkan proses transaksi pembayaran.",
      );
      navigate("/masuk");
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = currentCart.find(
      (item) => item.id_produk === product.id_produk,
    );

    if (!existingProduct) {
      currentCart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(currentCart));
    }

    const targetProduct = existingProduct || { ...product, quantity: 1 };
    localStorage.setItem("checkout_items", JSON.stringify([targetProduct]));
    navigate("/checkout");
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen pb-20 text-brand-dark-500">
      <div className="max-w-7xl mx-auto px-10 pt-8">
        {/* BUTTON BACK TO GALLERY */}
        <button
          type="button"
          onClick={() => navigate("/produk")}
          className="text-brand-primary-300 mb-6 hover:text-brand-primary-500 transition-colors flex items-center gap-2 outline-none font-bold"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          <span className="text-xs font-black uppercase tracking-widest">
            Kembali ke Galeri
          </span>
        </button>

        {/* TOP COMPONENT: FILE PRESENTATION GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          {/* Gallery Sidebar Thumbnails */}
          <div className="lg:col-span-1 flex lg:flex-col gap-4 order-3 lg:order-1 justify-center">
            {arrayImages.map((imgName, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all bg-neutral-default p-1 flex items-center justify-center ${selectedImg === idx ? "border-brand-primary-300 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img
                  src={`http://localhost:5000/uploads/${imgName}`}
                  className="w-full h-full object-contain rounded-xl"
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          {/* Main Display Image Frame */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="rounded-[40px] overflow-hidden shadow-2xl bg-neutral-default aspect-square flex items-center justify-center p-8 border border-neutral-100">
              <img
                src={`http://localhost:5000/uploads/${arrayImages[selectedImg]}`}
                className="max-w-full max-h-full object-contain"
                alt={product.nama_produk}
              />
            </div>
          </div>

          {/* Core Typography Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-3">
            <div className="flex gap-2 mb-4">
              <span className="bg-brand-primary-100/30 text-brand-primary-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                {product.brand || "SkinCycle"}
              </span>
              <span className="bg-neutral-default text-neutral-400 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-neutral-100 tracking-wider">
                {product.kategori || "Skincare"}
              </span>
            </div>

            <h1 className="text-4xl font-sans text-brand-dark-500 mb-2 leading-tight uppercase tracking-tight">
              {product.nama_produk}
            </h1>

            <div className="mb-6">
              <h2 className="text-3xl font-sans text-brand-primary-300 font-bold">
                Rp {product.harga_asli?.toLocaleString("id-ID")}
              </h2>
              <p className="text-[10px] text-neutral-400 font-bold mt-2 uppercase tracking-wide flex items-center gap-1">
                <span>✨ Rekomendasi Tipe Kulit:</span>{" "}
                <span className="text-brand-primary-300 font-black bg-neutral-default px-2.5 py-1 rounded-md border border-neutral-50 shadow-sm">
                  {product.suitable_skin_type}
                </span>
              </p>
            </div>

            <p className="text-neutral-500 text-sm leading-relaxed mb-8 italic font-medium">
              {product.deskripsi_produk ||
                "Diformulasikan secara ilmiah tanpa paraben dan ramah lingkungan untuk kesehatan kulit jangka panjang."}
            </p>

            {/* BUTTON GROUP DUAL INTERACTION ACTION */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 bg-brand-dark-400 text-neutral-default py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-xl hover:bg-brand-dark-500 transition-all outline-none active:scale-98"
              >
                Beli Sekarang
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-brand-primary-300 text-neutral-default py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-brand-primary-500 transition-all outline-none active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" /> Tambahkan Ke Keranjang
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: MEDICAL SPECIFICATION ANALYTICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-neutral-200/60 pt-10">
          {/* Kolom Kiri: Manfaat & Fit Level Karakteristik */}
          <div className="lg:col-span-4 space-y-8">
            {/* Manfaat Kandungan */}
            <div className="bg-neutral-default/50 backdrop-blur-md p-6 rounded-[30px] border border-neutral-default shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark-500 mb-6 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-brand-primary-300" /> Manfaat
                Utama
              </h3>
              <div className="space-y-5">
                {listManfaat.slice(0, 3).map((manfaatText, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-8 h-8 bg-brand-primary-300 rounded-xl flex items-center justify-center shadow-md shrink-0">
                      {iconsManfaat[i] || iconsManfaat[0]}
                    </div>
                    <p className="text-xs font-bold text-neutral-700 leading-snug font-sans">
                      {manfaatText.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Diagram Bar Kecocokan */}
            <div className="bg-neutral-default p-6 rounded-[30px] border border-neutral-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark-500 mb-6">
                📊 Kecocokan Jenis Kulit
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Kulit Berminyak",
                    val: skinVals[0] || 50,
                    colorBar: "bg-brand-primary-300",
                  },
                  {
                    label: "Kulit Kering",
                    val: skinVals[1] || 50,
                    colorBar: "bg-brand-primary-300",
                  },
                  {
                    label: "Kulit Kombinasi",
                    val: skinVals[2] || 50,
                    colorBar: "bg-brand-primary-300",
                  },
                  {
                    label: "Kulit Sensitif",
                    val: skinVals[3] || 50,
                    colorBar: "bg-feedback-warning-300",
                  },
                ].map((skin, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black text-neutral-400 uppercase mb-1.5 tracking-wide">
                      <span>{skin.label}</span>
                      <span className="text-brand-primary-300 font-black">
                        {skin.val}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`${skin.colorBar} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${skin.val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail Analisis Komponen Kimia Utama */}
          <div className="lg:col-span-8 bg-neutral-default p-8 rounded-[35px] border border-neutral-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark-500 flex items-center gap-2">
                    🧪 Analisis Komposisi Bahan
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                    Ingredients Safety & Function Analysis
                  </p>
                </div>
                <div className="flex items-center gap-2.5 bg-brand-secondary-100 px-4 py-2 rounded-xl border border-neutral-50 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-feedback-success-200 animate-pulse"></span>
                  <span className="text-[10px] font-black text-brand-primary-300 uppercase tracking-tight">
                    94% Safe Ingredients
                  </span>
                </div>
              </div>

              {/* Progress Global Safety Level */}
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-6 shadow-inner">
                <div
                  className="bg-brand-primary-300 h-full rounded-full transition-all duration-700"
                  style={{ width: `94%` }}
                ></div>
              </div>

              {/* Card List Komponen Ter-split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
                {listKandunganCards.map((bahan, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 shadow-sm hover:border-brand-primary-200 transition-all duration-300 flex flex-col justify-between gap-2.5 group"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="text-xs font-bold text-brand-dark-500 uppercase tracking-tight group-hover:text-brand-primary-300 transition-colors leading-tight font-sans">
                        {bahan.nama}
                      </h4>
                      <span
                        className={`text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md uppercase shrink-0 ${bahan.bgBadge || "bg-feedback-success-100/20"} ${bahan.textColor || "text-feedback-success-300"}`}
                      >
                        {bahan.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-medium font-sans">
                      {bahan.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Atribusi Legal */}
            <div className="mt-8 pt-4 border-t border-neutral-50 flex flex-col sm:flex-row gap-2 justify-between items-center text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              <span className="text-center sm:text-left">
                * Analisis bersumber dari kurasi ilmiah laboratorium Botani
                SkinCycle
              </span>
              <span
                onClick={() => navigate("/ensiklopedia/kandungan")}
                className="text-brand-primary-300 cursor-pointer hover:text-brand-primary-500 hover:underline flex items-center gap-0.5 outline-none"
              >
                Lihat Semua Kandungan →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   ShoppingCart,
//   ShieldCheck,
//   Sparkles,
//   Heart,
//   Activity,
// } from "lucide-react";

// const ProductDetailPage = ({ user }) => {
//   const [selectedImg, setSelectedImg] = useState(0);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/produk/${id}`);
//         const result = await response.json();
//         if (result.status === "success") {
//           setProduct(result.data);
//         }
//       } catch (error) {
//         console.error("Gagal memuat detail produk:", error);
//       }
//       {
//         setLoading(false);
//       }
//     };
//     if (id) fetchProductData();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="bg-brand-secondary-100 min-h-screen flex items-center justify-center text-brand-primary-300 font-bold font-sans">
//         Memuat Detail Produk...
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="bg-brand-secondary-100 min-h-screen flex items-center justify-center text-feedback-error-200 font-bold font-sans">
//         Produk tidak ditemukan dalam pustaka katalog.
//       </div>
//     );

//   const arrayImages = product.gambar_produk
//     ? product.gambar_produk.split(",")
//     : ["default.jpg"];
//   const listManfaat =
//     product.link_pembelian && product.link_pembelian !== "#"
//       ? product.link_pembelian.split(",")
//       : [
//           "Hidrasi Intensif",
//           "Memperkuat Skin Barrier",
//           "Menenangkan Kulit (Calming)",
//         ];

//   let listKandunganCards = [
//     {
//       nama: "Jeju Volcanic Cluster",
//       deskripsi:
//         "Butiran lava vulkanik dari Jeju yang efektif menyerap minyak berlebih dan membersihkan pori-pori secara mendalam.",
//       status: "SAFE",
//       textColor: "text-feedback-success-300",
//       bgBadge: "bg-feedback-success-100/20",
//     },
//     {
//       nama: "Bentonite",
//       deskripsi:
//         "Membantu membersihkan kotoran di pori-pori wajah dan mengurangi kilap minyak berlebih pada permukaan kulit.",
//       status: "SAFE",
//       textColor: "text-feedback-success-300",
//       bgBadge: "bg-feedback-success-100/20",
//     },
//   ];

//   if (product.bahan_kandungan && product.bahan_kandungan.trim() !== "") {
//     try {
//       const rawIngredients = product.bahan_kandungan.split(",");
//       listKandunganCards = rawIngredients.map((item) => {
//         if (item.includes(":")) {
//           const [namePart, descPart] = item.split(":");
//           return {
//             nama: namePart.trim(),
//             deskripsi: descPart.trim(),
//             status: "SAFE",
//             textColor: "text-feedback-success-300",
//             bgBadge: "bg-feedback-success-100/20",
//           };
//         }
//         return {
//           nama: item.trim(),
//           deskripsi:
//             "Bahan aktif pilihan laboratorium kurasi SkinCycle untuk mengoptimalkan kesehatan jaringan sel kulit harian.",
//           status: "SAFE",
//           textColor: "text-feedback-success-300",
//           bgBadge: "bg-feedback-success-100/20",
//         };
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   const skinVals = product.ph_level
//     ? product.ph_level.split(",")
//     : [95, 80, 85, 65];
//   const iconsManfaat = [
//     <ShieldCheck key="sh" className="w-4 h-4 text-neutral-default" />,
//     <Sparkles key="gl" className="w-4 h-4 text-neutral-default" />,
//     <Heart key="so" className="w-4 h-4 text-neutral-default" />,
//   ];

//   // --- REFAKTORISASI SINKRONISASI DATABASE DETAIL ---
//   const handleAddToCart = async () => {
//     if (!user) {
//       alert(
//         "⚠️ Akses Ditolak! Silakan masuk (login) ke akun Anda terlebih dahulu untuk menggunakan fitur keranjang belanja.",
//       );
//       navigate("/masuk");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch("http://localhost:5000/api/keranjang", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           id_produk: product.id_produk,
//           quantity: 1,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok || result.status === "success") {
//         alert(
//           `📦 ${product.nama_produk} berhasil dimasukkan ke keranjang belanja!`,
//         );
//       } else {
//         alert("Gagal menambahkan ke keranjang: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error network detail keranjang:", error);
//       alert("Terjadi kesalahan jaringan.");
//     }
//   };

//   const handleBuyNow = () => {
//     if (!user) {
//       alert(
//         "⚠️ Akses Ditolak! Silakan masuk (login) terlebih dahulu untuk melanjutkan proses transaksi pembayaran.",
//       );
//       navigate("/masuk");
//       return;
//     }
//     localStorage.setItem(
//       "checkout_items",
//       JSON.stringify([{ ...product, quantity: 1 }]),
//     );
//     navigate("/checkout");
//   };

//   return (
//     <div className="bg-brand-secondary-100 font-sans min-h-screen pb-20 text-brand-dark-500">
//       <div className="max-w-7xl mx-auto px-10 pt-8">
//         <button
//           type="button"
//           onClick={() => navigate("/produk")}
//           className="text-brand-primary-300 mb-6 hover:text-brand-primary-500 transition-colors flex items-center gap-2 outline-none font-bold"
//         >
//           <ArrowLeft className="w-4 h-4" />{" "}
//           <span className="text-xs font-black uppercase tracking-widest">
//             Kembali ke Galeri
//           </span>
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
//           <div className="lg:col-span-1 flex lg:flex-col gap-4 order-3 lg:order-1 justify-center">
//             {arrayImages.map((imgName, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => setSelectedImg(idx)}
//                 className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all bg-neutral-default p-1 flex items-center justify-center ${selectedImg === idx ? "border-brand-primary-300 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
//               >
//                 <img
//                   src={`http://localhost:5000/uploads/${imgName}`}
//                   className="w-full h-full object-contain rounded-xl"
//                   alt="thumb"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="lg:col-span-5 order-1 lg:order-2">
//             <div className="rounded-[40px] overflow-hidden shadow-2xl bg-neutral-default aspect-square flex items-center justify-center p-8 border border-neutral-100">
//               <img
//                 src={`http://localhost:5000/uploads/${arrayImages[selectedImg]}`}
//                 className="max-w-full max-h-full object-contain"
//                 alt={product.nama_produk}
//               />
//             </div>
//           </div>

//           <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-3">
//             <div className="flex gap-2 mb-4">
//               <span className="bg-brand-primary-100/30 text-brand-primary-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
//                 {product.brand || "SkinCycle"}
//               </span>
//               <span className="bg-neutral-default text-neutral-400 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-neutral-100 tracking-wider">
//                 {product.kategori || "Skincare"}
//               </span>
//             </div>

//             <h1 className="text-4xl font-marcellus text-brand-dark-500 mb-2 leading-tight uppercase tracking-tight font-bold">
//               {product.nama_produk}
//             </h1>

//             <div className="mb-6">
//               <h2 className="text-3xl font-marcellus text-brand-primary-300 font-black">
//                 Rp {product.harga_asli?.toLocaleString("id-ID")}
//               </h2>
//               <div className="text-[10px] text-neutral-400 font-bold mt-2 uppercase tracking-wide flex items-center gap-1">
//                 <span>✨ Rekomendasi Tipe Kulit:</span>{" "}
//                 <span className="text-brand-primary-300 font-black bg-neutral-default px-2.5 py-1 rounded-md border border-neutral-50 shadow-sm">
//                   {product.suitable_skin_type}
//                 </span>
//               </div>
//             </div>

//             <p className="text-neutral-500 text-sm leading-relaxed mb-8 italic font-medium">
//               {product.deskripsi_produk ||
//                 "Diformulasikan secara ilmiah tanpa paraben dan ramah lingkungan untuk kesehatan kulit jangka panjang."}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 w-full">
//               <button
//                 type="button"
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-brand-dark-400 text-neutral-default py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-xl hover:bg-brand-dark-500 transition-all outline-none active:scale-98"
//               >
//                 Beli Sekarang
//               </button>
//               <button
//                 type="button"
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-brand-primary-300 text-neutral-default py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-brand-primary-500 transition-all outline-none active:scale-98"
//               >
//                 <ShoppingCart className="w-4 h-4" /> Tambahkan Ke Keranjang
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM MATRIX */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-neutral-200/60 pt-10">
//           <div className="lg:col-span-4 space-y-8">
//             <div className="bg-neutral-default/50 backdrop-blur-md p-6 rounded-[30px] border border-neutral-default shadow-sm">
//               <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark-500 mb-6 flex items-center gap-1.5">
//                 <Activity className="w-4 h-4 text-brand-primary-300" /> Manfaat
//                 Utama
//               </h3>
//               <div className="space-y-5">
//                 {listManfaat.slice(0, 3).map((manfaatText, i) => (
//                   <div key={i} className="flex gap-4 items-center">
//                     <div className="w-8 h-8 bg-brand-primary-300 rounded-xl flex items-center justify-center shadow-md shrink-0">
//                       {iconsManfaat[i] || iconsManfaat[0]}
//                     </div>
//                     <p className="text-xs font-bold text-neutral-700 leading-snug font-sans">
//                       {manfaatText.trim()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-neutral-default p-6 rounded-[30px] border border-neutral-100 shadow-sm">
//               <h3 className="text-xs font-black uppercase tracking-widest text-brand-dark-500 mb-6">
//                 📊 Kecocokan Jenis Kulit
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     label: "Kulit Berminyak",
//                     val: skinVals[0] || 50,
//                     colorBar: "bg-brand-primary-300",
//                   },
//                   {
//                     label: "Kulit Kering",
//                     val: skinVals[1] || 50,
//                     colorBar: "bg-brand-primary-300",
//                   },
//                   {
//                     label: "Kulit Kombinasi",
//                     val: skinVals[2] || 50,
//                     colorBar: "bg-brand-primary-300",
//                   },
//                   {
//                     label: "Kulit Sensitif",
//                     val: skinVals[3] || 50,
//                     colorBar: "bg-feedback-warning-300",
//                   },
//                 ].map((skin, i) => (
//                   <div key={i}>
//                     <div className="flex justify-between text-[10px] font-black text-neutral-400 uppercase mb-1.5 tracking-wide">
//                       <span>{skin.label}</span>
//                       <span className="text-brand-primary-300 font-black">
//                         {skin.val}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden shadow-inner">
//                       <div
//                         className={`${skin.colorBar} h-full rounded-full transition-all duration-700`}
//                         style={{ width: `${skin.val}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-8 bg-neutral-default p-8 rounded-[35px] border border-neutral-100 shadow-sm flex flex-col justify-between">
//             <div>
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
//                 <div>
//                   <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark-500 flex items-center gap-2">
//                     🧪 Analisis Komposisi Bahan
//                   </h3>
//                   <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
//                     Ingredients Safety & Function Analysis
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2.5 bg-brand-secondary-100 px-4 py-2 rounded-xl border border-neutral-50 shadow-sm">
//                   <span className="w-2 h-2 rounded-full bg-feedback-success-200 animate-pulse"></span>
//                   <span className="text-[10px] font-black text-brand-primary-300 uppercase tracking-tight">
//                     94% Safe Ingredients
//                   </span>
//                 </div>
//               </div>

//               <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-6 shadow-inner">
//                 <div
//                   className="bg-brand-primary-300 h-full rounded-full transition-all duration-700"
//                   style={{ width: `94%` }}
//                 ></div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
//                 {listKandunganCards.map((bahan, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 shadow-sm hover:border-brand-primary-200 transition-all duration-300 flex flex-col justify-between gap-2.5 group"
//                   >
//                     <div className="flex justify-between items-start gap-3">
//                       <h4 className="text-xs font-bold text-brand-dark-500 uppercase tracking-tight group-hover:text-brand-primary-300 transition-colors leading-tight font-sans">
//                         {bahan.nama}
//                       </h4>
//                       <span
//                         className={`text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md uppercase shrink-0 ${bahan.bgBadge || "bg-feedback-success-100/20"} ${bahan.textColor || "text-feedback-success-300"}`}
//                       >
//                         {bahan.status}
//                       </span>
//                     </div>
//                     <p className="text-[11px] text-neutral-400 leading-relaxed font-medium font-sans">
//                       {bahan.deskripsi}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-8 pt-4 border-t border-neutral-50 flex flex-col sm:flex-row gap-2 justify-between items-center text-[10px] font-black text-neutral-400 uppercase tracking-wider">
//               <span className="text-center sm:text-left">
//                 * Analisis bersumber dari kurasi ilmiah laboratorium Botani
//                 SkinCycle
//               </span>
//               <span
//                 onClick={() => navigate("/ensiklopedia/kandungan")}
//                 className="text-brand-primary-300 cursor-pointer hover:text-brand-primary-500 hover:underline flex items-center gap-0.5 outline-none"
//               >
//                 Lihat Semua Kandungan →
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;
