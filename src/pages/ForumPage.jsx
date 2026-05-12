import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ForumPage = ({ user }) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedComments, setExpandedComments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [editData, setEditData] = useState({
    judul_posting: "",
    isi_posting: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const feedRef = useRef(null);
  // --- 1. FETCH DATA (DENGAN FILTER SEARCH DARI URL) ---
  const fetchDiscussions = async () => {
    try {
      // PENTING: Kirimkan query search ke Backend API
      const response = await fetch(
        `http://localhost:5000/api/forum${search || ""}`,
      );
      const res = await response.json();
      if (res.status === "success") {
        setDiscussions(res.data); // Update daftar diskusi dengan hasil pencarian
      }
    } catch (error) {
      console.error("Gagal mengambil diskusi:", error);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [search]);

  // --- 2. FUNGSI HANDLE SEARCH ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/forum?search=${searchInput.trim()}`);

      // LOGIKA SCROLL OTOMATIS
      setTimeout(() => {
        feedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // Berikan sedikit delay agar navigasi URL selesai
    } else {
      navigate("/forum");
    }
  };

  // --- FUNGSI LOGIKA LAINNYA ---
  const toggleComments = (id_posting) => {
    if (expandedComments.includes(id_posting)) {
      setExpandedComments(expandedComments.filter((id) => id !== id_posting));
    } else {
      setExpandedComments([...expandedComments, id_posting]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus postingan ini secara permanen?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/forum/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Postingan berhasil dihapus!");
        fetchDiscussions();
      }
    } catch (error) {
      alert("Gagal menghapus.");
    }
  };

  const handleOpenEdit = (post) => {
    setSelectedPost(post);
    setEditData({
      judul_posting: post.judul_posting,
      isi_posting: post.isi_posting,
    });
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleUpdate = async () => {
    if (!editData.judul_posting.trim() || !editData.isi_posting.trim())
      return alert("Isi tidak boleh kosong!");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/forum/${selectedPost.id_posting}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editData,
            kategori: selectedPost.kategori,
            anonim: selectedPost.anonim,
          }),
        },
      );
      if (response.ok) {
        alert("✅ Perubahan disimpan!");
        setShowEditModal(false);
        fetchDiscussions();
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    }
  };

  const handleLike = async (id_posting) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Silakan login!");
    try {
      const response = await fetch(
        `http://localhost:5000/api/forum/like/${id_posting}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) fetchDiscussions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendReply = async () => {
    if (!commentText.trim()) return alert("Isi balasan kosong!");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/forum/comment/${selectedPost.id_posting}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isi_komentar: commentText, anonim: isAnon }),
        },
      );
      if (response.ok) {
        alert("Balasan terkirim!");
        setShowReplyModal(false);
        setCommentText("");
        fetchDiscussions();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`bg-[#F2EDE4] font-sans text-[#1e2b19] min-h-screen ${showReplyModal || showEditModal ? "overflow-hidden" : ""}`}
    >
      {/* MODAL EDIT & BALASAN DISINI (Tidak saya tulis ulang agar hemat tempat, tapi tetap gunakan kode asli Anda) */}
      {/* POPUP MODAL EDIT */}
      {showEditModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1e2b19]/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="relative bg-[#F2EDE4] w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 z-[1001]">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/50">
              <h3 className="font-serif text-xl font-bold">
                Edit Diskusi Anda
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              <div className="bg-white rounded-3xl p-4 shadow-inner border border-gray-100">
                <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-widest italic">
                  Judul Diskusi
                </label>
                <input
                  className="w-full bg-transparent text-sm text-[#3D5532] outline-none font-bold"
                  value={editData.judul_posting}
                  onChange={(e) =>
                    setEditData({ ...editData, judul_posting: e.target.value })
                  }
                />
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-inner border border-gray-100">
                <label className="text-[9px] font-black text-gray-400 uppercase mb-2 block tracking-widest italic">
                  Isi Diskusi
                </label>
                <textarea
                  className="w-full bg-transparent text-xs text-gray-600 outline-none resize-none h-40"
                  value={editData.isi_posting}
                  onChange={(e) =>
                    setEditData({ ...editData, isi_posting: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-white flex justify-end gap-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="bg-[#3D5532] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#2d4025] transition-all transform active:scale-95 relative z-[1002]"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL BALASAN */}
      {showReplyModal && selectedPost && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1e2b19]/60 backdrop-blur-sm"
            onClick={() => setShowReplyModal(false)}
          ></div>
          <div className="relative bg-[#F2EDE4] w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white/50">
              <h3 className="font-serif text-xl font-bold">Berikan Balasan</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              <h4 className="text-lg font-bold italic text-[#3D5532]">
                "{selectedPost.judul_posting}"
              </h4>
              <p className="text-xs text-gray-500 border-l-4 border-[#3D5532]/20 pl-4">
                {selectedPost.isi_posting}
              </p>
              <div className="bg-white rounded-3xl p-6 shadow-inner border border-gray-100">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-transparent text-xs text-gray-600 outline-none h-32"
                  placeholder="Tulis balasanmu..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-white flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnon}
                  onChange={() => setIsAnon(!isAnon)}
                  className="accent-[#3D5532]"
                />
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Posting Anonim
                </span>
              </label>
              <button
                onClick={handleSendReply}
                className="bg-[#3D5532] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
              >
                Kirim Balasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="px-10 pt-10 pb-6 flex flex-col items-center">
        <header className="w-full max-w-7xl bg-[#DDE5DC] rounded-[50px] p-12 text-center relative overflow-hidden border border-white">
          <div className="bg-[#3D5532] text-white text-[9px] font-black px-4 py-1.5 rounded-full w-fit mx-auto mb-6 tracking-[0.3em]">
            COMMUNITY HUB
          </div>
          <h1 className="text-5xl font-serif mb-4">
            Selamat Datang di Forum Diskusi{" "}
            <span className="text-[#3D5532]">SkinCycle</span>
          </h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-10">
            Berinteraksi dengan 15.000+ member komunitas. Tanya, bagikan
            pengalaman, dan cari solusi tentang skincare berkelanjutan bersama.
          </p>

          {/* SEARCH BAR MODIFIED WITH MAGNIFIER ICON */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex max-w-2xl mx-auto gap-3 items-center"
          >
            <div className="relative flex-grow group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari diskusi, hashtag, atau topik..."
                className="w-full bg-white rounded-full pl-14 pr-8 py-4 text-sm outline-none shadow-sm focus:ring-2 focus:ring-[#3D5532]/20 transition-all"
              />
              <button
                type="submit"
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3D5532] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => navigate("/forum/buat")}
              type="button"
              className="bg-[#3D5532] text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg hover:bg-[#2d4025] transition-all"
            >
              Buat Postingan
            </button>
          </form>
        </header>

        <div className="w-full max-w-7xl grid grid-cols-5 gap-4 mt-12">
          {[
            { label: "Rekomendasi", icon: "🌱", count: "1.2K" },
            { label: "Daur Ulang", icon: "♻️", count: "850" },
            { label: "Bahan Alami", icon: "🧪", count: "2.1K" },
            { label: "Tips & Trik", icon: "💡", count: "3.4K" },
            { label: "Produk Baru", icon: "📦", count: "500" },
          ].map((cat) => (
            <div
              key={cat.label}
              onClick={() => navigate(`/forum?search=${cat.label}`)}
              className="bg-white p-6 rounded-[35px] text-center border border-gray-50 hover:shadow-md transition cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#F9F9F7] rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
                {cat.icon}
              </div>
              <h5 className="font-bold text-sm mb-1">{cat.label}</h5>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                {cat.count} DISKUSI
              </p>
            </div>
          ))}
        </div>
      </section>

      <main
        ref={feedRef} // <--- Target scroll di sini
        className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[35px] p-6 shadow-sm border border-gray-100">
            <nav className="space-y-2">
              <button
                onClick={() => navigate("/forum")}
                className="w-full flex items-center gap-3 bg-[#3D5532] text-white p-4 rounded-2xl text-sm font-bold shadow-md"
              >
                🏠 Forum Diskusi
              </button>
              <button className="w-full flex items-center gap-3 hover:bg-gray-50 p-4 rounded-2xl text-sm text-gray-400 font-bold">
                🔥 Diskusi Populer
              </button>
              <button className="w-full flex items-center gap-3 hover:bg-gray-50 p-4 rounded-2xl text-sm text-gray-400 font-bold">
                🏷️ Topik Saya
              </button>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-6 space-y-6">
          {discussions.map((post) => (
            <div
              key={post.id_posting}
              id={`post-${post.id_posting}`}
              className="bg-white p-10 rounded-[50px] border border-gray-50 shadow-sm hover:border-[#3D5532]/20 transition-all group relative"
            >
              {user && user.id_profil === post.id_profil && (
                <div className="absolute top-10 right-10">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === post.id_posting
                          ? null
                          : post.id_posting,
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 font-bold text-xl transition-colors"
                  >
                    ⋮
                  </button>
                  {activeDropdown === post.id_posting && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id_posting)}
                        className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-400 hover:bg-red-50 flex items-center gap-2"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#3D5532] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                  {post.penulis?.username?.charAt(0) || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold">
                      {post.anonim
                        ? "User Anonim"
                        : post.penulis?.username || "Akun SkinCycle"}
                    </h5>
                    <span className="bg-[#EDF1EC] text-[#3D5532] text-[8px] font-black px-2 py-0.5 rounded uppercase">
                      MEMBER
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(post.tanggal_posting).toLocaleDateString()} •{" "}
                    {post.kategori}
                  </p>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-[#3D5532] transition-colors">
                {post.judul_posting}
              </h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                {post.isi_posting}
              </p>

              {/* HASHTAG AREA (MODERN STYLE) */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-gray-50">
                  {post.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        navigate(`/forum?search=${tag.trim().replace("#", "")}`)
                      }
                      className="text-[10px] font-black text-[#3D5532] uppercase tracking-widest bg-[#F9F9F7] px-3 py-1 rounded-full cursor-pointer hover:bg-[#3D5532] hover:text-white transition-all"
                    >
                      {tag.trim().startsWith("#")
                        ? tag.trim()
                        : `#${tag.trim()}`}
                    </span>
                  ))}
                </div>
              )}

              {expandedComments.includes(post.id_posting) &&
                post.komentar &&
                post.komentar.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">
                      Balasan Komunitas ({post.komentar.length})
                    </p>
                    {post.komentar.map((kom) => (
                      <div
                        key={kom.id_komentar}
                        className="flex gap-3 bg-[#F9F9F7] p-4 rounded-3xl border border-gray-50"
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
                          {kom.pemberi_komentar?.username?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h6 className="text-[11px] font-bold text-[#1e2b19]">
                              {kom.anonim
                                ? "User Anonim"
                                : kom.pemberi_komentar?.username || "Member"}
                            </h6>
                            <span className="text-[8px] text-gray-400 uppercase">
                              {new Date(
                                kom.tanggal_komentar,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            {kom.isi_komentar}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-6">
                <div className="flex gap-6">
                  <button
                    onClick={() => handleLike(post.id_posting)}
                    className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-green-600 transition-colors"
                  >
                    👍 {post.likes?.length || 0} Suka
                  </button>
                  <button
                    onClick={() => toggleComments(post.id_posting)}
                    className={`flex items-center gap-2 text-[11px] font-bold transition-colors ${expandedComments.includes(post.id_posting) ? "text-[#3D5532]" : "text-gray-400 hover:text-[#3D5532]"}`}
                  >
                    💬 {post.komentar?.length || 0} Balasan{" "}
                    {expandedComments.includes(post.id_posting) ? "↑" : "↓"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setShowReplyModal(true);
                  }}
                  className="text-[11px] font-black text-[#3D5532] uppercase tracking-widest hover:underline"
                >
                  Tulis Balasan →
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-3">
          <div className="bg-white rounded-[45px] p-8 shadow-sm border border-gray-100">
            <h4 className="flex items-center gap-2 text-sm font-bold mb-8">
              🎯 Topik Teratas
            </h4>
            <div className="space-y-8">
              {[
                { id: "01", t: "Bahan Berbahaya Skincare" },
                { id: "02", t: "Tips Daur Ulang Kemasan" },
                { id: "03", t: "Zero Waste Routine" },
              ].map((topic) => (
                <div
                  key={topic.id}
                  className="flex gap-4 group cursor-pointer"
                  onClick={() => navigate(`/forum?search=${topic.t}`)}
                >
                  <span className="text-lg font-serif font-black text-gray-200 group-hover:text-[#3D5532] transition-colors">
                    {topic.id}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold leading-snug mb-1">
                      {topic.t}
                    </h5>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                      124 Diskusi Hari ini
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ForumPage;
