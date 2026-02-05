import React from 'react'
import { useState,useEffect } from 'react';

export const ApointmentView = () => {
      const [hospitals, setHospitals] = useState([]);
         const [doctors, setDoctors] = useState([]);
         const [appointments, setAppointments] = useState([]);
         const [filters, setFilters] = useState({ date: "", doctorId: "", userId: "", hospitalId: "", status: "" });
         const [stats, setStats] = useState({ totalAppointments: 0, totalDoctors: 0, totalHospitals: 0 });
         // load data placeholders
         useEffect(() => {
           // Replace these with your real API calls
           async function loadAll() {
             try {
               // Example fetches - change URLs
               // const hRes = await fetch('/api/hospitals');
               //const hospitalsData = await hRes.json();
               const hospitalsData = [
                 { _id: "h1", name: "Kedir Hospital", email: "kedir@hosp.local", address: "Addis Ababa" },
                 { _id: "h2", name: "Rabia Clinic", email: "rabia@clinic.local", address: "Bole" }
               ];
               setHospitals(hospitalsData);
       
               const doctorsData = [
                 { _id: "d1", name: "Dr. John", specialization: "Cardiologist", hospitalId: "h1", phone: "0911111111" },
                 { _id: "d2", name: "Dr. Sara", specialization: "Dentist", hospitalId: "h2", phone: "0912222222" }
               ];
               setDoctors(doctorsData);
       
               const appointmentsData = [
                 { _id: "a1", date: "2025-12-01T10:00:00Z", user: { _id: "u1", name: "Musa" }, doctorId: "d1", hospitalId: "h1", status: "success", reason: "Checkup" },
                 { _id: "a2", date: "2025-12-02T12:00:00Z", user: { _id: "u2", name: "Amina" }, doctorId: "d2", hospitalId: "h2", status: "rejected", reason: "Tooth pain" }
               ];
               setAppointments(appointmentsData);
       
               setStats({ totalAppointments: appointmentsData.length, totalDoctors: doctorsData.length, totalHospitals: hospitalsData.length });
             } catch (err) {
               console.error("load error", err);
             }
           }
           loadAll();
         }, []);
       
         // Derived lists
         const appointmentsFiltered = appointments.filter((a) => {
           if (filters.date && !a.date.startsWith(filters.date)) return false;
           if (filters.doctorId && a.doctorId !== filters.doctorId) return false;
           if (filters.userId && a.user && a.user._id !== filters.userId) return false;
           if (filters.hospitalId && a.hospitalId !== filters.hospitalId) return false;
           if (filters.status && a.status !== filters.status) return false;
           return true;
         });
       
         const rejectedAppointments = appointments.filter((a) => a.status === "rejected");
         const successAppointments = appointments.filter((a) => a.status === "success");
       
        
  
  return (
  <div className="bg-slate-50 rounded-2xl shadow-lg p-2 w-full">

    {/* ================= HEADER ================= */}
    <h2 className="text-2xl font-bold text-slate-800 mb-2">
      Appointments (Admin View)
    </h2>

    {/* ================= STATS (USING YOUR VARIABLES) ================= */}
    <div className="grid grid-cols-1 grid-cols-1 sm:grid-cols-4  gap-2 mb-1">
      <div className="bg-white rounded-2xl p-2 shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition">
        <div className="text-sm text-slate-500">Total Appointments</div>
        <div className="text-3xl font-bold text-slate-800 mt-2">
          {stats.totalAppointments}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition">
        <div className="text-sm text-slate-500">Pending</div>
        <div className="text-3xl font-bold text-yellow-600 mt-2">
          {appointments.length - successAppointments.length - rejectedAppointments.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition">
        <div className="text-sm text-slate-500">Approved by Doctors</div>
        <div className="text-3xl font-bold text-green-600 mt-2">
          {successAppointments.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition">
        <div className="text-sm text-slate-500">Rejected by Doctors</div>
        <div className="text-3xl font-bold text-red-600 mt-2">
          {rejectedAppointments.length}
        </div>
      </div>
    </div>

    {/* ================= FILTERS (SAME LOGIC) ================= */}
    <div className="bg-white rounded-xl p-4 shadow mb-6 flex flex-wrap gap-3">
      <select
  onChange={(e) =>
    setFilters((s) => ({ ...s, hospitalId: e.target.value }))
  }
>
  <option value="">All Hospitals</option>
  {hospitals.map((h) => (
    <option key={h._id} value={h._id}>
      {h.name}
    </option>
  ))}
</select>

      <input
        type="date"
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setFilters(s => ({ ...s, date: e.target.value }))}
      />

      <select
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setFilters(s => ({ ...s, doctorId: e.target.value }))}
      >
        <option value="">All Doctors</option>
        {doctors.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <select
        className="border px-3 py-2 rounded-lg"
        onChange={(e) => setFilters(s => ({ ...s, status: e.target.value }))}
      >
        <option value="">All Status</option>
        <option value="success">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>

      <button
        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition"
        onClick={() =>
          setFilters({ date: "", doctorId: "", userId: "", hospitalId: "", status: "" })
        }
      >
        Clear
      </button>
    </div>

    {/* ================= APPOINTMENTS LIST ================= */}
    <div className="space-y-4">
      {appointmentsFiltered.length === 0 && (
        <div className="text-center text-slate-400 py-10">
          No appointments found
        </div>
      )}

      {appointmentsFiltered.map((a) => {
        const doctor = doctors.find(d => d._id === a.doctorId);
        const hospital = hospitals.find(h => h._id === a.hospitalId);

        return (
          <div
            key={a._id}
            className="bg-white rounded-2xl p-5
                       shadow-[0_12px_25px_rgba(0,0,0,0.12)]
                       hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
                       transition-all"
          >
            {/* TOP */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-800">
                  {a.user?.name ?? "Unknown User"}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {doctor?.name ?? "-"} • {doctor?.specialization ?? "-"}
                </div>
                <div className="text-sm text-slate-500">
                  {hospital?.name ?? "-"}
                </div>
              </div>

              {/* STATUS (READ-ONLY) */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  a.status === "success"
                    ? "bg-green-100 text-green-700"
                    : a.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700 animate-pulse"
                }`}
              >
                {a.status === "success"
                  ? "Approved by Doctor"
                  : a.status === "rejected"
                  ? "Rejected by Doctor"
                  : "Pending – Waiting for Doctor"}
              </span>
            </div>

            {/* DETAILS */}
            <div className="mt-4 text-sm text-slate-600 space-y-1">
              <div>📅 {new Date(a.date).toLocaleString()}</div>
              <div>📝 Reason: {a.reason}</div>
            </div>

            {/* ADMIN ACTION */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 rounded-lg border hover:bg-slate-50 transition text-sm"
                onClick={() => console.log("view appointment", a._id)}
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);



}

export default ApointmentView
