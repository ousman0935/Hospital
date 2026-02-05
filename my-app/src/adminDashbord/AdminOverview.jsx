import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navbar } from "./Navbar.jsx";
import {Outlet} from "react-router-dom"
import { DoctorHomePreview } from "./DocterHomePreview.jsx";
import Sidebar from "./Sidebar.jsx";
import { motion } from "framer-motion";
import { UserContext } from "../context/contextApi";
import { HospitalsList } from "./HospitalsList.jsx";
import { DoctorsByHospital } from "./DoctersByHospital.jsx";
import { useContext } from "react";
import { tr } from "framer-motion/client";
import { AddHospital } from "./AddHopital.jsx";
import { PatientHistoryPreview } from "./PatientHistryView.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchHospitals } from "./api/hospitals.js";
import { fetchDocters } from "./api/doctors.js";
import ApointmentView from "./ApointmentView.jsx";

const AdminOverview = () => {
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
   
           setStats({ totalAppointments: appointmentsData.length });
         } catch (err) {
           console.error("load error", err);
         }
       }
       loadAll();
     }, []);
     const { data:docters=[],
         isLoading,
         isError,
         Error
     }=useQuery({
      queryKey:["docters"],
      queryFn:fetchDocters
     });
    const {data:hospitalls=[],
          isHospitalsLoading,
          isHospitalsError,}
        =useQuery({
          queryKey:["Hospitals"],
          queryFn:fetchHospitals
        });
     const totalDoctors=docters?.length;
     const totalHospitals=hospitalls?.length
   
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
   
    
   
   

function StatsCards({ stats, totalDoctors, totalHospitals, isLoading, isHospitalsLoading }) {
  const cards = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments ?? 0,
      hint: "All time",
      icon: "📅",
      color: "text-indigo-500",
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments ?? 0,
      hint: "Scheduled today",
      icon: "🔔",
      color: "text-blue-500",
    },
    {
      title: "Successful Appointments",
      value: stats.successfulAppointments ?? 0,
      hint: "Completed",
      icon: "✅",
      color: "text-green-500",
    },
    {
      title: "Total Doctors",
      value: isLoading ? "—" : totalDoctors,
      hint: "Registered doctors",
      icon: "👨‍⚕️",
      color: "text-emerald-500",
    },
    {
      title: "Total Hospitals",
      value: isHospitalsLoading ? "—" : totalHospitals,
      hint: "Active clinics",
      icon: "🏥",
      color: "text-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-2 w-full">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="
            relative overflow-hidden
            p-4 rounded-3xl
            bg-white/80 backdrop-blur
            border border-white/60
            shadow-[0_20px_40px_rgba(0,0,0,0.08)]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/40" />

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                {card.title}
              </span>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-100 shadow-inner">
                <span className={`text-xl ${card.color}`}>{card.icon}</span>
              </div>
            </div>

            <span className="text-3xl font-bold text-slate-800">
              {card.value}
            </span>

            <span className="text-xs text-slate-400">
              {card.hint}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}




     function RejectedList() {
       return (
         <div className="bg-white rounded shadow p-4">
<h2 className="text-lg font-semibold mb-3 text-red-600">
  Rejected Appointments
</h2>
           <div className="space-y-2">
            {rejectedAppointments.length === 0 && (
  <div className="text-sm text-slate-400">
    No rejected appointments 🎉
  </div>
)}

             {rejectedAppointments.map((r) => (
               <div key={r._id} className="border p-3 rounded flex items-center justify-between">
                 <div>
                   <div className="font-medium">{r.user?.name}</div>
                   <div className="text-sm text-slate-500">{formatDate(r.date)} • {r.reason}</div>
                 </div>
                 <div>
                   <button className="px-2 py-1 rounded border text-sm" onClick={() => console.log("review reject", r._id)}>Review</button>
                 </div>
               </div>
             ))}
             {rejectedAppointments.length === 0 && <div className="text-sm text-slate-500">No rejected appointments.</div>}
           </div>
         </div>
       );
   
       function formatDate(d) { try { return new Date(d).toLocaleString(); } catch (e) { return d; } }
     }
 return (
  <div className="w-full min-h-screen px-4 md:px-6
   py-6 space-y-8 bg-slate-50">

    {/* ================= HEAR ================= */}
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
        Admin Dashboard
      </h1>
      <p className="text-sm text-slate-500">
        Overview of clinic operations, appointments, and activity
      </p>
    </div>

    {/* ================ATS ================= */}
    <StatsCards
      stats={stats}
      totalDoctors={totalDoctors}
      totalHospitals={totalHospitals}
      isLoading={isLoading}
      isHospitalsLoading={isHospitalsLoading}
    />

    {/* ================= MAIN GRID ================= */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">

      {/* Appointments (Main Focus) */}
      <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Appointments Overview
          </h2>
          <span className="text-sm text-slate-400">Recent & status</span>
        </div>
        <ApointmentView />
      </div>

      {/* Rejected / Alerts */}
      <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
        <RejectedList />
      </div>
    </div>

    {/* ================= SECONDARY GRID ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Hospitals
          </h2>
          <p className="text-sm text-slate-400">
            Registered clinics & hospitals
          </p>
        </div>
        <HospitalsList />
      </div>

      <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Doctors
          </h2>
          <p className="text-sm text-slate-400">
            Doctors grouped by hospital
          </p>
        </div>
        <DoctorsByHospital />
      </div>
    </div>

    {/* ================= BOTTOM GRID ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Doctor Preview
          </h2>
          <p className="text-sm text-slate-400">
            Doctor activity snapshot
          </p>
        </div>
        <DoctorHomePreview />
      </div>

      <div className="bg-white rounded-3xl shadow-md p-4 md:p-6">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Patient History
          </h2>
          <p className="text-sm text-slate-400">
            Recent patient interactions
          </p>
        </div>
        <PatientHistoryPreview />
      </div>
    </div>

  </div>
);

}

export default AdminOverview
