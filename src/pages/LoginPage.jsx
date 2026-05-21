// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

//       if (response.ok) {
//         const userData = result.data;

//         localStorage.setItem("token", userData.token);
//         localStorage.setItem("user", JSON.stringify(userData));

//         setUser(userData);
//         alert(`Selamat datang kembali, ${userData.username}! ✨`);

//         // --- PERBAIKAN LOGIKA REDIRECT ---
//         // Jika role adalah admin, arahkan ke dashboard admin
//         if (userData.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/");
//         }
//       } else {
//         alert(result.message || "Email atau kata sandi salah");
//       }
//     } catch (error) {
//       alert("Gagal terhubung ke server. Pastikan Backend menyala.");
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-10 bg-[#F2EDE4] overflow-hidden">
//       <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px]">
//         <div className="flex-1 px-8 lg:px-16 py-8 flex flex-col justify-center bg-white">
//           <div className="mb-6">
//             <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-2 leading-tight">
//               Selamat datang kembali
//             </h1>
//           </div>

//           <form className="space-y-4" onSubmit={handleLogin}>
//             <div>
//               <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-[0.2em] italic">
//                 Alamat Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
//                 placeholder="nama@email.com"
//               />
//             </div>
//             <div>
//               <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-[0.2em] italic">
//                 Kata Sandi
//               </label>
//               <input
//                 name="kata_sandi"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
//                 placeholder="••••••••"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-[#2d4025] transition-all"
//             >
//               Masuk Sekarang
//             </button>
//           </form>

//           <p className="mt-6 text-center text-[11px] text-gray-500">
//             Belum punya akun?{" "}
//             <button
//               onClick={() => navigate("/daftar")}
//               className="text-[#3D5532] font-black hover:underline uppercase ml-1"
//             >
//               Daftar
//             </button>
//           </p>
//         </div>
//         <div className="flex-1 relative bg-[#EBEBE6] hidden lg:block h-full">
//           <img
//             src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
//             className="w-full h-full object-cover"
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
import { Mail, Lock, LogIn, UserPlus } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

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

      if (response.ok) {
        const userData = result.data;

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        alert(`Selamat datang kembali, ${userData.username}! ✨`);

        // --- LOGIKA REDIRECT BERDASARKAN DESIGN SYSTEM PATH ---
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(result.message || "Email atau kata sandi salah");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan Backend menyala.");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-10 bg-brand-secondary-100 overflow-hidden text-brand-dark-500">
      <div className="max-w-6xl w-full bg-neutral-default rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px] border border-neutral-100">
        {/* SISI KIRI: INPUT FORM LOGIN */}
        <div className="flex-1 px-8 lg:px-16 py-8 flex flex-col justify-center bg-neutral-default">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-marcellus text-brand-dark-500 mb-2 leading-tight">
              Selamat datang kembali
            </h1>
            <p className="text-neutral-400 text-xs font-medium">
              Silakan masuk untuk melanjutkan aktivitas sirkular Anda.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Input Field: Email */}
            <div>
              <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 flex items-center gap-1 tracking-[0.2em] italic">
                <Mail className="w-3 h-3 text-brand-primary-300/60" /> Alamat
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            {/* Input Field: Kata Sandi */}
            <div>
              <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 flex items-center gap-1 tracking-[0.2em] italic">
                <Lock className="w-3 h-3 text-brand-primary-300/60" /> Kata
                Sandi
              </label>
              <input
                name="kata_sandi"
                type="password"
                required
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-primary-300 text-neutral-default py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-brand-primary-500 transition-all flex items-center justify-center gap-2 outline-none active:scale-98"
            >
              <LogIn className="w-4 h-4" /> Masuk Sekarang
            </button>
          </form>

          {/* Router Link Redirection */}
          <p className="mt-6 text-center text-[11px] text-neutral-400 font-medium">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/daftar")}
              className="text-brand-primary-300 font-black hover:underline uppercase ml-1 flex items-center gap-0.5 inline-flex outline-none"
            >
              <UserPlus className="w-3 h-3 inline" /> Daftar
            </button>
          </p>
        </div>

        {/* SISI KANAN: BANNER VISUAL IMAGE */}
        <div className="flex-1 relative bg-brand-secondary-300 hidden lg:block h-full">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover opacity-90"
            alt="Skincare"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
