// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const ProductPage = () => {
//   const navigate = useNavigate();
//   const [activeType, setActiveType] = useState("Semua");
//   const [selectedCategories, setSelectedCategories] = useState(["All"]);
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // --- LOGIKA FETCH DATA DARI DATABASE (INTEGRASI ADMIN) ---
//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/produk");
//       const result = await response.json();
//       if (result.status === "success") {
//         setProducts(result.data);
//       }
//     } catch (error) {
//       console.error("Gagal memuat katalog produk:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // --- LOGIKA FILTERING (DISESUAIKAN DENGAN KOLOM DATABASE) ---
//   const filteredProducts = products.filter((p) => {
//     const matchesType =
//       activeType === "Semua" ||
//       p.suitable_skin_type === "Semua" ||
//       p.suitable_skin_type === activeType;

//     const matchesCategory =
//       selectedCategories.includes("All") ||
//       p.kategori === "Semua" ||
//       selectedCategories.includes(p.kategori);

//     return matchesType && matchesCategory;
//   });

//   const handleCategoryChange = (cat) => {
//     if (cat === "All") {
//       setSelectedCategories(["All"]);
//     } else {
//       const newCats = selectedCategories.filter((c) => c !== "All");
//       if (selectedCategories.includes(cat)) {
//         const updated = newCats.filter((c) => c !== cat);
//         setSelectedCategories(updated.length === 0 ? ["All"] : updated);
//       } else {
//         setSelectedCategories([...newCats, cat]);
//       }
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center text-[#3D5532] font-bold">
//         Menyiapkan Katalog SkinCycle...
//       </div>
//     );

//   return (
//     <div className="bg-[#F2EDE4] font-sans text-[#1e2b19]">
//       <section className="min-h-[calc(100vh-64px)] flex flex-col px-10 py-10">
//         <header className="mb-12">
//           <h1 className="text-5xl font-serif mb-4 tracking-tighter">
//             Galeri Produk
//           </h1>
//           <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
//             Diformulasikan secara ilmiah untuk setiap siklus kulit. Setiap
//             produk yang Anda lihat di sini telah melalui proses kurasi ketat di
//             panel manajemen kami.
//           </p>
//         </header>

//         {/* Filter Bar */}
//         <div className="bg-white/50 backdrop-blur-md p-8 rounded-[40px] border border-white mb-10 flex flex-col gap-6 shadow-sm">
//           {/* Kategori Produk */}
//           <div className="flex items-center gap-6">
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D5532] opacity-50 w-24">
//               Kategori:
//             </span>
//             <div className="flex flex-wrap gap-4">
//               {["All", "Cleanser", "Facial Wash", "Serum", "Moisturizer"].map(
//                 (cat) => (
//                   <label
//                     key={cat}
//                     className="flex items-center gap-2 text-sm font-bold cursor-pointer group"
//                   >
//                     <input
//                       type="checkbox"
//                       className="accent-[#3D5532] w-4 h-4 rounded-md"
//                       checked={selectedCategories.includes(cat)}
//                       onChange={() => handleCategoryChange(cat)}
//                     />
//                     <span
//                       className={`${selectedCategories.includes(cat) ? "text-[#3D5532]" : "text-gray-500"} transition-colors`}
//                     >
//                       {cat === "All" ? "All Categories" : cat}
//                     </span>
//                   </label>
//                 ),
//               )}
//             </div>
//           </div>

//           <div className="h-[1px] bg-[#3D5532]/10 w-full"></div>

//           {/* Tipe Kulit */}
//           <div className="flex items-center gap-6">
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D5532] opacity-50 w-24">
//               Tipe Kulit:
//             </span>
//             <div className="flex flex-wrap gap-2">
//               {["Semua", "Berminyak", "Kering", "Kombinasi", "Sensitif"].map(
//                 (type) => (
//                   <button
//                     key={type}
//                     onClick={() => setActiveType(type)}
//                     className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
//                       activeType === type
//                         ? "bg-[#3D5532] text-white shadow-lg shadow-green-900/20"
//                         : "bg-white text-[#3D5532] border border-[#3D5532]/10 hover:border-[#3D5532]/40"
//                     }`}
//                   >
//                     {type}
//                   </button>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProducts.map((p) => {
//             // Mengambil gambar pertama sebagai cover thumbnail halaman katalog depan
//             const gambarCover = p.gambar_produk
//               ? p.gambar_produk.split(",")[0]
//               : "default.jpg";

//             return (
//               <div
//                 key={p.id_produk}
//                 onClick={() => navigate(`/produk/detail/${p.id_produk}`)}
//                 className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-50 cursor-pointer flex flex-col"
//               >
//                 {/* Kontainer Gambar Utama */}
//                 <div className="h-64 overflow-hidden relative">
//                   <img
//                     src={`http://localhost:5000/uploads/${gambarCover}`}
//                     alt={p.nama_produk}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-[#3D5532] tracking-widest uppercase shadow-sm">
//                     {p.suitable_skin_type === "Semua"
//                       ? "All Skin"
//                       : p.suitable_skin_type}
//                   </div>
//                 </div>

//                 {/* Kontainer Informasi Teks (Padding disesuaikan dari p-8 menjadi p-5 agar lebih ringkas) */}
//                 <div className="p-5 flex flex-col flex-grow">
//                   {/* 1. Kategori Skincare (Margin bawah dipangkas menjadi mb-0.5) */}
//                   <div className="mb-0.5">
//                     <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
//                       {p.kategori || "Semua"}
//                     </span>
//                   </div>

//                   {/* 2. Nama Produk (Margin bawah dipangkas dari mb-3 menjadi mb-1) */}
//                   <h4 className="text-lg font-bold mb-1 group-hover:text-[#3D5532] transition-colors leading-tight uppercase tracking-tighter">
//                     {p.nama_produk}
//                   </h4>

//                   {/* 3. Deskripsi Singkat Formula (Margin bawah dipangkas dari mb-8 menjadi mb-4) */}
//                   <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2 italic font-medium">
//                     {p.deskripsi_produk ||
//                       `Rangkaian produk pilihan terbaik untuk jenis kulit ${p.suitable_skin_type?.toLowerCase()}.`}
//                   </p>

//                   {/* ========================================================================= */}
//                   {/* ACTION FOOTER SECTION: STRUKTUR HARGA & DUAL BUTTONS */}
//                   {/* ========================================================================= */}
//                   <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-50">
//                     {/* Tampilan Komponen Harga */}
//                     <span className="text-xl font-serif font-black text-[#3D5532]">
//                       Rp {p.harga_asli?.toLocaleString("id-ID")}
//                     </span>

//                     {/* Grid Tombol Aksi Mandiri */}
//                     <div className="flex items-center gap-2 w-full">
//                       {/* Tombol Utama: Beli Sekarang */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();

//                           // --- LOGIKA INPUT INSTAN SEBELUM CHECKOUT ---
//                           const currentCart =
//                             JSON.parse(localStorage.getItem("cart")) || [];
//                           const existingProduct = currentCart.find(
//                             (item) => item.id_produk === p.id_produk,
//                           );

//                           if (!existingProduct) {
//                             currentCart.push({ ...p, quantity: 1 });
//                             localStorage.setItem(
//                               "cart",
//                               JSON.stringify(currentCart),
//                             );
//                           }

//                           navigate("/checkout"); // Mengarahkan user langsung menuju halaman CartPage
//                         }}
//                         className="flex-1 bg-[#3D5532] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2d4025] transition-all shadow-md active:scale-95 text-center"
//                       >
//                         Beli Sekarang
//                       </button>

//                       {/* Tombol Mini: Ikon Simbol Keranjang SVG */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();

//                           // === LOGIKA PENYIMPANAN DATA UTUH KE LOCALSTORAGE ===
//                           const currentCart =
//                             JSON.parse(localStorage.getItem("cart")) || [];

//                           // Cari tahu apakah produk dengan ID bersangkutan sudah pernah dimasukkan
//                           const existingProduct = currentCart.find(
//                             (item) => item.id_produk === p.id_produk,
//                           );

//                           if (existingProduct) {
//                             existingProduct.quantity += 1; // Jika ada, tambahkan kuantitasnya saja
//                           } else {
//                             currentCart.push({ ...p, quantity: 1 }); // Jika belum ada, push objek produk utuh ke array
//                           }

//                           localStorage.setItem(
//                             "cart",
//                             JSON.stringify(currentCart),
//                           );
//                           alert(
//                             `📦 ${p.nama_produk} berhasil ditambahkan ke keranjang belanja!`,
//                           );
//                         }}
//                         className="w-9 h-9 bg-[#FAFBF9] border border-gray-200/60 text-[#3D5532] rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all shrink-0 active:scale-90 shadow-sm"
//                         title="Tambah ke Keranjang"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2.5"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
//                           ></path>
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   {/* ========================================================================= */}
//                   {/* ========================================================================= */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="py-20 text-center">
//             <p className="text-gray-400 italic">
//               Tidak ada produk yang sesuai dengan filter Anda.
//             </p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Layers, Sparkles, Loader2 } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon

const ProductPage = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("Semua");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- LOGIKA FETCH DATA DARI DATABASE (INTEGRASI ADMIN) ---
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/produk");
      const result = await response.json();
      if (result.status === "success") {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Gagal memuat katalog produk:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- LOGIKA FILTERING (DISESUAIKAN DENGAN KOLOM DATABASE) ---
  const filteredProducts = products.filter((p) => {
    const matchesType =
      activeType === "Semua" ||
      p.suitable_skin_type === "Semua" ||
      p.suitable_skin_type === activeType;

    const matchesCategory =
      selectedCategories.includes("All") ||
      p.kategori === "Semua" ||
      selectedCategories.includes(p.kategori);

    return matchesType && matchesCategory;
  });

  const handleCategoryChange = (cat) => {
    if (cat === "All") {
      setSelectedCategories(["All"]);
    } else {
      const newCats = selectedCategories.filter((c) => c !== "All");
      if (selectedCategories.includes(cat)) {
        const updated = newCats.filter((c) => c !== cat);
        setSelectedCategories(updated.length === 0 ? ["All"] : updated);
      } else {
        setSelectedCategories([...newCats, cat]);
      }
    }
  };

  if (isLoading)
    return (
      <div className="text-center">
        <Loader2 className="w-12 h-12 border-4 border-brand-primary-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">
          Sinkronisasi Galeri Produk...
        </p>
      </div>
    );

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500">
      <section className="min-h-[calc(100vh-64px)] flex flex-col px-10 py-10">
        <header className="mb-12">
          <h1 className="text-5xl font-marcellus mb-4 tracking-tighter text-brand-dark-500">
            Galeri Produk
          </h1>
          <p className="text-neutral-500 text-lg max-w-3xl leading-relaxed">
            Diformulasikan secara ilmiah untuk setiap siklus kulit. Setiap
            produk yang Anda lihat di sini telah melalui proses kurasi ketat di
            panel manajemen kami.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="bg-neutral-default/50 backdrop-blur-md p-8 rounded-[40px] border border-neutral-default mb-10 flex flex-col gap-6 shadow-sm">
          {/* Kategori Produk */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary-300 opacity-50 w-24 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Kategori:
            </span>
            <div className="flex flex-wrap gap-4">
              {["All", "Cleanser", "Facial Wash", "Serum", "Moisturizer"].map(
                (cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-sm font-bold cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="accent-brand-primary-300 w-4 h-4 rounded-md"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span
                      className={`${selectedCategories.includes(cat) ? "text-brand-primary-300" : "text-neutral-500"} transition-colors`}
                    >
                      {cat === "All" ? "All Categories" : cat}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>

          <div className="h-[1px] bg-brand-primary-300/10 w-full"></div>

          {/* Tipe Kulit */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary-300 opacity-50 w-24 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Tipe Kulit:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Berminyak", "Kering", "Kombinasi", "Sensitif"].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all outline-none ${
                      activeType === type
                        ? "bg-brand-primary-300 text-neutral-default shadow-lg shadow-brand-primary-500/20"
                        : "bg-neutral-default text-brand-primary-300 border border-brand-primary-100/30 hover:border-brand-primary-200"
                    }`}
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const gambarCover = p.gambar_produk
              ? p.gambar_produk.split(",")[0]
              : "default.jpg";

            return (
              <div
                key={p.id_produk}
                onClick={() => navigate(`/produk/detail/${p.id_produk}`)}
                className="bg-neutral-default rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-neutral-50 cursor-pointer flex flex-col"
              >
                {/* Kontainer Gambar Utama */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={`http://localhost:5000/uploads/${gambarCover}`}
                    alt={p.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-neutral-default/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-brand-primary-300 tracking-widest uppercase shadow-sm">
                    {p.suitable_skin_type === "Semua"
                      ? "All Skin"
                      : p.suitable_skin_type}
                  </div>
                </div>

                {/* Kontainer Informasi Teks */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-0.5">
                    <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">
                      {p.kategori || "Semua"}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold mb-1 group-hover:text-brand-primary-300 transition-colors leading-tight uppercase tracking-tighter text-brand-dark-500">
                    {p.nama_produk}
                  </h4>

                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed line-clamp-2 italic font-medium">
                    {p.deskripsi_produk ||
                      `Rangkaian produk pilihan terbaik untuk jenis kulit ${p.suitable_skin_type?.toLowerCase()}.`}
                  </p>

                  {/* ACTION FOOTER SECTION: STRUKTUR HARGA & DUAL BUTTONS */}
                  <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-neutral-50">
                    <span className="text-xl font-marcellus text-brand-primary-300">
                      Rp {p.harga_asli?.toLocaleString("id-ID")}
                    </span>

                    {/* Grid Tombol Aksi */}
                    <div className="flex items-center gap-2 w-full">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentCart =
                            JSON.parse(localStorage.getItem("cart")) || [];
                          const existingProduct = currentCart.find(
                            (item) => item.id_produk === p.id_produk,
                          );

                          if (!existingProduct) {
                            currentCart.push({ ...p, quantity: 1 });
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(currentCart),
                            );
                          }
                          navigate("/checkout");
                        }}
                        className="flex-1 bg-brand-primary-300 text-neutral-default py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary-500 transition-all shadow-md active:scale-95 text-center"
                      >
                        Beli Sekarang
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          // === VALIDASI UTAMA: CEK APAKAH USER SUDAH LOGIN ===
                          if (!user) {
                            alert(
                              "⚠️ Akses Ditolak! Anda harus masuk (login) terlebih dahulu untuk menambahkan produk ke keranjang belanja.",
                            );
                            navigate("/masuk");
                            return;
                          }

                          // Jika sudah login, jalankan penyimpanan data ke localStorage seperti biasa
                          const currentCart =
                            JSON.parse(localStorage.getItem("cart")) || [];
                          const existingProduct = currentCart.find(
                            (item) => item.id_produk === p.id_produk,
                          );

                          if (existingProduct) {
                            existingProduct.quantity += 1;
                          } else {
                            currentCart.push({ ...p, quantity: 1 });
                          }

                          localStorage.setItem(
                            "cart",
                            JSON.stringify(currentCart),
                          );
                          alert(
                            `📦 ${p.nama_produk} berhasil ditambahkan ke keranjang belanja!`,
                          );
                        }}
                        className="w-9 h-9 bg-neutral-50 border border-neutral-200 text-brand-primary-300 rounded-xl flex items-center justify-center hover:bg-neutral-100 transition-all shrink-0 active:scale-90 shadow-sm"
                        title="Tambah ke Keranjang"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neutral-400 italic">
              Tidak ada produk yang sesuai dengan filter Anda.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
