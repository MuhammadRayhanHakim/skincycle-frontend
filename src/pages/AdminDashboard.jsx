import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import {
  Package,
  ShoppingCart,
  FlaskConical,
  RefreshCw,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard-overview",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        if (result.status === "success") {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat data statistik dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // KONFIGURASI LINE CHART MINGGUAN
  const lineChartData = {
    labels: stats?.chartWeekly?.labels || [
      "Sen",
      "Sel",
      "Rab",
      "Kam",
      "Jum",
      "Sab",
      "Min",
    ],
    datasets: [
      {
        label: "Sampah Daur Ulang (Kg)",
        data: stats?.chartWeekly?.sampah || [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#3D5532",
        backgroundColor: "rgba(61, 85, 50, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#3D5532",
      },
      {
        label: "Volume Order",
        data: stats?.chartWeekly?.order || [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#7c9a6b",
        borderDash: [5, 5],
        backgroundColor: "transparent",
        tension: 0.4,
        pointBackgroundColor: "#7c9a6b",
      },
    ],
  };

  // PENGOLAHAN DATA GRAFIK LINGKARAN DINAMIS DISTRIBUSI PRODUK
  const dataProdukObj = stats?.distribusiProduk || {};
  const labelKategori = Object.keys(dataProdukObj);
  const nilaiKategori = Object.values(dataProdukObj);

  const isDatabaseKosong = labelKategori.length === 0;
  const warnaChart = [
    "#1e3316",
    "#2c4422",
    "#3D5532",
    "#5c7a4e",
    "#7c9a6b",
    "#a0b893",
  ];

  const doughnutData = {
    labels: isDatabaseKosong ? ["Belum Ada Produk"] : labelKategori,
    datasets: [
      {
        data: isDatabaseKosong ? [100] : nilaiKategori,
        backgroundColor: isDatabaseKosong
          ? ["#e5e5e5"]
          : warnaChart.slice(0, labelKategori.length),
        borderWidth: 0,
      },
    ],
  };

  const nilaiTertinggi = isDatabaseKosong ? 0 : Math.max(...nilaiKategori);
  const indeksTertinggi = nilaiKategori.indexOf(nilaiTertinggi);
  const kategoriUtama = isDatabaseKosong
    ? "Kosong"
    : labelKategori[indeksTertinggi];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 font-sans">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#3D5532] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs font-bold text-[#3D5532] uppercase tracking-widest">
            Sinkronisasi Panel Utama...
          </p>
        </div>
      </div>
    );
  }

  const cards = stats?.cards || {
    catalog: { produk: 0, kategori: 0 },
    sales: { total: 0, pending: 0 },
    materials: { total: 0, aman: 0 },
    recycle: { aktif: 0 },
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9f6] font-sans text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* ROW 1: METRIK CARD ATAS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-2.5 bg-green-50 text-[#3D5532] rounded-xl">
                  <Package className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  CATALOG
                </p>
              </div>
              <p className="text-xs font-bold text-neutral-400 mb-1">
                Produk &amp; Kategori
              </p>
              <h3 className="text-2xl font-black text-brand-dark-500">
                {cards.catalog.produk}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  Produk
                </span>
              </h3>
              <p className="text-xs font-bold text-green-600 mt-0.5">
                {cards.catalog.kategori}{" "}
                <span className="text-[10px] font-medium text-neutral-400">
                  Kategori
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  SALES
                </p>
              </div>
              <p className="text-xs font-bold text-neutral-400 mb-1">
                Manajemen Order
              </p>
              <h3 className="text-2xl font-black text-brand-dark-500">
                {cards.sales.total}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  Total
                </span>
              </h3>
              <p className="text-xs font-bold text-green-600 mt-0.5">
                {cards.sales.pending}{" "}
                <span className="text-[10px] font-medium text-neutral-400">
                  Perlu Proses
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  R&amp;D
                </p>
              </div>
              <p className="text-xs font-bold text-neutral-400 mb-1">
                Bahan Skincare
              </p>
              <h3 className="text-2xl font-black text-brand-dark-500">
                {cards.materials.total}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  Total
                </span>
              </h3>
              <p className="text-xs font-bold text-green-600 mt-0.5">
                {cards.materials.aman}{" "}
                <span className="text-[10px] font-medium text-neutral-400">
                  Aktif Aman
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  ACTIVE
                </p>
              </div>
              <p className="text-xs font-bold text-neutral-400 mb-1">
                Laporan Daur Ulang
              </p>
              <h3 className="text-2xl font-black text-brand-dark-500">
                {cards.recycle.aktif}{" "}
                <span className="text-xs font-normal text-neutral-400">
                  Permintaan
                </span>
              </h3>
              <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-1">
                PENDING APPROVAL
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <BookOpen className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  CONTENT
                </p>
              </div>
              <p className="text-xs font-bold text-neutral-400 mb-1">
                Manajemen Artikel
              </p>
              <h3 className="text-2xl font-black text-brand-dark-500">
                3{" "}
                <span className="text-xs font-normal text-neutral-400">
                  Artikel Terbit
                </span>
              </h3>
              <p className="text-xs font-medium text-neutral-400 mt-1">
                Artikel Terbit
              </p>
            </div>
          </div>
        </div>

        {/* ROW 2: GRAFIK ANALITIK WIDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
          <div className="lg:col-span-2 bg-white p-6 rounded-[35px] border border-neutral-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-black text-brand-dark-500">
                  Aktivitas Operasional Mingguan
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Perbandingan Sampah Daur Ulang (Kg) vs Volume Order
                </p>
              </div>
              <select className="text-xs font-bold border border-neutral-200 rounded-xl p-2 bg-neutral-50 outline-none">
                <option>7 Hari Terakhir</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { font: { weight: "bold", size: 11 } },
                    },
                  },
                  scales: {
                    y: {
                      min: 0,
                      ticks: {
                        stepSize: 5,
                        precision: 0,
                        font: { weight: "bold" },
                      },
                      grid: { color: "rgba(0, 0, 0, 0.05)" },
                    },
                    x: {
                      ticks: { font: { weight: "bold" } },
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[35px] border border-neutral-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-brand-dark-500">
                Distribusi Produk
              </h3>
              <p className="text-xs text-neutral-400 font-medium mb-4">
                Proporsi Kategori Terbanyak
              </p>
            </div>

            <div className="h-48 flex items-center justify-center relative my-auto">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
              <div className="absolute flex flex-col items-center justify-center">
                <p className="text-3xl font-black text-brand-dark-500 tracking-tight">
                  {nilaiTertinggi}%
                </p>
                <p className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest text-center max-w-[100px] truncate">
                  {kategoriUtama}
                </p>
              </div>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-2.5 mt-6 pt-2 border-t border-neutral-50">
              {isDatabaseKosong ? (
                <p className="text-xs font-bold text-neutral-400 text-center py-4 uppercase tracking-wider">
                  Katalog Produk Kosong
                </p>
              ) : (
                labelKategori.map((name, index) => (
                  <div
                    key={name}
                    className="flex justify-between items-center text-xs font-bold"
                  >
                    <p className="flex items-center gap-2 text-neutral-500">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            warnaChart[index % warnaChart.length],
                        }}
                      ></span>
                      {name}
                    </p>
                    <p className="text-brand-dark-500 font-black">
                      {nilaiKategori[index]}%
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ROW 3: TABEL DATA OPERASIONAL REAL-TIME */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. TABEL DATA JEMPUT SAMPAH (DINAMIS) */}
          <div className="bg-white p-6 rounded-[35px] border border-neutral-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-brand-dark-500 uppercase tracking-wider">
                Permintaan Penjemputan Terbaru
              </h3>
              <button
                onClick={() => navigate("/admin/laporan-daur-ulang")}
                className="text-xs font-bold text-[#3D5532] flex items-center gap-0.5 hover:underline"
              >
                Saring Detail <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-50 text-neutral-400 font-bold uppercase text-[9px] tracking-wider">
                    <th className="py-2.5">User Name</th>
                    <th className="py-2.5">Berat Estimasi</th>
                    <th className="py-2.5">Tanggal Lapor</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 font-bold text-neutral-600">
                  {stats?.laporanTerbaru && stats.laporanTerbaru.length > 0 ? (
                    stats.laporanTerbaru.slice(0, 3).map((item) => (
                      <tr key={item.id_laporan}>
                        <td className="py-3 font-black text-brand-dark-500 uppercase">
                          {item.penulis_laporan?.username || "Guest"}
                        </td>
                        <td className="py-3 text-neutral-400">
                          {item.estimasi_berat || "0"}
                        </td>
                        <td className="py-3 text-neutral-400">
                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                              item.status_jemput === "selesai"
                                ? "bg-green-50 text-green-600"
                                : item.status_jemput === "sedang_dijemput"
                                  ? "bg-blue-50 text-blue-500"
                                  : "bg-amber-50 text-amber-500"
                            }`}
                          >
                            {item.status_jemput?.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-neutral-400 uppercase text-[10px] tracking-wider"
                      >
                        Belum ada pengiriman masuk
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. TABEL DATA TRANSAKSI CHECKOUT TOKO (DINAMIS) */}
          <div className="bg-white p-6 rounded-[35px] border border-neutral-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-brand-dark-500 uppercase tracking-wider">
                Order Toko Terbaru
              </h3>
              <button
                onClick={() => navigate("/admin/manajemen-pemesanan")}
                className="text-xs font-bold text-[#3D5532] flex items-center gap-0.5 hover:underline"
              >
                Kelola Order <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-50 text-neutral-400 font-bold uppercase text-[9px] tracking-wider">
                    <th className="py-2.5">Customer</th>
                    <th className="py-2.5">Aktivitas Belanja</th>
                    <th className="py-2.5">Tanggal</th>
                    <th className="py-2.5 text-right">Total Transaksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 font-bold text-neutral-600">
                  {stats?.orderTerbaru && stats.orderTerbaru.length > 0 ? (
                    stats.orderTerbaru.slice(0, 3).map((item) => (
                      <tr key={item.id_riwayat}>
                        <td className="py-3 font-black text-brand-dark-500 uppercase">
                          {item.pembeli?.username || "Guest"}
                        </td>
                        <td className="py-3 text-neutral-500 max-w-[150px] truncate">
                          {item.aktivitas?.replace("Belanja: ", "") ||
                            "Pembelian Produk"}
                        </td>
                        <td className="py-3 text-neutral-400">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3 text-right font-black text-green-600">
                          Rp {(item.jumlah_saldo || 0).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-neutral-400 uppercase text-[10px] tracking-wider"
                      >
                        Belum ada riwayat pesanan produk
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
