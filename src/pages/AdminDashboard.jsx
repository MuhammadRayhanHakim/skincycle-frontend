// import React from "react";
// import SidebarAdmin from "../components/SidebarAdmin";

// const AdminDashboard = () => {
//   const adminData = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="flex min-h-screen bg-[#F8FBF9] font-sans">
//       <SidebarAdmin />

//       <main className="flex-1 ml-64 p-10 flex flex-col items-center justify-center text-center">
//         <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-50 max-w-2xl">
//           <span className="text-4xl">👋</span>
//           <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-tighter mt-6">
//             Selamat Datang, {adminData?.nama_lengkap || "Admin"}!
//           </h1>
//           <p className="text-gray-400 mt-4 text-sm leading-relaxed">
//             Anda masuk sebagai Administrator SkinCycle. Gunakan sidebar di
//             sebelah kiri untuk mengelola produk atau melihat laporan aktivitas
//             daur ulang pengguna.
//           </p>

//           <div className="grid grid-cols-2 gap-4 mt-10">
//             <div className="p-6 bg-[#F1F7F0] rounded-3xl">
//               <p className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest">
//                 Status Sistem
//               </p>
//               <p className="text-xl font-bold text-[#3D5532]">Aktif & Stabil</p>
//             </div>
//             <div className="p-6 bg-[#F1F7F0] rounded-3xl">
//               <p className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest">
//                 Waktu Server
//               </p>
//               <p className="text-xl font-bold text-[#3D5532]">
//                 {new Date().toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { Activity, Calendar } from "lucide-react"; // Menggunakan lucide-react untuk keselarasan design system

const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-brand-dark-500">
      <SidebarAdmin />

      <main className="flex-1 ml-64 p-10 flex flex-col items-center justify-center text-center">
        <div className="bg-neutral-default p-12 rounded-[50px] shadow-sm border border-neutral-100 max-w-2xl">
          <span className="text-4xl block mb-6">👋</span>
          <h1 className="text-4xl font-marcellus text-brand-dark-500 uppercase tracking-tight">
            Selamat Datang, {adminData?.nama_lengkap || "Admin"}!
          </h1>
          <p className="text-neutral-400 mt-4 text-sm leading-relaxed font-medium">
            Anda masuk sebagai Administrator SkinCycle. Gunakan sidebar di
            sebelah kiri untuk mengelola produk atau melihat laporan aktivitas
            daur ulang pengguna.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="p-6 bg-brand-primary-100/10 rounded-3xl border border-brand-primary-100/20 flex flex-col items-center justify-center gap-1">
              <Activity className="w-5 h-5 text-brand-primary-300" />
              <p className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mt-1">
                Status Sistem
              </p>
              <p className="text-xl font-bold text-brand-primary-500">
                Aktif & Stabil
              </p>
            </div>

            <div className="p-6 bg-brand-primary-100/10 rounded-3xl border border-brand-primary-100/20 flex flex-col items-center justify-center gap-1">
              <Calendar className="w-5 h-5 text-brand-primary-300" />
              <p className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest mt-1">
                Waktu Server
              </p>
              <p className="text-xl font-bold text-brand-primary-500">
                {new Date().toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
