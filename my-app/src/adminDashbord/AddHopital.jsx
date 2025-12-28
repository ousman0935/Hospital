import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export function AddHospital  ()  {
  const initialForm = {
  Name: "",
  Email: "",
  Phone: "",
  Type: "",
  Address: "",
  Description:""
};

  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Type: "",
    Address: "",
  });
 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res=await fetch("http://localhost:5000/hospital",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form),
    });
    const data=res.json();
    
    if (!res.ok) {
      return toast.error("Some thing Went wrong!!");
    }
    toast.success("Hospital added successfully 🎉")
    setForm(initialForm);
      
    } catch (error) {
      console.log(error);
      return  toast.error("Some thing Went wrong!!");
      
    }

  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Page Content */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">
              Register New Hospital
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="Name"
                placeholder="Hospital Name"
                value={form.Name}
                onChange={handleChange}
                required
                className="border rounded-md px-3 py-2 w-full"
              />

              <input
                type="email"
                name="Email"
                placeholder="Hospital Email"
                value={form.Email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />

              <input
                type="text"
                name="Phone"
                placeholder="Phone Number"
                value={form.Phone}
                onChange={handleChange}
                required
                className="border rounded-md px-3 py-2 w-full"
              />

              <input
                type="text"
                name="Type"
                placeholder="Type (Private / Government)"
                value={form.Type}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />

              <input
                name="Address"
                placeholder="Hospital Address"
                value={form.Address}
                onChange={handleChange}
                required
                className="border rounded-md px-3 py-2 w-full "
              />

              <textarea
                name="Description"
                placeholder="Description (optional)"
                value={form.Description}
                onChange={handleChange}
                rows="3"
                className="border rounded-md px-3 py-2 w-full md:col-span-2"
              />

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="reset"
                  className="px-4 py-2 border rounded-md"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Register Hospital
                </button>
              </div>
            </form>
          </div>
        </div>

 
      </div>
    </div>
  );
};
