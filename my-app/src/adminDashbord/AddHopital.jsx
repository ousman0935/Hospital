import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddHospital() {
  const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg"
];
const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Type validation
    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Only image files are allowed!");
      e.target.value = "";
      return;
    }

    // Size validation (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      e.target.value = "";
      return;
    }

    // Save & preview
    if (type === "Logo") {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }

    if (type === "Cover") {
      setCover(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const initialForm = {
    Name: "",
    Email: "",
    Phone: "",
    Type: "",
    Address: "",
    Description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [Logo, setLogo] = useState(null);
  const [Cover, setCover] = useState(null);
  const [error,setError]=useState(null)
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hospitalData=form
    const uploadData=new FormData()
    if(Logo) uploadData.append("Logo", Logo);
    if(Cover) uploadData.append("Cover", Cover);
    if(Logo || Cover){
     try {
         const res2=await fetch("http://localhost:5000/uploadboth",{
          method: "POST",
          body: uploadData, // ❗
        })
       if (!res2.ok) {
        return toast.error("Something went wrong! in uploadding");
       }
       const data=await res2.json(); 
     hospitalData={
        ...form,
        Logo:data.Logo,
        Cover:data.Cover
     }
      
     } catch (error) {
      toast.error("internal server Error in image uploadding !!!")
     }
    }
 

    try {
      console.log(hospitalData)
      const res = await fetch("https://hospital-b2mt.onrender.com/hospital", {
        method: "POST",
         headers: {
        "Content-Type": "application/json", // important!
      },
      body: JSON.stringify(hospitalData)
      });

      if (!res.ok) {
       const data=await res.json();
        setError(data.error);
        return toast.error('Something went wrong!');
        
      }

      toast.success("Hospital added successfully 🎉");
      setForm(initialForm);
      setLogo(null);
      setCover(null);
      setLogoPreview(null);
      setCoverPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Server error!");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex items-center justify-center p-6">
  <div className="w-full max-w-5xl rounded-[2rem] bg-white/70 backdrop-blur-xl 
                  shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-white/60">

    {/* ================= HEADER ================= */}
    <div className="px-8 pt-8 pb-4 border-b border-slate-200">
      <div className="flex items-center gap-4">
        <div className="
          w-14 h-14 rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-rose-100 to-rose-200
          shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.15)]
        ">
          <span className="text-2xl">🏥</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Register New Hospital
          </h2>
          <p className="text-sm text-slate-500">
            Add a hospital or clinic to the system
          </p>
        </div>
      </div>
    </div>

    {/* ================= FORM ================= */}
    <form
      onSubmit={handleSubmit}
      className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6"
    >

      {/* ================= TEXT INPUTS ================= */}
      <input
        className="input"
        name="Name"
        placeholder="Hospital Name"
        value={form.Name}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        name="Email"
        placeholder="Email Address"
        value={form.Email}
        onChange={handleChange}
      />

      <input
        className="input"
        name="Phone"
        placeholder="Phone Number"
        value={form.Phone}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        name="Type"
        placeholder="Type (Private / Government)"
        value={form.Type}
        onChange={handleChange}
      />

      <input
        className="input md:col-span-2"
        name="Address"
        placeholder="Hospital Address"
        value={form.Address}
        onChange={handleChange}
        required
      />

      <textarea
        name="Description"
        rows="3"
        placeholder="Hospital Description"
        value={form.Description}
        onChange={handleChange}
        className="input md:col-span-2 resize-none"
      />

      {/* ================= LOGO UPLOAD ================= */}
 <div className="space-y-2">
  <label className="label">Hospital Logo</label>

  <div className="rounded-2xl border border-slate-300 bg-white p-3">
    {/* Preview box */}
    <div className="h-28 rounded-xl bg-slate-50 border flex items-center justify-center">
      {logoPreview ? (
        <img
          src={logoPreview}
          alt="Hospital Logo"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-slate-400 text-sm">No logo uploaded</span>
      )}
    </div>

    {/* File name */}
    <div className="mt-2 text-xs text-slate-500 truncate">
      {form?.Logo?.name || "Choose a logo image"}
    </div>

    {/* File input */}
    <input
      type="file"
      accept="image/*"
      className="file-input mt-2"
      onChange={(e) => handleImageChange(e, "Logo")}
    />
  </div>
</div>



      {/* ================= COVER UPLOAD ================= */}
 <div className="space-y-2">
  <label className="label">Cover Image</label>

  <div className="rounded-2xl border border-slate-300 bg-white p-3">
    {/* Preview box */}
    <div className="h-32 rounded-xl bg-slate-50 border flex items-center justify-center">
      {coverPreview ? (
        <img
          src={coverPreview}
          alt="Cover"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="text-slate-400 text-sm">No cover uploaded</span>
      )}
    </div>

    {/* File name */}
    <div className="mt-2 text-xs text-slate-500 truncate">
      {form?.Cover?.name || "Choose a cover image"}
    </div>

    {/* File input */}
    <input
      type="file"
      accept="image/*"
      className="file-input mt-2"
      onChange={(e) => handleImageChange(e, "Cover")}
    />
  </div>
</div>



      {/* ================= ERROR ================= */}
      {error && (
        <div className="md:col-span-2">
          <div className="rounded-xl bg-red-100 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* ================= ACTION BUTTONS ================= */}
      <div className="md:col-span-2 flex justify-end gap-4 pt-4">
        <button
          type="reset"
          className="
            px-6 py-2 rounded-xl
            bg-slate-200 text-slate-700
            hover:bg-slate-300 transition
          "
        >
          Clear
        </button>

        <button
          type="submit"
          className="
            px-6 py-2 rounded-xl
            bg-gradient-to-r from-rose-500 to-rose-600
            text-white font-medium
            shadow-[0_10px_25px_rgba(244,63,94,0.4)]
            hover:scale-[1.03] transition
          "
        >
          Register Hospital
        </button>
      </div>

    </form>
  </div>
</div>

  );
}
