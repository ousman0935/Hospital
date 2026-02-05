import { useContext } from "react";
import { UserContext } from "../context/contextApi";
import { FaUserShield } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export function Navbar({ onMenuClick }) {
  const { user } = useContext(UserContext);

  return (
    <div
      className="
        w-full sticky top-0 z-50
        backdrop-blur-xl bg-white/80
        border-b border-slate-200
        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-3 sm:px-4
          py-3
          flex items-center justify-between
        "
      >
        {/* ================= LEFT: MENU + BRAND ================= */}
        <div className="flex items-center gap-3">

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={onMenuClick}
          >
            ☰
          </button>

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-9 h-9 rounded-xl
                bg-gradient-to-br from-blue-500 to-indigo-600
                flex items-center justify-center
                text-white
                shadow-[0_8px_20px_rgba(0,0,0,0.25)]
              "
            >
              <HiOutlineBuildingOffice2 size={20} />
            </div>

            <div className="leading-tight">
              <div className="text-xs text-slate-500 font-medium hidden sm:block">
                Admin Dashboard
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-800">
                Clinic<span className="text-blue-600">Booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH (DESKTOP ONLY) ================= */}
        <div className="hidden md:block relative w-72">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search appointments, doctors..."
            className="
              w-full pl-10 pr-3 py-2
              rounded-xl
              bg-white
              border border-slate-300
              shadow-inner
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition
            "
            onChange={(e) => console.log("search", e.target.value)}
          />
        </div>

        {/* ================= ADMIN INFO (DESKTOP ONLY) ================= */}
        <div
          className="
            hidden md:flex items-center gap-3
            bg-white rounded-xl px-3 py-2
            shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            hover:-translate-y-0.5 transition
          "
        >
          <div
            className="
              w-9 h-9 rounded-full
              bg-gradient-to-br from-slate-700 to-slate-900
              flex items-center justify-center
              text-white
            "
          >
            <FaUserShield size={16} />
          </div>

          <div className="text-sm leading-tight">
            <div className="text-slate-500">Admin</div>
            <div className="font-semibold text-slate-800">
              {user ? user.Name : "Guest"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
