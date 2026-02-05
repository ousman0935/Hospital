import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Calendar, User } from "lucide-react";

const TABS = ["All", "Today", "Pending", "Approved", "Rejected", "Finished"];

const sampleAppointments = [
  {
    id: 1,
    patient: "Abdul Rahman",
    date: "2026-01-13",
    time: "09:00 - 09:30",
    status: "Pending",
    reason: "General Checkup",
  },
  {
    id: 2,
    patient: "Sara Ahmed",
    date: "2026-01-13",
    time: "10:30 - 11:00",
    status: "Approved",
    reason: "Dental Pain",
  },
  {
    id: 3,
    patient: "Mohammed Ali",
    date: "2026-01-12",
    time: "14:00 - 14:30",
    status: "Finished",
    reason: "Follow-up",
  },
  {
    id: 4,
    patient: "Hanna Tesfaye",
    date: "2026-01-11",
    time: "16:00 - 16:30",
    status: "Rejected",
    reason: "Consultation",
  },
];

export default function DoctorAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const today = "2026-01-13";

  const filteredAppointments = sampleAppointments.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Today") return a.date === today;
    return a.status === activeTab;
  });

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
    Finished: "bg-emerald-100 text-emerald-700",
  };

  const statusIcon = {
    Pending: <Clock size={14} />,
    Approved: <CheckCircle size={14} />,
    Rejected: <XCircle size={14} />,
    Finished: <CheckCircle size={14} />,
  };
  const date=new Date();
  const dayNo=date.getDate();
  const month=date.toLocaleDateString("en-us",{month:"long"});
  const dayName=date.toLocaleDateString("em-US",{weekday:"long"});
  const year=date.getFullYear();

  return (
    <div className="min-h-screen bg-slate-100 p-2">

      {/* PAGE HEADER */}
   <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
  <h1 className="text-2xl font-semibold text-slate-800">
    My Appointments
  </h1>

  <p className="text-sm text-slate-500">
    Today — {dayName}, {dayNo} {month} {year}
  </p>
</div>


      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* APPOINTMENTS */}
     {/* APPOINTMENTS */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {filteredAppointments.map((appt) => (
    <motion.div
      key={appt.id}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between"
    >
      {/* LEFT */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
          <User size={18} />
        </div>

        <div>
          <p className="font-medium text-slate-800">{appt.patient}</p>
          <p className="text-xs text-slate-500">{appt.reason}</p>
          <div className="flex gap-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {appt.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {appt.time}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="mt-3 md:mt-0 flex items-center gap-2">
        <span
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[appt.status]}`}
        >
          {statusIcon[appt.status]}
          {appt.status}
        </span>

        {appt.status === "Pending" && (
          <>
            <button className="px-3 py-1 text-xs rounded-md bg-emerald-500 text-white hover:bg-emerald-600">
              Approve
            </button>
            <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600">
              Reject
            </button>
          </>
        )}
      </div>
    </motion.div>
  ))}

  {filteredAppointments.length === 0 && (
    <div className="text-center text-slate-500 mt-10 col-span-full">
      No appointments found
    </div>
  )}
</div>

    </div>
  );
}
