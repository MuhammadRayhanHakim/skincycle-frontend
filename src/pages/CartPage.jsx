import React, { useState } from "react";

const CartPage = ({ setPage }) => {
  // Data dummy untuk tampilan keranjang
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cleanser Gentle Pro",
      brand: "SkinCycle Care",
      price: 125000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200",
    },
    {
      id: 2,
      name: "Moisturizer Barrier",
      brand: "Nature Lab",
      price: 89000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200",
    },
  ]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 15000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F2EDE4] py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#1e2b19]">
            Your Skincare Ritual
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Pastikan produk pilihanmu siap untuk dirawat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sisi Kiri: Daftar Produk */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[30px] p-6 shadow-sm flex items-center gap-6 border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-2xl bg-gray-100"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1e2b19]">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">
                    {item.brand}
                  </p>
                  <p className="text-[#3D5532] font-bold mt-2">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-[#F2EDE4]/50 rounded-full px-4 py-2">
                  <button className="font-bold text-[#3D5532]">-</button>
                  <span className="text-sm font-bold">{item.quantity}</span>
                  <button className="font-bold text-[#3D5532]">+</button>
                </div>

                <button className="text-red-300 hover:text-red-500 transition-colors ml-4 text-xl">
                  🗑️
                </button>
              </div>
            ))}

            <button
              onClick={() => setPage("Produk")}
              className="text-[#3D5532] font-bold text-sm hover:underline flex items-center gap-2"
            >
              ← Kembali Belanja
            </button>
          </div>

          {/* Sisi Kanan: Ringkasan Pembayaran */}
          <div className="bg-[#3D5532] text-white rounded-[40px] p-8 h-fit shadow-xl">
            <h2 className="text-2xl font-serif font-bold mb-8">Ringkasan</h2>

            <div className="space-y-4 border-b border-white/10 pb-6 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Pengiriman</span>
                <span>Rp {shipping.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-serif">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button className="w-full bg-[#F2EDE4] text-[#3D5532] py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-white transition-all tracking-widest">
              Checkout Sekarang
            </button>

            <div className="mt-6 flex justify-center gap-4">
              {/* Icon metode pembayaran mini */}
              <div className="opacity-50 text-[20px]">💳</div>
              <div className="opacity-50 text-[20px]">📱</div>
              <div className="opacity-50 text-[20px]">🏦</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
