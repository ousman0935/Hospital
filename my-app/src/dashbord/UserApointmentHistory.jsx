import React, { useState, useEffect } from "react";
import { Clock, CalendarDays, CheckCircle, XCircle, Activity, MessageSquare } from "lucide-react";
import { div } from "framer-motion/client";

const dummyAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    date: "2026-01-10",
    time: "10:00 AM",
    hospitalName:"Kedir Hospital",
    status: "Completed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Smith",
    date: "2026-01-12",
    time: "2:00 PM",
    hospitalName:"Kedir Hospital",
    status: "Cancelled",
  },
  {
    id: 3,
    doctor: "Dr. Emily Davis",
    date: "2026-01-15",
    time: "11:30 AM",
    hospitalName:"Kedir Hospital",
    status: "Upcoming",

  },
];

export default function UserAppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(dummyAppointments);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
     <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
  Appointment History
</h1>


      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="relative bg-white rounded-2xl p-4
             shadow-md hover:shadow-xl transition-shadow 
             duration-300 cursor-pointer border border-gray-200 
             flex flex-col justify-between"
          >
            {/* Top: Doctor + Icon */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{appt.doctor}</h2>
              <h2 className="text-lg font-semibold text-gray-800">{appt.hospitalName}</h2>
              {appt.status === "Completed" && <CheckCircle className="w-6 h-6 text-green-400" />}
              {appt.status === "Cancelled" && <XCircle className="w-6 h-6 text-red-400" />}
              {appt.status === "Upcoming" && <Activity className="w-6 h-6 text-blue-400" />}
            </div>

            {/* Date & Time */}
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <CalendarDays className="w-4 h-4 mr-1 text-blue-400" />
              <span>{appt.date}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Clock className="w-4 h-4 mr-1 text-blue-400" />
              <span>{appt.time}</span>
            </div>

            {/* Status / Action */}
            {appt.status === "Upcoming" ? (
              <>
              <span
                className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                  appt.status === "Completed"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {appt.status}
              </span>
              
              <button className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 rounded-lg transition-colors duration-200">
                <MessageSquare className="w-4 h-4" />
                Contact
              </button>
              </>
                
            ) : (
              <span
                className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                  appt.status === "Completed"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {appt.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
