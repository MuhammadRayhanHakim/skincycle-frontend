import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Layers, Sparkles, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const ProductPage = ({ user }) => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("Semua");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/produk");
      const result = await response.json();
      if (result.status === "success") setProducts(result.data);
    } catch (error) {
      console.error("Gagal memuat katalog produk:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredProducts = products.filter((p) => {
    const matchesType = activeType === "Semua" || p.suitable_skin_type === "Semua" || p.suitable_skin_type === activeType;
    const matchesCategory = selectedCategories.includes("All") || p.kategori === "Semua" || selectedCategories.includes(p.kategori);
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

  const handleAddCartDatabase = async (e, p) => {
    e.stopPropagation();

    if (!user) {
      await Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk ke akun Anda terlebih dahulu untuk menambahkan produk ke keranjang.",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Masuk Sekarang",
      });
      navigate("/masuk");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/keranjang", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id_produk: p.id_produk, quantity: 1 }),
      });
      const result = await response.json();

      if (response.ok || result.status === "success") {
        window.dispatchEvent(new Event("cart-updated"));
        Swal.fire({
          icon: "success",
          title: "Ditambahkan! 🛍️",
          text: `${p.nama_produk} berhasil ditambahkan ke keranjang belanja.`,
          confirmButtonColor: "#3D5532",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan",
          text: result.message || "Terjadi kesalahan saat menambahkan ke keranjang.",
          confirmButtonColor: "#3D5532",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Koneksi Bermasalah",
        text: "Terjadi kesalahan jaringan saat menghubungi server.",
        confirmButtonColor: "#3D5532",
      });
    }
  };

  const handleBuyNow = (e, p) => {
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk ke akun Anda terlebih dahulu untuk melanjutkan transaksi.",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Masuk Sekarang",
      }).then((result) => {
        if (result.isConfirmed) navigate("/masuk");
      });
      return;
    }

    const checkoutItem = [{
      id_produk: p.id_produk,
      nama_produk: p.nama_produk,
      brand: p.brand || "SkinCycle",
      harga_asli: p.harga_asli,
      gambar_produk: p.gambar_produk,
      quantity: 1,
    }];
    localStorage.setItem("checkout_items", JSON.stringify(checkoutItem));
    navigate("/checkout");
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-secondary-100">
      <div className="text-center">
        <Loader2 className="w-12 h-12 border-4 border-brand-primary-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brand-primary-300 font-black uppercase text-[10px] tracking-widest">Sinkronisasi Galeri Produk...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-brand-secondary-100 font-sans text-brand-dark-500">
      <section className="min-h-[calc(100vh-64px)] flex flex-col px-10 py-10">
        <header className="mb-12">
          <h1 className="text-5xl font-marcellus mb-4 tracking-wide text-brand-dark-500">Galeri Produk</h1>
          <p className="text-neutral-500 text-lg max-w-3xl leading-relaxed">
            Diformulasikan secara ilmiah untuk setiap siklus kulit. Setiap produk telah melalui proses kurasi ketat.
          </p>
        </header>

        <div className="bg-neutral-default/50 backdrop-blur-md p-8 rounded-[40px] border border-neutral-default mb-10 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary-300 opacity-50 w-24 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Kategori:
            </span>
            <div className="flex flex-wrap gap-4">
              {["All", "Sunscreen", "Facial Wash", "Serum", "Moisturizer", "Toner", "Essence"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm font-bold cursor-pointer group">
                  <input type="checkbox" className="accent-brand-primary-300 w-4 h-4 rounded-md shadow-inner"
                    checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />
                  <span className={`${selectedCategories.includes(cat) ? "text-brand-primary-300" : "text-neutral-500"} transition-colors`}>
                    {cat === "All" ? "All Categories" : cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-brand-primary-300/10 w-full"></div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary-300 opacity-50 w-24 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Tipe Kulit:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Berminyak", "Kering", "Kombinasi", "Sensitif"].map((type) => (
                <button key={type} type="button" onClick={() => setActiveType(type)}
                  className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all outline-none ${
                    activeType === type
                      ? "bg-brand-primary-300 text-neutral-default shadow-lg shadow-brand-primary-500/20"
                      : "bg-neutral-default text-brand-primary-300 border border-brand-primary-100/30 hover:border-brand-primary-200"
                  }`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const gambarCover = p.gambar_produk ? p.gambar_produk.split(",")[0] : "default.jpg";
            return (
              <div key={p.id_produk} onClick={() => navigate(`/produk/detail/${p.id_produk}`)}
                className="bg-neutral-default rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-neutral-50 cursor-pointer flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img src={`http://localhost:5000/uploads/${gambarCover}`} alt={p.nama_produk}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-neutral-default/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-brand-primary-300 tracking-widest uppercase shadow-sm">
                    {p.suitable_skin_type === "Semua" ? "All Skin" : p.suitable_skin_type}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-0.5">{p.kategori || "Semua"}</span>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-brand-primary-300 transition-colors leading-tight uppercase tracking-tighter text-brand-dark-500">
                    {p.nama_produk}
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed line-clamp-2 italic font-medium">
                    {p.deskripsi_produk || `Rangkaian produk pilihan terbaik untuk jenis kulit ${p.suitable_skin_type?.toLowerCase()}.`}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-neutral-50">
                    <span className="text-xl font-marcellus text-brand-primary-300 font-black">
                      Rp {p.harga_asli?.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center gap-2 w-full">
                      <button type="button" onClick={(e) => handleBuyNow(e, p)}
                        className="flex-1 bg-brand-primary-300 text-neutral-default py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary-500 transition-all shadow-md active:scale-95 text-center outline-none">
                        Beli Sekarang
                      </button>
                      <button type="button" onClick={(e) => handleAddCartDatabase(e, p)}
                        className="w-9 h-9 bg-neutral-50 border border-neutral-200 text-brand-primary-300 rounded-xl flex items-center justify-center hover:bg-neutral-100 transition-all shrink-0 active:scale-90 shadow-sm outline-none"
                        title="Tambah ke Keranjang">
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
            <p className="text-neutral-400 italic font-medium">Tidak ada produk yang sesuai dengan filter Anda.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;