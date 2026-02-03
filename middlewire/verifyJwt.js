import  jwt  from "jsonwebtoken";
export const verifyJwt=  (req,res,next)=>{
    const authheader= req.headers["authorization"];
    const token=authheader&&authheader.split(" ")[1];
    if(!token) return res.status(401).json({message:"no tokens saved yet"});
      jwt.verify(token,process.env.ACCESS_SECRET,(err,user)=>{
        if(err) return res.status(400).json(err);
        req.user=user;
        next();
     })
}