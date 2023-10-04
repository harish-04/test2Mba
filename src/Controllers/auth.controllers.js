const { SECERT_KEY } = require("../../Configs/auth.config");
const User = require("../Models/user.model");
const { userStatus , userTypes} = require("../Utils/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp= async (req,res)=>{

    const {name,password,email,userType,userId} = req.body;

    const status = (userType === userTypes.admin)?(userStatus.pending):userStatus.approved;
    const hasedPassword = bcrypt.hashSync(password,10);

    const newUser = new User({
        name,
        email,
        userId,
        password:hasedPassword,
        userType,
        userStatus:status
    });
    try{
        const user = await newUser.save();
        res.status(201).send(user);
    }catch(err){
        res.status(500).send({message:"Server Side Issue"});
    }

}

exports.signIn = async (req, res) => {

    const {userId, password} = req.body;
    const user = await User.findOne({userId : userId});
    if(!user){
        return res.status(400).send({message:"User Id is invalid"});
    }
    const isvalidPassword = bcrypt.compareSync(password, user.password);
    if(!isvalidPassword){
        return res.status(400).send({message:"password passed is invalid"});
    }
    var token = jwt.sign({userId:user.userId},SECERT_KEY,{expiresIn: '1h'});
    return res.send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType:user.userType,
        accessToken : token

    });
};