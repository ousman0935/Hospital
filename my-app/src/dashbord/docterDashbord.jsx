import { UserContext } from "../context/contextApi";
import { useContext } from "react";
export function DoctorDashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 space-y-5 max-w-6xl mx-auto">

<div className="rounded-2xl p-6 text-white
bg-gradient-to-br from-emerald-600 to-teal-600 shadow-xl">
  <h1 className="text-2xl font-bold">
    Welcome Dr. {user?.Name}
  </h1>
  <p className="text-sm opacity-90 mt-1">
    Today’s appointments overview
  </p>
</div>


      {/* QUICK SEARCH */}
      

      <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
     <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
      <input
     className="w-full outline-none bg-transparent"
      placeholder="Search patient name or phone"
     />
   </div>

      {/* STATS */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[
          { title: "Today", value: 12 },
          { title: "Pending", value: 3 },
          { title: "Approved", value: 8 },
          { title: "Rejected", value: 1 },
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

      {/* APPOINTMENT CARDS */}
      <div className="space-y-3">
        {[
          { name: "Abebe T.", time: "09:00", status: "Pending" },
          { name: "Sara M.", time: "10:30", status: "Approved" },
        ].map((a, i) => (
          <div key={i}
           className="rounded-2xl bg-white/80 backdrop-blur 
shadow-md hover:shadow-xl transition p-4 flex justify-between">
  <div>
    <div className="font-semibold">{a.name}</div>
    <div className="text-xs text-gray-500">{a.time}</div>
  </div>

  <span className={`px-3 py-1 rounded-full text-xs
    ${a.status === "Pending" && "bg-yellow-100 text-yellow-700"}
    ${a.status === "Approved" && "bg-green-100 text-green-700"}
  `}>
    {a.status}
  </span>
</div>
        ))}
      </div>

    </div>
  );
}
