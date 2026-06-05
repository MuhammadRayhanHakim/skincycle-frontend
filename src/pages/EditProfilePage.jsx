import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Bell,
  Shield,
  Eye,
  Save,
  Trash2,
  Camera,
  UserCheck,
  Sparkles,
} from "lucide-react";

const EditProfilePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State form terikat langsung dengan data prop 'user'
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  // State untuk kontrol manajemen upload gambar baru
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Inisialisasi data form ketika prop user berhasil termuat
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      });
      if (user.foto_profil) {
        setAvatarPreview(`http://localhost:5000/uploads/${user.foto_profil}`);
      }
    }
  }, [user]);

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
        tag.id === id ? { ...tag, active: !tag.active } : tag,
      ),
    );
  };

  // Menangani penangkapan file saat user memilih foto dari komputernya
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Tampilkan preview lokal instan
    }
  };

  // Menghapus foto pratinjau yang baru dipilih
  const handleRemovePhoto = async () => {
    if (!user?.foto_profil && !avatarFile) {
      alert("Anda belum mengunggah foto profil apapun.");
      return;
    }

    const profileId = user?.id_profil || user?.id;
    if (!profileId) {
      alert("Sesi tidak valid, ID tidak ditemukan.");
      return;
    }

    if (window.confirm("Apakah Anda yakin ingin menghapus foto profil ini?")) {
      try {
        const token = localStorage.getItem("token");
        // 🔗 PASTIKAN url menembak endpoint baru ini dengan benar:
        const response = await fetch(
          `http://localhost:5000/api/profile/${profileId}/photo`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (response.ok || result.status === "success") {
          alert("🗑️ Foto profil berhasil dihapus!");

          setAvatarFile(null);
          setAvatarPreview("");
          if (fileInputRef.current) fileInputRef.current.value = "";

          const updatedUser = {
            ...user,
            foto_profil: null, // Berubah menjadi null agar kembali memicu render inisial huruf "A"
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));

          if (setUser) {
            setUser(updatedUser);
          }
        } else {
          alert("Gagal menghapus foto profil: " + result.message);
        }
      } catch (error) {
        console.error("Error saat menghapus foto profil:", error);
        alert("Terjadi kesalahan sistem, pastikan server backend Anda aktif.");
      }
    }
  };

  // EKSEKUSI SAVE: Mengirim seluruh data ke Backend database via FormData
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      alert("Username tidak boleh kosong!");
      return;
    }

    // Ambil ID Akun/Profil pengguna aktif
    const profileId = user?.id_profil || user?.id;
    if (!profileId) {
      alert("Sesi pengguna tidak valid, ID tidak ditemukan.");
      return;
    }

    try {
      const dataPayload = new FormData();
      dataPayload.append("username", formData.username);
      dataPayload.append("bio", formData.bio);

      if (avatarFile) {
        dataPayload.append("foto_profil", avatarFile);
      }

      const response = await fetch(
        `http://localhost:5000/api/profile/${profileId}`,
        {
          method: "PUT",
          body: dataPayload, // Otomatis multipart/form-data
        },
      );

      const result = await response.json();

      if (response.ok || result.status === "success") {
        alert("🎉 Profil Berhasil Diperbarui!");

        // 1. Susun data user terbaru berdasarkan respons database
        const updatedUser = {
          ...user,
          username: result.data.username,
          bio: result.data.bio,
          foto_profil: result.data.foto_profil, // Nama file gambar baru dari backend
        };

        // 2. ✨ SOLUSI UTAMA: Perbarui localStorage agar saat di-refresh data tidak hilang!
        // Catatan: Sesuaikan nama key localStorage Anda jika bukan bernama "user" (misal: "userData", dll)
        const localUserData = localStorage.getItem("user");
        if (localUserData) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        // 3. Perbarui global state React agar komponen Navbar & Profile langsung berganti instan
        if (setUser) {
          setUser(updatedUser);
        }

        navigate("/profil");
      } else {
        alert("Gagal memperbarui profil: " + result.message);
      }
    } catch (error) {
      console.error("Error update profile:", error);
      alert("Terjadi masalah jaringan ke server backend.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary-100 py-10 px-6 lg:px-20 font-sans text-brand-dark-500">
      <div className="max-w-7xl mx-auto">
        {/* HEADER CONTROL BAR */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-sans text-brand-dark-500 tracking-tight">
              Pengaturan Profil
            </h1>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1 font-bold">
              Personalisasi identitas sirkular SkinCycle Anda
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/profil")}
            className="text-neutral-400 hover:text-brand-primary-300 font-bold text-sm transition-colors flex items-center gap-1.5 outline-none"
          >
            <X className="w-4 h-4" /> Tutup
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR KIRI: KREDENSIAL AVATAR & NAVIGATION */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100 text-center">
              {/* INPUT FILE TERSEMBUNYI */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* TAMPILAN FOTO AVATAR (IMG / INITIAL) */}
              <div className="w-32 h-32 bg-brand-primary-300 rounded-full mx-auto flex items-center justify-center text-neutral-default text-4xl font-sans font-bold border-4 border-brand-secondary-100 shadow-lg mb-6 overflow-hidden uppercase">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  formData.username.charAt(0) || "U"
                )}
              </div>

              <h3 className="text-xl font-sans font-black text-brand-dark-500 uppercase tracking-tight">
                {formData.username || "Guest"}
              </h3>
              <p className="text-[10px] text-brand-primary-300 mt-1 uppercase tracking-widest font-black flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Pahlawan Hijau
              </p>

              <div className="flex gap-2 mt-8">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex-1 bg-brand-primary-300 text-neutral-default py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary-500 transition-colors flex items-center justify-center gap-1 outline-none shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5" /> Ganti Foto
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex-1 border border-neutral-100 bg-neutral-50 text-neutral-400 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 hover:text-feedback-error-200 transition-colors flex items-center justify-center gap-1 outline-none"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>

            {/* Sub-Panel Opsi Akun */}
            <div className="bg-neutral-default rounded-[40px] p-6 shadow-sm border border-neutral-100">
              <p className="text-[10px] font-black text-neutral-300 uppercase mb-4 tracking-widest pl-4">
                Pengaturan Akun
              </p>
              <nav className="space-y-1">
                {[
                  {
                    text: "Notifikasi",
                    icon: <Bell className="w-3.5 h-3.5" />,
                  },
                  {
                    text: "Keamanan",
                    icon: <Shield className="w-3.5 h-3.5" />,
                  },
                  {
                    text: "Privasi & Data",
                    icon: <Eye className="w-3.5 h-3.5" />,
                  },
                ].map((item) => (
                  <button
                    key={item.text}
                    type="button"
                    className="w-full text-left px-5 py-3 text-[11px] font-bold text-neutral-400 hover:bg-brand-secondary-100/50 hover:text-brand-primary-300 rounded-2xl transition-all uppercase flex items-center gap-2.5 outline-none"
                  >
                    <span className="opacity-70">{item.icon}</span> {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* AREA UTAMA: FORM ISIAN INTERNAL */}
          <div className="lg:col-span-8 bg-neutral-default rounded-[50px] p-10 shadow-sm border border-neutral-100 flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-50">
              <h3 className="text-xl font-sans text-brand-dark-500">
                Informasi Pribadi
              </h3>
              <span className="text-[10px] bg-brand-primary-100/30 text-brand-primary-300 px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-brand-primary-300" /> Akun
                Terverifikasi
              </span>
            </div>

            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Field: Username */}
                <div>
                  <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-100 text-brand-dark-500 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-brand-primary-300 outline-none transition-all"
                    required
                  />
                </div>

                {/* Input Field: Email Locked (Sesuai Desain & Keamanan Auth, Email Tidak Bisa Diubah Kasat Mata) */}
                <div>
                  <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-brand-secondary-100/40 border border-neutral-100 rounded-2xl p-4 text-xs text-neutral-400 font-medium outline-none cursor-not-allowed shadow-inner"
                  />
                </div>
              </div>

              {/* Input Field: Biografi Textarea */}
              <div>
                <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
                  Biografi
                </label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-100 text-brand-dark-500 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-brand-primary-300 outline-none resize-none leading-relaxed transition-all"
                />
              </div>

              {/* Target Karakteristik Kulit Pilihan */}
              <div>
                <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-4 block tracking-widest">
                  Skin Profile & Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {skinTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-5 py-2.5 rounded-full text-[10px] font-bold transition-all border outline-none tracking-wide uppercase ${
                        tag.active
                          ? "bg-brand-primary-300 text-neutral-default border-transparent shadow-sm"
                          : "bg-neutral-default text-neutral-400 border-neutral-100 hover:border-brand-primary-200 hover:text-brand-primary-300"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Actions Footer Buttons */}
              <div className="pt-10 mt-auto flex justify-end gap-4 items-center">
                <button
                  type="button"
                  onClick={() => navigate("/profil")}
                  className="px-8 py-4 bg-neutral-default text-neutral-400 border border-neutral-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#3a5b22]/30 hover:text-[#3a5b22] transition-all outline-none"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  className="px-10 py-4 bg-brand-primary-300 text-neutral-default rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none active:scale-98"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan Perubahan
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
