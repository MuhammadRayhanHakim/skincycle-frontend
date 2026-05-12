import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditProfilePage = ({ user, setUser }) => {
  // 1. Inisialisasi navigate untuk kembali ke halaman profil
  const navigate = useNavigate();

  // State untuk form (Disinkronkan dengan data user yang login)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "0812-3456-7890", 
    bio: "Penggemar skincare yang sedang menjalani gaya hidup hijau zero-waste. Mari bersama membuat kecantikan lebih baik untuk bumi.",
  });

  // State untuk Skin Profile Tags
  const [skinTags, setSkinTags] = useState([
    { id: 1, label: "Kulit Berminyak", active: true },
    { id: 2, label: "Anti-Penuaan", active: true },
    { id: 3, label: "Jerawat", active: true },
    { id: 4, label: "Sensitif", active: false },
    { id: 5, label: "Kusam", active: false },
  ]);

  const toggleTag = (id) => {
    setSkinTags(
      skinTags.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag
      )
    );
  };

  const handleSave = () => {
    // Di sini nantinya kamu akan panggil fetch ke API Backend
    alert("Profil Berhasil Diperbarui!");
    // 2. Gunakan navigate untuk kembali ke halaman profil setelah simpan
    navigate("/profil");
  };

  return (
    <div className="min-h-screen bg-[#F2EDE4] py-10 px-6 lg:px-20 font-sans text-[#1e2b19]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#3D5532]">
              Pengaturan Profil
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
              Personalisasi identitas SkinCycle Anda
            </p>
          </div>
          <button
            // 3. Ganti setPage dengan navigate
            onClick={() => navigate("/profil")}
            className="text-gray-400 hover:text-[#3D5532] font-bold text-sm transition-colors"
          >
            ✕ Tutup
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR KIRI */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-32 h-32 bg-[#3D5532] rounded-full mx-auto flex items-center justify-center text-white text-4xl font-serif font-bold border-4 border-[#F2EDE4] shadow-lg mb-6 overflow-hidden uppercase">
                {formData.username.charAt(0)}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {formData.username}
              </h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest italic">
                Pahlawan Hijau
              </p>

              <div className="flex gap-2 mt-8">
                <button className="flex-1 bg-[#3D5532] text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#2d4025] transition-all">
                  Ganti Foto
                </button>
                <button className="flex-1 border border-gray-100 text-gray-400 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Hapus
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100">
              <p className="text-[10px] font-black text-gray-300 uppercase mb-4 tracking-widest pl-4">
                Pengaturan Akun
              </p>
              <nav className="space-y-1">
                {["Notifikasi", "Keamanan", "Privasi & Data", "Riwayat"].map(
                  (item) => (
                    <button
                      key={item}
                      className="w-full text-left px-5 py-3 text-[11px] font-bold text-gray-500 hover:bg-[#F2EDE4]/50 hover:text-[#3D5532] rounded-2xl transition-all uppercase"
                    >
                      {item}
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>

          {/* AREA UTAMA */}
          <div className="lg:col-span-8 bg-white rounded-[50px] p-10 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
              <h3 className="text-xl font-serif font-bold text-[#1e2b19]">
                Informasi Pribadi
              </h3>
              <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase">
                Akun Terverifikasi
              </span>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-[#F9F9F7] border-none rounded-2xl p-4 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-[#F2EDE4]/30 border-none rounded-2xl p-4 text-xs text-gray-400 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">
                  Biografi
                </label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full bg-[#F9F9F7] border-none rounded-2xl p-4 text-xs focus:ring-2 focus:ring-[#3D5532] outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-4 block tracking-widest">
                  Skin Profile & Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {skinTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-5 py-2 rounded-full text-[10px] font-bold transition-all border ${
                        tag.active
                          ? "bg-[#3D5532] text-white border-[#3D5532]"
                          : "bg-white text-gray-400 border-gray-100 hover:border-[#3D5532]"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-10 mt-auto flex justify-end gap-4">
                <button
                  type="button"
                  // 4. Ganti setPage dengan navigate
                  onClick={() => navigate("/profil")}
                  className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#1e2b19] transition-colors"
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-10 py-4 bg-[#3D5532] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-[#2d4025] transition-all transform active:scale-95"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;