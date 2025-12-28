export const fetchHospitals=async()=>{
    try {
         const res = await fetch("http://localhost:5000/hospitals");
      
      if (!res.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data= await res.json();
      return data.hospitals
        
    } catch (error) {
               throw new Error("Failed to fetch doctors");
    }
     


}