const mongoose = require('mongoose');
const { paymentStatus } = require('../Utils/constants');

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type : mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : 'booking_mba'
    },
    amount:{
        type : Number,
        required:true
    },
    status:{
        type : String,
        enum : Object.values(paymentStatus)
    }

});

const paymentModel = new mongoose.model('payment_mba',paymentSchema);

module.exports = paymentModel;

