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

           <div className="overflow-x-auto">
  <table className="w-full border border-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-3 py-2">Patient</th>
        <th className="border px-3 py-2">Doctor</th>
        <th className="border px-3 py-2">Hospital</th>
        <th className="border px-3 py-2">Date</th>
        <th className="border px-3 py-2">Status</th>
        <th className="border px-3 py-2">Reason</th>
      </tr>
    </thead>

    <tbody>
      {appointmentsFiltered.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center py-4 text-gray-500">
            No appointments found
          </td>
        </tr>
      ) : (
        appointmentsFiltered.map((a) => {
          const doctor = doctors.find(d => d._id === a.doctorId);
          const hospital = hospitals.find(h => h._id === a.hospitalId);

          return (
            <tr key={a._id}>
              <td className="border px-3 py-2">{a.user?.name}</td>
              <td className="border px-3 py-2">{doctor?.name}</td>
              <td className="border px-3 py-2">{hospital?.name}</td>
              <td className="border px-3 py-2">
                {new Date(a.date).toLocaleString()}
              </td>
              <td className="border px-3 py-2">
                <span className={`px-2 py-1 rounded text-white
                  ${a.status === "success" ? "bg-green-600" :
                    a.status === "rejected" ? "bg-red-600" :
                    "bg-yellow-500"}`}>
                  {a.status}
                </span>
              </td>
              <td className="border px-3 py-2">{a.reason}</td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</div>

           </div>
  )
}

export default ApointmentView
