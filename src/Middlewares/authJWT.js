const jwt = require('jsonwebtoken');
const { SECERT_KEY } = require('../../Configs/auth.config');
const User = require('../Models/user.model');
const {userTypes} = require("../Utils/constants")
const verifyToken =async (req,res,next) =>{

    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({message:"Invalid token / Token not provided."});
    }

    jwt.verify(token,SECERT_KEY,async (err,payload)=>{
        
        if(err){
            return res.status(401).send({message:"User is not authenticated."});
        }
        const userId = payload.userId;
        const user = await User.findOne({userId:userId})
        req.user = user;
        req.userId = userId;
    
        next();
    })

}
 const verifyAdmin =async (req,res,next)=>{
    const userId = req.userId;
    try{        
        
        if( req.user.userType !== userTypes.admin) {
            return res.status(403).send({message: 'Require Admin role to access.'})
        }
        
        next();

    }catch(err){
        return res.status(500).send({message:"User is not Admin"})
    }
 }

module.exports = {
    verifyToken,
    verifyAdmin
}