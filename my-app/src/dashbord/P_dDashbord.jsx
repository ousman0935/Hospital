import React, {useContext, useEffect, useState } from "react";
import { UserContext } from "../context/contextApi";
/* ----------------------- ICONS ----------------------- */
function IconMenu({ className = "h-6 w-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconClose({ className = "h-6 w-6", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} {...props}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ----------------------- TOP HEADER ----------------------- */
function TopHeader({ role, onLogout }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const doctorNav = ["Dashboard", "Appointments", "Patients", "Availability", "Messages", "Profile"];
  const patientNav = ["Home", "Book Doctor", "My Appointments", "Favorites", "Messages", "Profile"];

  const navItems = role === "doctor" ? doctorNav : patientNav;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-sky-600">MediBook</div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-3 items-center text-sm text-gray-600">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className="px-3 py-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600 hidden sm:block">
            Signed in as <span className="font-medium">{role}</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="px-3 py-2 bg-sky-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm sm:hidden z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Menu</div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <IconClose />
              </button>
            </div>

            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="p-2 text-left w-full rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------- STAT CARD ----------------------- */
function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="text-xs text-gray-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}

/* ----------------------- MOCK DATA ----------------------- */
const mockAppointments = [
  { id: 1, patient: "Abebe T.", time: "09:00 AM", reason: "Follow-up", status: "Confirmed" },
  { id: 2, patient: "Sara M.", time: "10:30 AM", reason: "New patient", status: "Pending" },
  { id: 3, patient: "Kassa D.", time: "01:00 PM", reason: "Routine check", status: "Confirmed" },
];

/* ----------------------- DOCTOR DASHBOARD ----------------------- */
export function DoctorDashboard() {
  const {user}=useContext(UserContext)

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 max-w-6xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Dr.  {user ? user.Name : "Guest"}</h1>
          <p className="text-sm text-gray-500 mt-1">Here is your schedule and patient activity for today.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-sky-600 text-white rounded">View Appointments</button>
            <button className="px-4 py-2 border rounded">Manage Availability</button>
          </div>
        </div>
        <div className="hidden md:block w-48 h-36 bg-gradient-to-br from-sky-50 to-white rounded-lg flex items-center justify-center text-sky-400">
          🏥
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title={`Today's Appointments`} value={mockAppointments.length} />
        <StatCard title="Upcoming" value={8} />
        <StatCard title="New Patients" value={3} />
        <StatCard title="Messages" value={2} />
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold">Today's Appointments</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2">Patient</th>
                <th className="py-2">Time</th>
                <th className="py-2">Reason</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockAppointments.map((a) => (
                <tr key={a.id}>
                  <td className="py-3">{a.patient}</td>
                  <td className="py-3">{a.time}</td>
                  <td className="py-3">{a.reason}</td>
                  <td className="py-3">{a.status}</td>
                  <td className="py-3">
                    <button className="text-sky-600">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- PATIENT DASHBOARD ----------------------- */
export function PatientDashboard() {
  const {user}=useContext(UserContext)

  const nextAppointment = { doctor: "Dr. Alem", time: "2025-12-10 10:30", location: "Central Clinic" };
  const history = [
    { id: 1, doctor: "Dr. Alem", date: "2025-09-03", status: "Completed" },
    { id: 2, doctor: "Dr. Hana", date: "2025-06-14", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 max-w-6xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {user ? user.Name : "Guest"}</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your appointments and find doctors easily.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-sky-600 text-white rounded">Book a Doctor</button>
            <button className="px-4 py-2 border rounded">View My Appointments</button>
          </div>
         </div>
        <div className="hidden md:block w-48 h-36 bg-gradient-to-br from-sky-50 to-white rounded-lg flex items-center justify-center text-sky-400">
          🙂
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Next Appointment" value={nextAppointment.time} subtitle={nextAppointment.doctor} />
        <StatCard title="Total Appointments" value={history.length} />
        <StatCard title="Messages" value={1} />
        <StatCard title="Favorites" value={2} />
      </div>

      {/* Upcoming Appointment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold">Upcoming Appointment</h3>
          <div className="mt-4">
            <div>Doctor: <span className="font-medium">{nextAppointment.doctor}</span></div>
            <div>Time: <span className="font-medium">{nextAppointment.time}</span></div>
            <div>Location: <span className="font-medium">{nextAppointment.location}</span></div>
            <div className="mt-4">
              <button className="px-4 py-2 border rounded">View Details</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold">Book Doctor</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="p-3 border rounded">Find by specialty</div>
            <div className="p-3 border rounded">Search by name</div>
            <div className="p-3 border rounded">Recommended doctors</div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold">Appointment History</h4>
        <ul className="mt-3 divide-y text-sm">
          {history.map((h) => (
            <li key={h.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{h.doctor}</div>
                <div className="text-xs text-gray-500">{h.date} — {h.status}</div>
              </div>
              <button className="text-sky-600">View</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------- APP PREVIEW ----------------------- */
export default function AppPreview() {
  const [role, setRole] = useState("doctor");

  const handleLogout = () => setRole(null);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Preview Dashboards</h2>
          <p className="text-sm text-gray-500 mt-2">Choose a role to preview.</p>
          <div className="mt-4 flex gap-3 justify-center">
            <button onClick={() => setRole("doctor")} className="px-4 py-2 bg-sky-600 text-white rounded">Doctor</button>
            <button onClick={() => setRole("patient")} className="px-4 py-2 border rounded">Patient</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopHeader role={role} onLogout={handleLogout} />
      {role === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
    </>
  );
}
