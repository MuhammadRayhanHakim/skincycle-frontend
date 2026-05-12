import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan import ini

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
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-6 bg-[#F2EDE4] overflow-hidden">
      <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[720px]">
        <div className="flex-1 px-8 lg:px-16 py-6 lg:py-8 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-1 leading-tight">
              Mulai Sekarang
            </h1>
            <p className="text-gray-400 text-[11px] lg:text-xs">
              Gabung dengan komunitas Skincycle.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleRegister}>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                onChange={handleChange}
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
                placeholder="Username unikmu..."
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Alamat Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-1.5 block tracking-[0.2em] italic">
                Kata Sandi
              </label>
              <input
                name="kata_sandi"
                type="password"
                required
                onChange={handleChange}
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3D5532] text-white py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:bg-[#2d4025] transition-all"
            >
              Daftar Sekarang
            </button>
          </form>
          <p className="mt-6 text-center text-[10px] text-gray-500">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/masuk")} // Navigasi ke rute /masuk
              className="text-[#3D5532] font-black hover:underline uppercase ml-1"
            >
              Masuk
            </button>
          </p>
        </div>

        <div className="flex-1 relative bg-[#EBEBE6] hidden lg:block h-full">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
            className="w-full h-full object-cover"
            alt="Skincare"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
