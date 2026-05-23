// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Tambahkan import ini

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
//     <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-6 bg-[#F2EDE4] overflow-hidden">
//       <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[720px]">
//         <div className="flex-1 px-8 lg:px-16 py-6 lg:py-8 flex flex-col justify-center bg-white">
//           <div className="mb-6">
//             <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-1 leading-tight">
//               Mulai Sekarang
//             </h1>
//             <p className="text-gray-400 text-[11px] lg:text-xs">
//               Gabung dengan komunitas Skincycle.
//             </p>
//           </div>

//           <form className="space-y-3" onSubmit={handleRegister}>
//             <div>
//               <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
//                 Username
//               </label>
//               <input
//                 name="username"
//                 type="text"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
//                 placeholder="Username unikmu..."
//               />
//             </div>
//             <div>
//               <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
//                 Alamat Email
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
//                 placeholder="nama@email.com"
//               />
//             </div>
//             <div>
//               <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
//                 Kata Sandi
//               </label>
//               <input
//                 name="kata_sandi"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#3D5532] text-white py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:bg-[#2d4025] transition-all"
//             >
//               Daftar Sekarang
//             </button>
//           </form>
//           <p className="mt-6 text-center text-[10px] text-gray-500">
//             Sudah punya akun?{" "}
//             <button
//               onClick={() => navigate("/masuk")} // Navigasi ke rute /masuk
//               className="text-[#3D5532] font-black hover:underline uppercase ml-1"
//             >
//               Masuk
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

// export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock, LogIn } from "lucide-react"; // Menggunakan lucide-react untuk konsistensi ikon design system

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
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-6 bg-brand-secondary-100 overflow-hidden text-brand-dark-500">
      <div className="max-w-6xl w-full bg-neutral-default rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[720px] border border-neutral-100">
        {/* SISI KIRI: DATA INPUT FORM */}
        <div className="flex-1 px-8 lg:px-16 py-6 lg:py-8 flex flex-col justify-center bg-neutral-default">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-sans text-brand-dark-500 mb-1 leading-tight">
              Mulai Sekarang
            </h1>
            <p className="text-neutral-400 text-[11px] lg:text-xs font-medium">
              Gabung dengan komunitas sirkular kecantikan Skincycle.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleRegister}>
            {/* Input Field: Username */}
            <div>
              <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
                <User className="w-3 h-3 text-brand-primary-300/60" /> Username
              </label>
              <input
                name="username"
                type="text"
                required
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
                placeholder="Username unikmu..."
              />
            </div>

            {/* Input Field: Email */}
            <div>
              <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
                <Mail className="w-3 h-3 text-brand-primary-300/60" /> Alamat
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            {/* Input Field: Kata Sandi */}
            <div>
              <label className="text-[9px] font-black text-neutral-400 uppercase mb-1.5 flex items-center gap-1 tracking-[0.2em] italic">
                <Lock className="w-3 h-3 text-brand-primary-300/60" /> Kata
                Sandi
              </label>
              <input
                name="kata_sandi"
                type="password"
                required
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-brand-primary-300 font-medium text-brand-dark-500 placeholder-neutral-300 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-primary-300 text-neutral-default py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:bg-brand-primary-500 transition-all flex items-center justify-center gap-2 outline-none active:scale-98"
            >
              <UserPlus className="w-4 h-4" /> Daftar Sekarang
            </button>
          </form>

          {/* Router Link Redirection */}
          <p className="mt-6 text-center text-[10px] text-neutral-400 font-medium">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/masuk")}
              className="text-brand-primary-300 font-black hover:underline uppercase ml-1 flex items-center gap-0.5 inline-flex outline-none"
            >
              <LogIn className="w-3 h-3 inline" /> Masuk
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

export default RegisterPage;
