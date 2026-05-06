import React from "react";

const HistoryPage = ({ setPage }) => {
  const transactions = [
    {
      date: "Oct 24, 2025",
      desc: "Recycling: 1.2kg Glass Jars",
      cat: "Recycle",
      amount: "+Rp 8.000",
      type: "plus",
    },
    {
      date: "Oct 22, 2025",
      desc: "Purchase: Earth Serum",
      cat: "Purchase",
      amount: "-Rp 245.000",
      type: "minus",
    },
    {
      date: "Oct 18, 2025",
      desc: "Recycling: 0.8kg HDPE Plastic",
      cat: "Recycle",
      amount: "+Rp 5.200",
      type: "plus",
    },
    {
      date: "Oct 15, 2025",
      desc: "Purchase: Bamboo Cleansing Pads",
      cat: "Purchase",
      amount: "-Rp 65.000",
      type: "minus",
    },
    {
      date: "Oct 10, 2025",
      desc: "Bonus: Monthly Green Achiever",
      cat: "Reward",
      amount: "+Rp 50.000",
      type: "plus",
    },
  ];

  return (
    <div className="bg-[#F2EDE4] font-sans h-[calc(100vh-64px)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 h-full flex flex-col py-6">
        {/* TOP SECTION: Wallet Overview & Impact Score */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Wallet Card */}
          <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-white flex justify-between items-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                Wallet Overview
              </p>
              <h2 className="text-5xl font-serif text-[#1e2b19] mb-6">
                Rp 458.200
              </h2>
              <div className="flex gap-3">
                <button className="bg-[#3D5532] text-white px-6 py-2 rounded-full text-[10px] font-bold shadow-md hover:bg-[#2d4025]">
                  Top Up
                </button>
                <button className="bg-white text-[#3D5532] px-6 py-2 rounded-full text-[10px] font-bold border border-gray-100 shadow-sm hover:bg-gray-50">
                  Redeem Rewards
                </button>
              </div>
            </div>
            {/* Wallet Icon Background */}
            <span className="text-[120px] opacity-[0.03] absolute right-4 top-1/2 -translate-y-1/2 rotate-12">
              👛
            </span>
          </div>

          {/* Impact Score Card */}
          <div className="lg:col-span-4 bg-[#A3B18A] p-8 rounded-[40px] shadow-sm text-[#1e2b19]">
            <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
              Impact Score
            </p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-serif font-bold">84</span>
              <span className="text-sm font-bold opacity-60">/ 100</span>
            </div>
            <div className="w-full bg-[#1e2b19]/10 h-1.5 rounded-full mb-4">
              <div
                className="bg-[#3D5532] h-full rounded-full"
                style={{ width: "84%" }}
              ></div>
            </div>
            <p className="text-[10px] leading-relaxed font-medium italic opacity-80">
              "Kontribusi daur ulangmu bulan ini telah menyelamatkan 12.4kg
              limbah plastik."
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: Detailed History Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-white flex-grow flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-[#1e2b19] text-sm uppercase tracking-widest">
              Detailed History
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-[#F9F9F7] text-[10px] px-4 py-2 rounded-full border border-transparent focus:border-[#3D5532]/20 outline-none w-48"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-grow px-6">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="py-4 px-2">Date</th>
                  <th className="py-4 px-2">Description</th>
                  <th className="py-4 px-2">Category</th>
                  <th className="py-4 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-50/50 hover:bg-[#F9F9F7] transition-colors group"
                  >
                    <td className="py-4 px-2 text-[11px] font-medium text-gray-500">
                      {item.date}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm opacity-60">
                          {item.cat === "Recycle"
                            ? "♻️"
                            : item.cat === "Purchase"
                              ? "🛍️"
                              : "🎁"}
                        </span>
                        <span className="text-[11px] font-bold text-[#1e2b19]">
                          {item.desc}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                          item.cat === "Recycle"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {item.cat}
                      </span>
                    </td>
                    <td
                      className={`py-4 px-2 text-[11px] font-black text-right ${
                        item.type === "plus"
                          ? "text-green-600"
                          : "text-[#1e2b19]"
                      }`}
                    >
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 bg-gray-50/30 text-center border-t border-gray-50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Showing 5 of 124 transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
