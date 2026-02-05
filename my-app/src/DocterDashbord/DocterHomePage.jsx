import React, { useEffect, useState } from "react";

const DocterHomePage = () => {
  const [hour,setHour]=useState()
    const [minute,setMinute]=useState()

const date=new Date();
const year=date.getFullYear();
const dateNo=date.getDate();
const dayName=date.toLocaleDateString("en-Us",{weekday:"long"})
const month=date.toLocaleDateString("en-Us",{month:"long"})

useEffect(()=>{
const hour=date.getHours();
setHour(hour)
const minute=date.getMinutes();
setMinute(minute);
})
  return (
    <div className="space-y-4">

      {/* DATE */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Today
        </h2>
        <h2>Time {hour}:{minute>10?minute:`0${minute}`}</h2>
        <span className="text-sm text-gray-500">

          {dayName}, {dateNo} {month} {year} 
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { title: "Today", value: 12, icon: "📅" },
          { title: "Upcoming", value: 5, icon: "⏰" },
          { title: "Completed", value: 8, icon: "✅" },
          { title: "Cancelled", value: 1, icon: "❌" },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-xl bg-white shadow-sm p-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
              <span>{s.icon}</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.title}</p>
              <p className="text-xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* APPOINTMENTS */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">
          Upcoming Appointments
        </h3>

        {[
          { name: "Abebe T.", time: "09:00 AM", status: "Pending" },
          { name: "Sara M.", time: "10:30 AM", status: "Approved" },
          { name: "Kebede A.", time: "11:15 AM", status: "Approved" },
          { name: "Liya D.", time: "12:00 PM", status: "Pending" },
        ].map((a, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="font-medium text-gray-800">{a.name}</p>
                <p className="text-xs text-gray-500">{a.time}</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
              ${a.status === "Pending" && "bg-yellow-100 text-yellow-700"}
              ${a.status === "Approved" && "bg-green-100 text-green-700"}
            `}
            >
              {a.status}
            </span>
          </div>
        ))}

        <button className="text-sm text-blue-600 hover:underline mt-2">
          View all appointments →
        </button>
      </div>

    </div>
  );
};

export default DocterHomePage;
