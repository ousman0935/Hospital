import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-sm px-3 py-2
     flex items-center justify-between sticky top-0 z-50">
      
      {/* Left: Logo + Welcome */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-blue-600">ClinicBooking</h1>

        {user && (
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-br from-emerald-400 to-teal-500 px-3 py-1 rounded-xl text-white">
            <div className="w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center">
              <span className="text-lg">🩺</span>
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold">Dr. {user.Name}</p>
              <p className="text-[11px] opacity-90">Today</p>
            </div>
          </div>
        )}
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="hidden md:flex flex-1 mx-4 max-w-md">
        <div className="relative w-full">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
          />
          <input
            type="text"
            placeholder="Search patient name or phone"
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-5 text-sm text-gray-700 font-medium">
        <Link
          to="/docter"
          onClick={() => setActive("dhome")}
          className={active === "dhome" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
        >
          Home
        </Link>
        <Link
          to="/docter/Appointments"
          onClick={() => setActive("dApointments")}
          className={active === "dApointments" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
        >
          Appointments
        </Link>
        <Link
          to="/docter/PatientsList"
          onClick={() => setActive("Patients")}
          className={active === "Patients" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
        >
          Patients
        </Link>
        <Link
          to="/docter/Availability"
          onClick={() => setActive("availability")}
          className={active === "availability" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
        >
          Availability
        </Link>
        <Link
          to="/docter/profile"
          onClick={() => setActive("profile")}
          className={active === "profile" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}
        >
          Profile
        </Link>
      </nav>

      {/* Right: Logout */}
      <div className="hidden md:flex items-center gap-2">
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-xl text-gray-700"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-3 md:hidden">
          <Link to="/docter">Home</Link>
          <Link to="/docter/Appointments">Appointments</Link>
          <Link to="/docter/PatientsList">Patients</Link>
          <Link to="/docter/Availability">Availability</Link>
          <Link to="/docter/profile">Profile</Link>
          {user && (
            <button onClick={logout} className="text-red-500 font-semibold text-left">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}

