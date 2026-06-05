import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {
  Search,
  ShoppingBag,
  Clock,
  DollarSign,
  Loader2,
  PackageCheck,
  ArrowRight,
  X,
  RefreshCw,
  Truck,
  Check,
  CheckCircle,
} from "lucide-react";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [nomorResi, setNomorResi] = useState("");

  const IMAGE_BASE_URL = "http://localhost:5000/uploads/profiles/";

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status === "success") {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Gagal memuat manajemen pesanan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setTempStatus(order.status === "PENDING" ? "PROCESSING" : order.status);
    setNomorResi(order.catatan_resi || "");
    setIsModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedOrder) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/orders/${selectedOrder.id_riwayat}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: tempStatus,
            catatan_resi: nomorResi,
          }),
        },
      );

      const result = await response.json();
      if (result.status === "success") {
        setIsModalOpen(false);
        alert(
          `🎯 Berhasil memperbarui Order #TRX-0${selectedOrder.id_riwayat} menjadi ${tempStatus}!`,
        );
        fetchOrders();
      }
    } catch (error) {
      console.error("Gagal memperbarui status alur pesanan:", error);
    }
  };

  const totalPesanan = orders.length;
  const perluDiproses = orders.filter(
    (o) => o.status === "PENDING" || o.status === "PROCESSING",
  ).length;
  const totalOmset = orders.reduce(
    (acc, curr) => acc + Math.abs(parseInt(curr.jumlah_saldo || 0)),
    0,
  );

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.aktivitas
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "Semua Status" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-brand-dark-500">
      <SidebarAdmin />

      {/* 🚀 CONSTRAINED MAIN CONTAINER: Mengunci batas viewport kanan agar tidak tembus layout luar */}
      <main className="flex-1 ml-64 p-10 max-w-[calc(100vw-256px)] overflow-hidden">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500 font-bold">
              Manajemen Pemesanan
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-medium">
              Mengelola pembelian produk pengguna dan status pemenuhan pesanan
              secara efisien.
            </p>
          </div>
        </header>

        {/* Stats Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Total Masuk
              </p>
              <p className="text-3xl font-sans font-black text-brand-dark-500 mt-1">
                {totalPesanan}
              </p>
            </div>
            <ShoppingBag className="w-8 h-8 text-brand-primary-300 opacity-40" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Perlu Diproses
              </p>
              <p className="text-3xl font-sans font-black text-amber-500 mt-1">
                {perluDiproses}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500 opacity-40" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                Omset Saldo
              </p>
              <p className="text-3xl font-sans font-black text-feedback-success-300 mt-1">
                Rp {totalOmset.toLocaleString("id-ID")}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-feedback-success-300 opacity-40" />
          </div>
        </div>

        {/* Filter Toolbar Component */}
        <div className="bg-white rounded-[30px] shadow-sm border border-neutral-100 mb-6 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest">
            Daftar Aktivitas Belanja
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3.5 top-3 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari aktivitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-50 border border-neutral-100 text-xs font-medium rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-brand-primary-300 text-brand-dark-500 w-full sm:w-64 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-50 border border-neutral-100 text-xs font-bold rounded-xl px-4 py-2.5 outline-none text-neutral-600 cursor-pointer shadow-sm"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="SELESAI">Selesai</option>
            </select>
          </div>
        </div>

        {/* ── 🚀 FIX MUTLAK LAYOUT: SCROLLBAR GLOBAL UNTUK SELURUH AREA BARIS DATA ── */}
        <div className="bg-white rounded-[30px] shadow-sm border border-neutral-100 overflow-hidden w-full">
          {/* w-full dan overflow-x-auto dipasang melingkari seluruh elemen table secara utuh */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
            {/* min-w mengunci lebar minimal bentangan baris agar kolom berjejer rapi tanpa berdesakan */}
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="bg-neutral-50 text-[11px] text-neutral-400 font-bold uppercase border-b border-neutral-100">
                <tr>
                  <th className="px-8 py-5 w-[18%]">Foto Profil</th>
                  <th className="px-6 py-5 w-[30%]">
                    Kontak &amp; Alamat Tujuan
                  </th>
                  <th className="px-6 py-5 w-[22%]">Aktivitas Deskripsi</th>
                  <th className="px-6 py-5 w-[10%]">Tanggal</th>
                  <th className="px-6 py-5 w-[10%]">Status Pelacakan</th>
                  <th className="px-6 py-5 w-[12%]">Total Belanja</th>
                  <th className="px-6 py-5 text-center w-[10%]">
                    Aksi Operasional
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-neutral-600 divide-y divide-neutral-50">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-12 text-neutral-400 font-bold"
                    >
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2 text-brand-primary-300" />{" "}
                      Memuat database...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-12 text-neutral-400 italic"
                    >
                      Belum ada aktivitas transaksi belanja yang tercatat.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const part = order.aktivitas
                      ? order.aktivitas.split(" | ")
                      : [];
                    const namaProdukClean = part[0] || order.aktivitas;

                    return (
                      <tr
                        key={order.id_riwayat}
                        className="hover:bg-neutral-50/40 transition-colors"
                      >
                        {/* 1. Foto Profil & User ID */}
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                order.pembeli?.foto_profil
                                  ? `${IMAGE_BASE_URL}${order.pembeli.foto_profil}`
                                  : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                              }
                              alt="Profile"
                              className="w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-sm bg-neutral-100 shrink-0"
                              onError={(e) => {
                                e.target.src =
                                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
                              }}
                            />
                            <div>
                              <p className="font-bold text-brand-dark-500 whitespace-nowrap">
                                {order.pembeli?.username || "Guest User"}
                              </p>
                              <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                                #USR-{order.id_profil}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Kontak & Alamat Tujuan (Kondisi Bersih Tanpa Scrollbox Lokal) */}
                        <td className="px-6 py-4">
                          <div className="max-w-[320px]">
                            <p className="font-black text-brand-primary-300 text-[9px] bg-brand-primary-100/10 w-fit px-1.5 py-0.5 rounded">
                              📞{" "}
                              {order.rincian_pengiriman?.nomor_telepon || "-"}
                            </p>
                            <p className="text-neutral-400 text-[11px] leading-relaxed mt-1 break-words whitespace-pre-line font-medium">
                              📍{" "}
                              {order.rincian_pengiriman?.alamat_rumah ||
                                "Alamat pengiriman belum diatur"}
                            </p>
                            <span className="text-[9px] font-mono text-neutral-400 mt-1 block">
                              Metode:{" "}
                              <b className="text-brand-dark-500 uppercase">
                                {order.rincian_pengiriman?.jenis_pembelian ||
                                  "saldo"}
                              </b>
                            </span>
                          </div>
                        </td>

                        {/* 3. Deskripsi Nama Produk */}
                        <td className="px-6 py-4 font-bold text-brand-dark-500 uppercase tracking-tight">
                          {namaProdukClean}
                        </td>

                        {/* 4. Tanggal */}
                        <td className="px-6 py-4 text-neutral-400 font-medium whitespace-nowrap">
                          {new Date(order.tanggal).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        {/* 5. Status Pelacakan */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              order.status === "PENDING"
                                ? "bg-red-100/40 text-red-500"
                                : order.status === "PROCESSING"
                                  ? "bg-amber-100/40 text-amber-600"
                                  : order.status === "SHIPPED"
                                    ? "bg-blue-100/40 text-blue-500"
                                    : "bg-brand-primary-100/30 text-brand-primary-300"
                            }`}
                          >
                            ● {order.status}
                          </span>
                        </td>

                        {/* 6. Total Potongan Belanja */}
                        <td className="px-6 py-4 font-sans font-black text-feedback-error-200 text-sm whitespace-nowrap">
                          -Rp{" "}
                          {Math.abs(
                            parseInt(order.jumlah_saldo),
                          ).toLocaleString("id-ID")}
                        </td>

                        {/* 7. Aksi Trigger Modal */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {order.status !== "SELESAI" ? (
                            <button
                              type="button"
                              onClick={() => openStatusModal(order)}
                              className="bg-brand-primary-300 hover:bg-brand-primary-500 text-white p-2 rounded-xl transition-all inline-flex items-center justify-center outline-none shadow-sm"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-brand-primary-300 font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1">
                              <PackageCheck className="w-4 h-4" /> Selesai
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Popup Modal Canvas Code Block */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm flex justify-center items-center z-[999] p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden font-sans">
            <div className="px-6 py-4 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/30">
              <h2 className="text-sm font-bold text-brand-dark-500">
                Update Status Pesanan
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-brand-dark-500 transition-colors outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 pb-2">
              <div className="bg-[#F8F9FA] p-4 rounded-xl border border-neutral-100 space-y-3">
                <div className="flex items-center gap-4 pb-2.5 border-b border-neutral-200/60">
                  <img
                    src={
                      selectedOrder?.pembeli?.foto_profil
                        ? `${IMAGE_BASE_URL}${selectedOrder.pembeli.foto_profil}`
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-white shrink-0"
                    onError={(e) => {
                      e.target.src =
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
                    }}
                  />
                  <div>
                    <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                      Customer Account
                    </p>
                    <h4 className="text-sm font-black text-brand-dark-500">
                      {selectedOrder?.pembeli?.username ||
                        `User ID: #USR-${selectedOrder?.id_profil}`}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      Order ID: #ORD-2026{selectedOrder?.id_riwayat}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    Produk / Aktivitas:
                  </p>
                  <p className="text-xs font-bold text-[#3D5532] mt-0.5 capitalize leading-relaxed">
                    {selectedOrder?.aktivitas
                      ?.split(" | ")[0]
                      ?.replace("Belanja: ", "")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <label className="block text-[11px] font-black text-neutral-400 uppercase tracking-wider">
                Pilih Status Baru
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => setTempStatus("PROCESSING")}
                  className={`p-2.5 rounded-xl border-2 text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[85px] ${
                    tempStatus === "PROCESSING"
                      ? "border-[#3D5532] bg-brand-primary-100/10 text-[#3D5532] font-bold shadow-sm"
                      : "border-neutral-100 bg-white text-neutral-400 hover:border-brand-primary-100"
                  }`}
                >
                  <RefreshCw
                    className={`w-4 h-4 mb-1.5 ${tempStatus === "PROCESSING" ? "text-[#3D5532] animate-spin" : "text-neutral-300"}`}
                    style={{ animationDuration: "3s" }}
                  />
                  <span className="text-[10px] tracking-tight leading-tight">
                    Diproses
                  </span>
                </div>

                <div
                  onClick={() => setTempStatus("SHIPPED")}
                  className={`p-2.5 rounded-xl border-2 text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[85px] ${
                    tempStatus === "SHIPPED"
                      ? "border-[#3D5532] bg-brand-primary-100/10 text-[#3D5532] font-bold shadow-sm"
                      : "border-neutral-100 bg-white text-neutral-400 hover:border-brand-primary-100"
                  }`}
                >
                  <Truck
                    className={`w-4 h-4 mb-1.5 ${tempStatus === "SHIPPED" ? "text-[#3D5532]" : "text-neutral-300"}`}
                  />
                  <span className="text-[10px] tracking-tight leading-tight">
                    Dikirim
                  </span>
                </div>

                <div
                  onClick={() => setTempStatus("SELESAI")}
                  className={`p-2.5 rounded-xl border-2 text-center cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center min-h-[85px] ${
                    tempStatus === "SELESAI"
                      ? "border-green-600 bg-green-50 text-green-600 font-bold shadow-sm"
                      : "border-neutral-100 bg-white text-neutral-400 hover:border-brand-primary-100"
                  }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 mb-1.5 ${tempStatus === "SELESAI" ? "text-green-600" : "text-neutral-300"}`}
                  />
                  <span className="text-[10px] tracking-tight leading-tight">
                    Selesai
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[11px] font-black text-neutral-400 uppercase tracking-wider mb-2">
                  Catatan atau Nomor Resi (Opsional)
                </label>
                <textarea
                  rows="3"
                  value={nomorResi}
                  onChange={(e) => setNomorResi(e.target.value)}
                  placeholder="Tambahkan instruksi pengiriman atau nomor pelacakan kurir disini..."
                  className="w-full p-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium text-brand-dark-500 outline-none focus:border-brand-primary-300 resize-none leading-relaxed placeholder-neutral-300 shadow-inner"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-neutral-50/50 border-t border-neutral-50 flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-brand-dark-500 transition-colors"
              >
                Batalkan
              </button>
              <button
                type="button"
                onClick={openStatusModal ? handleSaveStatus : undefined}
                className="px-5 py-2.5 bg-[#3D5532] hover:bg-[#2a3c22] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 outline-none"
              >
                <Check className="w-4 h-4" /> Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
