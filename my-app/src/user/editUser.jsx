import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const UserEditPage = () => {
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Roles: "",
  });

  // 1️⃣ Fetch user by ID when page loads
 const {id}=useParams();

  useEffect(() => {
      if (!id) return   console.log("id does not exists"); // make sure _id exists
     console.log(id)
    const getUser=async ()=>{
       try {

      const res=await axios.get(`http://localhost:5000/user/${id}`)
      console.log(res.data)
      const user=res.data.user;
       setForm({
        Name:user.Name,
        Email:user.Email,
        Phone:user.Phone,
        Roles: user.Roles 

       })
       console.log(form)
    } catch (error) {
      console.log(error);
    }
    }
    getUser();
    console.log(form)
   
  
  }, [id]);

  // 2️⃣ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3️⃣ Save updated user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
       await axios.put(`http://localhost:5000/user/${id}`, form)
      .then(() => alert("User updated successfully"))
      
    } catch (error) {
      console.log(error)
    }
 
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Edit User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="Phone"
            value={form.Phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="Roles"
            value={form.Roles}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Clinic">Clinic</option>
            
          </select>
        </div>

        <button
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
