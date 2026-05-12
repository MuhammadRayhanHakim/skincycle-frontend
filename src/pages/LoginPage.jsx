import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan import ini

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengikuti key Backend (email, kata_sandi)
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
        // Data di backend kamu ada di dalam property 'data'
        const userData = result.data;

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        alert(`Selamat datang kembali, ${userData.username}! ✨`);

        // Navigasi ke rute Beranda (/)
        navigate("/");
      } else {
        alert(result.message || "Email atau kata sandi salah");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan Backend menyala.");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 lg:p-10 bg-[#F2EDE4] overflow-hidden">
      <div className="max-w-6xl w-full bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[750px]">
        <div className="flex-1 px-8 lg:px-16 py-8 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-serif text-[#1e2b19] mb-2 leading-tight">
              Selamat datang kembali
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-[0.2em] italic">
                Alamat Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-[0.2em] italic">
                Kata Sandi
              </label>
              <input
                name="kata_sandi"
                type="password"
                required
                onChange={handleChange}
                className="w-full bg-[#F9F9F7] border border-gray-100 rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#3D5532]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3D5532] text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-[#2d4025] transition-all"
            >
              Masuk Sekarang
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-gray-500">
            Belum punya akun?{" "}
            <button
              onClick={() => navigate("/daftar")} // Navigasi ke rute /daftar
              className="text-[#3D5532] font-black hover:underline uppercase ml-1"
            >
              Daftar
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

export default LoginPage;
