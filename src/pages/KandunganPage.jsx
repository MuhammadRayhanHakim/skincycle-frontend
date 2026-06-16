import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const KandunganPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchIngredients = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/kandungan?search=${search}`);
      const result = await response.json();
      if (result.status === "success") {
        setIngredients(result.data || []);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Data Tidak Tersedia",
          text: "Gagal memuat pustaka kandungan dari server.",
          confirmButtonColor: "#3D5532",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Gagal memuat data perpustakaan kandungan:", error);
      Swal.fire({
        icon: "error",
        title: "Koneksi Bermasalah",
        text: "Tidak dapat terhubung ke server. Pastikan backend menyala.",
        confirmButtonColor: "#3D5532",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchIngredients(); }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      Swal.fire({
        icon: "info",
        title: "Masukkan Kata Kunci",
        text: "Ketik nama bahan, manfaat, atau masalah kulit yang ingin dicari.",
        confirmButtonColor: "#3D5532",
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }
    fetchIngredients(searchQuery);
  };

  const filteredIngredients = ingredients.filter((ing) => {
    if (activeFilter === "Semua") return true;
    return ing.kategori_bahan?.toLowerCase() === activeFilter.toLowerCase();
  });

  const featuredIngredient = ingredients[0];

  const handleOpenModal = (ing) => {
    setSelectedIngredient(ing);
    setShowModal(true);
  };

  return (
    <div className="bg-brand-secondary-100 min-h-[calc(100vh-64px)] font-sans text-brand-dark-500 py-12 px-6 lg:px-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-4xl font-marcellus text-brand-dark-500 mb-3 tracking-tight">Perpustakaan Kandungan</h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-medium">
            Ensiklopedia terkurasi mengenai senyawa bioaktif dan ekstrak botani yang menggabungkan efektivitas klinis dengan ketenangan alami.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between max-w-7xl mx-auto border-b border-neutral-200/50 pb-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-2/5">
            <input
              type="text"
              placeholder="Cari kandungan, manfaat, atau masalah kulit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 bg-neutral-default border border-neutral-100 rounded-2xl text-xs font-medium text-neutral-700 outline-none focus:border-brand-primary-300 shadow-sm transition-all placeholder-neutral-300"
            />
            <button type="submit" className="absolute right-4 top-3.5 text-neutral-400 hover:text-brand-primary-300 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-3/5">
            {[
              { id: "Semua", label: "Semua" },
              { id: "Anti-Aging", label: "Anti-Penuaan" },
              { id: "Hydrating", label: "Hidrasi" },
              { id: "Brightening", label: "Mencerahkan" },
              { id: "Eksfoliasi", label: "Eksfoliasi" },
              { id: "Acne Care", label: "Jerawat" },
              { id: "Soothing", label: "Menenangkan" },
              // { id: "Barrier Repair", label: "Perbaikan Barier" },
              // { id: "Moisturizing", label: "Melembabkan" },
            ].map((filter) => {
              const isSelected = activeFilter.toLowerCase() === filter.id.toLowerCase();
              return (
                <button key={filter.id} type="button" onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-black transition-all duration-300 outline-none shadow-sm ${isSelected ? "bg-brand-primary-300 text-neutral-default" : "bg-neutral-default text-neutral-400 border border-neutral-100 hover:border-brand-primary-100 hover:text-brand-primary-300"}`}>
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Card */}
        {activeFilter === "Semua" && !searchQuery && featuredIngredient && (
          <div onClick={() => handleOpenModal(featuredIngredient)}
            className="w-full bg-neutral-default rounded-[45px] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto group items-center">
            <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-2">
                <span className="bg-brand-primary-100/40 text-brand-primary-300 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">UNGGULAN</span>
                <span className="bg-neutral-50 border border-neutral-100 text-neutral-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {featuredIngredient.kategori_bahan || "Senyawa Aktif"}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-marcellus text-brand-dark-500 tracking-tight">
                  {featuredIngredient.nama_kandungan || featuredIngredient.nama_bahan}
                </h2>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-medium font-sans pr-4 line-clamp-3">
                  {featuredIngredient.fungsi || featuredIngredient.ringkasan}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {(featuredIngredient.jenis_kulit_cocok || "Semua Tipe Kulit").split(",").slice(0, 3).map((skin, i) => (
                  <span key={i} className="text-[9px] font-black bg-neutral-50 border border-neutral-100 text-neutral-500 px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-brand-primary-300" /> {skin.trim()}
                  </span>
                ))}
              </div>
              <div className="pt-1">
                <button type="button" className="bg-brand-primary-300 text-neutral-default px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-md group-hover:bg-brand-primary-500 transition-colors outline-none">
                  Lihat Detail Lengkap <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 h-[300px] md:h-[340px] lg:max-h-[340px] w-full overflow-hidden relative bg-neutral-50 lg:rounded-r-[45px]">
              <img src={`http://localhost:5000/uploads/${featuredIngredient.gambar_bahan || "default-ing.jpg"}`}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700" alt="Featured Ingredient" />
            </div>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col justify-center items-center gap-2 text-neutral-400 text-xs font-bold">
            <Loader2 className="w-6 h-6 animate-spin text-brand-primary-300" /> Menyinkronkan pustaka botani...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIngredients.map((ing) => {
              if (activeFilter === "Semua" && !searchQuery && ing.id_kandungan === featuredIngredient?.id_kandungan) return null;
              return (
                <div key={ing.id_kandungan} onClick={() => handleOpenModal(ing)}
                  className="bg-neutral-default rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl border border-neutral-50 hover:border-brand-primary-100/30 cursor-pointer transition-all duration-500 flex flex-col group h-full">
                  <div className="h-44 overflow-hidden bg-neutral-50 relative border-b border-neutral-50">
                    <img src={`http://localhost:5000/uploads/${ing.gambar_bahan || "default-ing.jpg"}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" alt={ing.nama_kandungan} />
                    <div className="absolute bottom-3 right-3 bg-neutral-default/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[8px] font-black text-brand-primary-300 tracking-widest uppercase shadow-sm">
                      {ing.kategori_bahan || "Senyawa"}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors uppercase tracking-tight">
                        {ing.nama_kandungan || ing.nama_bahan}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-medium line-clamp-2 italic">{ing.fungsi || ing.ringkasan}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(ing.jenis_kulit_cocok || "Semua Kulit").split(",").slice(0, 2).map((skin, i) => (
                        <span key={i} className="text-[8px] font-black bg-neutral-50 border border-neutral-100 text-neutral-400 px-2 py-1 rounded-md uppercase tracking-wide">{skin.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredIngredients.length === 0 && !isLoading && (
          <div className="py-20 text-center border border-dashed border-neutral-200 rounded-[30px] max-w-xl mx-auto bg-neutral-default/40">
            <p className="text-neutral-400 italic font-medium text-xs">Bahan kosmetik yang Anda cari tidak ditemukan dalam pustaka ekosistem SkinCycle.</p>
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto bg-brand-primary-100/20 p-6 md:p-8 rounded-[40px] border border-brand-primary-100/30 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark-500">Komitmen Sumber Bahan Kami</h3>
            <p className="text-xs text-neutral-400 mt-1 font-medium font-sans">Setiap kandungan dalam perpustakaan kami telah dipilih dengan mempertimbangkan dampak lingkungan dan proses panen yang etis.</p>
          </div>
          <div className="flex items-center gap-3 bg-neutral-default px-5 py-3 rounded-2xl border border-neutral-100 shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-feedback-success-200 animate-pulse"></span>
            <span className="text-[10px] font-black text-brand-primary-300 uppercase tracking-wider">100% Vegan & Bebas Uji Coba Hewan</span>
          </div>
        </div>

        {/* Modal Detail */}
        {showModal && selectedIngredient && (
          <div className="fixed inset-0 bg-brand-dark-500/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-neutral-default w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-neutral-100 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
              <div className="md:col-span-4 bg-neutral-50 p-8 border-r border-neutral-100 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-1">Profil Kandungan</span>
                  <h2 className="text-2xl font-marcellus text-brand-dark-500 mb-6 uppercase tracking-tight">
                    {selectedIngredient.nama_kandungan || selectedIngredient.nama_bahan}
                  </h2>
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-neutral-default border p-1 shadow-sm">
                    <img src={`http://localhost:5000/uploads/${selectedIngredient.gambar_bahan || "default-ing.jpg"}`}
                      className="w-full h-full object-cover rounded-xl" alt="Img Detail" />
                  </div>
                  <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-wider mb-2">Ringkasan Fungsi</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium mb-6 italic">
                    {selectedIngredient.ringkasan || selectedIngredient.fungsi}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2.5">Jenis Kulit Cocok</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedIngredient.jenis_kulit_cocok || "Semua Kulit").split(",").map((skin, idx) => (
                      <span key={idx} className="bg-neutral-default border border-neutral-200 text-neutral-500 text-[9px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 bg-brand-primary-300 rounded-full"></span>{skin.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 p-8 flex flex-col justify-between overflow-y-auto relative">
                <button type="button" onClick={() => { setShowModal(false); setSelectedIngredient(null); }}
                  className="absolute top-6 right-6 text-neutral-400 hover:text-brand-primary-300 font-bold text-xs bg-neutral-50 w-8 h-8 rounded-full flex items-center justify-center border border-neutral-100 transition-colors shadow-sm outline-none">✕</button>

                <div className="space-y-6 pr-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-brand-secondary-300 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0 border border-brand-secondary-200">🧪</div>
                    <div>
                      <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-1.5">Fungsi Utama Selular</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed font-medium font-sans">{selectedIngredient.fungsi}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-brand-secondary-300 text-brand-primary-300 flex items-center justify-center font-bold text-sm shrink-0 border border-brand-secondary-200">✨</div>
                    <div className="w-full">
                      <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2.5">Manfaat Efektif</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(selectedIngredient.manfaat || "Optimalisasi proteksi jaringan").split(",").map((manfaat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-bold text-neutral-600 font-sans">
                            <span className="text-brand-primary-300 font-black">✓</span>
                            <span>{manfaat.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex gap-4 items-start mt-4 shadow-inner">
                    <div className="w-5 h-5 rounded-full text-xs shrink-0 mt-0.5 font-bold">⚠️</div>
                    <div>
                      <h4 className="text-xs font-black text-brand-dark-500 mb-1 uppercase tracking-wide">Catatan Keamanan & Efek Samping</h4>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-medium font-sans">
                        {selectedIngredient.efek_samping || "Senyawa tergolong aman tinggi dan minim kontraindikasi medis."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 text-right text-[9px] font-black text-neutral-300 uppercase tracking-widest">
                  SkinCycle Botanical Content Library
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KandunganPage;