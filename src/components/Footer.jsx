import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const menuUtama = [
    { label: "Tentang Kami", to: "/tentang-kami" },
    { label: "Ensiklopedia", to: "/ensiklopedia" },
    { label: "Daur Ulang", to: "/daur-ulang" },
    { label: "Forum Diskusi", to: "/forum" },
    { label: "Produk", to: "/produk" },
  ];

  const topikSkincare = [
    { label: "Artikel Edukasi", to: "/ensiklopedia/kumpulan" },
    { label: "Kandungan Bahan", to: "/ensiklopedia/kandungan" },
    { label: "Jerawat (Acne)", to: "/ensiklopedia/kandungan?q=acne" },
    { label: "Kulit Sensitif", to: "/ensiklopedia/kandungan?q=sensitif" },
  ];

  const [recentDiscussions, setRecentDiscussions] = useState([]);
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchRecentFooterPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/forum/recent-footer`);
        const result = await response.json();
        if (result.status === "success") {
          setRecentDiscussions(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat diskusi terbaru pada footer:", error);
      }
    };

    fetchRecentFooterPosts();
  }, []);

  return (
    <footer className="bg-[#193505] text-[#F2EDE4] py-20 px-10">
      <div className="max-w-7xl mx-auto">
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
              <button className="bg-[#4f6e39] px-4 py-2 rounded-r-md text-xs font-bold">
                Langganan
              </button>
            </div>
          </div>
        </div>

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
              {menuUtama.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                  >
                    {">"} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Topik Skincare
            </h4>
            <ul className="text-xs space-y-2 opacity-80">
              {topikSkincare.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                  >
                    {">"} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold border-b border-white/20 pb-2 mb-4">
              Diskusi Terbaru
            </h4>
            <div className="space-y-4">
              {recentDiscussions.length > 0 ? (
                recentDiscussions.map((post) => {
                  const fotoProfilUrl = post.anonim || !post.penulis?.foto_profil 
                    ? null 
                    : `${baseUrl}/uploads/${post.penulis.foto_profil}`;

                  return (
                    <Link
                      key={post.id_posting}
                      to={`/forum?search=${encodeURIComponent(post.judul_posting)}`}
                      className="flex gap-3 hover:opacity-100 opacity-80 transition-opacity items-center group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0 overflow-hidden border border-white/10 flex items-center justify-center text-[#193505] font-bold text-xs uppercase bg-white">
                        {fotoProfilUrl ? (
                          <img
                            src={fotoProfilUrl}
                            alt="Penulis"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://placehold.co/32x32/3d5532/ffffff?text=${post.penulis?.username?.charAt(0).toUpperCase() || "U"}`;
                            }}
                          />
                        ) : (
                          <span>{post.anonim ? "A" : post.penulis?.username?.charAt(0) || "U"}</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] opacity-60">
                          {new Date(post.tanggal_posting).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}
                        </p>
                        <p className="text-[11px] font-medium truncate group-hover:text-brand-primary-100 transition-colors">
                          {post.judul_posting}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-[11px] opacity-50 italic py-2">
                  Belum ada diskusi komunitas aktif.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;