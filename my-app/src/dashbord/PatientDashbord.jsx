import { UserContext } from "../context/contextApi";
import { useContext } from "react";
export function PatientDashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 space-y-5 max-w-6xl mx-auto">

      {/* HERO */}
     <div className="rounded-2xl p-6 text-white 
bg-gradient-to-br from-sky-600 to-indigo-600 shadow-xl">
  <h1 className="text-2xl font-bold">
    Hi, {user?.Name || "Patient"}
  </h1>
  <p className="text-sm opacity-90 mt-1">
    Book and manage your care easily
  </p>

  <div className="mt-5 flex gap-3">
    <button className="bg-white text-sky-600 px-5 py-2 rounded-xl font-medium">
      Book Doctor
    </button>
    <button className="bg-white/20 px-5 py-2 rounded-xl">
      My Appointments
    </button>
  </div>
</div>


      {/* SEARCH (Merged from Home2) */}
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
  <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
  <input
    className="w-full outline-none bg-transparent"
    placeholder="Search doctors, clinics, specialties"
  />
</div>

      {/* STATS (Horizontal scroll on mobile) */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[
          { title: "Next Appointment", value: "Dec 10" },
          { title: "Total Visits", value: 5 },
          { title: "Pending", value: 1 },
          { title: "Messages", value: 2 },
        ].map((s, i) => (
    <div className="min-w-[160px] rounded-2xl 
    bg-white/80 backdrop-blur shadow-md p-4">
      <div className="text-xs uppercase tracking-wide text-gray-400">
        {s.title}
      </div>
      <div className="text-2xl font-bold mt-1">{s.value}</div>
    </div>
  ))}
      </div>

      {/* UPCOMING APPOINTMENT */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-3">Upcoming Appointment</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Doctor:</b> Dr. Alem</p>
          <p><b>Date:</b> 10 Dec 2025 – 10:30 AM</p>
          <p><b>Clinic:</b> Central Clinic</p>
        </div>
        <button className="mt-4 border px-4 py-2 rounded-lg">
          View Details
        </button>
      </div>

    </div>
  );
}
