import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { fetchDocters } from "./api/doctors";
import { fetchHospitals } from "./api/hospitals";
export function HospitalsList() {
  /*  const [hospitalls,setHospitalls]=useState([]);
    const [loading,setLoading]=useState(true);
    const [eror,setError]=useState(false)
     useEffect(()=>{
  const fetchHospital=async()=>{
    try {
      const res=await fetch("http://localhost:5000/hospitals")
      if(!res.ok){
        setError(true);
      }
      const data=await res.json()
      console.log(data.hospitals);
      setHospitalls(data.hospitals);
    } catch (error) {
      console.error(error);
      console.log(error);
      setError(true);
      } finally {
        setLoading(false);
      }

    
    
    
  };
    fetchHospital();
  },[]); */
   const {data:Hospitals,
         isLoading,
         isError,
         error
   }=useQuery({
    queryKey:['Hospitals'],
    queryFn:fetchHospitals
   })
   const queryClient=useQueryClient();
   const deleteMutution=useMutation({
    mutationFn:async (id)=>{
      return fetch(`http://localhost:5000/hospital/${id}`,{method:"DELETE"});
    },onSuccess:()=>{
      queryClient.invalidateQueries("Hospitals");
      toast.success("Hospital Deleted Successfullly!!!!")
    }
   })
  if (isLoading)
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Hospitals
      </h2>

      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-slate-100"
          ></div>
        ))}
      </div>
    </div>
  );
     if (isError)
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-2">
        Hospitals
      </h2>
      <p className="text-sm text-slate-500">
        ❌ Failed to load hospital data. Please try again later.
      </p>
    </div>
  );
     return (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 w-full">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Hospitals
      </h2>
      <span className="text-sm text-slate-500">
        Total: {Hospitals?.length || 0}
      </span>
    </div>

    <div className="space-y-4">
      {Hospitals?.map((h) => (
        <div
          key={h._id}
          className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
        >
          {/* Hospital Info */}
          <div>
            <h3 className="text-lg font-medium text-slate-800">
              {h.Name}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {h.Email} • {h.Address}
            </p>

            <p className="text-sm font-medium text-slate-700 mt-1">
              📞 {h.Phone}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
              onClick={() => console.log("view", h._id)}
            >
              View
            </button>

            <button
              className="px-4 py-2 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this hospital?"
                  )
                ) {
                  deleteMutution.mutate(h._id);
                }
              }}
              disabled={deleteMutution.isLoading}
            >
              {deleteMutution.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {Hospitals?.length === 0 && (
      <div className="text-center text-slate-400 text-sm mt-10">
        No hospitals found.
      </div>
    )}
  </div>
);

  
  }