import React, { useState, useContext } from "react";
import { UserContext } from "../context/contextApi";
import { FaUserEdit, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Radio } from "lucide-react";

export default function PatientProfileEdit() {
  const [changePassword, setChangePassword] = useState(false);
    const [changeLocation, setChangeLocation] = useState(false);

const [region, setRegion] = useState("");
const [city, setCity] = useState("");
const [subCity, setSubCity] = useState("");

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

  const { user, setUser } = useContext(UserContext);
const {showConfirmPassword,setShowConfirmPassword}=useState(false)
  const [formData, setFormData] = useState({
    name: user?.Name || "",
    email: user?.Email || "",
    phone: user?.Phone || "",
    address: user?.Address || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <FaUserEdit size={28} className="text-white" />
          </div>
          <div className="ml-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Edit Profile
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Update your information securely
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 flex items-center gap-2 font-medium">
              <FaUserEdit /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-md transition-shadow duration-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 flex items-center gap-2 font-medium">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-md transition-shadow duration-300"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 flex items-center gap-2 font-medium">
              <FaPhone /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-md transition-shadow duration-300"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 flex items-center gap-2 font-medium">
              <FaMapMarkerAlt /> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-md transition-shadow duration-300"
            />
          </div>
        </div>
{/*  for location   */}
      <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="changeLocation"
            checked={changeLocation}
            onChange={() => setChangeLocation(!changeLocation)}
            className="w-5 h-5 accent-indigo-500"
          />



          <label htmlFor="changeLocation" className="text-gray-700 font-medium cursor-pointer">
            Change Location
          </label>
        </div>
      
        {changeLocation&& (

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
        )}

      {/* CONDITIONAL: SUB-CITY FOR ADDIS ABABA */}
      {changeLocation && region === "Addis Ababa" && (
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
      {changeLocation && region && region !== "Addis Ababa" && (
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

        
        


             <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="changePassword"
            checked={changePassword}
            onChange={() => setChangePassword(!changePassword)}
            className="w-5 h-5 accent-indigo-500"
          />
          <label htmlFor="changePassword" className="text-gray-700 font-medium cursor-pointer">
            Change Password
          </label>
        </div>
{changePassword&&
    
<div  className="col-span-1 md:col-span-2 mt-6 md:mt-8 p-4 bg-gray-50 rounded-2xl shadow-inner">
  <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
    <FaUserEdit /> Change Password
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input
      type="password"
      name="currentPassword"
      placeholder="Current Password"
      className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-inner transition-shadow duration-300"
    />
          <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showConfirmPassword ? "Hide" : "Show"}
      </button>
  
    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-inner transition-shadow duration-300"
    />
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm New Password"
      className="p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-inner transition-shadow duration-300"
    />
  </div>
</div>
}


        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-inner transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
          >
            <FaSave size={20} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
