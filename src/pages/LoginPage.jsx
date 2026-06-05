// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock, LogIn } from "lucide-react";

// const LoginPage = ({ setUser }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     kata_sandi: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok && result.status === "success") {
//         const userData = result.data;

//         // 💾 Simpan Token dan Objek User yang berisi data foto_profil segar ke dalam Browser Cache
//         localStorage.setItem("token", userData.token);
//         localStorage.setItem("user", JSON.stringify(userData));

//         // Pemicu Re-render Global State di App.jsx
//         if (setUser) {
//           setUser(userData);
//         }

//         alert(`Selamat datang kembali, ${userData.username}! ✨`);

//         if (userData.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/");
//         }
//       } else {
//         alert(result.message || "Email atau kata sandi salah");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Gagal terhubung ke server. Pastikan Backend menyala.");
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-10 bg-brand-secondary-100 overflow-hidden text-brand-dark-500">
//       <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px] border border-neutral-100">
//         {/* SISI KIRI: INPUT FORM LOGIN */}
//         <div className="flex-1 px-8 lg:px-16 py-8 flex flex-col justify-center bg-white">
//           <div className="mb-6">
//             <h1 className="text-3xl lg:text-4xl font-sans text-brand-dark-500 mb-2 leading-tight">
//               Selamat datang kembali
//             </h1>
//             <p className="text-neutral-400 text-xs font-medium">
//               Silakan masuk untuk melanjutkan aktivitas sirkular Anda.
//             </p>
//           </div>

//           <form className="space-y-4" onSubmit={handleLogin}>
//             <div>
//               <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 flex items-center gap-1 tracking-[0.2em] italic">
//                 <Mail className="w-3 h-3 text-brand-primary-300/60" /> Alamat
//                 Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-neutral-50 border border-neutral-100 text-xs font-medium rounded-2xl p-3 outline-none focus:ring-2 focus:ring-brand-primary-300 text-brand-dark-500 placeholder-neutral-300 transition-all"
//                 placeholder="nama@email.com"
//               />
//             </div>

//             <div>
//               <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 flex items-center gap-1 tracking-[0.2em] italic">
//                 <Lock className="w-3 h-3 text-brand-primary-300/60" /> Kata
//                 Sandi
//               </label>
//               <input
//                 name="kata_sandi"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-neutral-50 border border-neutral-100 text-xs font-medium rounded-2xl p-3 outline-none focus:ring-2 focus:ring-brand-primary-300 text-brand-dark-500 placeholder-neutral-300 transition-all"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-brand-primary-300 text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-brand-primary-500 transition-all flex items-center justify-center gap-2 outline-none active:scale-98"
//             >
//               <LogIn className="w-4 h-4" /> Masuk Sekarang
//             </button>
//           </form>

//           <p className="mt-6 text-center text-[11px] text-neutral-400 font-medium">
//             Belum punya akun?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/daftar")}
//               className="text-brand-primary-300 font-black hover:underline uppercase ml-1 inline-flex outline-none"
//             >
//               Daftar
//             </button>
//           </p>
//         </div>

//         {/* SISI KANAN: BANNER VISUAL */}
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

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    kata_sandi: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        const userData = result.data;

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        if (setUser) {
          setUser(userData);
        }

        alert(`Selamat datang kembali, ${userData.username}! ✨`);

        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(result.message || "Email atau kata sandi salah");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Gagal terhubung ke server. Pastikan Backend menyala.");
    }
  };

  return (
    // 🚀 FIX MULTAK 1 FRAME: Mengunci tinggi container induk agar pas seukuran layar monitor (h-screen) dan melarang scroll (overflow-hidden)
    <div className="h-screen w-full flex bg-white text-gray-800 overflow-hidden">
      <div className="w-full flex flex-row h-full">
        {/* SISI KIRI: INPUT FORM LOGIN */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-28 h-full bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-6 py-4">
            {/* Header Form */}
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-1.5">
                Selamat datang kembali
              </h1>
              <p className="text-gray-400 text-xs">
                Masukkan data akunmu untuk mengakses akun
              </p>
            </div>

            {/* Form Inputs */}
            <form className="space-y-4" onSubmit={handleLogin}>
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
                  placeholder="Masukkan alamat email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert("Fitur reset kata sandi dalam pengembangan.")
                    }
                    className="text-[10px] font-medium text-blue-500 hover:underline outline-none"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
                <input
                  name="kata_sandi"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="Masukkan kata sandi"
                />
              </div>

              {/* Checkbox Ingat Saya */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 text-[#3D5532] focus:ring-[#3D5532] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-[10px] font-medium text-gray-500 cursor-pointer select-none"
                >
                  Di log-in saya selama 30 hari
                </label>
              </div>

              {/* Button Submit */}
              <button
                type="submit"
                className="w-full bg-[#3D5532] hover:bg-[#2b3c23] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md outline-none active:scale-[0.99]"
              >
                Masuk
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
                <span>Masuk dengan Google</span>
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
                <span>Masuk dengan Apple</span>
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-xs text-gray-500 font-medium pt-1">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/daftar")}
                className="text-blue-500 font-bold hover:underline outline-none ml-0.5"
              >
                Daftar
              </button>
            </p>
          </div>
        </div>

        {/* ── 🚀 SISI KANAN: LOCK TINGGI 100% MONITOR SCREEN DAN BERI LENGKUNGAN KIRI INDUK ── */}
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

export default LoginPage;
