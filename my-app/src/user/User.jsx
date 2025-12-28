import React,{ useEffect, useState } from "react";
import {FaEdit} from 'react-icons/fa'

import {MdDelete} from 'react-icons/md'
import { Link } from "react-router-dom";
export default function Users() {
const [users,setUsers]=useState([]);
const [error,setError]=useState(null);
const [loading,setLoading]=useState(true)
useEffect(()=>{
  const load=async ()=>{
try {
  
  
 const res=await fetch("http://localhost:5000/users")
    if(!res.ok)
    {    throw new Error("Server eror : "+Response.status);
      
    }
   const json= await res.json()
    setUsers(json);
} catch (error) {
  setError("Connot connect to server");
  setLoading(false);
}
setLoading(false);
  }

  load();
   
},[]);
if(error) return <p className="text-red-600">{error}</p>
if(loading) return <p>Loading..</p>
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      {/* Container */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-gray-700">Name</th>
              <th className="p-3 text-gray-700">Email</th>
              <th className="p-3 text-gray-700">Phone</th>
               <th className="p-3 text-gray-700">Role</th>
            </tr>
          </thead>

          <tbody>
            
                    {users.length === 0?
        
    
             ( <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
             ):
            ( users.map((user)=>
               (
                <tr key={users._id}  className="border-b hover:bg-gray-100">
                  <td className="p-3">{user.Name}</td>
                  <td className="p-3">{user.Email}</td>
                  <td className="p-3">{user.Phone}</td>
                  <td className="p-3">{user.Roles}</td>
                  <td className="p-1">
                    <Link to={`/editUser/${user._id}`}>
                    <button> <FaEdit size={20} color="blue"/> </button>  </Link>
                   <button><MdDelete size={20} color="red"/></button></td>
                </tr>
            
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}