import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3D5532] text-[#F2EDE4] py-20 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Bagian Atas: Sosmed, Logo Tengah, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-16 gap-8">
          <div className="flex gap-4">
            {["ig", "fb", "tw", "in"].map((icon) => (
              <div
                key={icon}
                className="w-10 h-10 border border-white/30 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer uppercase text-[10px]"
              >
                {icon}
              </div>
            ))}
          </div>
          <div className="text-center">
            <img
              src="/logo.png"
              alt="SkinCycle"
              className="h-16 mx-auto brightness-200"
            />
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs mb-2">Dapatkan Tips Skincare</p>
            <div className="flex w-full max-w-xs">
              <input
                type="text"
                placeholder="Masukkan email kamu..."
                className="bg-white text-black px-4 py-2 rounded-l-md w-full text-xs outline-none"
              />
              <button className="bg-[#5F7454] px-4 py-2 rounded-r-md text-xs font-bold">
                Langganan
              </button>
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Link Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Tentang SkinCycle
            </h4>
            <p className="text-xs opacity-80 leading-loose">
              📍 Surabaya, Jawa Timur, Indonesia
              <br />
              📞 +62 812-3456-000
              <br />
              ✉️ support@skincycle.id
            </p>
          </div>
          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Menu Utama
            </h4>
            <ul className="text-xs space-y-2 opacity-80">
              <li>{">"} Tentang Kami</li>
              <li>{">"} Fitur SkinCycle</li>
              <li>{">"} Forum Diskusi</li>
              <li>{">"} Artikel & Edukasi</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Topik Skincare
            </h4>
            <ul className="text-xs space-y-2 opacity-80">
              <li>{">"} Jerawat (Acne)</li>
              <li>{">"} Kulit Sensitif</li>
              <li>{">"} Skincare Formula</li>
              <li>{">"} Kandungan Skincare</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Diskusi Terbaru
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-[10px] opacity-60">28 April 2026</p>
                  <p className="text-[11px] font-medium">
                    Niacinamide bikin breakout?
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-[10px] opacity-60">24 April 2026</p>
                  <p className="text-[11px] font-medium">
                    Cara daur ulang botol skincare?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
