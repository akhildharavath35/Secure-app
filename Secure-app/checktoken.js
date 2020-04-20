const jwt=require("jsonwebtoken");
var checkAuth=(req,res,next)=>{
    var token=req.headers['authorization'];
    if(token==undefined)
    {
        return res.json({message:'no token found'})
    }
    if(token.startsWith('Bearer ')){
        token=token.slice(7,token.length);
        jwt.verify(token,'secret',(err,dec)=>{
            if(err)
            {
                return res.json({message:'invalid request'})
            }
            next();
        })
    }
}
module.exports=checkAuth;