import { useState,useEffect } from "react";
export function PatientHistoryPreview() {

  const [activeView, setActiveView] = useState("overview"); // overview | hospitals | doctors | appointments | rejected
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
  
    // small helper UI components
   
    // small patient history UI
    const sampleUser = { _id: "u1", name: "Musa" };
    const patientHistory = appointments.filter((a) => a.user && a.user._id === sampleUser._id);
    return (
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Patient: {sampleUser.name} (Preview)</h2>
        <div className="space-y-2">
          {patientHistory.map((p) => (
            <div key={p._id} className="border p-2 rounded">
              <div className="text-sm">{formatDate(p.date)} — {doctors.find((d) => d._id === p.doctorId)?.name}</div>
              <div className="text-xs text-slate-500">Status: {p.status}</div>
            </div>
          ))}
          {patientHistory.length === 0 && <div className="text-sm text-slate-500">No history found.</div>}
        </div>
      </div>
    );
       function formatDate(d)
     { try { return new Date(d).toLocaleString(); } catch (e)
      { return d; } }
  }