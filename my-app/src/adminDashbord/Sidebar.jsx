import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchDocters } from './api/doctors';
import { fetchHospitals } from './api/hospitals';
import { Link, NavLink } from 'react-router-dom';
const Sidebar = () => {
  const [activeView,setActiveView]=useState()
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
  const totalDoctors = docters?.length ?? 0;
  const totalHospitals = hospitals?.length ?? 0;
  const totalAppointments=2

    function btnClass(view) {
      return `w-full text-left px-3 py-2 rounded ${activeView === view ? "bg-white border-2 shadow" : "hover:bg-white/60"}`;
    }

  return (

        // <Route path='hospitals' element={<HospitalsList/>}/>
          // <Route path='docters' element={<DoctorsByHospital/>}/>
          // <Route path='addHospital' element={<AddHospital/>}/>
      <div className="w-64 bg-slate-50 h-screen p-4 border-r">
        <nav className="flex flex-col gap-2">
          <NavLink className={btnClass("overview")} onClick={() => setActiveView("overview")} to='/admin'>Overview</NavLink>
          <NavLink className={btnClass("hospitals")} onClick={() => setActiveView("hospitals")} to='/admin/hospitals'>Hospitals</NavLink>
          <NavLink className={btnClass("doctors")} onClick={() => setActiveView("doctors")} to='/admin/docters'>Docters</NavLink>
          <NavLink className={btnClass("appointments")} onClick={() => setActiveView("appointments")} to='/admin/appointments'>  Appointments</NavLink>
         <NavLink className={btnClass("rejected")}onClick={() => setActiveView("rejected")} to='/admin/rejected'>  Rejected</NavLink>
        <NavLink className={btnClass("addHospital")} onClick={() => setActiveView("addHospital")} to='/admin/addHospital'>addHospital</NavLink>

        </nav>
        {(isLoading || isHospitalsLoading) && <p>Loading...</p>}

        {!(isLoading || isHospitalsLoading || isError || isHospitalsError)}
        <div className="mt-6">
          <h3 className="text-sm text-slate-600">Totals</h3>
          <div className="mt-2 text-lg font-bold">{totalAppointments} Appointments</div>
          <div className="text-sm">{totalDoctors} Doctors • {totalHospitals} Hospitals</div>
        </div> 
      </div> 
    );

   
}

export default Sidebar
