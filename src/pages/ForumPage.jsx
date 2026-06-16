import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Search,
  PlusCircle,
  MessageSquare,
  ThumbsUp,
  MoreVertical,
  Edit2,
  Trash2,
  Home,
  Flame,
  Bookmark,
  Target,
  Wallet,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Recycle,
  FlaskConical,
  Lightbulb,
  Package,
} from "lucide-react";

const ForumPage = ({ user }) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGuidelineModal, setShowGuidelineModal] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
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

  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);

  const navigate = useNavigate();
  const { search } = useLocation();
  const feedRef = useRef(null);

  const fetchDiscussions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/forum${search || ""}`,
      );
      const res = await response.json();
      if (res.status === "success") {
        setDiscussions(res.data);
      }
    } catch (error) {
      console.error("Gagal mengambil diskusi:", error);
    }
  };

  const fetchUserStatsData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch(
        "http://localhost:5000/api/recycle/user-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        setTransactions(result.data.riwayat || result.data.laporan || []);
        setWalletBalance(result.data.total_saldo || 0);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi data metrik forum:", err);
    }
  };

  useEffect(() => {
    fetchUserStatsData();
    fetchDiscussions();
  }, []);

  useEffect(() => {
    fetchDiscussions();
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/forum?search=${searchInput.trim()}`);
      setTimeout(() => {
        feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      navigate("/forum");
    }
  };

  const toggleComments = (id_posting) => {
    setExpandedComments((prev) =>
      prev.includes(id_posting)
        ? prev.filter((id) => id !== id_posting)
        : [...prev, id_posting],
    );
  };

  const handleLike = async (id_posting) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Belum Masuk",
        text: "Silakan masuk ke akun Anda terlebih dahulu untuk menyukai postingan.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        confirmButtonText: "Masuk",
        showCancelButton: true,
        cancelButtonText: "Nanti",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/forum/like/${id_posting}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.ok) fetchDiscussions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendReply = async () => {
    if (!commentText.trim()) {
      Swal.fire({
        title: "Balasan Kosong",
        text: "Mohon tulis isi balasan Anda sebelum mengirim.",
        icon: "warning",
        confirmButtonColor: "#3D5532",
        customClass: { popup: "rounded-[30px]" },
      });
      return;
    }
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
          body: JSON.stringify({
            isi_komentar: commentText,
            anonim: isAnon,
            id_komentar_induk: selectedPost.id_komentar_induk || null,
          }),
        },
      );
      if (response.ok) {
        setShowReplyModal(false);
        setCommentText("");
        fetchDiscussions();
      }
    } catch (error) {
      console.error(error);
    }
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
        setShowEditModal(false);
        fetchDiscussions();
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
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
      if (res.ok) fetchDiscussions();
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

  // --- HITUNG COUNT KATEGORI DARI DATA DISKUSI LIVE ---
  const hitungKategori = (labelKategori) => {
    const total = discussions.filter(
      (post) =>
        (post.kategori || "").trim().toLowerCase() ===
        labelKategori.trim().toLowerCase(),
    ).length;
    if (total >= 1000) return `${(total / 1000).toFixed(1)}K`;
    return String(total);
  };

  const categories = [
    { label: "Rekomendasi", Icon: Sparkles, iconColor: "text-amber-400" },
    { label: "Daur Ulang", Icon: Recycle, iconColor: "text-emerald-500" },
    { label: "Kandungan", Icon: FlaskConical, iconColor: "text-blue-400" },
    { label: "Tips & Trik", Icon: Lightbulb, iconColor: "text-yellow-400" },
    { label: "Produk", Icon: Package, iconColor: "text-slate-400" },
  ];

  // LOGIKA LEVEL
  const totalBeratLive = (transactions || []).reduce((acc, item) => {
    const statusAktif = (
      item.status ||
      item.status_jemput ||
      item.detail_laporan?.status_jemput ||
      ""
    )
      .trim()
      .toUpperCase();
    if (statusAktif === "SELESAI") {
      let berat = parseFloat(
        item.berat_asli || item.detail_laporan?.berat_asli || 0,
      );
      if (berat === 0 && item.aktivitas) {
        const match = item.aktivitas.match(/(\d+(?:\.\d+)?)\s*kg/i);
        if (match && match[1]) berat = parseFloat(match[1]);
      }
      return acc + berat;
    }
    return acc;
  }, 0);

  let levelNama = "Tunas";
  let levelAngka = "Lv. 1";
  let targetBatasAtas = 30;
  let minimalLevelSekarang = 0;

  if (totalBeratLive >= 90) {
    levelNama = "Penjaga";
    levelAngka = "Lv. 4 (Max)";
    targetBatasAtas = 90;
    minimalLevelSekarang = 90;
  } else if (totalBeratLive >= 60) {
    levelNama = "Eco";
    levelAngka = "Lv. 3";
    targetBatasAtas = 90;
    minimalLevelSekarang = 60;
  } else if (totalBeratLive >= 30) {
    levelNama = "Pahlawan Hijau";
    levelAngka = "Lv. 2";
    targetBatasAtas = 60;
    minimalLevelSekarang = 30;
  }

  const sisaSampahKeTarget = targetBatasAtas - totalBeratLive;
  const selisihBobot = targetBatasAtas - minimalLevelSekarang;
  const progressMurni = totalBeratLive - minimalLevelSekarang;
  const persentaseProgress =
    totalBeratLive > 0 && selisihBobot > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((progressMurni / selisihBobot) * 100)),
        )
      : 0;

  const dapatkanNamaLevelTujuan = (target) => {
    if (target === 30) return "Pahlawan Hijau";
    if (target === 60) return "Eco";
    return "Penjaga";
  };

  const dapatkanDataFeedFiltered = () => {
    let copyDiscussions = [...discussions];
    if (activeTab === "mine") {
      return copyDiscussions.filter(
        (post) => post.id_profil === user?.id_profil,
      );
    }
    if (activeTab === "popular") {
      return copyDiscussions.sort((a, b) => {
        const totalInteraksiA =
          (a.likes?.length || 0) + (a.komentar?.length || 0);
        const totalInteraksiB =
          (b.likes?.length || 0) + (b.komentar?.length || 0);
        return totalInteraksiB - totalInteraksiA;
      });
    }
    return copyDiscussions;
  };

  const filteredFeedData = dapatkanDataFeedFiltered();

  const dapatkanTopikTeratasDinamis = () => {
    return [...discussions]
      .sort((a, b) => {
        const interaksiA = (a.likes?.length || 0) + (a.komentar?.length || 0);
        const interaksiB = (b.likes?.length || 0) + (b.komentar?.length || 0);
        return interaksiB - interaksiA;
      })
      .slice(0, 7);
  };

  const topTopicsData = dapatkanTopikTeratasDinamis();

  return (
    <div
      className={`bg-brand-secondary-100 font-sans text-brand-dark-500 min-h-screen ${showReplyModal || showEditModal || showGuidelineModal ? "overflow-hidden" : ""}`}
    >
      {showGuidelineModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-brand-dark-500/60 backdrop-blur-sm"
            onClick={() => setShowGuidelineModal(false)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-8 space-y-6 z-[1001] border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
              <h3 className="font-sans text-lg font-black text-brand-dark-500 flex items-center gap-2 uppercase tracking-tight">
                <BookOpen className="w-5 h-5 text-brand-primary-300" /> Panduan
                Komunitas
              </h3>
              <button
                onClick={() => setShowGuidelineModal(false)}
                className="text-neutral-400 hover:text-brand-dark-500 font-bold outline-none"
              >
                ✕
              </button>
            </div>
            <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 space-y-3">
              <h4 className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tips Postingan Yang Baik
              </h4>
              <ul className="text-xs text-neutral-500 space-y-2 font-medium leading-relaxed">
                <li>
                  <strong className="text-brand-dark-500">Judul yang jelas:</strong>{" "}
                  Buat judul yang ringkas dan spesifik agar orang langsung tahu topiknya.
                </li>
                <li>
                  <strong className="text-brand-dark-500">Gunakan tag:</strong>{" "}
                  Gunakan tag yang relevan seperti{" "}
                  <span className="text-brand-primary-300 font-bold">#skincarehack</span>{" "}
                  agar post mudah ditemukan.
                </li>
                <li>
                  <strong className="text-brand-dark-500">Format yang rapi:</strong>{" "}
                  Berikan poin-poin dan spasi antar paragraf agar mudah dibaca.
                </li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 space-y-3">
              <h4 className="text-[10px] font-black text-feedback-error-200 uppercase tracking-widest flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Aturan Komunitas Forum
              </h4>
              <ul className="text-xs text-neutral-500 space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                <li>Berbaik sopan dan menghargai anggota lain</li>
                <li>Dilarang keras melakukan promosi jualan ilegal atau spam</li>
                <li>Jaga komunikasi tetap positif dan sirkular</li>
                <li>Cantumkan sumber terpercaya untuk klaim medis bahan aktif</li>
                <li>Gunakan fitur peringatan sensor untuk topik sensitif</li>
              </ul>
            </div>
            <button
              onClick={() => setShowGuidelineModal(false)}
              className="w-full bg-[#3D5532] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-[#22351c] transition-all outline-none"
            >
              Saya Paham &amp; Mengerti
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-brand-dark-500/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="relative bg-brand-secondary-100 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden z-[1001]">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-default/50">
              <h3 className="font-sans text-xl font-bold">Edit Diskusi Anda</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              <div className="bg-white rounded-3xl p-4 shadow-inner border border-neutral-50">
                <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 block tracking-widest italic">
                  Judul Diskusi
                </label>
                <input
                  className="w-full bg-transparent text-sm text-brand-primary-300 outline-none font-bold"
                  value={editData.judul_posting}
                  onChange={(e) =>
                    setEditData({ ...editData, judul_posting: e.target.value })
                  }
                />
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-inner border border-neutral-50">
                <label className="text-[9px] font-black text-neutral-400 uppercase mb-2 block tracking-widest italic">
                  Isi Diskusi
                </label>
                <textarea
                  className="w-full bg-transparent text-xs text-neutral-600 outline-none resize-none h-40"
                  value={editData.isi_posting}
                  onChange={(e) =>
                    setEditData({ ...editData, isi_posting: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="p-6 bg-white flex justify-end gap-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="bg-brand-primary-300 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary-500 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {showReplyModal && selectedPost && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-brand-dark-500/60 backdrop-blur-sm"
            onClick={() => setShowReplyModal(false)}
          ></div>
          <div className="relative bg-brand-secondary-100 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-default/50">
              <h3 className="font-sans text-xl font-bold">Berikan Balasan</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              <h4 className="text-lg font-bold italic text-brand-primary-300">
                "{selectedPost.judul_posting}"
              </h4>
              <p className="text-xs text-neutral-500 border-l-4 border-brand-primary-100 pl-4">
                {selectedPost.isi_posting}
              </p>
              <div className="bg-white rounded-3xl p-6 shadow-inner border border-neutral-50">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-transparent text-xs text-neutral-600 outline-none h-32"
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
                  className="accent-brand-primary-300"
                />
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                  Posting Anonim
                </span>
              </label>
              <button
                onClick={handleSendReply}
                className="bg-brand-primary-300 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-brand-primary-500 transition-colors"
              >
                Kirim Balasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-6 flex flex-col items-center">
        <header className="w-full bg-brand-primary-100/30 rounded-[50px] p-12 text-center relative overflow-hidden border border-neutral-default">
          <div className="bg-brand-primary-300 text-white text-[9px] font-black px-4 py-1.5 rounded-full w-fit mx-auto mb-6 tracking-[0.3em]">
            COMMUNITY HUB
          </div>
          <h1 className="text-5xl font-marcellus mb-4 text-brand-dark-500">
            Selamat Datang di Forum Diskusi{" "}
            <span className="text-brand-primary-300">SkinCycle</span>
          </h1>
          <p className="text-neutral-600 text-sm max-w-2xl mx-auto mb-10">
            Berinteraksi dengan 15.000+ member komunitas. Tanya, bagikan
            pengalaman, dan cari solusi tentang skincare berkelanjutan bersama.
          </p>
          <form
            onSubmit={handleSearchSubmit}
            className="flex max-w-2xl mx-auto gap-3 items-center w-full"
          >
            <div className="relative flex-grow group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari diskusi, hashtag, atau topik..."
                className="w-full bg-white rounded-full pl-14 pr-8 py-4 text-sm outline-none shadow-sm focus:ring-2 focus:ring-brand-primary-300/20 transition-all font-medium"
              />
              <button
                type="submit"
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-primary-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate("/forum/buat")}
              className="bg-brand-primary-300 text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg hover:bg-brand-primary-500 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" /> Buat Postingan
            </button>
          </form>
        </header>

        {/* KATEGORI GRID — count live dari discussions */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {categories.map((cat) => {
            const count = hitungKategori(cat.label);
            const { Icon, iconColor } = cat;
            return (
              <div
                key={cat.label}
                onClick={() => navigate(`/forum?search=${cat.label}`)}
                className="bg-neutral-default p-6 rounded-[35px] text-center border border-neutral-50 hover:shadow-md transition cursor-pointer group"
              >
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary-100/20 transition-colors">
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h5 className="font-bold text-sm mb-1 text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors">
                  {cat.label}
                </h5>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">
                  {count} DISKUSI
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN FEED */}
      <main
        ref={feedRef}
        className="max-w-7xl mx-auto px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* ASIDE KIRI */}
        <aside className="lg:col-span-3 lg:sticky lg:top-6 h-fit space-y-6 z-10">
          <div className="bg-white rounded-[35px] p-6 shadow-sm border border-neutral-100">
            <nav className="space-y-2">
              <button
                type="button"
                onClick={() => { setActiveTab("all"); navigate("/forum"); }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${activeTab === "all" ? "bg-brand-primary-300 text-white shadow-md" : "bg-white text-neutral-400 hover:bg-neutral-50"}`}
              >
                <Home className="w-4 h-4" /> Forum Diskusi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("popular")}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${activeTab === "popular" ? "bg-brand-primary-300 text-white shadow-md" : "bg-white text-neutral-400 hover:bg-neutral-50"}`}
              >
                <Flame className="w-4 h-4" /> Diskusi Populer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mine")}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${activeTab === "mine" ? "bg-brand-primary-300 text-white shadow-md" : "bg-white text-neutral-400 hover:bg-neutral-50"}`}
              >
                <Bookmark className="w-4 h-4" /> Topik Saya
              </button>
              <button
                type="button"
                onClick={() => setShowGuidelineModal(true)}
                className="w-full flex items-center gap-3 bg-white text-neutral-400 p-4 rounded-2xl text-sm font-bold hover:bg-neutral-50 transition-all border border-transparent"
              >
                <BookOpen className="w-4 h-4" /> Panduan Diskusi
              </button>
            </nav>
          </div>
          <div className="bg-[#3d5532] rounded-[40px] p-8 text-white space-y-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-lg font-bold text-white uppercase shrink-0">
                {user?.username ? user.username.charAt(0) : "U"}
              </div>
              <div>
                <h4 className="text-base font-sans font-bold capitalize leading-tight">
                  {user?.username || "Rayhan"}
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-0.5">
                  {levelNama} • {levelAngka}
                </p>
              </div>
            </div>
            <hr className="border-white/10" />
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-5xl font-sans font-black tracking-tight">{totalBeratLive}</span>
                <span className="text-sm font-bold text-white/40">/ {targetBatasAtas} KG</span>
              </div>
              <p className="text-xs font-medium text-white/80">
                {sisaSampahKeTarget > 0 ? (
                  <><strong>{sisaSampahKeTarget} KG</strong> sampah lagi menuju {dapatkanNamaLevelTujuan(targetBatasAtas)}</>
                ) : (
                  "Tingkat kontribusi maksimal telah tercapai! 🎉"
                )}
              </p>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-white/40 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${persentaseProgress}%` }}
              ></div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-2 border border-white/5 shadow-inner">
              <Wallet className="w-4 h-4 text-white/60" />
              <span className="text-xs font-bold tracking-wide">
                Rp {walletBalance.toLocaleString("id-ID")} Saldo
              </span>
            </div>
          </div>
        </aside>

        {/* LIST DISKUSI TENGAH */}
        <div className="lg:col-span-6 space-y-6">
          {filteredFeedData.length === 0 ? (
            <div className="bg-white p-16 rounded-[50px] border border-neutral-100 text-center text-neutral-400 italic font-medium shadow-sm">
              Tidak ada postingan diskusi aktif pada kategori tab ini.
            </div>
          ) : (
            filteredFeedData.map((post) => (
              <div
                key={post.id_posting}
                id={`post-${post.id_posting}`}
                className="bg-white p-10 rounded-[50px] border border-neutral-50 shadow-sm relative group"
              >
                {user && user.id_profil === post.id_profil && (
                  <div className="absolute top-10 right-10">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === post.id_posting ? null : post.id_posting,
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 text-neutral-400 font-bold transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeDropdown === post.id_posting && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="w-full text-left px-4 py-2 text-[11px] font-bold text-neutral-600 hover:bg-neutral-50 flex items-center gap-2"
                        >
                          <Edit2 className="w-3 h-3 text-brand-primary-300" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id_posting)}
                          className="w-full text-left px-4 py-2 text-[11px] font-bold text-feedback-error-200 hover:bg-feedback-error-100/10 flex items-center gap-2"
                        >
                          <Trash2 className="w-3 h-3" /> Hapus
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-brand-primary-300 rounded-full flex items-center justify-center text-neutral-default text-xs font-bold uppercase overflow-hidden border border-neutral-100 shadow-sm shrink-0">
                    {!post.anonim && post.penulis?.foto_profil ? (
                      <img
                        src={`http://localhost:5000/uploads/${post.penulis.foto_profil}`}
                        alt="Penulis"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/40x40/3d5532/ffffff?text=${post.penulis?.username?.charAt(0).toUpperCase()}`;
                        }}
                      />
                    ) : (
                      <span>{post.anonim ? "A" : post.penulis?.username?.charAt(0) || "U"}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-bold text-brand-dark-500 capitalize">
                        {post.anonim ? "User Anonim" : post.penulis?.username || "Akun SkinCycle"}
                      </h5>
                      <span className="bg-brand-primary-100/30 text-brand-primary-300 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        MEMBER
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                      {new Date(post.tanggal_posting).toLocaleDateString()} • {post.kategori}
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-marcellus mb-4 leading-tight group-hover:text-brand-primary-300 transition-colors">
                  {post.judul_posting
                    ? post.judul_posting.charAt(0).toUpperCase() + post.judul_posting.slice(1)
                    : ""}
                </h3>
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed font-medium">
                  {post.isi_posting}
                </p>

                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-neutral-50">
                    {post.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        onClick={() => navigate(`/forum?search=${tag.trim().replace("#", "")}`)}
                        className="text-[10px] font-black text-brand-primary-300 uppercase tracking-widest bg-neutral-50 px-3 py-1 rounded-full cursor-pointer hover:bg-brand-primary-300 hover:text-neutral-default transition-all"
                      >
                        {tag.trim().startsWith("#") ? tag.trim() : `#${tag.trim()}`}
                      </span>
                    ))}
                  </div>
                )}

                {expandedComments.includes(post.id_posting) &&
                  post.komentar &&
                  post.komentar.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-neutral-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">
                        Balasan Komunitas ({post.komentar.length})
                      </p>
                      {post.komentar
                        .filter((k) => !k.isi_komentar.trim().startsWith("@"))
                        .map((mainKom) => (
                          <div key={mainKom.id_komentar} className="space-y-3">
                            <div className="flex gap-3 bg-neutral-50 p-4 rounded-3xl border border-neutral-100">
                              <div className="w-8 h-8 bg-neutral-200 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-neutral-500 uppercase overflow-hidden border border-neutral-100">
                                {!mainKom.anonim && mainKom.pemberi_komentar?.foto_profil ? (
                                  <img
                                    src={`http://localhost:5000/uploads/${mainKom.pemberi_komentar.foto_profil}`}
                                    alt="Komentator"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://placehold.co/32x32/a3a3a3/ffffff?text=${mainKom.pemberi_komentar?.username?.charAt(0).toUpperCase()}`;
                                    }}
                                  />
                                ) : (
                                  <span>
                                    {mainKom.anonim ? "A" : mainKom.pemberi_komentar?.username?.charAt(0) || "U"}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h6 className="text-[11px] font-bold text-brand-dark-500 capitalize">
                                    {mainKom.anonim ? "User Anonim" : mainKom.pemberi_komentar?.username || "User SkinCycle"}
                                  </h6>
                                  <span className="text-[8px] text-neutral-400 uppercase">
                                    {new Date(mainKom.tanggal_komentar).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">
                                  {mainKom.isi_komentar}
                                </p>
                                <div className="flex gap-4 items-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedPost({
                                        id_posting: post.id_posting,
                                        id_komentar_induk: mainKom.id_komentar,
                                        judul_posting: post.judul_posting,
                                        isi_posting: post.isi_posting,
                                      });
                                      setCommentText(`@${mainKom.pemberi_komentar?.username || "user"} `);
                                      setShowReplyModal(true);
                                    }}
                                    className="text-[9px] font-black text-neutral-400 uppercase tracking-widest hover:text-brand-primary-300 transition-colors outline-none"
                                  >
                                    Balas
                                  </button>
                                  <button
                                    type="button"
                                    className="text-[9px] font-black text-neutral-400 uppercase tracking-widest hover:text-feedback-success-300 transition-colors outline-none"
                                  >
                                    Suka
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="ml-10 space-y-3 border-l-2 border-neutral-100/70 pl-4">
                              {post.komentar
                                .filter((r) => {
                                  if (r.id_komentar_induk !== null && r.id_komentar_induk !== undefined) {
                                    return Number(r.id_komentar_induk) === Number(mainKom.id_komentar);
                                  }
                                  const teksMurni = r.isi_komentar.trim().toLowerCase();
                                  const tagUsername = `@${mainKom.pemberi_komentar?.username}`.toLowerCase();
                                  return (
                                    teksMurni.startsWith(tagUsername) &&
                                    Number(r.id_posting) === Number(post.id_posting) &&
                                    Number(r.id_komentar) !== Number(mainKom.id_komentar) &&
                                    (mainKom.id_komentar_induk === null || mainKom.id_komentar_induk === undefined)
                                  );
                                })
                                .map((reply) => (
                                  <div key={reply.id_komentar} className="flex gap-3 bg-neutral-default/60 p-3 rounded-2xl border border-neutral-50 shadow-sm">
                                    <div className="w-6 h-6 bg-brand-primary-100/30 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-brand-primary-300 uppercase overflow-hidden border border-neutral-100">
                                      {!reply.anonim && reply.pemberi_komentar?.foto_profil ? (
                                        <img
                                          src={`http://localhost:5000/uploads/${reply.pemberi_komentar.foto_profil}`}
                                          alt="Balasan"
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/24x24/3d5532/ffffff?text=${reply.pemberi_komentar?.username?.charAt(0).toUpperCase()}`;
                                          }}
                                        />
                                      ) : (
                                        <span>
                                          {reply.anonim ? "A" : reply.pemberi_komentar?.username?.charAt(0) || "U"}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <h6 className="text-[10px] font-bold text-brand-dark-500 capitalize">
                                          {reply.anonim ? "User Anonim" : reply.pemberi_komentar?.username}
                                        </h6>
                                        <span className="text-[7px] text-neutral-400 uppercase">
                                          {new Date(reply.tanggal_komentar).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-neutral-600 leading-relaxed">
                                        <span className="text-brand-primary-300 font-bold mr-1">
                                          @{mainKom.pemberi_komentar?.username}
                                        </span>
                                        {reply.isi_komentar.trim().toLowerCase().startsWith(
                                          `@${mainKom.pemberi_komentar?.username}`.toLowerCase(),
                                        )
                                          ? reply.isi_komentar.substring(`@${mainKom.pemberi_komentar?.username}`.length + 1)
                                          : reply.isi_komentar}
                                      </p>
                                      <div className="flex gap-4 items-center mt-1.5">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedPost({
                                              id_posting: post.id_posting,
                                              id_komentar_induk: mainKom.id_komentar,
                                              judul_posting: post.judul_posting,
                                              isi_posting: post.isi_posting,
                                            });
                                            setCommentText(`@${reply.pemberi_komentar?.username || "user"} `);
                                            setShowReplyModal(true);
                                          }}
                                          className="text-[9px] font-black text-neutral-400 uppercase tracking-widest hover:text-brand-primary-300 transition-colors outline-none"
                                        >
                                          Balas
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                <div className="flex items-center justify-between border-t border-neutral-50 pt-6 mt-6">
                  <div className="flex gap-6">
                    <button
                      onClick={() => handleLike(post.id_posting)}
                      className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 hover:text-feedback-success-300 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> {post.likes?.length || 0} Suka
                    </button>
                    <button
                      onClick={() => toggleComments(post.id_posting)}
                      className={`flex items-center gap-2 text-[11px] font-bold transition-colors ${expandedComments.includes(post.id_posting) ? "text-brand-primary-300" : "text-neutral-400 hover:text-brand-primary-300"}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> {post.komentar?.length || 0} Balasan{" "}
                      {expandedComments.includes(post.id_posting) ? "↑" : "↓"}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setCommentText("");
                      setShowReplyModal(true);
                    }}
                    className="text-[11px] font-black text-brand-primary-300 uppercase tracking-widest hover:underline transition-all"
                  >
                    Tulis Balasan →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ASIDE KANAN */}
        <aside className="lg:col-span-3 lg:sticky lg:top-6 h-fit z-10">
          <div className="bg-white rounded-[45px] p-8 shadow-sm border border-neutral-100">
            <h4 className="flex items-center gap-2 text-sm font-bold mb-8 text-brand-dark-500">
              <Target className="w-4 h-4 text-brand-primary-300" /> Topik Teratas
            </h4>
            <div className="space-y-8">
              {topTopicsData.length === 0 ? (
                <p className="text-xs text-neutral-400 italic text-center py-4">Belum ada data topik.</p>
              ) : (
                topTopicsData.map((topic, index) => {
                  const totalLikes = topic.likes?.length || 0;
                  const totalComments = topic.komentar?.length || 0;
                  const totalInteraksi = totalLikes + totalComments;
                  return (
                    <div
                      key={topic.id_posting}
                      className="flex gap-4 group cursor-pointer"
                      onClick={() => navigate(`/forum?search=${topic.judul_posting}`)}
                    >
                      <span className="text-lg font-sans font-black text-neutral-300 group-hover:text-brand-primary-300 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold leading-snug mb-1 text-brand-dark-500 group-hover:text-brand-primary-300 transition-colors truncate uppercase">
                          {topic.judul_posting}
                        </h5>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-tighter">
                          {totalInteraksi} Interaksi • {totalComments} Balasan
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ForumPage;