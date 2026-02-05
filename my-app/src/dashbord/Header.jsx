import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import BookApointment from "./BookApointment";

export default function Header() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [openBooking, setOpenBooking] = useState(false);

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  /* Disable background scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = openBooking ? "hidden" : "auto";
  }, [openBooking]);

  /* Close modal with ESC key */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpenBooking(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between relative z-50">
        {/* Logo */}
        <h1
          onClick={() => navigate("/user")}
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:scale-105 transition"
        >
          ClinicBooking
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {["home", "book", "Appointment",'message','Profile'].map((item) =>
            item === "book" ? (
              <button
                key={item}
                onClick={() => setOpenBooking(true)}
                className="px-3 py-1 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Book
              </button>
            ) : (
              <Link
                key={item}
                to={item === "home" ? "/user" : `/user/${item}`}
                onClick={() => setActive(item)}
                className={`px-3 py-1 rounded-lg transition ${
                  active === item
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            )
          )}

          {user?.Roles?.Admin && (
            <Link
              to="/users"
              className="px-3 py-1 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              Users
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <Link
              to="/user/Notification"
              className="relative p-2 rounded-full hover:bg-blue-50 transition"
            >
              <FontAwesomeIcon icon={faBell} className="text-gray-600 w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
          )}

          <span className="text-gray-600">
            Welcome {user ? user.Name : "Guest"}
          </span>

          {!user ? (
            <>
              <Link to="/">
                <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50">
                  Login
                </button>
              </Link>
              <Link to="/newUser">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                  Create Account
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-1\2 bg-white shadow-lg
           px-1 py-1 flex flex-col gap-1 md:hidden rounded-b-xl">
            <button
              onClick={() => {
                setOpenBooking(true);
                setMenuOpen(false);
              }}
              className="text-left px-2 py-2 rounded-lg hover:bg-blue-50"
            >
              Book Appointment
            </button>

            <Link to="/user/Appointment">Appointment</Link>
            <Link to="/user/profile">Profile</Link>


            {!user ? (
              <>
                <Link to="/">Login</Link>
                <Link to="/newUser">Create Account</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        )}
      </header>

      {/* ================= BOOK APPOINTMENT MODAL ================= */}
      {openBooking && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenBooking(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-full max-w-2xl mx-2 rounded-2xl 
          shadow-xl  sm:p-6 z-10 max-h-[100vh] overflow-y-auto animate-fadeIn">
            {/* Close */}
          
            {/* Appointment Page */}
            <BookApointment onClose={()=>setOpenBooking(false)} />
          </div>
        </div>
      )}
    </>
  );
}
