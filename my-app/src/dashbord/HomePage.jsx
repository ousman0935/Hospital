import React from 'react';
import { FaUserMd, FaCalendarCheck, FaEnvelope, FaHistory, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdSearch, MdChevronRight } from "react-icons/md";
import { useContext } from 'react';
import { UserContext } from '../context/contextApi';
import { User } from 'lucide-react';
import { useState } from 'react';
const HomePage = () => {
    const { user } = useContext(UserContext);
  const [region, setRegion] = useState("");
const [city, setCity] = useState("");
const [subCity, setSubCity] = useState("");
const [showLocationModal, setShowLocationModal] = useState(false);

// Ethiopia location structure
const locations = {
  "Addis Ababa": { subCities: ["Bole", "Yeka", "Kirkos", "Arada", "Kolfe", "Nifas Silk"] },
  "Oromia": { cities: ["Adama", "Bishoftu", "Jimma", "Shashamane"] },
  "Amhara": { cities: ["Bahir Dar", "Gondar", "Dessie", "Debre Markos"] },
  "Tigray": { cities: ["Mekelle", "Adigrat", "Axum"] },
  "SNNPR": { cities: ["Hawassa", "Arba Minch", "Dilla"] },
  "Somali": { cities: ["Jijiga", "Shinile"] },
  "Afar": { cities: ["Semera", "Asaita"] },
  "Benishangul-Gumuz": { cities: ["Assosa", "Pawe"] },
  "Gambella": { cities: ["Gambella"] },
  "Harari": { cities: ["Harar"] },
  "Dire Dawa": { cities: ["Dire Dawa"] },
};

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-4 py-4 max-w-6xl mx-auto space-y-4">

      {/* EADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Hello {user?.Name || "Patient"} 👋 </h1>
          <p className="text-[12px] text-slate-500">Your health overview today</p>
        
        
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <span className="flex items-center gap-1">
      📍 {region
  ? region === "Addis Ababa"
    ? `${region} - ${subCity}`
    : `${region} - ${city}`
  : "Addis Ababa"}

    </span>

    <button
      onClick={() => setShowLocationModal(true)}
      className="text-blue-600 hover:underline font-medium"
    >
      Change
    </button>
  </div>

        </div>

        <div className="relative w-full sm:w-64">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            className="w-full bg-white border-none rounded-xl py-2 pl-10 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-sky-500 transition-all"
            placeholder="Search..."
          />
        </div>
      </div>
{showLocationModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">
        Choose your location
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        This helps us show nearby hospitals
      </p>

      {/* REGION SELECT */}
      <div className="mb-4">
        <label className="text-sm font-medium text-slate-600">
          Region *
        </label>
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setCity("");
            setSubCity("");
          }}
          className="w-full mt-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select region</option>
          {Object.keys(locations).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* CONDITIONAL: SUB-CITY FOR ADDIS ABABA */}
      {region === "Addis Ababa" && (
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            Sub-City *
          </label>
          <select
            value={subCity}
            onChange={(e) => setSubCity(e.target.value)}
            className="w-full mt-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select sub-city</option>
            {locations["Addis Ababa"].subCities.map((sc) => (
              <option key={sc} value={sc}>{sc}</option>
            ))}
          </select>
        </div>
      )}

      {/* CONDITIONAL: CITY FOR OTHER REGIONS */}
      {region && region !== "Addis Ababa" && (
        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600">
            City *
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mt-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select city</option>
            {locations[region]?.cities?.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowLocationModal(false)}
          className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          disabled={!region || (region === "Addis Ababa" ? !subCity : !city)}
          onClick={() => {
            // Save logic here
            setShowLocationModal(false);
          }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}




      {/* ================= COMPACT STATS GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<FaCalendarCheck />} label="Next" value="Dec 10" color="text-blue-600" bg="bg-blue-100" />
        <StatCard icon={<FaHistory />} label="Visits" value="05" color="text-purple-600" bg="bg-purple-100" />
        <StatCard icon={<FaEnvelope />} label="Mail" value="02" color="text-emerald-600" bg="bg-emerald-100" />
        <StatCard icon={<FaUserMd />} label="Doctors" value="03" color="text-orange-600" bg="bg-orange-100" />
      </div>

      {/* ================= COMPACT APPOINTMENT BAR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wider">Next Appointment</h3>
          <button className="text-sky-600 text-xs font-bold hover:underline">View Schedule</button>
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center gap-4">
          {/* Minimal Date Icon */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1 flex flex-col items-center min-w-[55px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Dec</span>
            <span className="text-lg font-black text-slate-700 leading-none">10</span>
          </div>

          {/* Core Info - Compact */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-800 truncate">Dr. Alem</h4>
              <span className="text-[9px] bg-green-100 text-green-700 font-extrabold px-1.5 py-0.5 rounded uppercase">
                Confirmed
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><FaClock className="text-sky-500" /> 10:30 AM</span>
              <span className="hidden sm:flex items-center gap-1"><FaMapMarkerAlt className="text-sky-500" /> Central Clinic</span>
            </div>
          </div>

          {/* Compact Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition">
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Placeholder for more content to show space efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 bg-white/60 border-dashed border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-medium">
          Recent Lab Results (Empty)
        </div>
        <div className="h-24 bg-white/60 border-dashed border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-medium">
          Prescriptions (None)
        </div>
      </div>

    </div>
  );
}

export default HomePage;

// Compact StatCard
function StatCard({ icon, label, value, color, bg }) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-3 hover:border-sky-200 transition-colors cursor-pointer">
      <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center text-lg flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">{label}</p>
        <p className="text-base font-bold text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
}