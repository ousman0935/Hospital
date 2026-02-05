import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { StatCard } from './reusable/StatCard.jsx';
import { StatusBadge } from './reusable/StatusBadge';

const DocterProfile = () => {
  const [docter,setDocter]=useState(null);
  const [Error,setError]=useState(false);
 const [Loadding,setLoading]=useState(false);
  const {id}=useParams();

  useEffect(()=>{
  const getDocter=async ()=>{
    try {
      const res=await fetch(`https://hospital-b2mt.onrender.com/docter/${id}`)
      if(!res.ok){
       setError(true)
      }
      const data=await res.json();
      console.log(data)
      
      setDocter(data);
    } catch (error) {
      setError(true)
    }
          setLoading(false)

  }
  getDocter();
},[id])
 

const appointments = [
  { _id: "a1", patient: "John", date: "2025-01-10", status: "approved" },
  { _id: "a2", patient: "Sara", date: "2025-01-11", status: "pending" },
  { _id: "a3", patient: "Mike", date: "2025-01-12", status: "rejected" },
];
const getCounts = (appointments) => {
  return {
    approved: appointments.filter(a => a.status === "approved").length,
    rejected: appointments.filter(a => a.status === "rejected").length,
    pending: appointments.filter(a => a.status === "pending").length,
    total: appointments.length,
  };
};
const counts = getCounts(appointments);

  return (
    <div className="p-6 space-y-6 bg-slate-100 min-h-screen">

      {/* Doctor Info Card */}
 <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 hover:scale-105 transition-transform">

  {/* 3D Icon */}
  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-2xl transform hover:rotate-3 transition-all">
    <span className="text-4xl text-white">🩺</span>
  </div>

  {/* Doctor Info */}
  <div className="flex-1">
    <h2 className="text-2xl font-bold text-gray-800">{docter?.Name}</h2>
    <p className="text-gray-500 text-sm">{docter?.Specialization}</p>

    <div className="mt-3 text-sm space-y-1">
      <p><b>Email:</b> {docter?.Email}</p>
      <p><b>Phone:</b> {docter?.Phone}</p>
      <p><b>Hospital:</b> {docter?.HospitalId?.Name}</p>
      <p><b>Experience:</b> {docter?.Experience} years</p>
      <p>
        <b>Status:</b>
        <span className={`ml-2 px-2 py-1 text-xs rounded ${
          docter?.Status === "Inactive"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}>
          {docter?.Status || "Active"}
        </span>
      </p>
    </div>

    {/* About Section */}
    {docter?.About && (
      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold mb-1">About</h3>
        <p>{docter.About}</p>
      </div>
    )}
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col gap-2 md:justify-start">
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
    >
      Edit
    </button>
    <button
      className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
    >
      Manage Status
    </button>
  </div>

</div>


      {/* Appointment Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Approved" value={counts.approved} color="green" />
        <StatCard title="Pending" value={counts.pending} color="yellow" />
        <StatCard title="Rejected" value={counts.rejected} color="red" />
        <StatCard title="Total" value={counts.total} color="blue" />
      </div>

      {/* Appointment List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Appointments</h3>

        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Patient</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a.patient}</td>
                <td className="p-2 text-center">{a.date}</td>
                <td className="p-2 text-center">
                  <StatusBadge status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  )
}

export default DocterProfile
