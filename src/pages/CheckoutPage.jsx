// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const CheckoutPage = () => {
// //   const navigate = useNavigate();
// //   const [cartItems, setCartItems] = useState([]);
// //   const [shippingMethod, setShippingMethod] = useState("kurir"); // 'kurir' atau 'toko'

// //   // === OPTIMASI STATE: MENGGUNAKAN METODE PEMBELIAN BERDASARKAN GAMBAR TERAKHIR ===
// //   const [purchaseMethod, setPurchaseMethod] = useState("saldo"); // 'saldo' atau 'penuh'

// //   // Saldo dinamis diambil berdasarkan data Wallet Overview halaman riwayat Anda (Rp 30.000)
// //   const [userWallet, setUserWallet] = useState(30000);

// //   const [formData, setFormData] = useState({
// //     nama: "Muhammad Rayhan",
// //     telepon: "+62 812-9876-5432",
// //     kota: "Kabupaten Bekasi, Cikarang Utara",
// //     alamat: "Jl. Kasuari Raya No. 12, Perumahan Cikarang Baru",
// //     catatan: "",
// //   });

// //   // Mengambil data produk yang dicentang dari halaman keranjang
// //   useEffect(() => {
// //     const checkoutData = JSON.parse(localStorage.getItem("checkout_items"));
// //     if (checkoutData && checkoutData.length > 0) {
// //       setCartItems(checkoutData);
// //     } else {
// //       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
// //       setCartItems(savedCart);
// //     }
// //   }, []);

// //   // --- LOGIKA KALKULASI FINANSIAL DINAMIS ---
// //   const subtotal = cartItems.reduce(
// //     (acc, item) => acc + item.harga_asli * item.quantity,
// //     0,
// //   );
// //   const biayaPengiriman = shippingMethod === "kurir" ? 15000 : 0;

// //   // Jika memilih 'Gunakan Saldo', potong total biaya menggunakan saldo e-wallet yang tersedia
// //   const saldoTerpakai =
// //     purchaseMethod === "saldo"
// //       ? Math.min(subtotal + biayaPengiriman, userWallet)
// //       : 0;
// //   const totalPembayaran = Math.max(
// //     0,
// //     subtotal + biayaPengiriman - saldoTerpakai,
// //   );

// //   const handleProcessCheckout = (e) => {
// //     e.preventDefault();
// //     if (cartItems.length === 0) {
// //       alert("Daftar pesanan Anda kosong.");
// //       return;
// //     }

// //     alert(
// //       `🎉 Transaksi Berhasil!\nMetode: Pembelian dengan ${purchaseMethod === "saldo" ? "Potongan Saldo" : "Harga Penuh (VA)"}\nTotal Bayar: Rp ${totalPembayaran.toLocaleString("id-ID")}`,
// //     );

// //     // Sinkronisasi sisa keranjang belanja utama
// //     const mainCart = JSON.parse(localStorage.getItem("cart")) || [];
// //     const checkoutIds = cartItems.map((item) => item.id_produk);
// //     const remainingCart = mainCart.filter(
// //       (item) => !checkoutIds.includes(item.id_produk),
// //     );

// //     localStorage.setItem("cart", JSON.stringify(remainingCart));
// //     localStorage.removeItem("checkout_items");

// //     navigate("/riwayat"); // Arahkan kembali ke halaman riwayat dompet & transaksi Anda
// //   };

// //   return (
// //     <div className="bg-[#F2EDE4] min-h-screen font-sans text-[#1A2416] py-12 px-4 md:px-10 lg:px-20">
// //       <div className="max-w-6xl mx-auto">
// //         {/* BUTTON BACK */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="text-[#3D5532] hover:text-[#2d4025] font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-8 transition-colors group"
// //         >
// //           <span className="group-hover:-translate-x-1 transition-transform">
// //             ←
// //           </span>{" "}
// //           Kembali
// //         </button>

// //         {/* JUDUL HALAMAN */}
// //         <div className="mb-10">
// //           <h1 className="text-4xl font-serif font-black tracking-tight text-[#1A2416]">
// //             Formulir Checkout
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">
// //             Selesaikan pemesanan produk SkinCycle pilihan Anda dengan aman.
// //           </p>
// //         </div>

// //         <form
// //           onSubmit={handleProcessCheckout}
// //           className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
// //         >
// //           {/* ==================== SISI KIRI: DATA PENGIRIMAN ==================== */}
// //           <div className="lg:col-span-7 space-y-8">
// //             {/* METODE PENERIMAAN BARANG */}
// //             <div className="bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white/80 shadow-sm">
// //               <h3 className="text-[10px] font-black uppercase tracking-widest text-[#3D5532] opacity-60 mb-4">
// //                 Metode Penerimaan
// //               </h3>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <button
// //                   type="button"
// //                   onClick={() => setShippingMethod("kurir")}
// //                   className={`p-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border transition-all ${
// //                     shippingMethod === "kurir"
// //                       ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md"
// //                       : "bg-white border-gray-200/80 text-gray-400 hover:border-gray-300"
// //                   }`}
// //                 >
// //                   🚚 Pengiriman Kurir
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShippingMethod("toko")}
// //                   className={`p-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border transition-all ${
// //                     shippingMethod === "toko"
// //                       ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md"
// //                       : "bg-white border-gray-200/80 text-gray-400 hover:border-gray-300"
// //                   }`}
// //                 >
// //                   🏪 Ambil Sendiri di Toko
// //                 </button>
// //               </div>
// //             </div>

// //             {/* INFORMASI PENGIRIMAN */}
// //             <div className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-sm space-y-5">
// //               <h3 className="text-sm font-black uppercase tracking-widest text-[#3D5532] mb-2">
// //                 Informasi Pengiriman
// //               </h3>

// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
// //                     Nama Lengkap
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={formData.nama}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, nama: e.target.value })
// //                     }
// //                     className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#3D5532]"
// //                   />
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
// //                       Nomor Telepon
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       required
// //                       value={formData.telepon}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, telepon: e.target.value })
// //                       }
// //                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#3D5532]"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
// //                       Kota & Kecamatan
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       value={formData.kota}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, kota: e.target.value })
// //                       }
// //                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#3D5532]"
// //                     />
// //                   </div>
// //                 </div>

// //                 {shippingMethod === "kurir" && (
// //                   <div>
// //                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
// //                       Alamat Lengkap Rumah
// //                     </label>
// //                     <textarea
// //                       required
// //                       rows="3"
// //                       value={formData.alamat}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, alamat: e.target.value })
// //                       }
// //                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#3D5532] resize-none leading-relaxed"
// //                     />
// //                   </div>
// //                 )}

// //                 <div>
// //                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
// //                     Catatan Tambahan (Opsional)
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.catatan}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, catatan: e.target.value })
// //                     }
// //                     placeholder="Contoh: Taruh di pos satpam, dll."
// //                     className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-[#3D5532]"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* ECO LABEL */}
// //             <div className="bg-[#E9F2E9] border border-[#D5ECD5] rounded-2xl p-5 flex gap-4 items-start">
// //               <span className="text-2xl mt-0.5">🌱</span>
// //               <div>
// //                 <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider">
// //                   Kemasan Ramah Lingkungan
// //                 </h4>
// //                 <p className="text-[11px] text-emerald-800/80 font-medium mt-1 leading-relaxed">
// //                   Pesanan Anda akan dibungkus menggunakan serat bambu alami dan
// //                   kardus daur ulang tanpa plastik mikro (*zero-waste
// //                   packaging*).
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ==================== SISI KANAN: RINGKASAN & INTEGRASI OPSI BELI BARU ==================== */}
// //           <div className="lg:col-span-5 space-y-6">
// //             <div className="bg-white rounded-[32px] p-6 border border-gray-50 shadow-sm space-y-6">
// //               {/* DAFTAR PESANAN */}
// //               <div>
// //                 <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
// //                   Daftar Pesanan ({cartItems.length} Produk)
// //                 </h3>

// //                 <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
// //                   {cartItems.map((item) => {
// //                     const imgCover = item.gambar_produk
// //                       ? item.gambar_produk.split(",")[0]
// //                       : "default.jpg";
// //                     return (
// //                       <div
// //                         key={item.id_produk}
// //                         className="flex gap-4 items-center bg-[#FAFBF9]/50 p-3 rounded-2xl border border-gray-100"
// //                       >
// //                         <img
// //                           src={`http://localhost:5000/uploads/${imgCover}`}
// //                           className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-200/40"
// //                           alt={item.nama_produk}
// //                         />
// //                         <div className="flex-1 min-w-0">
// //                           <h4 className="text-xs font-black text-[#1A2416] uppercase truncate tracking-tight">
// //                             {item.nama_produk}
// //                           </h4>
// //                           <p className="text-[10px] text-[#3D5532] font-black uppercase mt-0.5">
// //                             Rp {item.harga_asli?.toLocaleString("id-ID")}
// //                           </p>
// //                         </div>
// //                         <span className="text-xs font-black text-gray-400 bg-white border border-gray-100 px-2 py-1 rounded-md">
// //                           x{item.quantity}
// //                         </span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* ========================================================================= */}
// //               {/* PERBAIKAN SEKTOR OPSI PEMBELIAN BARU (EQUAL MOCKUP IMAGE_05B1AF) */}
// //               {/* ========================================================================= */}
// //               <div className="border-t border-gray-50 pt-5">
// //                 <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
// //                   Opsi Pembelian
// //                 </h3>

// //                 <div className="grid grid-cols-2 gap-3">
// //                   {/* Tab 1: Gunakan Saldo */}
// //                   <button
// //                     type="button"
// //                     onClick={() => setPurchaseMethod("saldo")}
// //                     className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
// //                       purchaseMethod === "saldo"
// //                         ? "bg-[#F8FAF8] border-[#3D5532] text-[#3D5532] ring-1 ring-[#3D5532]"
// //                         : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
// //                     }`}
// //                   >
// //                     <span className="text-xs font-bold block">
// //                       Gunakan Saldo
// //                     </span>
// //                     <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-tight">
// //                       Sisa: Rp {userWallet.toLocaleString("id-ID")}
// //                     </span>
// //                   </button>

// //                   {/* Tab 2: Harga Penuh (Ganti Virtual Account Lama) */}
// //                   <button
// //                     type="button"
// //                     onClick={() => setPurchaseMethod("penuh")}
// //                     className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
// //                       purchaseMethod === "penuh"
// //                         ? "bg-[#F8FAF8] border-[#3D5532] text-[#3D5532] ring-1 ring-[#3D5532]"
// //                         : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
// //                     }`}
// //                   >
// //                     <span className="text-xs font-bold block">Harga Penuh</span>
// //                     <span className="text-[9px] font-bold text-[#3D5532] block uppercase tracking-tight">
// //                       Simpan Saldo
// //                     </span>
// //                   </button>
// //                 </div>
// //               </div>
// //               {/* ========================================================================= */}

// //               {/* RINCIAN PERHITUNGAN STRUKTUR NOMINAL FINANSIAL */}
// //               <div className="space-y-2.5 text-xs pt-5 border-t border-gray-100">
// //                 <div className="flex justify-between text-gray-400 font-bold">
// //                   <span>Subtotal Produk</span>
// //                   <span className="text-gray-700">
// //                     Rp {subtotal.toLocaleString("id-ID")}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between text-gray-400 font-bold">
// //                   <span>Biaya Pengiriman</span>
// //                   <span className="text-gray-700">
// //                     Rp {biayaPengiriman.toLocaleString("id-ID")}
// //                   </span>
// //                 </div>

// //                 {purchaseMethod === "saldo" && (
// //                   <div className="flex justify-between text-gray-400 font-bold">
// //                     <span>Saldo Terpakai</span>
// //                     <span className="text-red-500">
// //                       -Rp {saldoTerpakai.toLocaleString("id-ID")}
// //                     </span>
// //                   </div>
// //                 )}

// //                 <div className="h-[1px] bg-gray-100 my-2"></div>

// //                 <div className="flex justify-between items-center">
// //                   <span className="text-xs font-black uppercase tracking-wider text-gray-800">
// //                     TOTAL PEMBAYARAN
// //                   </span>
// //                   <span className="text-2xl font-serif font-black text-[#3D5532]">
// //                     Rp {totalPembayaran.toLocaleString("id-ID")}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* SUBMIT BUTTON ACCORDING TO USER PURCHASE METHOD */}
// //               <button
// //                 type="submit"
// //                 className="w-full bg-[#3D5532] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-[#2d4025] transition-all text-center block active:scale-[0.98]"
// //               >
// //                 {purchaseMethod === "saldo" && totalPembayaran === 0
// //                   ? "Konfirmasi & Potong Saldo"
// //                   : "Konfirmasi & Bayar Pesanan"}
// //               </button>

// //               <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wide">
// //                 🔒 Pembayaran Instan Aman Terverifikasi SkinCycle
// //               </p>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingMethod, setShippingMethod] = useState("kurir"); // 'kurir' atau 'toko'

//   // State manajemen opsi pembelian berdasarkan seleksi tab user
//   const [purchaseMethod, setPurchaseMethod] = useState("saldo"); // 'saldo' atau 'penuh'

//   // Sinkronisasi saldo dompet dinamis dari Wallet Overview halaman riwayat (Rp 30.000)
//   const [userWallet, setUserWallet] = useState(30000);

//   const [formData, setFormData] = useState({
//     nama: "Muhammad Rayhan",
//     telepon: "+62 812-9876-5432",
//     kota: "Kabupaten Bekasi, Cikarang Utara",
//     alamat: "Jl. Kasuari Raya No. 12, Perumahan Cikarang Baru",
//     catatan: ""
//   });

//   // Ambil data produk terpilih dari local storage keranjang
//   useEffect(() => {
//     const checkoutData = JSON.parse(localStorage.getItem("checkout_items"));
//     if (checkoutData && checkoutData.length > 0) {
//       setCartItems(checkoutData);
//     } else {
//       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartItems(savedCart);
//     }
//   }, []);

//   // Logika kalkulasi nominal finansial
//   const subtotal = cartItems.reduce((acc, item) => acc + (item.harga_asli * item.quantity), 0);
//   const biayaPengiriman = shippingMethod === "kurir" ? 15000 : 0;

//   // Pemotongan nilai saldo jika opsi 'Gunakan Saldo' aktif
//   const saldoTerpakai = purchaseMethod === "saldo" ? Math.min(subtotal + biayaPengiriman, userWallet) : 0;
//   const totalPembayaran = Math.max(0, subtotal + biayaPengiriman - saldoTerpakai);

//   const handleProcessCheckout = (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//       alert("Daftar pesanan anda kosong.");
//       return;
//     }

//     alert(`Pemesanan berhasil! Metode pembayaran: ${purchaseMethod === "saldo" ? "Potongan Saldo" : "Harga Penuh"}. Total bayar: Rp ${totalPembayaran.toLocaleString("id-ID")}`);

//     // Sinkronisasi pembersihan sisa item pada keranjang utama
//     const mainCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const checkoutIds = cartItems.map(item => item.id_produk);
//     const remainingCart = mainCart.filter(item => !checkoutIds.includes(item.id_produk));

//     localStorage.setItem("cart", JSON.stringify(remainingCart));
//     localStorage.removeItem("checkout_items");

//     navigate("/riwayat");
//   };

//   return (
//     <div className="bg-[#F2EDE4] min-h-screen font-['DM_Sans'] text-[#1A2416] py-12 px-4 md:px-10 lg:px-20">
//       <div className="max-w-6xl mx-auto">

//         {/* BUTTON BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-[#3D5532] hover:text-[#2d4025] font-bold text-sm flex items-center gap-2 mb-8 transition-colors group"
//         >
//           <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali
//         </button>

//         {/* JUDUL HALAMAN */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold tracking-tight text-[#1A2416]">
//             Formulir Checkout
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Selesaikan pemesanan produk SkinCycle pilihan anda dengan aman.
//           </p>
//         </div>

//         <form onSubmit={handleProcessCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

//           {/* SISI KIRI: DATA PENGIRIMAN & FORM */}
//           <div className="lg:col-span-7 space-y-8">

//             {/* ========================================================================= */}
//             {/* METODE PENERIMAAN BARANG DENGAN WARNA BACKGROUND AKTIF HIJAU TUA UTUH */}
//             {/* ========================================================================= */}
//             <div className="bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white/80 shadow-sm">
//               <h3 className="text-xs font-bold text-gray-400 mb-4">
//                 Metode Penerimaan
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setShippingMethod("kurir")}
//                   className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${
//                     shippingMethod === "kurir"
//                       ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md font-bold"
//                       : "bg-white border-gray-200 text-gray-400 hover:bg-[#9BB786]/10 hover:border-[#9BB786] hover:text-[#3D5532]"
//                   }`}
//                 >
//                   🚚 Pengiriman Kurir
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShippingMethod("toko")}
//                   className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${
//                     shippingMethod === "toko"
//                       ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md font-bold"
//                       : "bg-white border-gray-200 text-gray-400 hover:bg-[#9BB786]/10 hover:border-[#9BB786] hover:text-[#3D5532]"
//                   }`}
//                 >
//                   🏪 Ambil Sendiri di Toko
//                 </button>
//               </div>
//             </div>

//             {/* INFORMASI PENGIRIMAN */}
//             <div className="bg-white/80 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-sm space-y-5">
//               <h3 className="text-base font-bold text-[#3D5532] mb-2">
//                 Informasi Pengiriman
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 block mb-1">Nama lengkap</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.nama}
//                     onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
//                     className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532]"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs font-bold text-gray-400 block mb-1">Nomor telepon</label>
//                     <input
//                       type="tel"
//                       required
//                       value={formData.telepon}
//                       onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
//                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532]"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs font-bold text-gray-400 block mb-1">Kota & kecamatan</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.kota}
//                       onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
//                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532]"
//                     />
//                   </div>
//                 </div>

//                 {shippingMethod === "kurir" && (
//                   <div>
//                     <label className="text-xs font-bold text-gray-400 block mb-1">Alamat lengkap rumah</label>
//                     <textarea
//                       required
//                       rows="3"
//                       value={formData.alamat}
//                       onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
//                       className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532] resize-none leading-relaxed"
//                     />
//                   </div>
//                 )}

//                 <div>
//                   <label className="text-xs font-bold text-gray-400 block mb-1">Catatan tambahan (opsional)</label>
//                   <input
//                     type="text"
//                     value={formData.catatan}
//                     onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
//                     placeholder="Contoh: Titipkan di pos satpam"
//                     className="w-full p-3.5 bg-[#F2EDE4]/30 border border-gray-200/60 rounded-xl text-xs font-medium text-gray-700 outline-none focus:border-[#3D5532]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* ECO BADGE */}
//             <div className="bg-[#E9F2E9] border border-[#D5ECD5] rounded-2xl p-5 flex gap-4 items-start">
//               <span className="text-2xl mt-0.5">🌱</span>
//               <div>
//                 <h4 className="text-xs font-bold text-emerald-900">Kemasan ramah lingkungan terproteksi</h4>
//                 <p className="text-[11px] text-emerald-800/80 font-medium mt-1 leading-relaxed">
//                   Pesanan anda akan dibungkus menggunakan serat bambu alami dan kardus daur ulang tanpa plastik mikro.
//                 </p>
//               </div>
//             </div>

//           </div>

//           {/* SISI KANAN: RINGKASAN BELANJA & OPSI PEMBELIAN */}
//           <div className="lg:col-span-5 space-y-6">

//             <div className="bg-white rounded-[32px] p-6 border border-gray-50 shadow-sm space-y-6">

//               {/* DAFTAR PESANAN */}
//               <div>
//                 <h3 className="text-xs font-bold text-gray-400 mb-4">
//                   Daftar Pesanan ({cartItems.length} Produk)
//                 </h3>

//                 <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
//                   {cartItems.map((item) => {
//                     const imgCover = item.gambar_produk ? item.gambar_produk.split(",")[0] : "default.jpg";
//                     return (
//                       <div key={item.id_produk} className="flex gap-4 items-center bg-[#FAFBF9]/50 p-3 rounded-2xl border border-gray-100">
//                         <img
//                           src={`http://localhost:5000/uploads/${imgCover}`}
//                           className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-200/40"
//                           alt={item.nama_produk}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-xs font-bold text-[#1A2416] truncate">
//                             {item.nama_produk}
//                           </h4>
//                           <p className="text-[11px] text-[#3D5532] font-bold mt-0.5">
//                             Rp {item.harga_asli?.toLocaleString("id-ID")}
//                           </p>
//                         </div>
//                         <span className="text-xs font-bold text-gray-400 bg-white border border-gray-100 px-2.5 py-1 rounded-md">
//                           x{item.quantity}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* ========================================================================= */}
//               {/* PERBAIKAN TOTAL SEKTOR CARD OPSI PEMBELIAN: SELEKSI BACKGROUND WARNA SOLID */}
//               {/* ========================================================================= */}
//               <div className="border-t border-gray-50 pt-5">
//                 <h3 className="text-xs font-bold text-gray-400 mb-4">
//                   Opsi Pembelian
//                 </h3>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Card 1: Gunakan Saldo */}
//                   <div
//                     onClick={() => setPurchaseMethod("saldo")}
//                     className={`p-4 rounded-2xl border text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[82px] outline-none ${
//                       purchaseMethod === "saldo"
//                         ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
//                         : "bg-white border-gray-200 text-gray-400 hover:bg-[#9BB786]/10 hover:border-[#9BB786] hover:text-[#3D5532]"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold">Gunakan Saldo</span>
//                     <span className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "saldo" ? "text-gray-200 font-medium" : "text-gray-400"}`}>
//                       Sisa: Rp {userWallet.toLocaleString("id-ID")}
//                     </span>
//                   </div>

//                   {/* Card 2: Harga Penuh */}
//                   <div
//                     onClick={() => setPurchaseMethod("penuh")}
//                     className={`p-4 rounded-2xl border text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[82px] outline-none ${
//                       purchaseMethod === "penuh"
//                         ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
//                         : "bg-white border-gray-200 text-gray-400 hover:bg-[#9BB786]/10 hover:border-[#9BB786] hover:text-[#3D5532]"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold">Harga Penuh</span>
//                     <span className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "penuh" ? "text-gray-200 font-medium" : "text-gray-400"}`}>
//                       Simpan Saldo
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/* ========================================================================= */}

//               {/* RINCIAN STRUKTUR NOMINAL FINANSIAL */}
//               <div className="space-y-2.5 text-xs pt-5 border-t border-gray-100">
//                 <div className="flex justify-between text-gray-400 font-medium">
//                   <span>Subtotal produk</span>
//                   <span className="text-gray-700">Rp {subtotal.toLocaleString("id-ID")}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-400 font-medium">
//                   <span>Biaya pengiriman</span>
//                   <span className="text-gray-700">Rp {biayaPengiriman.toLocaleString("id-ID")}</span>
//                 </div>

//                 {purchaseMethod === "saldo" && (
//                   <div className="flex justify-between text-gray-400 font-medium">
//                     <span>Saldo terpakai</span>
//                     <span className="text-red-500">-Rp {saldoTerpakai.toLocaleString("id-ID")}</span>
//                   </div>
//                 )}

//                 <div className="h-[1px] bg-gray-100 my-2"></div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-bold text-gray-800 tracking-wide">Total Pembayaran</span>
//                   <span className="text-2xl font-bold text-[#3D5532]">
//                     Rp {totalPembayaran.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </div>

//               {/* SUBMIT ACTION BUTTON */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#3D5532] text-white py-4 rounded-xl text-xs font-bold tracking-widest shadow-md hover:bg-[#2d4025] transition-all text-center block active:scale-[0.98]"
//               >
//                 {purchaseMethod === "saldo" && totalPembayaran === 0
//                   ? "Konfirmasi & Potong Saldo"
//                   : "Konfirmasi & Bayar Pesanan"}
//               </button>

//               <p className="text-center text-[10px] text-gray-400 font-medium">
//                 🔒 Pembayaran instan aman terverifikasi SkinCycle
//               </p>
//             </div>

//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  Store,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  Landmark,
  CreditCard,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("kurir"); // 'kurir' atau 'toko'

  // State manajemen opsi pembelian berdasarkan seleksi tab user
  const [purchaseMethod, setPurchaseMethod] = useState("saldo"); // 'saldo' atau 'penuh'

  // Sinkronisasi saldo dompet dinamis dari Wallet Overview halaman riwayat (Rp 30.000)
  const [userWallet, setUserWallet] = useState(30000);

  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    kota: "",
    alamat: "",
    catatan: "",
  });

  // Ambil data produk terpilih dari local storage keranjang
  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem("checkout_items"));
    if (checkoutData && checkoutData.length > 0) {
      setCartItems(checkoutData);
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(savedCart);
    }
  }, []);

  // Logika kalkulasi nominal finansial
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.harga_asli * item.quantity,
    0,
  );
  const biayaPengiriman = shippingMethod === "kurir" ? 15000 : 0;

  // Pemotongan nilai saldo jika opsi 'Gunakan Saldo' aktif
  const saldoTerpakai =
    purchaseMethod === "saldo"
      ? Math.min(subtotal + biayaPengiriman, userWallet)
      : 0;
  const totalPembayaran = Math.max(
    0,
    subtotal + biayaPengiriman - saldoTerpakai,
  );

  const handleProcessCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Daftar pesanan anda kosong.");
      return;
    }

    alert(
      `Pemesanan berhasil! Metode pembayaran: ${purchaseMethod === "saldo" ? "Potongan Saldo" : "Harga Penuh"}. Total bayar: Rp ${totalPembayaran.toLocaleString("id-ID")}`,
    );

    // Sinkronisasi pembersihan sisa item pada keranjang utama
    const mainCart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutIds = cartItems.map((item) => item.id_produk);
    const remainingCart = mainCart.filter(
      (item) => !checkoutIds.includes(item.id_produk),
    );

    localStorage.setItem("cart", JSON.stringify(remainingCart));
    localStorage.removeItem("checkout_items");

    navigate("/riwayat");
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen text-brand-dark-500 py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* BUTTON BACK */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-brand-primary-300 hover:text-brand-primary-500 font-bold text-sm flex items-center gap-2 mb-8 transition-colors group outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
          Kembali
        </button>

        {/* JUDUL HALAMAN */}
        <div className="mb-10">
          <h1 className="text-3xl font-sans text-brand-dark-500 tracking-tight">
            Formulir Checkout
          </h1>
          <p className="text-neutral-500 text-sm mt-1 font-medium">
            Selesaikan pemesanan produk SkinCycle pilihan anda dengan aman.
          </p>
        </div>

        <form
          onSubmit={handleProcessCheckout}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          {/* SISI KIRI: DATA PENGIRIMAN & FORM */}
          <div className="lg:col-span-7 space-y-8">
            {/* METODE PENERIMAAN BARANG DENGAN WARNA BACKGROUND AKTIF HIJAU TUA UTUH */}
            <div className="bg-neutral-default p-6 rounded-[32px] border border-neutral-100 shadow-sm">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
                Metode Penerimaan
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShippingMethod("kurir")}
                  className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${
                    shippingMethod === "kurir"
                      ? "bg-brand-primary-300 border-brand-primary-300 text-neutral-default shadow-md"
                      : "bg-neutral-default border-neutral-100 text-neutral-400 hover:border-brand-primary-100 hover:text-brand-primary-300"
                  }`}
                >
                  <Truck className="w-4 h-4" /> Pengiriman Kurir
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod("toko")}
                  className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${
                    shippingMethod === "toko"
                      ? "bg-brand-primary-300 border-brand-primary-300 text-neutral-default shadow-md"
                      : "bg-neutral-default border-neutral-100 text-neutral-400 hover:border-brand-primary-100 hover:text-brand-primary-300"
                  }`}
                >
                  <Store className="w-4 h-4" /> Ambil di Toko
                </button>
              </div>
            </div>

            {/* INFORMASI PENGIRIMAN */}
            <div className="bg-neutral-default p-8 rounded-[32px] border border-neutral-100 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-brand-dark-500 mb-2 font-sans">
                Informasi Pengiriman
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                    Nama lengkap
                  </h4>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                    className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                      Nomor telepon
                    </h4>
                    <input
                      type="tel"
                      required
                      value={formData.telepon}
                      onChange={(e) =>
                        setFormData({ ...formData, telepon: e.target.value })
                      }
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                      Kota & kecamatan
                    </h4>
                    <input
                      type="text"
                      required
                      value={formData.kota}
                      onChange={(e) =>
                        setFormData({ ...formData, kota: e.target.value })
                      }
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300"
                    />
                  </div>
                </div>

                {shippingMethod === "kurir" && (
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                      Alamat lengkap rumah
                    </h4>
                    <textarea
                      required
                      rows="3"
                      value={formData.alamat}
                      onChange={(e) =>
                        setFormData({ ...formData, alamat: e.target.value })
                      }
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 resize-none leading-relaxed"
                    />
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                    Catatan tambahan (opsional)
                  </h4>
                  <input
                    type="text"
                    value={formData.catatan}
                    onChange={(e) =>
                      setFormData({ ...formData, catatan: e.target.value })
                    }
                    placeholder="Contoh: Titipkan di pos satpam"
                    className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300"
                  />
                </div>
              </div>
            </div>

            {/* ECO BADGE */}
            <div className="bg-brand-primary-100/10 border border-brand-primary-100/20 rounded-2xl p-5 flex gap-4 items-start">
              <Leaf className="w-5 h-5 text-brand-primary-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-primary-500 uppercase tracking-wide">
                  Kemasan ramah lingkungan terproteksi
                </h4>
                <p className="text-[11px] text-neutral-500 font-medium mt-1 leading-relaxed">
                  Pesanan anda akan dibungkus menggunakan serat bambu alami dan
                  kardus daur ulang tanpa plastik mikro.
                </p>
              </div>
            </div>
          </div>

          {/* SISI KANAN: RINGKASAN BELANJA & OPSI PEMBELIAN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-default rounded-[32px] p-6 border border-neutral-100 shadow-sm space-y-6">
              {/* DAFTAR PESANAN */}
              <div>
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> Daftar Pesanan (
                  {cartItems.length} Produk)
                </h3>

                <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const imgCover = item.gambar_produk
                      ? item.gambar_produk.split(",")[0]
                      : "default.jpg";
                    return (
                      <div
                        key={item.id_produk}
                        className="flex gap-4 items-center bg-neutral-50 p-3 rounded-2xl border border-neutral-100/50"
                      >
                        <img
                          src={`http://localhost:5000/uploads/${imgCover}`}
                          className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
                          alt={item.nama_produk}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-brand-dark-500 truncate uppercase">
                            {item.nama_produk}
                          </h4>
                          <p className="text-[11px] text-brand-primary-300 font-bold mt-0.5">
                            Rp {item.harga_asli?.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-neutral-400 bg-neutral-default border border-neutral-100 px-2.5 py-1 rounded-md">
                          x{item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OPSI PEMBELIAN BALANCED OPTION */}
              <div className="border-t border-neutral-50 pt-5">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
                  Opsi Pembelian
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Card 1: Gunakan Saldo */}
                  <div
                    onClick={() => setPurchaseMethod("saldo")}
                    className={`p-4 rounded-2xl border text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[82px] outline-none ${
                      purchaseMethod === "saldo"
                        ? "bg-brand-primary-300 border-brand-primary-300 text-neutral-default font-bold shadow-md"
                        : "bg-neutral-default border-neutral-100 text-neutral-400 hover:border-brand-primary-100 hover:text-brand-primary-300"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Wallet className="w-3.5 h-3.5" /> Pakai Saldo
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "saldo" ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
                    >
                      Sisa: Rp {userWallet.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Card 2: Harga Penuh */}
                  <div
                    onClick={() => setPurchaseMethod("penuh")}
                    className={`p-4 rounded-2xl border text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[82px] outline-none ${
                      purchaseMethod === "penuh"
                        ? "bg-brand-primary-300 border-brand-primary-300 text-neutral-default font-bold shadow-md"
                        : "bg-neutral-default border-neutral-100 text-neutral-400 hover:border-brand-primary-100 hover:text-brand-primary-300"
                    }`}
                  >
                    <span className="text-sm font-semibold">Harga Penuh</span>
                    <span
                      className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "penuh" ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
                    >
                      Simpan Saldo
                    </span>
                  </div>
                </div>
              </div>

              {/* RINCIAN STRUKTUR NOMINAL FINANSIAL */}
              <div className="space-y-2.5 text-xs pt-5 border-t border-neutral-50">
                <div className="flex justify-between text-neutral-400 font-bold">
                  <span>Subtotal produk</span>
                  <span className="text-brand-dark-500 font-sans">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400 font-bold">
                  <span>Biaya pengiriman</span>
                  <span className="text-brand-dark-500 font-sans">
                    Rp {biayaPengiriman.toLocaleString("id-ID")}
                  </span>
                </div>

                {purchaseMethod === "saldo" && (
                  <div className="flex justify-between text-neutral-400 font-bold">
                    <span>Saldo terpakai</span>
                    <span className="text-feedback-error-200 font-sans">
                      -Rp {saldoTerpakai.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                <div className="h-[1px] bg-neutral-50 my-2"></div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-dark-500">
                    Total Pembayaran
                  </span>
                  <span className="text-2xl font-sans font-black text-brand-primary-300">
                    Rp {totalPembayaran.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* SUBMIT ACTION BUTTON */}
              <button
                type="submit"
                className="w-full bg-brand-primary-300 text-neutral-default py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 transition-colors text-center block outline-none active:scale-98"
              >
                {purchaseMethod === "saldo" && totalPembayaran === 0
                  ? "Konfirmasi & Potong Saldo"
                  : "Konfirmasi & Bayar Pesanan"}
              </button>

              <p className="text-center text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                Pembayaran Terproteksi Secure Gateway
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
