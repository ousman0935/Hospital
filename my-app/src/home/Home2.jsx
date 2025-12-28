import React from "react";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home2() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Header Section */}

      <div className="w-full bg-white shadow-sm p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome dear
        </h1>
        <h1 className="text-3xl font-bold text-blue-600 text-center">Smart Clinical Booking for every Ethiopian</h1>
        <h1 className="text-gray-500">Your health, your schedule</h1>
        <p></p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between w-11/12 max-w-5xl mt-8 gap-6">
        {/* Left: Booking Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex-1">
          <h2 className="text-xl font-semibold mb-4">Book Appointments</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Book New Appointment
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg border border-blue-300">
              My Appointments
            </button>
          </div>
        </div>

        {/* Right: Search and Clinics */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex-1">
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
            <FontAwesomeIcon icon={faSearch}   className="text-gray-400 mr-2" />
            
            <input
              type="text"
              placeholder="Search clinics..."
              className="outline-none flex-1 text-gray-700"
            />
          </div>

          <h2 className="text-xl font-semibold mb-3">Our Ranked Clinics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              Ethiopia Clinic
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              Second Clinic
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    
    </div>
  );
}
