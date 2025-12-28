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
     const totalDoctors=docters.length;
     const totalHospitals=hospitalls.length
   
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
   
    
   
   
     function StatsCards() {
       return (
         <div className="grid grid-cols-3 gap-4">
           <motion.div className="p-4 bg-white rounded shadow" layout>
             <div className="text-sm text-slate-500">Total Appointments</div>
             <div className="text-2xl font-bold">{stats.totalAppointments}</div>
           </motion.div>
           <motion.div className="p-4 bg-white rounded shadow" layout>
             <div className="text-sm text-slate-500">Total Doctors</div>
             <div className="text-2xl font-bold">{(isLoading)?"LOADING": totalDoctors}</div>
           </motion.div>
           <motion.div className="p-4 bg-white rounded shadow" layout>
             <div className="text-sm text-slate-500">Total Hospitals</div>
             <div className="text-2xl font-bold">{(isHospitalsLoading)?"LOADING":totalHospitals}</div>
           </motion.div>
         </div>
       );
     }
   
   
   
     function AppointmentsView() {
       return (
         <div className="bg-white rounded shadow p-4">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-semibold">Appointments</h2>
             <div className="flex items-center gap-2">
               <input type="date" className="border px-2 py-1 rounded" onChange={(e) => setFilters((s) => ({ ...s, date: e.target.value }))} />
               <select onChange={(e) => setFilters((s) => ({ ...s, doctorId: e.target.value }))} className="border px-2 py-1 rounded">
                 <option value="">All Doctors</option>
                 {doctors.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
               </select>
               <select onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))} className="border px-2 py-1 rounded">
                 <option value="">All Status</option>
                 <option value="success">Success</option>
                 <option value="rejected">Rejected</option>
                 <option value="pending">Pending</option>
               </select>
               <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => setFilters({ date: "", doctorId: "", userId: "", hospitalId: "", status: "" })}>Clear</button>
             </div>
           </div>
   
           <div className="space-y-3">
             {appointmentsFiltered.map((a) => (
               <div key={a._id} className="border rounded p-3 flex items-center justify-between">
                 <div>
                   <div className="font-medium">{a.user?.name ?? "Unknown User"} — {formatDate(a.date)}</div>
                   <div className="text-sm text-slate-500">Doctor: {doctors.find((d) => d._id === a.doctorId)?.name ?? "-"} • Hospital: {hospitals.find((h) => h._id === a.hospitalId)?.name ?? "-"}</div>
                   <div className="text-sm">Reason: {a.reason}</div>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className={a.status === "rejected" ? "text-red-600" : "text-green-600"}>{a.status}</div>
                   <button className="px-3 py-1 rounded border text-sm" onClick={() => console.log("view appointment", a._id)}>Details</button>
                 </div>
               </div>
             ))}
             {appointmentsFiltered.length === 0 && <div className="text-center text-slate-500 p-6">No appointments match filters.</div>}
           </div>
         </div>
       );
   
       function formatDate(d) {
         try {
           return new Date(d).toLocaleString();
         } catch (e) {
           return d;
         }
       }
     }
   
     function RejectedList() {
       return (
         <div className="bg-white rounded shadow p-4">
           <h2 className="text-lg font-semibold mb-3">Rejected Appointments</h2>
           <div className="space-y-2">
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
    
            <div className="space-y-4">
              <StatsCards />
                    <AppointmentsView />
              <div className="grid grid-cols-2 gap-4">
                <HospitalsList />
                <DoctorsByHospital />
                <br/>
               
              </div>
         
              <div className="grid grid-cols-2 gap-4">
                <DoctorHomePreview />
                <PatientHistoryPreview />
              </div>
            </div>
       
  )
}

export default AdminOverview
