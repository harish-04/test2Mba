const mongoose = require('mongoose');
const { bookingStatus } = require('../Utils/constants');

const bookingSchema = new mongoose.Schema({

    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User_mba',
        required:true
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Movie_mba",
        required:true
    },
    theaterId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"theater_mba",
        required:true
    },
    timings:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum : Object.values(bookingStatus),
        default:bookingStatus.inProgress
    },
    totalCost:{
        type:Number
    },
    noOfSeats:{
        type:Number
    },
    payments : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : 'payment_mba'
    }

});

const bookingModel = new mongoose.model('booking_mba',bookingSchema);

module.exports = bookingModel;