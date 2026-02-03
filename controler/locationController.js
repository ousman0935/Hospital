export const locationController =(req,res)=>{
    try {
        if(!req.params)
        {
            return res.send(400).json({message:"the id parameter is required "});
        }
        if(!req.body.Region || !req.body.City)
            return res.send(400).json({
        })
        const {id}=req.params;
        
        
    } catch (error) {
        
    }
}