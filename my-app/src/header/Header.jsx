import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import Login from "../Login";// adjust path if needed

export default function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showLogin, setShowLogin] = useState(false);

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
            ClinicBooking
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            {["home", "booking", "clinics", "contact"].map((item) => (
              <Link
                key={item}
                to={`/${item === "home" ? "home" : item}`}
                onClick={() => setActive(item)}
                className={`relative transition-all duration-300 hover:text-blue-600 ${
                  active === item && "text-blue-600"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {active === item && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}

            {user?.Roles?.Admin && (
              <Link
                to="/users"
                onClick={() => setActive("users")}
                className="hover:text-blue-600"
              >
                Users
              </Link>
            )}
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-600">
              Welcome {user ? user.Name : "Guest"}
            </span>

            {!user ? (
              <>
                {/* LOGIN POPUP BUTTON */}
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-2 rounded-xl border border-blue-500 text-blue-600
                  shadow-[0_6px_15px_rgba(37,99,235,0.25)]
                  hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)]
                  hover:-translate-y-0.5 transition-all duration-300"
                >
                  Login
                </button>

                <Link to="/newUser">
                  <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                  shadow-[0_10px_30px_rgba(37,99,235,0.45)]
                  hover:shadow-[0_14px_40px_rgba(37,99,235,0.6)]
                  hover:-translate-y-0.5 transition-all duration-300">
                    Create Account
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-5 py-2 rounded-xl border border-red-500 text-red-500
                shadow-[0_6px_15px_rgba(239,68,68,0.3)]
                hover:bg-red-50 hover:-translate-y-0.5 transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-xl p-4 flex flex-col gap-4">
            <Link to="/home">Home</Link>
            <Link to="/booking">Book</Link>
            <Link to="/clinics">Clinics</Link>
            <Link to="/contact">Contact</Link>

            {!user ? (
              <>
                <button onClick={() => setShowLogin(true)}>Login</button>
                <Link to="/newUser">Create Account</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        )}
      </header>

      {/* ================= LOGIN MODAL ================= */}
{showLogin && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
    
    <div className="
      relative w-full max-w-lg
      bg-transparent
      animate-scaleIn
    ">
      
      <Login onClose={() => setShowLogin(false)} />

    </div>
  </div>
)}



    </>
  );
}
