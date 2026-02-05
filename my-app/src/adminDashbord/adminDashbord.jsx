import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sidebar width for desktop
  const sidebarWidth = collapsed ? 64 : 192; // px
  const navbarHeight = 56; // px

  return (
    <div className="min-h-screen bg-slate-100 relative">

      {/* ================= NAVBAR ================= */}
      <div
        className="
          fixed top-0 z-50 h-14
          w-full left-0
          transition-all duration-300
          md:left-[var(--sidebar-width)]
          md:w-[calc(100%-var(--sidebar-width))]
        "
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />
      </div>

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen
          bg-white border-r
          transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ width: `${sidebarWidth}px` }}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          closeMobile={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="
          pt-14 transition-all duration-300
          md:ml-[var(--sidebar-width)]
        "
        style={{ "--sidebar-width": `${sidebarWidth}px` }}
      >
        <main
          className="
            min-h-screen
            px-3 py-2
            sm:px-4
            md:px-6
          "
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}
