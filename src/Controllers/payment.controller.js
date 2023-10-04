const bookingModel = require("../Models/Booking.model");
const paymentModel = require("../Models/payment.model");
const { bookingStatus, paymentStatus } = require("../Utils/constants");

const createPayment = async (req,res) =>{

    const {bookingId,status,amount} = req.body;

    const savedBooking = await bookingModel.findById(bookingId);
    try{
        const payment = await paymentModel.create(req.body);
        if(payment.status === paymentStatus.success){
            savedBooking.status = bookingStatus.completed;
            await savedBooking.save();
        }
        return res.status(200).send({message:"Payment is successful"});
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }

}

const getAllPayments = async (req,res) =>{
    try{
        const payments = await paymentModel.find({});
        return res.status(200).send(payments);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }

}

const getPaymentById = async (req,res) =>{
    const id = req.params.id;
    try{
        const payments = await paymentModel.findById(id);
        return res.status(200).send(payments);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }
}

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById
}