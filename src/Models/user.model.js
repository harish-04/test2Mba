const mongoose = require('mongoose'); 
const { userTypes, userStatus } = require('../Utils/constants');
//Porduct schema 
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        minLength : 4,
        required: true,
    },
    password :{
        type : String,
        required: true,
    },
    email:{
        type : String,
        required: true,
        lowerCase : true,
        minLength : 10,
    },
    userType: {
        type: String,
        required : true,
        default:userTypes.customer,
        enum : Object.values(userTypes)
    },
    userStatus:{
        type : String,
        required : true,
        default:userStatus.pending,
        enum : Object.values(userStatus)
    }
    
});

const User = mongoose.model("User_mba",userSchema);

module.exports = User;