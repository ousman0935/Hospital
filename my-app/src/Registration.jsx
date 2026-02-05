import { Link } from 'react-router-dom';
import './registration.css'
import Login from './Login';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faUserShield,
  faStethoscope,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";


function Registration(){
  const [Role,setRole]=useState("");
  const[showLogin,setShowLogin]=useState(false)
  const[showPassword,setShowPassword]=useState(false)
    const[showConfirmPassword ,setShowConfirmPassword]=useState(false)

    return (  
      <>
   <div className="flex justify-center items-start min-h-screen bg-gray-100 py-10">
  <form
    className="
      w-full max-w-lg
      bg-white/80 backdrop-blur-xl
      rounded-3xl
      shadow-[0_30px_80px_rgba(0,0,0,0.35)]
      border border-white/40
      p-8
    "
  >
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Create Account
      </h1>
      <p className="text-gray-500 mt-2">
        Register to access ClinicBooking
      </p>
    </div>

    {/* Name */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="name"
        type="text"
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="name"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Full Name
      </label>
    </div>

    {/* Email */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faEnvelope} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="Email"
        type="text"
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="Email"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Email Address
      </label>
    </div>

    {/* Password */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder=" "
        className="peer w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="password"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Password
      </label>
      {/* Show password toggle */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>

    {/* Confirm Password */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        required
        id="password2"
        type={showConfirmPassword ? "text" : "password"}
        placeholder=" "
        className="peer w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="password2"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Confirm Password
      </label>
      {/* Show confirm password toggle */}
      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showConfirmPassword ? "Hide" : "Show"}
      </button>
    </div>

    {/* Phone */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faPhone} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="Phone"
        type="number"
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="Phone"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Phone Number
      </label>
    </div>

    {/* Role */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faUserShield} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <select
        id="Role"
        value={Role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
      >
        <option value="">Select Role</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>

  {/* Doctor Fields */}
{Role === "doctor" && (
  <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      Doctor Information
    </h3>

    {/* Specialization */}
    <div className="relative mb-6">
      <FontAwesomeIcon
        icon={faStethoscope}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
      />

      <input
        name="Specialization"
        type="text"
        required
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   outline-none transition"
      />

      <label
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm
                   transition-all pointer-events-none
                   peer-placeholder-shown:top-1/2
                   peer-placeholder-shown:text-sm
                   peer-focus:-top-2
                   peer-focus:text-xs
                   peer-focus:text-blue-500
                   peer-valid:-top-2
                   peer-valid:text-xs
                   peer-valid:text-blue-500
                   bg-white px-1"
      >
        Specialization
      </label>
    </div>

    {/* Experience */}
    <div className="relative">
      <FontAwesomeIcon
        icon={faBriefcase}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
      />

      <input
        name="Experience"
        type="number"
        required
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   outline-none transition"
      />

      <label
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm
                   transition-all pointer-events-none
                   peer-placeholder-shown:top-1/2
                   peer-placeholder-shown:text-sm
                   peer-focus:-top-2
                   peer-focus:text-xs
                   peer-focus:text-blue-500
                   peer-valid:-top-2
                   peer-valid:text-xs
                   peer-valid:text-blue-500
                   bg-white px-1"
      >
        Experience (years)
      </label>
    </div>
  </div>
)}

    {/* Footer */}
    <div className="flex flex-col gap-4 mt-6">
      <button type='button' onClick={() => setShowLogin(true)} className="text-blue-600 text-sm hover:underline">
        Already have an account?
      </button>

      <button
        type="submit"
        className="
          w-full py-3 rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white font-semibold
          shadow-[0_15px_35px_rgba(37,99,235,0.45)]
          hover:shadow-[0_20px_45px_rgba(37,99,235,0.65)]
          hover:-translate-y-0.5
          transition-all
        "
      >
        Create Account
      </button>
    </div>
  </form>
</div>

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
export default Registration;