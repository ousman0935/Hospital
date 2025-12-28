import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">ClinicBooking</h1>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6 text-gray-700">
        <Link
          to="/home"
          onClick={() => setActive("home")}
          className={`${active === "home" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
        >
          Home
        </Link>

        <Link
          to="/booking"
          onClick={() => setActive("booking")}
          className={`${active === "booking" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
        >
          Book
        </Link>

        <Link
          to="/clinics"
          onClick={() => setActive("clinics")}
          className={`${active === "clinics" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
        >
          Clinics
        </Link>

        <Link
          to="/contact"
          onClick={() => setActive("contact")}
          className={`${active === "contact" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
        >
          Contact
        </Link>

        {user?.Roles?.Admin && (
          <Link
            to="/users"
            onClick={() => setActive("users")}
            className={`${active === "users" ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
          >
            Users
          </Link>
        )}
      </nav>

      {/* Right side buttons */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-600">Welcome {user ? user.Name : "Guest"}</span>

        {!user ? (
          <>
            <Link to="/">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Login
              </button>
            </Link>

            <Link to="/newUser">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Account
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          <Link to="/home" onClick={() => setActive("home")}>Home</Link>
          <Link to="/booking" onClick={() => setActive("booking")}>Book</Link>
          <Link to="/clinics" onClick={() => setActive("clinics")}>Clinics</Link>
          <Link to="/contact" onClick={() => setActive("contact")}>Contact</Link>

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
  );
}
