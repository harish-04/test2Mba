
const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    movies : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : 'Movie_mba'
    }

});

const theaterModel = mongoose.model('theater_mba',theaterSchema);

module.exports = theaterModel;