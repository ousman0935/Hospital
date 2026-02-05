import { UserContext } from "../context/contextApi";
import { useContext } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export function DoctorDashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-50 px-2 py-2
     space-y-1 max-w-6xl mx-auto">





      {/* QUICK SEARCH */}
      
<main className="p-2">
  <Outlet />
</main>
      

    </div>
    </>
  );
}
