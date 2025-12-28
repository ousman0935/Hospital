import { Navbar } from "./Navbar.jsx";
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar.jsx";

export default function AdminDashboard() {
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
         
         <Outlet/>
        </main>
      </div>
    </div>
  );
}
