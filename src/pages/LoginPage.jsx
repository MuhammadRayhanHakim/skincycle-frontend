import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", kata_sandi: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    Swal.fire({
      title: "Sedang masuk...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok && result.status === "success") {
        const userData = result.data;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        if (setUser) setUser(userData);

        await Swal.fire({
          icon: "success",
          title: "Selamat Datang! 🍃",
          text: `Halo, ${userData.username}! Senang melihatmu kembali.`,
          confirmButtonColor: "#3D5532",
          confirmButtonText: "Lanjutkan",
          timer: 2500,
          timerProgressBar: true,
        });

        navigate(userData.role === "admin" ? "/admin/dashboard" : "/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: result.message || "Email atau kata sandi salah.",
          confirmButtonColor: "#3D5532",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Koneksi Bermasalah",
        text: "Gagal terhubung ke server. Pastikan backend menyala.",
        confirmButtonColor: "#3D5532",
      });
    }
  };

  const handleGoogleLoginSuccess = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      Swal.fire({
        title: "Memverifikasi akun Google...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const response = await fetch(`${baseUrl}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });
        const result = await response.json();

        if (response.ok && result.status === "success") {
          const userData = result.data;
          localStorage.setItem("token", userData.token);
          localStorage.setItem("user", JSON.stringify(userData));
          if (setUser) setUser(userData);

          await Swal.fire({
            icon: "success",
            title: "Berhasil via Google! 🍃",
            text: `Selamat datang, ${userData.username}!`,
            confirmButtonColor: "#3D5532",
            timer: 2000,
            timerProgressBar: true,
          });

          navigate(userData.role === "admin" ? "/admin/dashboard" : "/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Autentikasi Google Gagal",
            text: result.message || "Gagal melakukan autentikasi Google.",
            confirmButtonColor: "#3D5532",
          });
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Koneksi Bermasalah",
          text: "Gagal terhubung ke server saat memproses login Google.",
          confirmButtonColor: "#3D5532",
        });
      }
    },
    onError: () => {
      Swal.fire({
        icon: "warning",
        title: "Login Google Dibatalkan",
        text: "Proses login dengan Google dibatalkan atau mengalami kegagalan.",
        confirmButtonColor: "#3D5532",
      });
    },
  });

  const handleForgotPassword = () => {
    Swal.fire({
      icon: "info",
      title: "Fitur Dalam Pengembangan",
      text: "Reset kata sandi akan segera tersedia. Hubungi admin jika mendesak.",
      confirmButtonColor: "#3D5532",
    });
  };

  const handleAppleLogin = () => {
    Swal.fire({
      icon: "info",
      title: "Segera Hadir!",
      text: "Login dengan Apple ID sedang dalam pengembangan.",
      confirmButtonColor: "#3D5532",
    });
  };

  return (
    <div className="h-screen w-full flex bg-white text-gray-800 overflow-hidden">
      <div className="w-full flex flex-row h-full">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-28 h-full bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-6 py-4">
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-1.5">Selamat datang kembali</h1>
              <p className="text-gray-400 text-xs">Masukkan data akunmu untuk mengakses akun</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Alamat Email</label>
                <input
                  name="email" type="email" required onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="Masukkan alamat email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-700">Kata Sandi</label>
                  <button type="button" onClick={handleForgotPassword}
                    className="text-[10px] font-medium text-blue-500 hover:underline outline-none">
                    Lupa kata sandi?
                  </button>
                </div>
                <input
                  name="kata_sandi" type="password" required onChange={handleChange}
                  className="w-full bg-white border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[#3D5532] text-gray-900 placeholder-gray-300 transition-all shadow-sm"
                  placeholder="Masukkan kata sandi"
                />
              </div>

              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox"
                  className="h-3.5 w-3.5 text-[#3D5532] focus:ring-[#3D5532] border-gray-300 rounded cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-[10px] font-medium text-gray-500 cursor-pointer select-none">
                  Di log-in saya selama 30 hari
                </label>
              </div>

              <button type="submit"
                className="w-full bg-[#3D5532] hover:bg-[#2b3c23] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md outline-none active:scale-[0.99]">
                Masuk
              </button>
            </form>

            <div className="relative flex py-1 items-center text-gray-300">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-medium">atau</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => handleGoogleLoginSuccess()}
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors outline-none">
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="w-3.5 h-3.5" />
                <span>Masuk dengan Google</span>
              </button>
              <button type="button" onClick={handleAppleLogin}
                className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors outline-none">
                <img src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg" alt="Apple" className="w-3.5 h-3.5" />
                <span>Masuk dengan Apple</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 font-medium pt-1">
              Belum punya akun?{" "}
              <button type="button" onClick={() => navigate("/daftar")}
                className="text-blue-500 font-bold hover:underline outline-none ml-0.5">Daftar</button>
            </p>
          </div>
        </div>

        <div className="hidden lg:block flex-1 h-full max-h-screen bg-white">
          <div className="w-full h-full rounded-l-[50px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover select-none pointer-events-none"
              alt="SkinCycle Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;