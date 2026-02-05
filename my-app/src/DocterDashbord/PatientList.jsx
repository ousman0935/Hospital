// src/DocterDashbord/PatientsList.jsx
import React, { useState, useMemo } from "react";
import { FaUserCircle, FaPhoneAlt, FaEdit, FaEye } from "react-icons/fa";
import Button from "../components/Button";

const patients = [
  { id: 1, name: "John Doe", age: 35, phone: "+251 912 345 678", lastVisit: "2026-01-05", status: "Active", nextVisit: "2026-01-20" },
  { id: 2, name: "Sara Ali", age: 28, phone: "+251 911 234 567", lastVisit: "2026-01-08", status: "Follow-up", nextVisit: "2026-01-18" },
  { id: 3, name: "Mohammed Yusuf", age: 42, phone: "+251 913 987 654", lastVisit: "2026-01-10", status: "Inactive", nextVisit: "-" },
  { id: 4, name: "Amina Hassen", age: 31, phone: "+251 915 222 333", lastVisit: "2026-01-11", status: "Active", nextVisit: "2026-01-22" },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  "Follow-up": "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
};

const PatientsList = () => {
  const [search, setSearch] = useState("");

  // Filter patients by name OR phone
  const filteredPatients = useMemo(
    () =>
      patients.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.phone.includes(search)
      ),
    [search]
  );

  // Group patients alphabetically by first letter of name
  const groupedPatients = useMemo(() => {
    const groups = {};
    filteredPatients.forEach((p) => {
      const firstLetter = p.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(p);
    });
    // Sort letters A-Z
    return Object.keys(groups)
      .sort()
      .reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {});
  }, [filteredPatients]);

  return (
    <div className="p-2 sm:p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-3">
        <h1 className="text-3xl font-bold text-blue-600">My Patients</h1>
        <div className="flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
          />
          <Button>Search</Button>
        </div>
      </div>

      {/* Patient Groups */}
      <div className="space-y-6">
        {Object.keys(groupedPatients).length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No patients found.
          </p>
        )}

        {Object.entries(groupedPatients).map(([letter, patients]) => (
          <div key={letter}>
            {/* Group Header */}
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{letter}</h3>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-start hover:shadow-lg transition relative"
                >
                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[patient.status]}`}
                  >
                    {patient.status}
                  </span>

                  {/* Avatar */}
                  <FaUserCircle className="text-blue-400 text-5xl flex-shrink-0" />

                  {/* Patient Info */}
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-800">
                      {patient.name}
                    </h2>

                    <p className="text-sm text-gray-500">Age: {patient.age}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <FaPhoneAlt className="text-xs" />
                      {patient.phone}
                    </div>

                    <div className="flex gap-4 text-xs text-gray-400 mt-2">
                      <span>Last: {patient.lastVisit}</span>
                      <span>Next: {patient.nextVisit}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                        <FaEye className="inline mr-1" /> View
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
