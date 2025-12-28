import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStethoscope, faUserDoctor, faHospital } from "@fortawesome/free-solid-svg-icons";

export default function Home2() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Smart Clinical Booking</h1>
        <p className="text-gray-500">Your health, your schedule — for every Ethiopian</p>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-blue-100 mt-6 p-8 text-center rounded-xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          Book Medical Appointments Instantly
        </h2>
        <p className="text-gray-600">
          Find the best doctors and clinics near you with just a few clicks.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto mt-6 px-4">
        <div className="flex items-center shadow-md bg-white p-3 rounded-xl">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search for clinics, doctors, or specialties..."
            className="flex-1 outline-none"
          />
        </div>
      </div>

      {/* Quick Categories */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        <h3 className="text-xl font-semibold mb-4">Quick Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <FontAwesomeIcon icon={faStethoscope} className="text-blue-600 text-2xl mb-2" />
            <p>General Doctor</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <FontAwesomeIcon icon={faUserDoctor} className="text-blue-600 text-2xl mb-2" />
            <p>Dentist</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <FontAwesomeIcon icon={faHospital} className="text-blue-600 text-2xl mb-2" />
            <p>Eye Clinic</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <FontAwesomeIcon icon={faHospital} className="text-blue-600 text-2xl mb-2" />
            <p>Lab Test</p>
          </div>
        </div>
      </section>

      {/* Ranked Clinics */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        <h3 className="text-xl font-semibold mb-4">Top Ranked Clinics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow-sm rounded-xl p-4 border hover:shadow-md transition">
            <p className="font-semibold">Ethiopia Clinic</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4 border hover:shadow-md transition">
            <p className="font-semibold">Hayat Clinic</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4 border hover:shadow-md transition">
            <p className="font-semibold">Bethlehem Clinic</p>
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        <h3 className="text-xl font-semibold mb-4">Top Rated Doctors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow-sm rounded-xl p-4 border">
            <p className="font-semibold">Dr. Daniel</p>
            <p className="text-gray-500 text-sm">Cardiologist</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4 border">
            <p className="font-semibold">Dr. Sara</p>
            <p className="text-gray-500 text-sm">Dentist</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-4 border">
            <p className="font-semibold">Dr. Robel</p>
            <p className="text-gray-500 text-sm">Pediatrician</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto mt-12 px-4 text-center">
        <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl">
            ✔ Fast & Easy Booking
          </div>
          <div className="bg-blue-50 p-5 rounded-xl">
            ✔ Verified Clinics & Doctors
          </div>
          <div className="bg-blue-50 p-5 rounded-xl">
            ✔ No Waiting Lines
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 p-6 text-center text-gray-500">
        © 2025 Smart Clinical Booking — All Rights Reserved
      </footer>
    </div>
  );
}
