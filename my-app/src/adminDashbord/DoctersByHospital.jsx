import { useQuery } from "@tanstack/react-query";
import { fetchDocters } from "./api/doctors";
import { fetchHospitals } from "./api/hospitals";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function DoctorsByHospital({ variant = "doctors" }) {
  const { data: docters, isLoading, isError } = useQuery({
    queryKey: ["docters"],
    queryFn: fetchDocters,
  });

  const { data: hospitals, isHospitalsLoading, isHospitalsError } = useQuery({
    queryKey: ["Hospitals"],
    queryFn: fetchHospitals,
  });

  if (isLoading || isHospitalsLoading)
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Doctors by Hospital
        </h2>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-100"></div>
          ))}
        </div>
      </div>
    );

  if (isError || isHospitalsError)
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Doctors by Hospital
        </h2>
        <p className="text-sm text-slate-500">
          ❌ Failed to load Doctors data. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Doctors by Hospital
        </h2>
        <span className="text-sm text-slate-500">
          Total Hospitals: {hospitals?.length || 0}
        </span>
      </div>

      {/* Hospitals List */}
      <div>
        {hospitals?.map((h, index) => {
          const hospitalDoctors = docters?.filter(
            (d) => d.HospitalId._id === h._id
          );

          return (
            <div
              key={h._id}
              className={`rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:shadow-2xl transition-transform hover:scale-105 ${
                index < hospitals.length - 1 ? "mb-6" : ""
              }`}
            >
              {/* Hospital Header */}
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {h.Name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {hospitalDoctors?.length} Doctors Available
                  </p>
                </div>

                {/* Modern Gradient Badge */}
                <span className="px-4 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md">
                  Hospital
                </span>
              </div>

              {/* Doctors Grid */}
              {hospitalDoctors?.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-min">
                  {hospitalDoctors.map((d) => (
                    <motion.div
                      key={d._id}
                      whileHover={{ rotateY: 5, scale: 1.05 }}
                      className={`bg-white border border-slate-200 rounded-2xl
                         px-4 flex 
                        ${variant === "overview" ? "flex-row" : "flex-col"} 
                        items-center justify-start shadow-md hover:shadow-2xl transition-transform transition-shadow`}
                    >
                      {/* 3D Doctor Icon */}
                      <div className="w-16 h-16 rounded-full 
                      bg-gradient-to-br from-teal-400 to-emerald-500
                       flex items-center justify-center shadow-inner
                        shadow-lg mr-1">
                        <span className="text-2xl text-white">🩺</span>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800">{d.Name}</h4>
                        <p className="text-sm text-slate-500">{d.Specialization}</p>

                        {/* Placeholder for future fields (status, rating, experience) */}
                        {d.Status && (
                          <span
                            className={`inline-block mt-1 w-3 h-3 rounded-full ${
                              d.Status === "Available"
                                ? "bg-green-400"
                                : d.Status === "Busy"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                            title={d.Status}
                          ></span>
                        )}
                        {d.Rating && (
                          <p className="text-xs text-yellow-500 mt-1">
                            ⭐ {d.Rating}/5
                          </p>
                        )}
                        {d.Experience && (
                          <p className="text-xs text-slate-400 mt-1">
                            {d.Experience} yrs experience
                          </p>
                        )}
                      </div>

                      {/* View / Edit Button */}
                      <Link
                        to={`/admin/docterProfile/${d._id}`}
                        className="mt-2 md:mt-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                      >
                        View
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-400 italic mt-2">
                  No doctors assigned to this hospital.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
