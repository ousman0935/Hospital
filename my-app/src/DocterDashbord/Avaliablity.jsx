import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarDays, Save, Plus, AlertCircle } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DoctorAvailabilityPage() {
  const [schedule, setSchedule] = useState(
    days.map((day) => ({
      day,
      enabled: day !== "Sunday",
      start: "08:00",
      end: "16:00",
      breaks: [],
    }))
  );

  const [slotDuration, setSlotDuration] = useState(60);
  const [exceptions, setExceptions] = useState([]);

  // Update day
  const updateDay = (index, key, value) => {
    const updated = [...schedule];
    updated[index][key] = value;
    setSchedule(updated);
  };

  // Break functions
  const addBreak = (index) => {
    const updated = [...schedule];
    updated[index].breaks.push({ start: "12:00", end: "13:00" });
    setSchedule(updated);
  };
  const updateBreak = (dayIndex, breakIndex, key, value) => {
    const updated = [...schedule];
    updated[dayIndex].breaks[breakIndex][key] = value;
    setSchedule(updated);
  };
  const removeBreak = (dayIndex, breakIndex) => {
    const updated = [...schedule];
    updated[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(updated);
  };

  // Exceptions
  const addException = () => setExceptions([...exceptions, { date: "", start: "08:00", end: "16:00", reason: "" }]);
  const updateException = (index, key, value) => {
    const updated = [...exceptions];
    updated[index][key] = value;
    setExceptions(updated);
  };
  const removeException = (index) => {
    const updated = [...exceptions];
    updated.splice(index, 1);
    setExceptions(updated);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Availability</h1>
          <p className="text-slate-500 text-sm">Set when patients can book appointments</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow">
          <Save size={16} /> Save
        </button>
      </motion.div>

      {/* Row: AI Suggestion + Appointment Duration */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[220px] bg-white p-3 rounded-lg shadow flex items-center gap-2 text-sm">
          <AlertCircle size={18} className="text-blue-500" />
          <span>AI Suggestion: Optimal slots this week</span>
        </div>

        <div className="flex-1 min-w-[150px] bg-white p-3 rounded-lg shadow flex items-center gap-2 text-sm">
          <Clock size={18} className="text-slate-500" />
          <span>Appointment Duration</span>
          <select
            value={slotDuration}
            onChange={(e) => setSlotDuration(Number(e.target.value))}
            className="ml-auto border rounded px-1 py-0.5 text-sm"
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={60}>60 min</option>
          </select>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-2xl shadow p-3 space-y-2">
        {schedule.map((d, i) => (
          <div key={d.day} className={`flex flex-col gap-1 p-2 rounded-lg ${d.enabled ? "bg-slate-50" : "bg-slate-100 opacity-50"}`}>
            <div className="flex items-center gap-1">
              <input type="checkbox" checked={d.enabled} onChange={(e) => updateDay(i, "enabled", e.target.checked)} className="w-4 h-4" />
              <div className="flex items-center gap-1 font-medium text-slate-700 w-28">
                <CalendarDays size={16} /> {d.day}
              </div>

              <input type="time" disabled={!d.enabled} value={d.start} onChange={(e) => updateDay(i, "start", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
              <span className="text-slate-500 text-sm">to</span>
              <input type="time" disabled={!d.enabled} value={d.end} onChange={(e) => updateDay(i, "end", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />

              <button onClick={() => addBreak(i)} disabled={!d.enabled} className="ml-auto flex items-center gap-1 text-blue-600 text-sm">
                <Plus size={14} /> Add Break
              </button>
            </div>

            {/* Breaks */}
            <div className="flex flex-wrap gap-1 ml-10">
              {d.breaks.map((b, bi) => (
                <div key={bi} className="flex items-center gap-1">
                  <input type="time" value={b.start} onChange={(e) => updateBreak(i, bi, "start", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
                  <span className="text-slate-500 text-sm">to</span>
                  <input type="time" value={b.end} onChange={(e) => updateBreak(i, bi, "end", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
                  <button onClick={() => removeBreak(i, bi)} className="text-red-500 text-sm">Remove</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Exceptions */}
      <div className="bg-white rounded-2xl shadow p-3 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-medium text-slate-700 text-sm">Exceptions</h2>
          <button onClick={addException} className="flex items-center gap-1 text-blue-600 text-sm">
            <Plus size={14} /> Add Exception
          </button>
        </div>

        {exceptions.map((ex, ei) => (
          <div key={ei} className="flex items-center gap-1 flex-wrap">
            <input type="date" value={ex.date} onChange={(e) => updateException(ei, "date", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
            <input type="time" value={ex.start} onChange={(e) => updateException(ei, "start", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
            <span className="text-slate-500 text-sm">to</span>
            <input type="time" value={ex.end} onChange={(e) => updateException(ei, "end", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm" />
            <input type="text" placeholder="Reason" value={ex.reason} onChange={(e) => updateException(ei, "reason", e.target.value)} className="border rounded-lg px-2 py-0.5 text-sm flex-1 min-w-[100px]" />
            <button onClick={() => removeException(ei)} className="text-red-500 text-sm">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
