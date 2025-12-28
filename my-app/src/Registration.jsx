import { Link } from 'react-router-dom';
import './registration.css'
import { useState } from 'react';
function Registration(){
  const [Role,setRole]=useState("");
    return (  
         <div className="flex justify-center items-center min-h-screen bg-gray-100">
           <form
             className="bg-white shadow-md sm:px-8 py-4
               rounded-3xl sm:mx-4 mx-2 border-4 border-blue-500 w-full max-w-md">

                <h1 className="text-center font-bolder text-white bg-blue-600 text-3xl sm:p-2 rounded-t-lg">Registration Form </h1>
                <div className="inputGroup flex sm:px-2">
                   <label htmlFor="name" className="w-full  TEXT-GRAY-700 ">Name:
                   </label>
                 <input  id="name" className='rounded-md focus:ring-2 focus:border-green-600
                 focus:outline-none my-2 p-2 border-4 border-green-300 sm:text-xl hover:text-red-500' placeholder="Enter Your Name Dear" type="text" />

                </div>
                  <div className="inputGroup flex sm:px-2">
                   <label htmlFor="Email" className="w-full  TEXT-GRAY-700 ">Email:
                   </label>
                 <input  id="Email" className='rounded-md focus:ring-2 
                 focus:outline-none focus:border-green-600
                  my-2 p-2 border-4 border-green-300 sm:text-xl hover:text-red-500' 
                  placeholder="Enter Your Email" type="text" />

                </div>

               <div className="inputGroup flex  sm:px-2 ">
                   <label htmlFor="Password" className="w-full TEXT-GRAY-700">Password:
                   </label>
              
                 <input  id="password" className=' rounded-md focus:ring-2 
                 focus:ring:blue-500 focus:outline-none focus:border-green-600
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'
                  placeholder="Enter Your Password" type="password" />
                
                </div>
                 <div className="inputGroup flex  sm:px-2 ">
                   <label htmlFor="Password2" className="w-full TEXT-GRAY-700">
                    Confirm Password:
                   </label>
              
                 <input  id="password2" className=' rounded-md focus:ring-2 focus:border-green-600 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'
                  placeholder="Confirm  Password" type="password" />
              </div>
               <div className="inputGroup flex  sm:px-2 ">
                   <label htmlFor="Phone" className="w-full TEXT-GRAY-700">
                    Phone:
                   </label>
              
                 <input  id="Phone" className=' rounded-md focus:ring-2 focus:border-green-600 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'
                  placeholder="Enter Your Phone" type="Number" />
              </div>
              <div className="inputGroup flex  sm:px-2 ">
                   <label htmlFor="Role" className="w-full TEXT-GRAY-700">
                    Role:
                   </label>
                   <select name="Role" id="Role" value={Role} onChange={(e)=>{setRole(e.target.value)}} className=' rounded-md focus:ring-2 focus:border-green-600 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'>

                    <option value="" >Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                     <option value="user">User</option>

                   </select>
                  </div>
                  {Role==="doctor" && (
                    <>
                  <div className="inputGroup flex  sm:px-2 ">
                   <label htmlFor="Specialization" className="w-full TEXT-GRAY-700">
                    Specialization:
                   </label>
                 <input  type="text"
                 name="Specialization"
                 placeholder="Specialization" 
                 className=' rounded-md focus:ring-2 focus:border-green-600 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'
                    /> </div>
                  <div className="inputGroup flex  sm:px-2 ">
                  <label htmlFor="Experience" className="w-full TEXT-GRAY-700">
                    Experience:
                   </label>
                 <input
                 type="number"
                 name="Experience"
                placeholder="Experience (years)"
                 className=' rounded-md focus:ring-2 focus:border-green-600 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 border-4 border-green-300 sm:text-xl
                  hover:text-red-500'
                />
              </div> </>
              )}

              

                   <div className="inputGroup sm:px-32 flex flex-rows">
                    <Link to="/">Alrady have an account</Link>
                   <button type='submit' className='mt-4 w-full bg-blue-600
                    text-white px-4 py-2  rounded-xl hover:bg-blue-700 transition'>Submit
                    </button>          
                </div>

            </form>
        </div>
    );
}
export default Registration;