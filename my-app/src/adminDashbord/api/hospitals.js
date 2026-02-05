export const fetchHospitals=async()=>{
    try {
         const res = await fetch("https://hospital-b2mt.onrender.com/hospitals");
      
      if (!res.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data= await res.json();
      return data.hospitals
        
    } catch (error) {
               throw new Error("Failed to fetch doctors");
    }
     


}