import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Wallet,
  Landmark,
  CheckSquare,
  Square,
} from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // State untuk menyimpan daftar id_produk yang dicentang oleh user
  const [selectedItems, setSelectedItems] = useState([]);

  // Ambil data asli dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    // Secara default, centang semua produk yang ada di dalam keranjang di awal
    const allIds = savedCart.map((item) => item.id_produk);
    setSelectedItems(allIds);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Fungsi menyeleksi checkbox tunggal pada kartu produk
  const handleToggleSelect = (id_produk) => {
    if (selectedItems.includes(id_produk)) {
      setSelectedItems(selectedItems.filter((id) => id !== id_produk));
    } else {
      setSelectedItems([...selectedItems, id_produk]);
    }
  };

  // Fungsi menyeleksi atau membatalkan seluruh checkbox (Pilih Semua)
  const handleToggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id_produk));
    }
  };

  const handleDecreaseQty = (id_produk) => {
    const updated = cartItems.map((item) => {
      if (item.id_produk === id_produk) {
        return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
      }
      return item;
    });
    updateCart(updated);
  };

  const handleIncreaseQty = (id_produk) => {
    const updated = cartItems.map((item) =>
      item.id_produk === id_produk
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    updateCart(updated);
  };

  const handleRemoveItem = (id_produk) => {
    const updated = cartItems.filter((item) => item.id_produk !== id_produk);
    setSelectedItems(selectedItems.filter((id) => id !== id_produk));
    updateCart(updated);
  };

  // =========================================================================
  // LOGIKA RINGKASAN DINAMIS: Hanya memproses item dengan id yang ada di selectedItems
  // =========================================================================
  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.id_produk))
    .reduce((acc, item) => acc + item.harga_asli * item.quantity, 0);

  const shipping = selectedItems.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  const handleCheckoutRoute = () => {
    const checkedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id_produk),
    );

    if (checkedProducts.length === 0) {
      alert("Silakan pilih minimal satu produk yang ingin Anda checkout.");
      return;
    }

    localStorage.setItem("checkout_items", JSON.stringify(checkedProducts));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-brand-secondary-100 py-12 px-6 lg:px-20 font-sans text-brand-dark-500">
      <div className="max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="mb-10">
          <h1 className="text-4xl font-sans text-brand-dark-500 tracking-tight">
            Daftar Belanja Skincare Kamu
          </h1>
          <p className="text-neutral-500 text-sm mt-2 font-medium">
            Yuk, cek kembali produk pilihanmu agar tidak ada langkah skincare
            yang terlewat.
          </p>
        </div>

        {/* Kondisi jika keranjang belanja kosong */}
        {cartItems.length === 0 ? (
          <div className="bg-neutral-default rounded-[30px] p-12 text-center border border-neutral-100 max-w-xl mx-auto shadow-sm">
            <p className="text-neutral-400 italic mb-6 font-medium">
              Keranjang belanjamu masih kosong.
            </p>
            <button
              type="button"
              onClick={() => navigate("/produk")}
              className="bg-brand-primary-300 text-neutral-default px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary-500 transition-colors flex items-center gap-2 mx-auto outline-none"
            >
              <ShoppingCart className="w-4 h-4" /> Cari Produk Skincare
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* SISI KRI: DAFTAR KARTU PRODUK */}
            <div className="lg:col-span-8 space-y-4">
              {/* PANEL SELEKSI GLOBAL (CHOOSE ALL ITEMS) */}
              <div className="bg-neutral-default/80 backdrop-blur-sm p-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="text-brand-primary-300 focus:outline-none"
                >
                  {cartItems.length > 0 &&
                  selectedItems.length === cartItems.length ? (
                    <CheckSquare className="w-5 h-5 accent-brand-primary-300" />
                  ) : (
                    <Square className="w-5 h-5 text-neutral-300" />
                  )}
                </button>
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
                  Pilih Semua ({cartItems.length} Produk)
                </span>
              </div>

              {/* MAPPING KARTU ITEM KERANJANG */}
              {cartItems.map((item) => {
                const coverImg = item.gambar_produk
                  ? item.gambar_produk.split(",")[0]
                  : "default.jpg";
                const isItemChecked = selectedItems.includes(item.id_produk);

                return (
                  <div
                    key={item.id_produk}
                    className={`bg-neutral-default rounded-[30px] p-6 shadow-sm flex items-center gap-6 border transition-all ${
                      isItemChecked
                        ? "border-brand-primary-300/40"
                        : "border-transparent opacity-80"
                    }`}
                  >
                    {/* CHECKBOX INDIVIDUAL */}
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(item.id_produk)}
                      className="focus:outline-none shrink-0"
                    >
                      {isItemChecked ? (
                        <CheckSquare className="w-5 h-5 text-brand-primary-300" />
                      ) : (
                        <Square className="w-5 h-5 text-neutral-300" />
                      )}
                    </button>

                    {/* IMAGES RE-RENDER */}
                    <img
                      src={`http://localhost:5000/uploads/${coverImg}`}
                      alt={item.nama_produk}
                      className="w-24 h-24 object-cover rounded-2xl bg-neutral-50 border border-neutral-100 shrink-0"
                    />

                    {/* IDENTITAS PRODUK */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-brand-dark-500 truncate uppercase tracking-tight">
                        {item.nama_produk}
                      </h3>
                      <p className="text-neutral-400 text-xs uppercase tracking-widest mt-0.5 font-bold">
                        {item.brand || "SkinCycle"}
                      </p>
                      <p className="text-brand-primary-300 font-sans mt-2 text-base">
                        Rp {item.harga_asli?.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* MANAGEMENT AKSI QUANTITY & TRASH BUTTON */}
                    <div className="flex flex-col items-end gap-4 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id_produk)}
                        className="text-neutral-400 hover:text-feedback-error-200 transition-colors p-1"
                        title="Hapus Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-4 bg-brand-secondary-100/50 border border-neutral-100 rounded-full px-4 py-1.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => handleDecreaseQty(item.id_produk)}
                          className="font-bold text-brand-primary-300 select-none hover:scale-120 active:scale-90 transition-transform outline-none"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-black min-w-[14px] text-center text-brand-dark-500">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncreaseQty(item.id_produk)}
                          className="font-bold text-brand-primary-300 select-none hover:scale-120 active:scale-90 transition-transform outline-none"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => navigate("/produk")}
                className="text-brand-primary-300 font-bold text-sm hover:text-brand-primary-500 flex items-center gap-1.5 pt-2 outline-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali Belanja
              </button>
            </div>

            {/* SISI KANAN: PANEL RINGKASAN BELANJA INTERAKTIF */}
            <div className="lg:col-span-4 bg-brand-primary-300 text-neutral-default rounded-[40px] p-8 h-fit shadow-xl border border-brand-primary-400 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-sans font-bold mb-8 tracking-tight">
                  Ringkasan
                </h2>

                <div className="space-y-4 border-b border-neutral-default/10 pb-6 mb-6 text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-neutral-default/70">
                      Item Terpilih
                    </span>
                    <span className="font-sans font-bold">
                      {selectedItems.length} Produk
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-default/70">Subtotal</span>
                    <span className="font-sans">
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-default/70">Pengiriman</span>
                    <span className="font-sans">
                      Rp {shipping.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-base font-black uppercase tracking-wider opacity-90">
                    Total
                  </span>
                  <span className="text-2xl font-sans font-black">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutRoute}
                disabled={selectedItems.length === 0}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase shadow-lg transition-all tracking-widest text-center block outline-none active:scale-98 ${
                  selectedItems.length > 0
                    ? "bg-brand-secondary-100 text-brand-primary-300 hover:bg-neutral-default"
                    : "bg-neutral-default/20 text-neutral-default/40 cursor-not-allowed shadow-none"
                }`}
              >
                Checkout Sekarang ({selectedItems.length})
              </button>

              <div className="mt-6 flex justify-center gap-4 text-neutral-default/40">
                <CreditCard className="w-5 h-5 opacity-60" />
                <Wallet className="w-5 h-5 opacity-60" />
                <Landmark className="w-5 h-5 opacity-60" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
