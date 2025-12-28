 import { useState,useEffect } from "react";
 import {useQuery}  from '@tanstack/react-query'
 import { fetchDocters } from "./api/doctors";
import { fetchHospitals } from "./api/hospitals";
import { Link } from "react-router-dom";
 export function DoctorsByHospital() {
/*
     useEffect(() => {
  const fetchHospital = async () => {
    try {
      const res = await fetch("http://localhost:5000/hospitals");

      if (!res.ok) {
        throw new Error("Failed to fetch hospitals");
      }

      const data = await res.json();
      setHospitalls(data.hospitals);

    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchHospital();
}, []);
*/
    const { data:docters,
         isLoading,
         isError,
         Error
     }=useQuery({
      queryKey:["docters"],
      queryFn:fetchDocters
     });
    const {data:hospitals,
          isHospitalsLoading,
          isHospitalsError,}
        =useQuery({
          queryKey:["Hospitals"],
          queryFn:fetchHospitals
        });
 

    if(isLoading || isHospitalsLoading) return <p>Loading !!!!</p>
    if(isError || isHospitalsError) return <div>        <h2 className="text-lg font-semibold mb-3">Doctors by Hospital</h2>
                <p>Error in Loading the data
                  </p></div>
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

  <div className="space-y-6">
    {hospitals?.map((h) => {
      const hospitalDoctors = docters?.filter(
        (d) => d.HospitalId._id === h._id
      );

      return (
        <div
          key={h._id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-5 hover:shadow-md transition"
        >
          {/* Hospital Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {h.Name}
              </h3>
              <p className="text-sm text-slate-500">
                {hospitalDoctors?.length} Doctors Available
              </p>
            </div>

            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
              Hospital
            </span>
          </div>

          {/* Doctors Grid */}
          {hospitalDoctors?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospitalDoctors.map((d) => (
                <div
                  key={d._id}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-400 hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="font-medium text-slate-800">
                      {d.Name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {d.Specialization}
                    </p>
                  </div>

                  <Link
                    to={`/admin/docterProfile/${d._id}`}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-400 italic">
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
