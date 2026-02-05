import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useContext } from 'react';
import { UserContext } from './context/contextApi';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Login({onClose}){
    const [showPassword, setShowPassword] = useState(false);

  const {loginUser}=useContext(UserContext);
  const navigate=useNavigate();
 const handleLogin=async (e)=>{
      e.preventDefault();
      try {
        
        const Email=e.target.Email.value;
        const Password=e.target.Password.value;
        const res=await fetch("https://hospital-b2mt.onrender.com/login",{
                                    method:"POST",
                                    credentials:"include",
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify({
                                      Email,
                                      Password
                                    })
        });
        const data= await res.json();
        if(res.ok){
          const role=data.user.Roles
          const logg=data.user;
           console.log(data.user.Roles)
             if(role==="Docter"){
                
                loginUser(logg);
               navigate("/docter")
              toast.success("Login Success")
             }
             else if(role==="User"){
                loginUser(logg);
              navigate("/user")
              toast.success("Login Success")
             }

             else{
               loginUser(logg);
              navigate("/admin")
              toast.success("Login Success")

             }
              
            }
        else{
          toast.error("failed to login");
          return;
        }

        
      } catch (error) {
        console.log(error);
        toast.error("login failed try aqain later ");
      }
    }
    return (  
<div className="flex justify-center items-start py-10 px-4">
      <form
        onSubmit={handleLogin}
        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-xl
          rounded-3xl
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          border border-white/40
          p-8
        "
      >
                {/* ❌ CLOSE BUTTON (INSIDE CARD) */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute top-4 right-4
              w-9 h-9 flex items-center justify-center
              rounded-full
              bg-white
              shadow-md
              text-gray-500
              hover:text-red-500
              hover:scale-110
              transition
            "
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Login to your clinic account
          </p>
        </div>

      {/* Email */}
{/* Email */}
<div className="relative mb-6">
  <FontAwesomeIcon
    icon={faEnvelope}
    className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
  />

  <input
    id="email"
    name="Email"
    type="email"
    placeholder=" "
    className="
      peer w-full pl-12 pr-4
      pt-7 pb-2
      rounded-xl
      border border-gray-300
      bg-white
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
    "
  />

  <label
    htmlFor="email"
    className="
      absolute left-12 top-4
      text-gray-400 text-sm
      pointer-events-none
      transition-all duration-200

      peer-focus:-top-2
      peer-focus:text-xs
      peer-focus:text-blue-600
    "
  >
    Email Address
  </label>
</div>



{/* Password */}
<div className="relative mb-6">
  <FontAwesomeIcon
    icon={faLock}
    className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
  />

  <input
    id="password"
    name="Password"
    type={showPassword ? "text" : "password"}
    placeholder=" "
    className="
      peer w-full pl-12 pr-12
      pt-7 pb-2
      rounded-xl
      border border-gray-300
      bg-white
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
    "
  />

  <label
    htmlFor="password"
    className="
      absolute left-12 top-4
      text-gray-400 text-sm
      pointer-events-none
      transition-all duration-200

      peer-focus:-top-2
      peer-focus:text-xs
      peer-focus:text-blue-600
    "
  >
    Password
  </label>

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-blue-600"
  >
    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
  </button>
</div>



        {/* Footer */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <Link to="/newUser" onClick={onClose} className="text-blue-600 hover:underline">
            Create account
          </Link>
          <span className="text-gray-400">Secure login</span>
        </div>

        {/* Submit */}
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
          Login
        </button>
      </form>
    </div>


    );
}
export default Login;