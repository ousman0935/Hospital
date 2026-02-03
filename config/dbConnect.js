import mongoose from 'mongoose'
export const dbConnect=async ()=>{
    try {
        const con= await mongoose.connect(process.env.db_connection,
        console.log("Data base connected  sucessfully"))
        
        
    } catch (error) {
        console.log("failed to connect",error);
    }
}
