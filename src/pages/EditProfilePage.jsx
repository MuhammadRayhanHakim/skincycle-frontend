// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   X,
//   Bell,
//   Shield,
//   Eye,
//   Save,
//   Trash2,
//   Camera,
//   UserCheck,
//   Sparkles,
// } from "lucide-react";

// const EditProfilePage = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   // State form terikat langsung dengan data prop 'user'
//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     email: user?.email || "",
//     bio: user?.bio || "",
//   });

//   // State untuk kontrol manajemen upload gambar baru
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState("");

//   // Inisialisasi data form ketika prop user berhasil termuat
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username || "",
//         email: user.email || "",
//         bio: user.bio || "",
//       });
//       if (user.foto_profil) {
//         setAvatarPreview(`http://localhost:5000/uploads/${user.foto_profil}`);
//       }
//     }
//   }, [user]);

//   // State untuk Skin Profile Tags
//   const [skinTags, setSkinTags] = useState([
//     { id: 1, label: "Kulit Berminyak", active: true },
//     { id: 2, label: "Anti-Penuaan", active: true },
//     { id: 3, label: "Jerawat", active: true },
//     { id: 4, label: "Sensitif", active: false },
//     { id: 5, label: "Kusam", active: false },
//   ]);

//   const toggleTag = (id) => {
//     setSkinTags(
//       skinTags.map((tag) =>
//         tag.id === id ? { ...tag, active: !tag.active } : tag,
//       ),
//     );
//   };

//   // Menangani penangkapan file saat user memilih foto dari komputernya
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setAvatarFile(file);
//       setAvatarPreview(URL.createObjectURL(file)); // Tampilkan preview lokal instan
//     }
//   };

//   // Menghapus foto pratinjau yang baru dipilih
//   const handleRemovePhoto = async () => {
//     if (!user?.foto_profil && !avatarFile) {
//       alert("Anda belum mengunggah foto profil apapun.");
//       return;
//     }

//     const profileId = user?.id_profil || user?.id;
//     if (!profileId) {
//       alert("Sesi tidak valid, ID tidak ditemukan.");
//       return;
//     }

//     if (window.confirm("Apakah Anda yakin ingin menghapus foto profil ini?")) {
//       try {
//         const token = localStorage.getItem("token");
//         // 🔗 PASTIKAN url menembak endpoint baru ini dengan benar:
//         const response = await fetch(
//           `http://localhost:5000/api/profile/${profileId}/photo`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         const result = await response.json();

//         if (response.ok || result.status === "success") {
//           alert("🗑️ Foto profil berhasil dihapus!");

//           setAvatarFile(null);
//           setAvatarPreview("");
//           if (fileInputRef.current) fileInputRef.current.value = "";

//           const updatedUser = {
//             ...user,
//             foto_profil: null, // Berubah menjadi null agar kembali memicu render inisial huruf "A"
//           };

//           localStorage.setItem("user", JSON.stringify(updatedUser));

//           if (setUser) {
//             setUser(updatedUser);
//           }
//         } else {
//           alert("Gagal menghapus foto profil: " + result.message);
//         }
//       } catch (error) {
//         console.error("Error saat menghapus foto profil:", error);
//         alert("Terjadi kesalahan sistem, pastikan server backend Anda aktif.");
//       }
//     }
//   };

//   // EKSEKUSI SAVE: Mengirim seluruh data ke Backend database via FormData
//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!formData.username.trim()) {
//       alert("Username tidak boleh kosong!");
//       return;
//     }

//     // Ambil ID Akun/Profil pengguna aktif
//     const profileId = user?.id_profil || user?.id;
//     if (!profileId) {
//       alert("Sesi pengguna tidak valid, ID tidak ditemukan.");
//       return;
//     }

//     try {
//       const dataPayload = new FormData();
//       dataPayload.append("username", formData.username);
//       dataPayload.append("bio", formData.bio);

//       if (avatarFile) {
//         dataPayload.append("foto_profil", avatarFile);
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/profile/${profileId}`,
//         {
//           method: "PUT",
//           body: dataPayload, // Otomatis multipart/form-data
//         },
//       );

//       const result = await response.json();

//       if (response.ok || result.status === "success") {
//         alert("🎉 Profil Berhasil Diperbarui!");

//         // 1. Susun data user terbaru berdasarkan respons database
//         const updatedUser = {
//           ...user,
//           username: result.data.username,
//           bio: result.data.bio,
//           foto_profil: result.data.foto_profil, // Nama file gambar baru dari backend
//         };

//         // 2. ✨ SOLUSI UTAMA: Perbarui localStorage agar saat di-refresh data tidak hilang!
//         // Catatan: Sesuaikan nama key localStorage Anda jika bukan bernama "user" (misal: "userData", dll)
//         const localUserData = localStorage.getItem("user");
//         if (localUserData) {
//           localStorage.setItem("user", JSON.stringify(updatedUser));
//         }

//         // 3. Perbarui global state React agar komponen Navbar & Profile langsung berganti instan
//         if (setUser) {
//           setUser(updatedUser);
//         }

//         navigate("/profil");
//       } else {
//         alert("Gagal memperbarui profil: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error update profile:", error);
//       alert("Terjadi masalah jaringan ke server backend.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-brand-secondary-100 py-10 px-6 lg:px-20 font-sans text-brand-dark-500">
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER CONTROL BAR */}
//         <div className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-3xl font-sans text-brand-dark-500 tracking-tight">
//               Pengaturan Profil
//             </h1>
//             <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1 font-bold">
//               Personalisasi identitas sirkular SkinCycle Anda
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() => navigate("/profil")}
//             className="text-neutral-400 hover:text-brand-primary-300 font-bold text-sm transition-colors flex items-center gap-1.5 outline-none"
//           >
//             <X className="w-4 h-4" /> Tutup
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* SIDEBAR KIRI: KREDENSIAL AVATAR & NAVIGATION */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="bg-neutral-default rounded-[40px] p-8 shadow-sm border border-neutral-100 text-center">
//               {/* INPUT FILE TERSEMBUNYI */}
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />

//               {/* TAMPILAN FOTO AVATAR (IMG / INITIAL) */}
//               <div className="w-32 h-32 bg-brand-primary-300 rounded-full mx-auto flex items-center justify-center text-neutral-default text-4xl font-sans font-bold border-4 border-brand-secondary-100 shadow-lg mb-6 overflow-hidden uppercase">
//                 {avatarPreview ? (
//                   <img
//                     src={avatarPreview}
//                     alt="Avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   formData.username.charAt(0) || "U"
//                 )}
//               </div>

//               <h3 className="text-xl font-sans font-black text-brand-dark-500 uppercase tracking-tight">
//                 {formData.username || "Guest"}
//               </h3>
//               <p className="text-[10px] text-brand-primary-300 mt-1 uppercase tracking-widest font-black flex items-center justify-center gap-1">
//                 <Sparkles className="w-3 h-3" /> Pahlawan Hijau
//               </p>

//               <div className="flex gap-2 mt-8">
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current.click()}
//                   className="flex-1 bg-brand-primary-300 text-neutral-default py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary-500 transition-colors flex items-center justify-center gap-1 outline-none shadow-sm"
//                 >
//                   <Camera className="w-3.5 h-3.5" /> Ganti Foto
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleRemovePhoto}
//                   className="flex-1 border border-neutral-100 bg-neutral-50 text-neutral-400 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 hover:text-feedback-error-200 transition-colors flex items-center justify-center gap-1 outline-none"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" /> Hapus
//                 </button>
//               </div>
//             </div>

//             {/* Sub-Panel Opsi Akun */}
//             <div className="bg-neutral-default rounded-[40px] p-6 shadow-sm border border-neutral-100">
//               <p className="text-[10px] font-black text-neutral-300 uppercase mb-4 tracking-widest pl-4">
//                 Pengaturan Akun
//               </p>
//               <nav className="space-y-1">
//                 {[
//                   {
//                     text: "Notifikasi",
//                     icon: <Bell className="w-3.5 h-3.5" />,
//                   },
//                   {
//                     text: "Keamanan",
//                     icon: <Shield className="w-3.5 h-3.5" />,
//                   },
//                   {
//                     text: "Privasi & Data",
//                     icon: <Eye className="w-3.5 h-3.5" />,
//                   },
//                 ].map((item) => (
//                   <button
//                     key={item.text}
//                     type="button"
//                     className="w-full text-left px-5 py-3 text-[11px] font-bold text-neutral-400 hover:bg-brand-secondary-100/50 hover:text-brand-primary-300 rounded-2xl transition-all uppercase flex items-center gap-2.5 outline-none"
//                   >
//                     <span className="opacity-70">{item.icon}</span> {item.text}
//                   </button>
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* AREA UTAMA: FORM ISIAN INTERNAL */}
//           <div className="lg:col-span-8 bg-neutral-default rounded-[50px] p-10 shadow-sm border border-neutral-100 flex flex-col">
//             <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-50">
//               <h3 className="text-xl font-sans text-brand-dark-500">
//                 Informasi Pribadi
//               </h3>
//               <span className="text-[10px] bg-brand-primary-100/30 text-brand-primary-300 px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
//                 <UserCheck className="w-3 h-3 text-brand-primary-300" /> Akun
//                 Terverifikasi
//               </span>
//             </div>

//             <form className="space-y-6" onSubmit={handleSave}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Input Field: Username */}
//                 <div>
//                   <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.username}
//                     onChange={(e) =>
//                       setFormData({ ...formData, username: e.target.value })
//                     }
//                     className="w-full bg-neutral-50 border border-neutral-100 text-brand-dark-500 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-brand-primary-300 outline-none transition-all"
//                     required
//                   />
//                 </div>

//                 {/* Input Field: Email Locked (Sesuai Desain & Keamanan Auth, Email Tidak Bisa Diubah Kasat Mata) */}
//                 <div>
//                   <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     disabled
//                     className="w-full bg-brand-secondary-100/40 border border-neutral-100 rounded-2xl p-4 text-xs text-neutral-400 font-medium outline-none cursor-not-allowed shadow-inner"
//                   />
//                 </div>
//               </div>

//               {/* Input Field: Biografi Textarea */}
//               <div>
//                 <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-2 block tracking-widest">
//                   Biografi
//                 </label>
//                 <textarea
//                   rows="3"
//                   value={formData.bio}
//                   onChange={(e) =>
//                     setFormData({ ...formData, bio: e.target.value })
//                   }
//                   className="w-full bg-neutral-50 border border-neutral-100 text-brand-dark-500 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-brand-primary-300 outline-none resize-none leading-relaxed transition-all"
//                 />
//               </div>

//               {/* Target Karakteristik Kulit Pilihan */}
//               <div>
//                 <label className="text-[10px] font-black text-brand-primary-300 uppercase mb-4 block tracking-widest">
//                   Skin Profile & Target
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {skinTags.map((tag) => (
//                     <button
//                       key={tag.id}
//                       type="button"
//                       onClick={() => toggleTag(tag.id)}
//                       className={`px-5 py-2.5 rounded-full text-[10px] font-bold transition-all border outline-none tracking-wide uppercase ${
//                         tag.active
//                           ? "bg-brand-primary-300 text-neutral-default border-transparent shadow-sm"
//                           : "bg-neutral-default text-neutral-400 border-neutral-100 hover:border-brand-primary-200 hover:text-brand-primary-300"
//                       }`}
//                     >
//                       {tag.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Form Actions Footer Buttons */}
//               <div className="pt-10 mt-auto flex justify-end gap-4 items-center">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/profil")}
//                   className="px-8 py-4 bg-neutral-default text-neutral-400 border border-neutral-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#3a5b22]/30 hover:text-[#3a5b22] transition-all outline-none"
//                 >
//                   Batalkan
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-10 py-4 bg-brand-primary-300 text-neutral-default rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-primary-500 transition-all flex items-center gap-1.5 outline-none active:scale-98"
//                 >
//                   <Save className="w-3.5 h-3.5" /> Simpan Perubahan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfilePage;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Trash2,
  Save,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";

// 🌟 REVISI: Menangkap prop 'triggerToast' dari App.jsx
const EditProfilePage = ({ user, setUser, triggerToast }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const baseUrl = "http://localhost:5000";
  const token = localStorage.getItem("token");

  // --- STATE DATA PROFILE ---
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    nomor_telepon: user?.nomor_telepon || "",
    alamat_rumah: user?.alamat_rumah || "",
    suitable_skin_type: user?.suitable_skin_type || "Semua",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const skinTypes = ["Semua", "Berminyak", "Kering", "Kombinasi", "Sensitif"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkinTypeClick = (type) => {
    setFormData({ ...formData, suitable_skin_type: type });
  };

  // ─── 1. HANDLER: SIMPAN PERUBAHAN DATA PROFIL TEKS ───
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim()) {
      if (triggerToast) triggerToast("Nama pengguna dan Email wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          nomor_telepon: formData.nomor_telepon.trim(),
          alamat_rumah: formData.alamat_rumah.trim(),
          suitable_skin_type: formData.suitable_skin_type,
        }),
      });

      const result = await response.json();

      if (response.ok || result.status === "success") {
        // Gabungkan data user lama dengan data baru dari server
        const updatedUser = { ...user, ...result.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        // 🌟 REVISI: Mengganti alert kaku menjadi Custom Toast Sukses
        if (triggerToast) {
          triggerToast("🎉 Profil Anda telah berhasil diperbarui!");
        }
        navigate("/profil");
      } else {
        if (triggerToast)
          triggerToast("Gagal memperbarui profil: " + result.message);
      }
    } catch (error) {
      console.error("Error saving profile changes:", error);
      if (triggerToast)
        triggerToast("Terjadi kesalahan jaringan saat menyimpan perubahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── 2. HANDLER: GANTI / UNGGAH FOTO PROFIL BARU ───
  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi ukuran file maks 2MB
    if (file.size > 2 * 1024 * 1024) {
      if (triggerToast)
        triggerToast(
          "Ukuran file terlalu besar! Maksimal batas ukuran adalah 2MB.",
        );
      return;
    }

    const uploadData = new FormData();
    uploadData.append("foto_profil", file);

    setIsUploadingPhoto(true);
    try {
      const response = await fetch(`${baseUrl}/api/profile/upload-photo`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok || result.status === "success") {
        const updatedUser = { ...user, foto_profil: result.foto_profil };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        // 🌟 REVISI: Mengganti alert kaku menjadi Custom Toast Ganti Foto
        if (triggerToast) {
          triggerToast("📸 Foto profil baru Anda berhasil diunggah!");
        }
      } else {
        if (triggerToast)
          triggerToast("Gagal mengunggah foto: " + result.message);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      if (triggerToast)
        triggerToast("Terjadi kesalahan jaringan saat mengunggah foto.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // ─── 3. HANDLER: HAPUS FOTO PROFIL (KEMBALI KE DEFAULT) ───
  const handleDeletePhoto = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/profile/delete-photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok || result.status === "success") {
        const updatedUser = { ...user, foto_profil: null };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        if (setUser) setUser(updatedUser);

        // 🌟 REVISI: Mengganti alert kaku menjadi Custom Toast Hapus Foto
        if (triggerToast) {
          triggerToast(
            "🗑️ Foto profil berhasil dihapus. Menggunakan avatar default.",
          );
        }
      } else {
        if (triggerToast)
          triggerToast("Gagal menghapus foto: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      if (triggerToast)
        triggerToast("Terjadi kesalahan jaringan saat menghapus foto.");
    }
  };

  return (
    <div className="bg-brand-secondary-100 font-sans min-h-screen py-12 px-4 md:px-10 lg:px-20 text-brand-dark-500">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] border border-neutral-100 shadow-sm p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* SISI KIRI: MANAGEMENT AVATAR FOTO PROFIL */}
          <div className="lg:col-span-4 flex flex-col items-center p-6 bg-neutral-50 rounded-[32px] border border-neutral-100/50 text-center">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-6">
              Foto Profil
            </p>

            <div className="w-40 h-40 bg-brand-primary-300 rounded-full flex items-center justify-center text-white text-4xl font-marcellus font-black uppercase border-4 border-white shadow-xl relative overflow-hidden group">
              {isUploadingPhoto ? (
                <div className="absolute inset-0 bg-brand-dark-500/40 backdrop-blur-sm flex items-center justify-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : user?.foto_profil ? (
                <img
                  src={`${baseUrl}/uploads/${user.foto_profil}`}
                  alt={formData.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{formData.username.charAt(0)}</span>
              )}
            </div>

            <p className="text-base font-bold text-brand-dark-500 font-sans tracking-tight mt-4 uppercase">
              {formData.username || "User"}
            </p>
            <span className="text-[9px] font-black text-brand-primary-300 uppercase tracking-widest bg-brand-primary-100/20 px-3 py-1 rounded-full mt-1.5">
              🌿 Pahlawan Hijau
            </span>

            {/* Tombol Manipulasi Gambar */}
            <div className="grid grid-cols-2 gap-3 w-full mt-8">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUploadPhoto}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploadingPhoto}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-[#3D5532] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md hover:bg-[#2c3e24] transition-all outline-none"
              >
                <Camera className="w-3.5 h-3.5" /> Ganti Foto
              </button>
              <button
                type="button"
                onClick={handleDeletePhoto}
                disabled={!user?.foto_profil || isUploadingPhoto}
                className="flex items-center justify-center gap-2 bg-white border border-neutral-200 text-feedback-error-200 py-3 px-4 rounded-xl text-xs font-bold shadow-sm hover:bg-feedback-error-100/10 hover:border-feedback-error-100/30 transition-all outline-none disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-neutral-200 disabled:text-neutral-300"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>

          {/* SISI KANAN: FORMULIR INPUT INFORMASI PRIBADI */}
          <div className="lg:col-span-8">
            <div className="border-b border-neutral-100 pb-4 mb-6 flex justify-between items-center">
              <h2 className="text-xl font-marcellus text-brand-dark-500 tracking-tight">
                Informasi Pribadi
              </h2>
              <span className="text-[9px] font-black text-feedback-success-300 border border-feedback-success-100/50 bg-feedback-success-100/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                👤 Akun Terverifikasi
              </span>
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1.5">
                    Username
                  </h4>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-neutral-300 absolute left-4" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium outline-none focus:border-brand-primary-300"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1.5">
                    Email
                  </h4>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-neutral-300 absolute left-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium outline-none focus:border-brand-primary-300"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1.5">
                    Nomor Telepon
                  </h4>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-neutral-300 absolute left-4" />
                    <input
                      type="tel"
                      name="nomor_telepon"
                      value={formData.nomor_telepon}
                      onChange={handleChange}
                      placeholder="Masukkan nomor telepon"
                      className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium outline-none focus:border-brand-primary-300"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 block mb-1.5">
                    Alamat Tempat Tinggal
                  </h4>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-neutral-300 absolute left-4" />
                    <input
                      type="text"
                      name="alamat_rumah"
                      value={formData.alamat_rumah}
                      onChange={handleChange}
                      placeholder="Masukkan alamat rumah lengkap"
                      className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-medium outline-none focus:border-brand-primary-300"
                    />
                  </div>
                </div>
              </div>

              {/* FILTER BAR TIPE KULIT */}
              <div className="pt-2">
                <label className="block text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mb-2.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Skin Profile &amp; Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {skinTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSkinTypeClick(type)}
                      className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all outline-none border ${
                        formData.suitable_skin_type === type
                          ? "bg-[#3D5532] text-white border-transparent shadow-md"
                          : "bg-white border-neutral-100 text-neutral-400 hover:border-brand-primary-100"
                      }`}
                    >
                      {type === "Semua"
                        ? "Kulit Normal / Semua"
                        : `Kulit ${type}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS BOTTOM */}
              <div className="flex justify-end gap-3 pt-6 border-t border-neutral-50">
                <button
                  type="button"
                  onClick={() => navigate("/profil")}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-neutral-400 bg-neutral-50 hover:bg-neutral-100 hover:text-brand-dark-500 border border-neutral-200/60 transition-colors outline-none disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5 inline mr-1" /> Batalkan
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-[#3D5532] text-white shadow-md hover:bg-[#2c3e24] transition-all flex items-center gap-2 outline-none active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
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
