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
//   AlertTriangle,
//   Check,
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

//   // 🚀 STATE MODAL KUSTOM: Penanganan Pesan Sukses & Perbaikan Data
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     type: "warning", // "success" atau "warning"
//     title: "",
//     message: "",
//   });

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
//       setModalConfig({
//         isOpen: true,
//         type: "warning",
//         title: "Foto Kosong",
//         message: "Anda belum mengunggah foto profil apapun pada akun ini.",
//       });
//       return;
//     }

//     const profileId = user?.id_profil || user?.id;
//     if (!profileId) {
//       setModalConfig({
//         isOpen: true,
//         type: "warning",
//         title: "Sesi Tidak Valid",
//         message: "ID pengguna tidak ditemukan. Silakan login kembali.",
//       });
//       return;
//     }

//     if (window.confirm("Apakah Anda yakin ingin menghapus foto profil ini?")) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           `http://localhost:5000/api/auth/profile/${profileId}/photo`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         const result = await response.json();

//         if (response.ok || result.status === "success") {
//           setModalConfig({
//             isOpen: true,
//             type: "success",
//             title: "Berhasil Dihapus",
//             message: "Foto profil Anda telah berhasil dibersihkan dari sistem.",
//           });

//           setAvatarFile(null);
//           setAvatarPreview("");
//           if (fileInputRef.current) fileInputRef.current.value = "";

//           const updatedUser = {
//             ...user,
//             foto_profil: null,
//           };

//           localStorage.setItem("user", JSON.stringify(updatedUser));
//           if (setUser) setUser(updatedUser);
//         } else {
//           setModalConfig({
//             isOpen: true,
//             type: "warning",
//             title: "Gagal Hapus",
//             message:
//               result.message || "Gagal membersihkan lampiran foto dari server.",
//           });
//         }
//       } catch (error) {
//         setModalConfig({
//           isOpen: true,
//           type: "warning",
//           title: "Gangguan Server",
//           message:
//             "Terjadi kesalahan sistem, pastikan server backend Anda aktif.",
//         });
//       }
//     }
//   };

//   // 🚀 EKSEKUSI SAVE UTAMA: Mengirimkan teks form, lalu memproses upload foto secara sekuensial jika ada file baru
//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!formData.username.trim()) {
//       setModalConfig({
//         isOpen: true,
//         type: "warning",
//         title: "Data Tidak Lengkap",
//         message: "Kolom nama pengguna (Username) tidak boleh dibiarkan kosong.",
//       });
//       return;
//     }

//     const profileId = user?.id_profil || user?.id;
//     if (!profileId) {
//       setModalConfig({
//         isOpen: true,
//         type: "warning",
//         title: "Sesi Kadaluarsa",
//         message: "ID profil tidak ditemukan. Harap segarkan halaman browser.",
//       });
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       // 1. Eksekusi pembaruan data teks profil terlebih dahulu (Username & Bio)
//       const textResponse = await fetch(
//         `http://localhost:5000/api/auth/profile/${profileId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             username: formData.username,
//             bio: formData.bio,
//           }),
//         },
//       );

//       const textResult = await textResponse.json();
//       let finalUserData = { ...user };

//       if (textResponse.ok || textResult.status === "success") {
//         finalUserData = {
//           ...finalUserData,
//           username: textResult.data.username,
//           bio: textResult.data.bio,
//         };

//         // 2. 🟢 OPERASI LINKING UTAMA: Jika user memilih gambar baru, tembak rute upload foto terpisah
//         if (avatarFile) {
//           const photoPayload = new FormData();
//           photoPayload.append("foto_profil", avatarFile);

//           const photoResponse = await fetch(
//             `http://localhost:5000/api/auth/profile/${profileId}/photo`,
//             {
//               method: "PUT",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//               body: photoPayload,
//             },
//           );

//           const photoResult = await photoResponse.json();
//           if (photoResponse.ok || photoResult.status === "success") {
//             // Pasang properti file nama gambar baru hasil balikan backend controller
//             finalUserData.foto_profil = photoResult.data.foto_profil;
//           } else {
//             throw new Error(
//               photoResult.message || "Gagal menyimpan lampiran foto baru.",
//             );
//           }
//         }

//         // 3. Simpan data gabungan final yang valid ke localStorage & global state
//         localStorage.setItem("user", JSON.stringify(finalUserData));
//         if (setUser) setUser(finalUserData);

//         setModalConfig({
//           isOpen: true,
//           type: "success",
//           title: "Profil Diperbarui!",
//           message:
//             "🎉 Luar biasa! Perubahan identitas sirkular SkinCycle beserta foto profil baru Anda telah disimpan ke database.",
//         });
//       } else {
//         setModalConfig({
//           isOpen: true,
//           type: "warning",
//           title: "Gagal Menyimpan",
//           message:
//             textResult.message || "Endpoint merespons kegagalan pembaruan.",
//         });
//       }
//     } catch (error) {
//       setModalConfig({
//         isOpen: true,
//         type: "warning",
//         title: "Koneksi Terputus",
//         message:
//           error.message ||
//           "Gagal menyimpan perubahan. Pastikan server backend aktif.",
//       });
//     }
//   };

//   const handleModalClose = () => {
//     const wasSuccess = modalConfig.type === "success";
//     setModalConfig((prev) => ({ ...prev, isOpen: false }));
//     if (wasSuccess) {
//       navigate("/profil");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-brand-secondary-100 py-10 px-6 lg:px-20 font-sans text-brand-dark-500 relative">
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER CONTROL BAR */}
//         <div className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-4xl font-sans font-black text-brand-dark-500 mb-2 tracking-tight">
//               Pengaturan Profil
//             </h1>
//             <p className="text-neutral-400 text-xs font-bold tracking-wider">
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

//               <h3 className="text-xl font-sans font-bold text-brand-dark-500 capitalize">
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
//               <h3 className="text-xl font-sans font-bold text-brand-dark-500">
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

//                 {/* Input Field: Email Locked */}
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

//       {/* FIXED MODAL MULTIFUNGSI KONSISTEN */}
//       {modalConfig.isOpen && (
//         <div className="fixed inset-0 bg-brand-dark-500/80 backdrop-blur-md flex items-center justify-center z-[9999] animate-fade-in">
//           <div className="bg-neutral-default rounded-[40px] p-10 max-w-md w-full mx-4 text-center shadow-2xl border border-neutral-100 flex flex-col items-center justify-center relative transform scale-100 transition-transform duration-300">
//             {/* Visual Lingkaran Ikon */}
//             {modalConfig.type === "success" ? (
//               <div className="w-20 h-20 bg-brand-secondary-300 rounded-full flex items-center justify-center text-brand-primary-300 mb-6 border border-brand-primary-100/20 shadow-sm">
//                 <Check className="w-10 h-10" strokeWidth={3} />
//               </div>
//             ) : (
//               <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6 border border-amber-100 shadow-sm animate-pulse">
//                 <AlertTriangle className="w-10 h-10" strokeWidth={2.5} />
//               </div>
//             )}

//             {/* Judul Modal */}
//             <h3 className="text-2xl font-sans font-black text-brand-dark-500 uppercase tracking-tight">
//               {modalConfig.title}
//             </h3>

//             {/* Deskripsi Teks */}
//             <p className="text-xs text-neutral-400 font-medium mt-3 leading-relaxed px-4">
//               {modalConfig.message}
//             </p>

//             {/* Tombol Aksi Penutup */}
//             <button
//               type="button"
//               onClick={handleModalClose}
//               className="mt-8 w-full text-[10px] bg-brand-primary-300 text-neutral-default py-4 rounded-full font-black uppercase tracking-widest shadow-md hover:bg-brand-primary-500 active:scale-95 transition-all outline-none"
//             >
//               {modalConfig.type === "success"
//                 ? "Selesai & Cek Profil"
//                 : "Perbaiki Data"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProfilePage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // 🚀 IMPOR: Menggunakan library SweetAlert2 asli
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

  // 🚀 SWEETALERT 2: Menghapus foto pratinjau dengan konfirmasi premium kustom
  const handleRemovePhoto = async () => {
    if (!user?.foto_profil && !avatarFile) {
      Swal.fire({
        title: "Foto Kosong",
        text: "Anda belum mengunggah foto profil apapun pada akun ini.",
        icon: "warning",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    const profileId = user?.id_profil || user?.id;
    if (!profileId) {
      Swal.fire({
        title: "Sesi Tidak Valid",
        text: "ID pengguna tidak ditemukan. Silakan login kembali.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    // Menggantikan window.confirm kaku di image_a4a319.png dengan Swal.fire
    Swal.fire({
      title: "Hapus Foto Profil?",
      text: "Apakah Anda yakin ingin menghapus foto profil ini dari sistem?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3d5532",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: "#fff",
      customClass: {
        popup: "rounded-[30px]",
        confirmButton: "rounded-xl font-bold text-xs uppercase px-4 py-2",
        cancelButton: "rounded-xl font-bold text-xs uppercase px-4 py-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:5000/api/auth/profile/${profileId}/photo`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const resData = await response.json();

          if (response.ok || resData.status === "success") {
            Swal.fire({
              title: "Berhasil!",
              text: "Foto profil Anda telah berhasil dihapus.",
              icon: "success",
              confirmButtonColor: "#3d5532",
            });

            setAvatarFile(null);
            setAvatarPreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";

            const updatedUser = {
              ...user,
              foto_profil: null,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser);
          } else {
            Swal.fire({
              title: "Gagal Hapus",
              text:
                resData.message ||
                "Gagal membersihkan lampiran foto dari server.",
              icon: "error",
              confirmButtonColor: "#3d5532",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Gangguan Server",
            text: "Terjadi kesalahan sistem, pastikan server backend Anda aktif.",
            icon: "error",
            confirmButtonColor: "#3d5532",
          });
        }
      }
    });
  };

  // 🚀 SWEETALERT 2: Eksekusi simpan perubahan sekuensial teks & gambar
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      Swal.fire({
        title: "Data Tidak Lengkap",
        text: "Kolom nama pengguna (Username) tidak boleh kosong.",
        icon: "warning",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    const profileId = user?.id_profil || user?.id;
    if (!profileId) {
      Swal.fire({
        title: "Sesi Kadaluarsa",
        text: "ID profil tidak ditemukan. Harap segarkan halaman browser.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 1. Eksekusi pembaruan data teks profil terlebih dahulu (Username & Bio)
      const textResponse = await fetch(
        `http://localhost:5000/api/auth/profile/${profileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: formData.username,
            bio: formData.bio,
          }),
        },
      );

      const textResult = await textResponse.json();
      let finalUserData = { ...user };

      if (textResponse.ok || textResult.status === "success") {
        finalUserData = {
          ...finalUserData,
          username: textResult.data.username,
          bio: textResult.data.bio,
        };

        // 2. Jika user memilih gambar baru, tembak rute upload foto terpisah
        if (avatarFile) {
          const photoPayload = new FormData();
          photoPayload.append("foto_profil", avatarFile);

          const photoResponse = await fetch(
            `http://localhost:5000/api/auth/profile/${profileId}/photo`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: photoPayload,
            },
          );

          const photoResult = await photoResponse.json();
          if (photoResponse.ok || photoResult.status === "success") {
            finalUserData.foto_profil = photoResult.data.foto_profil;
          } else {
            throw new Error(
              photoResult.message || "Gagal menyimpan lampiran foto baru.",
            );
          }
        }

        // 3. Simpan data gabungan final yang valid ke localStorage & global state
        localStorage.setItem("user", JSON.stringify(finalUserData));
        if (setUser) setUser(finalUserData);

        // Pop-up sukses SweetAlert2 asli, pindah halaman saat tombol ditekan
        Swal.fire({
          title: "Profil Diperbarui!",
          text: "Perubahan identitas SkinCycle anda telah disimpan.",
          icon: "success",
          confirmButtonColor: "#3d5532",
          confirmButtonText: "Selesai & Cek Profil",
          customClass: {
            popup: "rounded-[30px]",
          },
        }).then(() => {
          navigate("/profil");
        });
      } else {
        Swal.fire({
          title: "Gagal Menyimpan",
          text: textResult.message || "Endpoint merespons kegagalan pembaruan.",
          icon: "error",
          confirmButtonColor: "#3d5532",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Koneksi Terputus",
        text:
          error.message ||
          "Gagal menyimpan perubahan. Pastikan server backend aktif.",
        icon: "error",
        confirmButtonColor: "#3d5532",
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary-100 py-10 px-6 lg:px-20 font-sans text-brand-dark-500 relative">
      <div className="max-w-7xl mx-auto">
        {/* HEADER CONTROL BAR */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-sans font-black text-brand-dark-500 mb-2 tracking-tight">
              Pengaturan Profil
            </h1>
            <p className="text-neutral-400 text-xs font-bold tracking-wider">
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

              <h3 className="text-xl font-sans font-bold text-brand-dark-500 capitalize">
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
              <h3 className="text-xl font-sans font-bold text-brand-dark-500">
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

                {/* Input Field: Email Locked */}
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
