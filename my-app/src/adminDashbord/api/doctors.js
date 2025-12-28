export const  fetchDocters=async ()=>{
    try {
     const res=await fetch("http://localhost:5000/docter")   
       if (!res.ok) {
          throw new Error("Failed to fetch doctors"); 
        }
        const data= await res.json();
        return data.docters;
        
    } catch (error) {
       throw new Error("Failed to fetch doctors");
    }}