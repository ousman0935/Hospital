import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchHospitals } from "./api/hospitals";

export function HospitalsList() {
  const { data: Hospitals, isLoading, isError } = useQuery({
    queryKey: ["Hospitals"],
    queryFn: fetchHospitals,
  });

  const [search, setSearch] = useState("");
  const [hospitalsWithStats, setHospitalsWithStats] = useState([]);
  const queryClient = useQueryClient();

  const deleteMutution = useMutation({
    mutationFn: async (id) => {
      return fetch(`http://localhost:5000/hospital/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("Hospitals");
      toast.success("Hospital Deleted Successfully!");
    },
  });

  const defaultLogo =
    "https://res.cloudinary.com/dfvkpz09v/image/upload/v1768054160/bernd-dittrich-wnRRFTrNMc4-unsplash_txabaa.jpg";

  // Initialize stats only once after fetch
  useEffect(() => {
    if (Hospitals) {
      setHospitalsWithStats(
        Hospitals.map((h) => ({
          ...h,
          stats: {
            success: Math.floor(Math.random() * 30),
            pending: Math.floor(Math.random() * 10),
            rejected: Math.floor(Math.random() * 8),
            finished: Math.floor(Math.random() * 25),
          },
        }))
      );
    }
  }, [Hospitals]);

  const filteredHospitals = hospitalsWithStats.filter((h) =>
    h.Name.toLowerCase().includes(search.toLowerCase())
  );

  const topHospitals = [...hospitalsWithStats]
    .sort((a, b) => b.stats.success - a.stats.success)
    .slice(0, 3);

  if (isLoading)
    return (
      <div className="p-6 bg-white rounded-2xl shadow">
        Loading hospitals...
      </div>
    );

  if (isError)
    return (
      <div className="p-6 bg-white rounded-2xl shadow text-red-500">
        Failed to load hospitals.
      </div>
    );

  return (
    <div className="space-y-0 px-4 sm:px-6 lg:px-8">

      {/* 🔍 HEADER + SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Hospitals Management
        </h2>

        <input
          type="text"
          placeholder="Search hospital name..."
          className="px-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🏆 TOP 3 HOSPITALS - always visible */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2
         flex items-center gap-2">
          🏆 Top Performing Hospitals
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {topHospitals.map((h, i) => (
            <div
              key={h._id}
              className="rounded-2xl p-2 bg-white
              shadow-[0_20px_40px_rgba(0,0,0,0.15)]
              hover:-translate-y-1 transition flex flex-col items-start sm:items-center"
            >
              <div className="text-sm text-slate-500 mb-1">
                {i === 0 ? "🥇 Rank 1" : i === 1 ? "🥈 Rank 2" : "🥉 Rank 3"}
              </div>

              <div className="text-lg font-semibold text-slate-800 text-left sm:text-center">
                {h.Name}
              </div>

              <div className="mt-3 text-green-600 font-medium">
                ✔ {h.stats.success} Successful Appointments
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🏥 ALL HOSPITALS */}
      <div className="space-y-4">
        {filteredHospitals?.map((h) => (
          <div
            key={h._id}
            className="bg-white rounded-2xl p-5 flex flex-col md:flex-row
            gap-5 md:items-center
            shadow-[0_15px_35px_rgba(0,0,0,0.12)]
            hover:-translate-y-1 transition"
          >
            {/* LOGO */}
            <div className="w-16 h-16 rounded-xl bg-slate-100 shadow-inner overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <img
                src={h.Logo || defaultLogo}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left">
              <div className="font-semibold text-slate-800">{h.Name}</div>
              <div className="text-sm text-slate-500">{h.Address}</div>
              <div className="text-sm text-slate-400">{h.Email}</div>
            </div>

            {/* STATUS */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-center md:text-left">
              <span className="text-green-600">✔ {h.stats.success} Approved</span>
              <span className="text-yellow-600">⏳ {h.stats.pending} Pending</span>
              <span className="text-red-600">✖ {h.stats.rejected} Rejected</span>
              <span className="text-blue-600">🏁 {h.stats.finished} Finished</span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3 md:mt-0 justify-center md:justify-start flex-wrap">
              <button className="px-4 py-2 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition">
                View
              </button>

              <button
                className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => {
                  if (window.confirm("Delete this hospital?")) {
                    deleteMutution.mutate(h._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
