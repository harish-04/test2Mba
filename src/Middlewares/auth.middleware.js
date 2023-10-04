const User = require("../Models/user.model");

const verifySignUpRequest = async (req, res, next) => {

    const {name,password,email,userType,userId} = req.body;

    if(!name){
        return res.status(400).send({message:'Failed! name is required'});
    }
    if(!email){
        return res.status(400).send({message:'Failed! email is required'});
    }
    if(!userId){
        return res.status(400).send({message:'Failed! userId is required'});
    }
    if(!password){
        return res.status(400).send({message:'Failed! password is required'});
    }
    if(!userType){
        return res.status(400).send({message:'Failed! userType is required'});
    }
    

    const users = await User.find({
        $or:[
            {userId:userId},
            {email:email}
        ]
    })

    if(users && users.length){
        return res.status(400).send({message:"userId or email already exists"});
    }

    next();
}

const verifySignInRequest = async(req,res,next)=>{
    const {userId, password} = req.body;
    if(!userId){
        return res.status(400).send({message:'Failed! userId is required'});
    }
    if(!password){
        return res.status(400).send({message:'Failed! password is required'});
    }

    next();
}

module.exports = {
    verifySignUpRequest,
    verifySignInRequest
}