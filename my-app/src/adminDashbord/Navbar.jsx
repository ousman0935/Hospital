import { useContext } from "react";
import { UserContext } from "../context/contextApi";
 export function Navbar() {
    const {user}=useContext(UserContext);
    return (
<div className="w-full bg-white shadow p-4 flex items-center justify-between sticky top-0 z-50">
      
      <br/>

      {/* Logo */}

       
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <h1 className="text-2xl font-bold text-blue-600">ClinicBooking</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Quick search..."
            className="px-3 py-1 rounded border"
            onChange={(e) => console.log("search", e.target.value)}
          />
          <div className="text-sm">   Admin • <span className="font-medium"> <span className="text-gray-600"> {user ? user.Name : "Guest"}</span></span></div>
        </div>
      </div>
    );
  }