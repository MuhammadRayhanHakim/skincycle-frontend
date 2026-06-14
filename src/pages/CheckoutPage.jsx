// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { ArrowLeft, Truck, Store, ShoppingBag, Wallet } from "lucide-react";

// const CheckoutPage = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingMethod, setShippingMethod] = useState("kurir");
//   const [purchaseMethod, setPurchaseMethod] = useState("saldo");

//   // Membaca saldo riil secara dinamis dari database logged-in user
//   const userWallet =
//     user?.total_saldo !== undefined ? parseInt(user.total_saldo) : 0;

//   // 🚀 FIX OTOMATIS: Jika saat halaman dimuat saldo user ternyata 0, otomatis paksa alihkan opsi ke "Harga Penuh"
//   useEffect(() => {
//     if (userWallet <= 0) {
//       setPurchaseMethod("penuh");
//     }
//   }, [userWallet]);

//   // State Formulir Pengiriman
//   const [formData, setFormData] = useState({
//     nama: "",
//     telepon: "",
//     kota: "",
//     alamat: "",
//     catatan: "",
//   });

//   useEffect(() => {
//     const checkoutData = JSON.parse(localStorage.getItem("checkout_items"));
//     if (checkoutData && checkoutData.length > 0) {
//       setCartItems(checkoutData);
//     } else {
//       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartItems(savedCart);
//     }
//   }, []);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.harga_asli * item.quantity,
//     0,
//   );
//   const biayaPengiriman = shippingMethod === "kurir" ? 15000 : 0;
//   const totalBiayaFisik = subtotal + biayaPengiriman;

//   // Proteksi agar saldo terpakai tidak melebihi total tagihan belanja
//   const saldoTerpakai =
//     purchaseMethod === "saldo" ? Math.min(totalBiayaFisik, userWallet) : 0;
//   const totalPembayaran = Math.max(0, totalBiayaFisik - saldoTerpakai);

//   // LOGIKA HANDLER PEMBAYARAN KETIKA DI-SUBMIT DENGAN SWEETALERT2 INTEGRATED
//   const handleProcessCheckout = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//       Swal.fire({
//         title: "Keranjang Kosong",
//         text: "Daftar pesanan Anda masih kosong.",
//         icon: "warning",
//         confirmButtonColor: "#3D5532",
//       });
//       return;
//     }

//     // 🚀 FIX PROTEKSI MUTLAK: Tolak checkout jika memilih "saldo" padahal saldo dompet kosong / Rp 0
//     if (purchaseMethod === "saldo" && userWallet <= 0) {
//       Swal.fire({
//         title: "Transaksi Ditolak",
//         text: "Gagal memproses! Saldo dompet Anda Rp 0. Silakan klik opsi pembelian 'Harga Penuh'.",
//         icon: "error",
//         confirmButtonColor: "#3D5532",
//       });
//       setPurchaseMethod("penuh");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const listNamaProduk = cartItems.map((item) => item.nama_produk).join(", ");
//     const baseUrl = "http://localhost:5000";

//     try {
//       const response = await fetch(`${baseUrl}/api/checkout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           total_bayar: purchaseMethod === "saldo" ? saldoTerpakai : 0,
//           item_deskripsi: listNamaProduk,
//           nomor_telepon: formData.telepon,
//           alamat_rumah:
//             shippingMethod === "kurir"
//               ? formData.alamat
//               : `Ambil di Toko (${formData.kota})`,
//           jenis_pembelian: purchaseMethod,
//           total_pembayaran_gateway: totalPembayaran,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || result.status === "error") {
//         Swal.fire({
//           title: "Gagal Memproses",
//           text: result.message || "Terjadi kesalahan saat membuat order.",
//           icon: "error",
//           confirmButtonColor: "#3D5532",
//         });
//         return;
//       }

//       // 🛑 KONDISI A: Jika terbayar lunas menggunakan saldo internal (Rp 0)
//       if (result.payment_type === "saldo_internal") {
//         const updatedUser = {
//           ...user,
//           total_saldo: result.data.total_saldo_sekarang,
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         if (setUser) setUser(updatedUser);

//         Swal.fire({
//           title: "Pemesanan Berhasil!",
//           text: "🎉 Selesai! Pembayaran lunas dipotong dari saldo sirkular internal Anda.",
//           icon: "success",
//           confirmButtonColor: "#3D5532",
//           customClass: { popup: "rounded-[30px]" },
//         }).then(() => {
//           bersihkanLocalStorageCheckout();
//           navigate("/riwayat");
//         });
//         return;
//       }

//       // 💳 KONDISI B: Jika ada sisa tagihan tunai, panggil Snap Midtrans Pop-up!
//       if (result.payment_type === "midtrans" && result.snapToken) {
//         window.snap.pay(result.snapToken, {
//           onSuccess: function (snapResult) {
//             Swal.fire({
//               title: "Pembayaran Sukses!",
//               text: "🍃 Luar biasa! Transaksi Anda telah lunas terverifikasi. Silakan cek berkala status pelacakan kurir.",
//               icon: "success",
//               confirmButtonColor: "#3D5532",
//               customClass: { popup: "rounded-[30px]" },
//             }).then(() => {
//               bersihkanLocalStorageCheckout();
//               navigate("/riwayat");
//             });
//           },
//           onPending: function (snapResult) {
//             Swal.fire({
//               title: "Menunggu Pembayaran",
//               text: "📑 Pesanan dicatat! Segera selesaikan transfer dana Anda sesuai instruksi Virtual Account.",
//               icon: "info",
//               confirmButtonColor: "#3D5532",
//               customClass: { popup: "rounded-[30px]" },
//             }).then(() => {
//               bersihkanLocalStorageCheckout();
//               navigate("/riwayat");
//             });
//           },
//           onError: function (snapResult) {
//             Swal.fire({
//               title: "Transaksi Gagal",
//               text: "Waduh, pembayaran gagal diproses oleh bank gateway. Silakan coba kembali.",
//               icon: "error",
//               confirmButtonColor: "#3D5532",
//             });
//           },
//           onClose: function () {
//             Swal.fire({
//               title: "Halaman Ditutup",
//               text: "Anda menutup halaman checkout. Transaksi disimpan sementara sebagai status pending.",
//               icon: "warning",
//               confirmButtonColor: "#3D5532",
//               customClass: { popup: "rounded-[30px]" },
//             }).then(() => {
//               bersihkanLocalStorageCheckout();
//               navigate("/riwayat");
//             });
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Gagal eksekusi pembayaran:", error);
//       Swal.fire({
//         title: "Kesalahan Sistem",
//         text: "Terjadi gangguan sambungan pada server checkout Node.js Anda.",
//         icon: "error",
//         confirmButtonColor: "#3D5532",
//       });
//     }
//   };

//   // Fungsi pembantu tambahan untuk merapikan local storage
//   const bersihkanLocalStorageCheckout = () => {
//     const mainCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const checkoutIds = cartItems.map((item) => item.id_produk);
//     const remainingCart = mainCart.filter(
//       (item) => !checkoutIds.includes(item.id_produk),
//     );
//     localStorage.setItem("cart", JSON.stringify(remainingCart));
//     localStorage.removeItem("checkout_items");
//   };

//   return (
//     <div className="bg-brand-secondary-100 font-sans min-h-screen text-brand-dark-500 py-12 px-4 md:px-10 lg:px-20">
//       <div className="max-w-6xl mx-auto">
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="text-brand-primary-300 hover:text-brand-primary-500 font-bold text-sm flex items-center gap-2 mb-8 transition-colors group outline-none"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
//           Kembali
//         </button>

//         <div className="mb-10">
//           <h1 className="text-3xl font-sans text-brand-dark-500 tracking-tight">
//             Formulir Checkout
//           </h1>
//           <p className="text-neutral-500 text-sm mt-1 font-medium">
//             Selesaikan pemesanan produk SkinCycle pilihan anda dengan aman.
//           </p>
//         </div>

//         <form
//           onSubmit={handleProcessCheckout}
//           className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
//         >
//           <div className="lg:col-span-7 space-y-8">
//             <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
//               <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
//                 Metode Penerimaan
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setShippingMethod("kurir")}
//                   className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${shippingMethod === "kurir" ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md" : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"}`}
//                 >
//                   <Truck className="w-4 h-4" /> Pengiriman Kurir
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShippingMethod("toko")}
//                   className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${shippingMethod === "toko" ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md" : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"}`}
//                 >
//                   <Store className="w-4 h-4" /> Ambil di Toko
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm space-y-5">
//               <h3 className="text-base font-bold text-brand-dark-500 mb-2 font-sans">
//                 Informasi Pengiriman
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-xs font-bold text-neutral-400 block mb-1">
//                     Nama lengkap
//                   </h4>
//                   <input
//                     type="text"
//                     required
//                     value={formData.nama}
//                     onChange={(e) =>
//                       setFormData({ ...formData, nama: e.target.value })
//                     }
//                     className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="text-xs font-bold text-neutral-400 block mb-1">
//                       Nomor telepon
//                     </h4>
//                     <input
//                       type="tel"
//                       required
//                       value={formData.telepon}
//                       onChange={(e) =>
//                         setFormData({ ...formData, telepon: e.target.value })
//                       }
//                       className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-bold text-neutral-400 block mb-1">
//                       Kota &amp; kecamatan
//                     </h4>
//                     <input
//                       type="text"
//                       required
//                       value={formData.kota}
//                       onChange={(e) =>
//                         setFormData({ ...formData, kota: e.target.value })
//                       }
//                       className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
//                     />
//                   </div>
//                 </div>
//                 {shippingMethod === "kurir" && (
//                   <div>
//                     <h4 className="text-xs font-bold text-neutral-400 block mb-1">
//                       Alamat lengkap rumah
//                     </h4>
//                     <textarea
//                       required
//                       rows="3"
//                       value={formData.alamat}
//                       onChange={(e) =>
//                         setFormData({ ...formData, alamat: e.target.value })
//                       }
//                       className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 resize-none leading-relaxed shadow-inner"
//                     />
//                   </div>
//                 )}
//                 <div>
//                   <h4 className="text-xs font-bold text-neutral-400 block mb-1">
//                     Catatan tambahan (opsional)
//                   </h4>
//                   <input
//                     type="text"
//                     value={formData.catatan}
//                     onChange={(e) =>
//                       setFormData({ ...formData, catatan: e.target.value })
//                     }
//                     placeholder="Contoh: Titipkan di pos satpam"
//                     className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-white rounded-[32px] p-6 border border-neutral-100 shadow-sm space-y-6">
//               <div>
//                 <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-1">
//                   <ShoppingBag className="w-3.5 h-3.5" /> Daftar Pesanan (
//                   {cartItems.length} Produk)
//                 </h3>
//                 <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
//                   {cartItems.map((item) => {
//                     const imgCover = item.gambar_produk
//                       ? item.gambar_produk.split(",")[0]
//                       : "default.jpg";
//                     return (
//                       <div
//                         key={item.id_produk}
//                         className="flex gap-4 items-center bg-neutral-50 p-3 rounded-2xl border border-neutral-100/50"
//                       >
//                         <img
//                           src={`http://localhost:5000/uploads/${imgCover}`}
//                           className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200"
//                           alt={item.nama_produk}
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-xs font-bold text-brand-dark-500 truncate uppercase">
//                             {item.nama_produk}
//                           </h4>
//                           <p className="text-brand-primary-300 font-bold mt-0.5">
//                             Rp {item.harga_asli?.toLocaleString("id-ID")}
//                           </p>
//                         </div>
//                         <span className="text-xs font-bold text-neutral-400 bg-white border border-neutral-100 px-2.5 py-1 rounded-md">
//                           x{item.quantity}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="border-t border-neutral-50 pt-5">
//                 <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
//                   Opsi Pembelian
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* 🚀 REFACTOR UTAMA: Teks diganti membaca variabel riil {userWallet} secara mutlak */}
//                   <button
//                     type="button"
//                     disabled={userWallet <= 0}
//                     onClick={() => setPurchaseMethod("saldo")}
//                     className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[82px] w-full outline-none transition-all duration-300 ${
//                       userWallet <= 0
//                         ? "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50"
//                         : purchaseMethod === "saldo"
//                           ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
//                           : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold flex items-center gap-1">
//                       <Wallet className="w-3.5 h-3.5" /> Pakai Saldo
//                     </span>
//                     <span
//                       className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "saldo" && userWallet > 0 ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
//                     >
//                       Sisa: Rp {userWallet.toLocaleString("id-ID")}
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setPurchaseMethod("penuh")}
//                     className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[82px] w-full outline-none transition-all duration-300 ${
//                       purchaseMethod === "penuh"
//                         ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
//                         : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold">Harga Penuh</span>
//                     <span
//                       className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "penuh" ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
//                     >
//                       Simpan Saldo
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-2.5 text-xs pt-5 border-t border-neutral-50">
//                 <div className="flex justify-between text-neutral-400 font-bold">
//                   <span>Subtotal produk</span>
//                   <span className="text-brand-dark-500 font-sans">
//                     Rp {subtotal.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-neutral-400 font-bold">
//                   <span>Biaya pengiriman</span>
//                   <span className="text-brand-dark-500 font-sans">
//                     Rp {biayaPengiriman.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//                 {purchaseMethod === "saldo" && userWallet > 0 && (
//                   <div className="flex justify-between text-neutral-400 font-bold">
//                     <span>Saldo terpakai</span>
//                     <span className="text-feedback-error-200 font-sans">
//                       -Rp {saldoTerpakai.toLocaleString("id-ID")}
//                     </span>
//                   </div>
//                 )}
//                 <div className="h-[1px] bg-neutral-50 my-2"></div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-black uppercase tracking-wider text-brand-dark-500">
//                     Total Pembayaran
//                   </span>
//                   <span className="text-2xl font-sans font-black text-brand-primary-300">
//                     Rp {totalPembayaran.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#3D5532] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-[#2c3e24] transition-all text-center block outline-none"
//               >
//                 {purchaseMethod === "saldo" && totalPembayaran === 0
//                   ? "Konfirmasi & Potong Saldo"
//                   : "Konfirmasi & Bayar Pesanan"}
//               </button>
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
import Swal from "sweetalert2";
import { ArrowLeft, Truck, Store, ShoppingBag, Wallet } from "lucide-react";

const CheckoutPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("kurir");
  const [purchaseMethod, setPurchaseMethod] = useState("saldo");

  // Membaca saldo riil secara dinamis dari database logged-in user
  const userWallet =
    user?.total_saldo !== undefined ? parseInt(user.total_saldo) : 0;

  // FIX OTOMATIS: Jika saat halaman dimuat saldo user ternyata 0, otomatis paksa alihkan opsi ke "Harga Penuh"
  useEffect(() => {
    if (userWallet <= 0) {
      setPurchaseMethod("penuh");
    }
  }, [userWallet]);

  // State Formulir Pengiriman
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    kota: "",
    alamat: "",
    catatan: "",
  });

  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem("checkout_items"));
    if (checkoutData && checkoutData.length > 0) {
      setCartItems(checkoutData);
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(savedCart);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.harga_asli * item.quantity,
    0,
  );
  const biayaPengiriman = shippingMethod === "kurir" ? 15000 : 0;
  const totalBiayaFisik = subtotal + biayaPengiriman;

  // Proteksi agar saldo terpakai tidak melebihi total tagihan belanja
  const saldoTerpakai =
    purchaseMethod === "saldo" ? Math.min(totalBiayaFisik, userWallet) : 0;
  const totalPembayaran = Math.max(0, totalBiayaFisik - saldoTerpakai);

  // LOGIKA HANDLER PEMBAYARAN KETIKA DI-SUBMIT DENGAN SWEETALERT2 INTEGRATED
  const handleProcessCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Keranjang Kosong",
        text: "Daftar pesanan Anda masih kosong.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
      });
      return;
    }

    // FIX PROTEKSI MUTLAK: Tolak checkout jika memilih "saldo" padahal saldo dompet kosong / Rp 0
    if (purchaseMethod === "saldo" && userWallet <= 0) {
      Swal.fire({
        title: "Transaksi Ditolak",
        text: "Gagal memproses! Saldo dompet Anda Rp 0. Silakan klik opsi pembelian 'Harga Penuh'.",
        icon: "error",
        confirmButtonColor: "#3D5532",
      });
      setPurchaseMethod("penuh");
      return;
    }

    const token = localStorage.getItem("token");
    const listNamaProduk = cartItems.map((item) => item.nama_produk).join(", ");
    const baseUrl = "http://localhost:5000";

    try {
      const response = await fetch(`${baseUrl}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          total_bayar: purchaseMethod === "saldo" ? saldoTerpakai : 0,
          item_deskripsi: listNamaProduk,
          nomor_telepon: formData.telepon,
          alamat_rumah:
            shippingMethod === "kurir"
              ? formData.alamat
              : `Ambil di Toko (${formData.kota})`,
          jenis_pembelian: purchaseMethod,
          total_pembayaran_gateway: totalPembayaran,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.status === "error") {
        Swal.fire({
          title: "Gagal Memproses",
          text: result.message || "Terjadi kesalahan saat membuat order.",
          icon: "error",
          confirmButtonColor: "#3D5532",
        });
        return;
      }

      // 🛑 KONDISI A: Jika terbayar lunas menggunakan saldo internal (Rp 0)
      if (result.payment_type === "saldo_internal") {
        const updatedUser = {
          ...user,
          total_saldo: result.data.total_saldo_sekarang,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        Swal.fire({
          title: "Pemesanan Berhasil!",
          text: "🎉 Selesai! Pembayaran lunas dipotong dari saldo sirkular internal Anda.",
          icon: "success",
          confirmButtonColor: "#3D5532",
          customClass: { popup: "rounded-[30px]" },
        }).then(() => {
          bersihkanLocalStorageCheckout();
          navigate("/riwayat");
        });
        return;
      }

      // 💳 KONDISI B: Jika ada sisa tagihan tunai, panggil Snap Midtrans Pop-up!
      if (result.payment_type === "midtrans" && result.snapToken) {
        window.snap.pay(result.snapToken, {
          onSuccess: function (snapResult) {
            Swal.fire({
              title: "Pembayaran Sukses!",
              text: "🍃 Luar biasa! Transaksi Anda telah lunas terverifikasi. Silakan cek berkala status pelacakan kurir.",
              icon: "success",
              confirmButtonColor: "#3D5532",
              customClass: { popup: "rounded-[30px]" },
            }).then(() => {
              bersihkanLocalStorageCheckout();
              navigate("/riwayat");
            });
          },
          onPending: function (snapResult) {
            Swal.fire({
              title: "Menunggu Pembayaran",
              text: "📑 Pesanan dicatat! Segera selesaikan transfer dana Anda sesuai instruksi Virtual Account.",
              icon: "info",
              confirmButtonColor: "#3D5532",
              customClass: { popup: "rounded-[30px]" },
            }).then(() => {
              bersihkanLocalStorageCheckout();
              navigate("/riwayat");
            });
          },
          onError: function (snapResult) {
            Swal.fire({
              title: "Transaksi Gagal",
              text: "Waduh, pembayaran gagal diproses oleh bank gateway. Silakan coba kembali.",
              icon: "error",
              confirmButtonColor: "#3D5532",
            });
          },
          onClose: function () {
            Swal.fire({
              title: "Halaman Ditutup",
              text: "Anda menutup halaman checkout. Transaksi disimpan sementara sebagai status pending.",
              icon: "warning",
              confirmButtonColor: "#3D5532",
              customClass: { popup: "rounded-[30px]" },
            }).then(() => {
              bersihkanLocalStorageCheckout();
              navigate("/riwayat");
            });
          },
        });
      }
    } catch (error) {
      console.error("Gagal eksekusi pembayaran:", error);
      Swal.fire({
        title: "Kesalahan Sistem",
        text: "Terjadi gangguan sambungan pada server checkout Node.js Anda.",
        icon: "error",
        confirmButtonColor: "#3D5532",
      });
    }
  };

  // Fungsi pembantu tambahan untuk merapikan local storage
  const bersihkanLocalStorageCheckout = () => {
    const mainCart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutIds = cartItems.map((item) => item.id_produk);
    const remainingCart = mainCart.filter(
      (item) => !checkoutIds.includes(item.id_produk),
    );
    localStorage.setItem("cart", JSON.stringify(remainingCart));
    localStorage.removeItem("checkout_items");
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen text-brand-dark-500 py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-brand-primary-300 hover:text-brand-primary-500 font-bold text-sm flex items-center gap-2 mb-8 transition-colors group outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
          Kembali
        </button>

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
          {/* SEKTOR KIRI: FORMULIR ISIAN PENGIRIMAN */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 rounded-[32px] border border-neutral-100 shadow-sm">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
                Metode Penerimaan
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShippingMethod("kurir")}
                  className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${shippingMethod === "kurir" ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md" : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"}`}
                >
                  <Truck className="w-4 h-4" /> Pengiriman Kurir
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod("toko")}
                  className={`p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all duration-300 outline-none ${shippingMethod === "toko" ? "bg-[#3D5532] border-[#3D5532] text-white shadow-md" : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"}`}
                >
                  <Store className="w-4 h-4" /> Ambil di Toko
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm space-y-5">
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
                    className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
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
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 block mb-1">
                      Kota &amp; kecamatan
                    </h4>
                    <input
                      type="text"
                      required
                      value={formData.kota}
                      onChange={(e) =>
                        setFormData({ ...formData, kota: e.target.value })
                      }
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
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
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 resize-none leading-relaxed shadow-inner"
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
                    className="w-full p-3.5 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 🚀 SEKTOR KANAN: LOCK STICKY POSISI (Tetap diam mengambang saat di-scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-10 space-y-6">
            <div className="bg-white rounded-[32px] p-6 border border-neutral-100 shadow-sm space-y-6">
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
                          <p className="text-brand-primary-300 font-bold mt-0.5">
                            Rp {item.harga_asli?.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-neutral-400 bg-white border border-neutral-100 px-2.5 py-1 rounded-md">
                          x{item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-neutral-50 pt-5">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4">
                  Opsi Pembelian
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    disabled={userWallet <= 0}
                    onClick={() => setPurchaseMethod("saldo")}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[82px] w-full outline-none transition-all duration-300 ${
                      userWallet <= 0
                        ? "bg-neutral-100 border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50"
                        : purchaseMethod === "saldo"
                          ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
                          : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-1">
                      <Wallet className="w-3.5 h-3.5" /> Pakai Saldo
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "saldo" && userWallet > 0 ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
                    >
                      Sisa: Rp {userWallet.toLocaleString("id-ID")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurchaseMethod("penuh")}
                    className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[82px] w-full outline-none transition-all duration-300 ${
                      purchaseMethod === "penuh"
                        ? "bg-[#3D5532] border-[#3D5532] text-white font-bold shadow-md"
                        : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"
                    }`}
                  >
                    <span className="text-sm font-semibold">Harga Penuh</span>
                    <span
                      className={`text-[10px] mt-0.5 tracking-tight ${purchaseMethod === "penuh" ? "text-neutral-200 font-medium" : "text-neutral-400 font-bold"}`}
                    >
                      Simpan Saldo
                    </span>
                  </button>
                </div>
              </div>

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
                {purchaseMethod === "saldo" && userWallet > 0 && (
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

              <button
                type="submit"
                className="w-full bg-[#3D5532] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-[#2c3e24] transition-all text-center block outline-none"
              >
                {purchaseMethod === "saldo" && totalPembayaran === 0
                  ? "Konfirmasi & Potong Saldo"
                  : "Konfirmasi & Bayar Pesanan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
