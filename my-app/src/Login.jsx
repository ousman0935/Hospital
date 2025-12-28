import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useContext } from 'react';
import { UserContext } from './context/contextApi';
import { toast } from "react-toastify";

function Login(){
  const {loginUser}=useContext(UserContext);
  const navigate=useNavigate();
 const handleLogin=async (e)=>{
      e.preventDefault();
      try {
        
        const Email=e.target.Email.value;
        const Password=e.target.Password.value;
        const res=await fetch("http://localhost:5000/login",{
                                    method:"POST",
                                    credentials:"include",
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify({
                                      Email,
                                      Password
                                    })
        });
        const data= await res.json();
        if(res.ok){
          const role=data.user.Roles
          const logg=data.user;
           console.log(data.user.Roles)
             if(role==="Docter"){
                
                loginUser(logg);
               navigate("/docter")
              toast.success("Login Success")
             }
             else if(role==="User"){
                loginUser(logg);
              navigate("/user")
              toast.success("Login Success")
             }

             else{
               loginUser(logg);
              navigate("/admin")
              toast.success("Login Success")

             }
              
            }
        else{
          alert("failed to login");
          return;
        }

        
      } catch (error) {
        console.log(error);
        alert("login failed try aqain later 33");
      }
    }
    return (  
         <div className='log MIN-H-SCREEN  h-full m-0'>
            <form action="" onSubmit={handleLogin} className=" sm:px-8 mx-8  sm:py-2 bg-white shadow-md 
            m-0
             sm:mx-32 sd:px-2 py-2 rounded-3xl  border-8 border-blue-500">

                <h1 className="text-center font-bolder
                 text-white bg-blue-600 text-2xl sm:p-2 rounded-t-lg">Login Form </h1>
                <div className="inputGroup flex sm:px-4">
                   <label htmlFor="email" className="w-full  TEXT-GRAY-700 ">Email:
                   </label>
                 <input  id="email" name='Email' className='rounded-md focus:ring-2 
                 focus:outline-none my-2 p-2 mx-4 border-4 border-green-300 
                  hover:text-red-500' placeholder="Enter User Email " type="email" />

                </div>
               <div className="inputGroup flex  sm:px-4 ">
                   <label htmlFor="Password" className="w-full TEXT-GRAY-700">
                    Password:
                   </label>
              
                 <input name='Password' id="password" className=' rounded-md focus:ring-2 focus:ring:blue-500 focus:outline-none 
                 sm:my-2 sm:p-2 mx-4 border-4 border-green-300 
                 hover:text-red-500'
                  placeholder="Enter  Password" type="password" />
                </div>
                   <div className="inputGroup sm:px-32">
                 <Link to="/newUser" className='rounded-xl text-blue-500  '> Need an account? signUp here!</Link>
                   <button type='submit' className='mt-2 w-full bg-blue-600
                    text-white 
                 pt-2 py-2  rounded hover:bg-blue-700 transition'>Submit</button>          
                </div>

            </form>
        </div>
    );
}
export default Login;