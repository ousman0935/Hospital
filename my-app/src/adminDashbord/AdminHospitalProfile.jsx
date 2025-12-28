import React from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Users,
  Stethoscope,
  CalendarCheck,
  ShieldCheck,
  ShieldX,
  Pencil
} from "lucide-react";

const AdminHospitalProfile = () => {
  const hospital = {
    name: "Addis Care Hospital",
    logo: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
    cover:"https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    email: "info@addiscare.com",
    phone: "+251 911 234 567",
    location: "Addis Ababa, Ethiopia",
    status: "Approved",
    totalDoctors: 24,
    totalAppointments: 312,
    departments: 8,
    description:
      "Addis Care Hospital is a modern healthcare facility providing high quality medical services with experienced specialists and advanced technology.",
    doctors: [
      { name: "Dr. Abebe Tesfaye", specialization: "Cardiologist" },
      { name: "Dr. Hana Alemu", specialization: "Dermatologist" },
      { name: "Dr. Samuel Bekele", specialization: "Neurologist" }
    ]
  };

  return (
    <div className="p-6 space-y-6">

      {/* ===== Cover Section ===== */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={hospital.cover}
          alt="cover"
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <img
            src={hospital.logo}
            alt="logo"
            className="h-20 w-20 rounded-xl bg-white p-2 shadow-md"
          />
          <div className="text-white">
            <h1 className="text-3xl font-bold">{hospital.name}</h1>
            <p className="text-sm opacity-90">{hospital.location}</p>
          </div>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<Stethoscope />}
          label="Doctors"
          value={hospital.totalDoctors}
        />
        <StatCard
          icon={<CalendarCheck />}
          label="Appointments"
          value={hospital.totalAppointments}
        />
        <StatCard
          icon={<Users />}
          label="Departments"
          value={hospital.departments}
        />
      </div>

      {/* ===== Details + Actions ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Hospital Information</h2>

          <InfoRow icon={<Mail />} text={hospital.email} />
          <InfoRow icon={<Phone />} text={hospital.phone} />
          <InfoRow icon={<MapPin />} text={hospital.location} />

          <p className="text-gray-600 leading-relaxed">
            {hospital.description}
          </p>
        </div>

        {/* Admin Actions */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Admin Actions</h2>

          <StatusBadge status={hospital.status} />

          <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition">
            <ShieldCheck size={18} />
            Approve Hospital
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition">
            <ShieldX size={18} />
            Block Hospital
          </button>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-gray-50 transition">
            <Pencil size={18} />
            Edit Details
          </button>
        </div>
      </div>

      {/* ===== Doctors Preview ===== */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Doctors in this Hospital
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospital.doctors.map((doc, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow transition"
            >
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-600">
                {doc.specialization}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminHospitalProfile;

/* ===== Small Components ===== */

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-700">
    {icon}
    <span>{text}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
      status === "Approved"
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {status}
  </span>
);
