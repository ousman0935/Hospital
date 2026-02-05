export const  fetchDocters=async ()=>{
    try {
     const res=await fetch("https://hospital-b2mt.onrender.com/docter")   
       if (!res.ok) {
          throw new Error("Failed to fetch doctors"); 
        }
        const data= await res.json();
        return data.docters;
        
    } catch (error) {
       throw new Error("Failed to fetch doctors");
    }}