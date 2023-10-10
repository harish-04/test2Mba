const paymentModel = require("../Models/payment.model")
const bookingModel = require("../Models/booking.model");
const { paymentStatus, bookingStatus } = require("../Utils/constants");

const createPayment = async(req,res) =>{
    const {bookingId,amount,status} = req.body;

    const savedBooking = await bookingModel.findById(bookingId);

    try{
        const payment = await paymentModel.create(req.body);
        if(payment.status === paymentStatus.sucess){
            savedBooking.status = bookingStatus.completed;
            await savedBooking.save();
        }
        return res.status(200).send({message:"Payement is successfull"})
    }catch(err){
        return res.status(500).send({message:"Internal server error"+err})
    }

}

const getAllPayments = async(req,res) =>{

    try{
        const payments = await paymentModel.find({});
        return res.status(200).send(payments)

    }catch(err){
        return res.status(500).send({message:"Internal server error"+err})

    }

}

const getPaymentById = async(req,res) =>{

    const id = req.params.id;
    try{
        const payments = await paymentModel.findById(id);
        return res.status(200).send(payments)

    }catch(err){
        return res.status(500).send({message:"Internal server error"+err})

    }


}

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById
}