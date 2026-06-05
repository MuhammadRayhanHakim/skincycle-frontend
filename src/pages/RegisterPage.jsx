// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserPlus, User, Mail, Lock, LogIn } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

// const RegisterPage = () => {
//   const navigate = useNavigate(); // Hook untuk navigasi

//   // Mengikuti key di Backend (email, kata_sandi, username)
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     kata_sandi: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
// //
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Registrasi Berhasil! Silakan Masuk.");
//         navigate("/masuk"); // Navigasi ke rute /masuk
//       } else {
//         alert(data.message || "Gagal mendaftar");
//       }
//     } catch (error) {
//       alert("Terjadi kesalahan koneksi ke server.");
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-6 bg-brand-secondary-100 overflow-hidden text-brand-dark-500">
//       <div className="max-w-6xl w-full bg-neutral-default rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[720px] border border-neutral-100">
//         {/* SISI KIRI: DATA INPUT FORM */}
//         <div className="flex-1 px-8 lg:px-16 py-6 lg:py-8 flex flex-col justify-center bg-neutral-default">
//           <div className="mb-6">
//             <h1 className="text-3xl lg:text-4xl font-sans text-brand-dark-500 mb-1 leading-tight">
//               Mulai Sekarang
//             </h1>
//             <p className="text-neutral-400 text-[11px] lg:text-xs font-medium">
//               Gabung dengan komunitas sirkular kecantikan Skincycle.
//             </p>
//           </div>

//           <form className="space-y-3" onSubmit={handleRegister}>
//             {/* Input Field: Username */}
//             <div>
//               <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
//                 <User className="w-3 h-3 text-brand-primary-300/60" /> Username
//               </label>
//               <input
//                 name="username"
//                 type="text"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
//                 placeholder="Username unikmu..."
//               />
//             </div>

//             {/* Input Field: Email */}
//             <div>
//               <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
//                 <Mail className="w-3 h-3 text-brand-primary-300/60" /> Alamat
//                 Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
//                 placeholder="nama@email.com"
//               />
//             </div>

//             {/* Input Field: Kata Sandi */}
//             <div>
//               <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
//                 <Lock className="w-3 h-3 text-brand-primary-300/60" /> Kata
//                 Sandi
//               </label>
//               <input
//                 name="kata_sandi"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
//                 placeholder="••••••••"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-brand-primary-300 text-neutral-default py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:bg-brand-primary-500 transition-all flex items-center justify-center gap-2 outline-none active:scale-98"
//             >
//               <UserPlus className="w-4 h-4" /> Daftar Sekarang
//             </button>
//           </form>

//           {/* Router Link Redirection */}
//           <p className="mt-6 text-center text-[10px] text-neutral-400 font-medium">
//             Sudah punya akun?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/masuk")}
//               className="text-brand-primary-300 font-black hover:underline uppercase ml-1 flex items-center gap-0.5 inline-flex outline-none"
//             >
//               <LogIn className="w-3 h-3 inline" /> Masuk
//             </button>
//           </p>
//         </div>

//         {/* SISI KANAN: BANNER VISUAL IMAGE */}
//         <div className="flex-1 relative bg-brand-secondary-300 hidden lg:block h-full">
//           <img
//             src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
//             className="w-full h-full object-cover opacity-90"
//             alt="Skincare"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengikuti key di Backend (email, kata_sandi, username)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    kata_sandi: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrasi Berhasil! Silakan Masuk.");
        navigate("/masuk"); // Navigasi ke rute /masuk
      } else {
        alert(data.message || "Gagal mendaftar");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  return (
    // 🚀 LOCK TAMPILAN 1 FRAME PENUH & ANTI-SCROLL
    <div className="h-screen w-full flex bg-white text-gray-800 overflow-hidden">
      <div className="w-full flex flex-row h-full">
        {/* SISI KIRI: INPUT FORM REGISTRASI */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-28 h-full bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-5 py-4">
            {/* Header Form */}
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-1.5">
                Mulai Sekarang
              </h1>
              <p className="text-gray-400 text-xs">
                Gabung dengan komunitas sirkular kecantikan Skincycle.
              </p>
            </div>

            {/* Form Inputs */}
            <form className="space-y-4" onSubmit={handleRegister}>
              {/* Input: Username */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="Username unikmu..."
                />
              </div>

              {/* Input: Alamat Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="nama@email.com"
                />
              </div>

              {/* Input: Kata Sandi */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Kata Sandi
                </label>
                <input
                  name="kata_sandi"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* Button Submit */}
              <button
                type="submit"
                className="w-full bg-[#3D5532] hover:bg-[#2b3c23] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md outline-none active:scale-[0.99]"
              >
                Daftar Sekarang
              </button>
            </form>

            {/* Separator */}
            <div className="relative flex py-1 items-center text-gray-300">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-medium">
                atau
              </span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert("OAuth Google segera hadir.")}
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors outline-none"
              >
                <img
                  src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                  alt="Google"
                  className="w-3.5 h-3.5"
                />
                <span>Daftar dengan Google</span>
              </button>

              <button
                type="button"
                onClick={() => alert("OAuth Apple segera hadir.")}
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors outline-none"
              >
                <img
                  src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg"
                  alt="Apple"
                  className="w-3.5 h-3.5"
                />
                <span>Daftar dengan Apple</span>
              </button>
            </div>

            {/* Link Redirection */}
            <p className="text-center text-xs text-gray-500 font-medium pt-1">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/masuk")}
                className="text-blue-500 font-bold hover:underline outline-none ml-0.5"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>

        {/* ── 🚀 SISI KANAN: BANNER GAMBAR 1 FRAME PENUH DENGAN LENGKUNGAN SISI KIRI ── */}
        <div className="hidden lg:block flex-1 h-full max-h-screen bg-white">
          <div className="w-full h-full rounded-l-[50px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover select-none pointer-events-none"
              alt="SkinCycle Infografis Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
