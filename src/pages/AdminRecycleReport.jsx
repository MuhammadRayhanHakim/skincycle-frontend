import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SidebarAdmin from "../components/SidebarAdmin";
import Swal from "sweetalert2"; // 🚀 IMPORT SWEETALERT2
import {
  CheckCircle2,
  Clock,
  Inbox,
  FileText,
  Check,
  X,
  Award,
  Banknote,
  MapPin,
  Scale,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

const AdminRecycleReport = () => {
  const [laporan, setLaporan] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [saldoInput, setSaldoInput] = useState("");
  const [beratAsliInput, setBeratAsliInput] = useState("");
  const [isKonfirmasiPengepul, setIsKonfirmasiPengepul] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchLaporan = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/all-laporan",
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
        setLaporan(result.data);
        if (selectedLaporan) {
          const dataTerbaru = result.data.find(
            (item) => item.id_laporan === selectedLaporan.id_laporan,
          );
          if (dataTerbaru) setSelectedLaporan(dataTerbaru);
        } else if (result.data.length > 0 && !selectedLaporan) {
          const defaultSelect = result.data.find(
            (item) => item.status_jemput !== "selesai",
          );
          setSelectedLaporan(defaultSelect || result.data[0]);
        }
      }
    } catch (error) {
      console.error("Gagal sinkronisasi data:", error);
      // 🚀 SWEETALERT: Error fetch laporan
      Swal.fire({
        title: "Koneksi Gagal",
        text: "Tidak dapat memuat data laporan. Pastikan server backend aktif.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedLaporan]);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const handleVerify = async () => {
    if (!selectedLaporan) return;
    setIsActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/verify-recycle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id_laporan: selectedLaporan.id_laporan }),
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        // 🚀 SWEETALERT: Mengganti alert(result.message) kaku menjadi modal premium
        Swal.fire({
          title: "Verifikasi Berhasil!",
          text: result.message,
          icon: "success",
          confirmButtonColor: "#3d5532",
          customClass: { popup: "rounded-[30px]" },
        });

        const statusSelesaiVerifikasi = "sedang_dijemput";
        setSelectedLaporan((prev) => ({
          ...prev,
          status_jemput: statusSelesaiVerifikasi,
        }));
        setLaporan((prevList) =>
          prevList.map((item) =>
            item.id_laporan === selectedLaporan.id_laporan
              ? { ...item, status_jemput: statusSelesaiVerifikasi }
              : item,
          ),
        );
        await fetchLaporan();
      } else {
        // 🚀 SWEETALERT: Jika server merespons gagal
        Swal.fire({
          title: "Verifikasi Gagal",
          text: result.message || "Terjadi kesalahan saat memproses verifikasi.",
          icon: "error",
          confirmButtonColor: "#3d5532",
        });
      }
    } catch (error) {
      console.error(error);
      // 🚀 SWEETALERT: Error koneksi saat verifikasi
      Swal.fire({
        title: "Koneksi Terputus",
        text: "Gagal terhubung ke server. Pastikan backend aktif.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleKirimSaldoFinal = async (e) => {
    e.preventDefault();

    // 🚀 SWEETALERT: Mengganti return alert() validasi berat — sebelumnya kaku
    if (!beratAsliInput || parseFloat(beratAsliInput) <= 0) {
      Swal.fire({
        title: "Input Tidak Valid",
        text: "Silakan masukkan berat fisik asli timbangan yang valid.",
        icon: "warning",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    // 🚀 SWEETALERT: Mengganti return alert() validasi nominal saldo
    if (!saldoInput || parseInt(saldoInput) <= 0) {
      Swal.fire({
        title: "Nominal Tidak Valid",
        text: "Nominal saldo yang dimasukkan tidak valid. Harap isi dengan angka yang benar.",
        icon: "warning",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    // 🚀 SWEETALERT: Mengganti return alert() validasi konfirmasi pengepul
    if (!isKonfirmasiPengepul) {
      Swal.fire({
        title: "Konfirmasi Diperlukan",
        text: "Aktifkan saklar konfirmasi pengepul sebelum mengirimkan saldo.",
        icon: "warning",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    setIsActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/admin/final-recycle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_laporan: selectedLaporan.id_laporan,
            saldo_final: parseInt(saldoInput),
            berat_asli: `${beratAsliInput} kg`,
          }),
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        // 🚀 SWEETALERT: Mengganti alert("Sukses! " + result.message) dengan modal premium
        // State reset dan refetch dilakukan setelah tombol "OK" ditekan agar UX terasa natural
        Swal.fire({
          title: "Saldo Berhasil Dikirim!",
          text: result.message,
          icon: "success",
          confirmButtonColor: "#3d5532",
          confirmButtonText: "Selesai",
          customClass: { popup: "rounded-[30px]" },
        }).then(async () => {
          setShowModal(false);
          setSaldoInput("");
          setBeratAsliInput("");
          setIsKonfirmasiPengepul(false);
          setSelectedLaporan(null);
          await fetchLaporan();
        });
      } else {
        // 🚀 SWEETALERT: Jika server merespons gagal saat kirim saldo
        Swal.fire({
          title: "Pengiriman Saldo Gagal",
          text: result.message || "Terjadi kesalahan saat mengirimkan saldo.",
          icon: "error",
          confirmButtonColor: "#3d5532",
        });
      }
    } catch (error) {
      console.error(error);
      // 🚀 SWEETALERT: Error koneksi saat kirim saldo
      Swal.fire({
        title: "Koneksi Terputus",
        text: "Gagal terhubung ke server. Pastikan backend aktif.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const antreanAktif = laporan.filter(
    (item) =>
      item.status_jemput === "menunggu_verifikasi" ||
      item.status_jemput === "sedang_dijemput",
  );
  const daftarLaporanSelesai = laporan.filter(
    (item) => item.status_jemput === "selesai",
  );

  const latPeta = selectedLaporan?.latitude
    ? parseFloat(selectedLaporan.latitude)
    : null;
  const lngPeta = selectedLaporan?.longitude
    ? parseFloat(selectedLaporan.longitude)
    : null;

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans relative text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500 font-bold">
              Laporan Daur Ulang
            </h1>
            <p className="text-sm text-neutral-400 font-medium mt-0.5">
              Verifikasi kontribusi lingkungan dari pengguna sirkular SkinCycle.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          {/* ANTREAN LIST KIRI */}
          <div className="lg:col-span-4 bg-neutral-default p-6 rounded-[35px] shadow-sm border border-neutral-100 h-fit">
            <h3 className="font-black mb-6 text-[10px] flex justify-between items-center text-neutral-400 uppercase tracking-widest">
              Permintaan Terbaru <Clock className="w-4 h-4 text-neutral-300" />
              <span className="bg-brand-primary-300 text-white px-2.5 py-0.5 rounded-full font-sans font-black">
                {antreanAktif.length}
              </span>
            </h3>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {antreanAktif.length > 0 ? (
                antreanAktif.map((item) => (
                  <div
                    key={item.id_laporan}
                    onClick={() => setSelectedLaporan(item)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                      selectedLaporan?.id_laporan === item.id_laporan
                        ? "bg-brand-primary-100/20 border-brand-primary-300 shadow-inner"
                        : "bg-neutral-50 border-transparent hover:border-neutral-100"
                    }`}
                  >
                    <p className="text-xs font-black text-brand-primary-500 uppercase tracking-tight">
                      {item.penulis_laporan?.username || "User Anonim"}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-bold text-neutral-400">
                        ⚖️ {item.estimasi_berat}
                      </p>
                      <span
                        className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                          item.status_jemput === "sedang_dijemput"
                            ? "bg-blue-50 text-blue-500 border border-blue-100"
                            : "bg-feedback-warning-100 text-feedback-warning-300"
                        }`}
                      >
                        {item.status_jemput?.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                  <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">
                    Tidak ada antrean aktif
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* MONITOR PANEL DETAIL VERIFIKASI (KANAN) */}
          <div className="lg:col-span-8 bg-neutral-default rounded-[45px] shadow-sm border border-neutral-100 h-fit overflow-hidden">
            {selectedLaporan ? (
              <>
                <div className="px-10 py-6 border-b border-neutral-100 bg-neutral-default/50 flex justify-between items-center">
                  <h2 className="text-xl font-sans font-bold text-brand-dark-500 tracking-tight">
                    Detail Laporan Penjemputan
                  </h2>
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-bold border tracking-wide font-sans ${
                      selectedLaporan.status_jemput === "sedang_dijemput"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : selectedLaporan.status_jemput === "selesai"
                          ? "bg-brand-primary-100/20 text-brand-primary-300 border-brand-primary-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {selectedLaporan.status_jemput === "sedang_dijemput"
                      ? "Sedang Dijemput"
                      : selectedLaporan.status_jemput === "selesai"
                        ? "Selesai"
                        : "Sedang Diproses"}
                  </span>
                </div>

                <div className="p-10 flex flex-col md:flex-row gap-10">
                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200 overflow-hidden shrink-0">
                          <img
                            src={
                              selectedLaporan.penulis_laporan?.foto_profil
                                ? `http://localhost:5000/uploads/profiles/${selectedLaporan.penulis_laporan.foto_profil}`
                                : "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus"
                            }
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-dark-500 leading-none mb-1">
                            {selectedLaporan.penulis_laporan?.username ||
                              "User"}
                          </h4>
                          <p className="text-[10px] text-neutral-400 font-medium">
                            ID User: #EC-{selectedLaporan.id_profil || "00000"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex gap-3 items-start">
                          <MapPin className="w-4 h-4 text-[#3D5532] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-brand-dark-500">
                              Alamat Penjemputan
                            </p>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-0.5">
                              {selectedLaporan.alamat_penjemputan}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <Scale className="w-4 h-4 text-[#3D5532] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-brand-dark-500">
                              Berat Sampah (Estimasi Karung)
                            </p>
                            <p className="text-base font-sans font-black text-[#3D5532] mt-0.5">
                              {selectedLaporan.estimasi_berat || "0 kg"}
                            </p>
                          </div>
                        </div>

                        <div className="w-full h-36 rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50 relative z-10 shadow-inner">
                          {latPeta && lngPeta ? (
                            <MapContainer
                              center={[latPeta, lngPeta]}
                              zoom={15}
                              scrollWheelZoom={false}
                              className="w-full h-full"
                              style={{ height: "100%", width: "100%" }}
                            >
                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                              <ChangeMapView center={[latPeta, lngPeta]} />
                              <Marker position={[latPeta, lngPeta]}>
                                <Popup>
                                  <span className="text-[10px] font-sans font-bold">
                                    Titik Lokasi
                                  </span>
                                </Popup>
                              </Marker>
                            </MapContainer>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-center p-4">
                              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                                📍 Koordinat GPS lokasi tidak tersedia
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-72 shrink-0 flex flex-col justify-between space-y-6">
                    <div>
                      <p className="text-xs font-bold text-brand-dark-500 mb-3">
                        Bukti Foto Sampah
                      </p>
                      <div className="w-full aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
                        {selectedLaporan.foto_bukti_fisik ? (
                          <img
                            src={`http://localhost:5000/uploads/${selectedLaporan.foto_bukti_fisik}`}
                            className="w-full h-full object-cover"
                            alt="Bukti Sampah User"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300 italic">
                            Tidak ada lampiran foto
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleVerify}
                          disabled={
                            selectedLaporan.status_jemput ===
                              "sedang_dijemput" ||
                            selectedLaporan.status_jemput === "selesai" ||
                            isActionLoading
                          }
                          className="flex-1 bg-[#3D5532] hover:bg-[#2b3c23] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all outline-none disabled:opacity-40"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Proses</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const matchNum =
                              selectedLaporan.estimasi_berat?.match(/[0-9.]+/);
                            setBeratAsliInput(matchNum ? matchNum[0] : "");
                            setShowModal(true);
                          }}
                          disabled={
                            selectedLaporan.status_jemput !==
                              "sedang_dijemput" || isActionLoading
                          }
                          className="flex-1 bg-white hover:bg-neutral-50 border border-[#3D5532] text-[#3D5532] py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all outline-none disabled:opacity-30"
                        >
                          <Banknote className="w-4 h-4" />
                          <span>Kirim Saldo</span>
                        </button>
                      </div>

                      <p className="text-[10px] leading-relaxed text-neutral-400 italic font-medium text-center px-1">
                        Admin dapat memberikan saldo setelah sampah diverifikasi
                        oleh pengepul.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full py-28 text-center text-neutral-300 text-xs italic font-bold flex flex-col items-center justify-center gap-2">
                <FileText className="w-8 h-8 opacity-40" />
                Silakan pilih antrean aktif di sebelah kiri untuk melihat detail
                laporan.
              </div>
            )}
          </div>
        </div>

        {/* --- DATA ARSIP SELESAI --- */}
        <div className="bg-neutral-default p-8 rounded-[40px] shadow-sm border border-neutral-100 w-full mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand-dark-500 text-sm uppercase tracking-widest">
              Daftar Laporan Daur Ulang Selesai ✅
            </h3>
            <span className="text-[9px] font-black text-brand-primary-300 bg-brand-primary-100/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Total {daftarLaporanSelesai.length} Laporan Selesai
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
                  <th className="py-4 px-4">ID Laporan</th>
                  <th className="py-4 px-4">User</th>
                  <th className="py-4 px-4">Status Alur</th>
                  <th className="py-4 px-4">Berat</th>
                  <th className="py-4 px-4 text-right">Saldo Cair</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-xs font-semibold text-neutral-600">
                {daftarLaporanSelesai.length > 0 ? (
                  daftarLaporanSelesai.map((item) => (
                    <tr
                      key={item.id_laporan}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-brand-primary-300">
                        #RC-{item.id_laporan}
                      </td>
                      <td className="py-4 px-4 uppercase font-bold text-brand-dark-500">
                        {item.penulis_laporan?.username || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-[9px] font-black bg-brand-primary-100/20 text-brand-primary-300 border border-brand-primary-100/30 uppercase tracking-wider">
                          {item.status_jemput}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-neutral-500">
                        {item.berat_asli || "0 kg"}
                      </td>
                      <td className="py-4 px-4 text-right font-sans font-black text-feedback-success-300 text-sm">
                        +Rp{" "}
                        {parseInt(item.saldo_cair || 0).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 text-center text-neutral-400 italic text-[11px] font-bold uppercase tracking-wide"
                    >
                      Belum ada laporan daur ulang yang berstatus selesai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL POPUP FORM VERIFIKASI */}
        {showModal && selectedLaporan && (
          <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-neutral-default rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-neutral-100">
              <div className="p-6 border-b border-neutral-50 flex justify-between items-center bg-neutral-50">
                <h4 className="text-[12px] font-black text-brand-primary-300 uppercase italic tracking-wider">
                  Konfirmasi Penyerahan Sampah
                </h4>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-neutral-400 hover:text-brand-dark-500 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-brand-primary-100/10 p-4 rounded-2xl border border-brand-primary-100/20 mb-5 grid grid-cols-2 gap-y-3 text-[11px]">
                  <div>
                    <span className="text-neutral-400 font-bold block">
                      Target User
                    </span>
                    <p className="font-black text-brand-dark-500 uppercase">
                      {selectedLaporan.penulis_laporan?.username || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block">
                      Estimasi Karung
                    </span>
                    <p className="font-black text-neutral-400 italic">
                      {selectedLaporan.estimasi_berat}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-400 font-bold block">
                      Jenis Sampah
                    </span>
                    <p className="font-black text-brand-primary-300 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Plastik &amp; Kertas
                    </p>
                  </div>
                </div>

                <form onSubmit={handleKirimSaldoFinal}>
                  <div className="mb-4">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                      Berat Fisik Asli Timbangan (Kg)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={beratAsliInput}
                      onChange={(e) => setBeratAsliInput(e.target.value)}
                      placeholder="Masukkan berat riil timbangan asli (contoh: 2)..."
                      required
                      className="w-full px-4 py-3.5 bg-neutral-50 rounded-xl border border-transparent text-xs font-bold text-brand-dark-500 focus:outline-none focus:border-brand-primary-300"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
                      <Banknote className="w-3.5 h-3.5 text-brand-primary-300" />{" "}
                      Total Nilai Pencairan (Rp)
                    </label>
                    <input
                      type="number"
                      value={saldoInput}
                      onChange={(e) => setSaldoInput(e.target.value)}
                      placeholder="Masukkan jumlah saldo rupiah..."
                      required
                      className="w-full px-4 py-3.5 bg-neutral-50 rounded-xl border border-transparent text-xs font-bold text-brand-dark-500 focus:outline-none focus:border-brand-primary-300"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 mb-6">
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wide">
                      Fisik Diserahkan ke Pengepul
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isKonfirmasiPengepul}
                        onChange={(e) =>
                          setIsKonfirmasiPengepul(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-neutral-default after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-default after:border-neutral-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary-300"></div>
                    </label>
                  </div>

                  <div className="flex gap-3 border-t border-neutral-50 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-1/2 bg-neutral-50 text-neutral-400 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-neutral-100 outline-none"
                    >
                      Batalkan
                    </button>
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="w-1/2 bg-brand-primary-300 text-neutral-default py-3 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-md hover:bg-brand-primary-500 disabled:opacity-50 flex items-center justify-center gap-1 outline-none"
                    >
                      {isActionLoading ? (
                        "Mengirim..."
                      ) : (
                        <>
                          <span>Konfirmasi</span>
                          <Check className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRecycleReport;