import { useState,useEffect } from "react";
export function DoctorHomePreview() {
    const [stats, setStats] = useState({ totalAppointments: 0, totalDoctors: 0, totalHospitals: 0 });
      const [hospitals, setHospitals] = useState([]);
    
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
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

  const myDoctor = doctors[0] || {};
    const myAppointments = appointments.filter((a) => a.doctorId === myDoctor._id);
    return (
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Doctor Home (Preview)</h2>
        <div className="flex gap-4">
          <div className="w-1/3 border rounded p-3">
            <div className="font-bold">{myDoctor.name ?? "Dr. Example"}</div>
            <div className="text-sm text-slate-500">{myDoctor.specialization}</div>
            <div className="mt-2 text-sm">{myDoctor.phone}</div>
          </div>
          <div className="flex-1 border rounded p-3">
            <div className="font-semibold">Upcoming Appointments</div>
            <ul className="mt-2 space-y-2">
              {myAppointments.map((a) => (
                <li key={a._id} className="text-sm">{formatDate(a.date)} — {a.user?.name}</li>
              ))}
              {myAppointments.length === 0 && <li className="text-sm text-slate-500">No appointments</li>}
            </ul>
          </div>
        </div>
      </div>
    );

    function formatDate(d) { try { return new Date(d).toLocaleString(); } catch (e) { return d; } }
  }
