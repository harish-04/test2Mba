
const bookingModel = require("../Models/Booking.model");
const paymentModel = require("../Models/payment.model");
const { bookingStatus } = require("../Utils/constants");




const createBooking = async (req,res)=>{
    const user = req.user;
    const{movieId,theaterId,timings,noOfSeats} = req.body;
    
    const bookingObj = {
        theaterId : theaterId,
        movieId : movieId,
        userId : user._id,
        timings : timings,
        totalCost : noOfSeats*300,
        noOfSeats
    };
    try{
        const booking = await bookingModel.create(bookingObj);
        return res.status(200).send(booking);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }
}

const getAllBookings = async (req,res) => {
    try{
        const bookings = await bookingModel.find({}).populate("userId").populate("movieId").populate("theaterId");
        return res.status(200).send(bookings);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }

}

const getAllBookingsById = async (req,res) => {
    const id = req.params.id;
    try{
        const booking = await bookingModel.findById(id).populate("movieId").populate('theaterId').populate('userId');
        return res.status(200).send(booking);
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }

}

const updateBookingById = async (req,res) => {

    const id = req.params.id;
    var updateBooking = await bookingModel.findById(id);
    if(!updateBooking){
    return res.status(404).send({message: "Booking Not Found"});
    }
    const updateValues = req.body;
    Object.keys(updateValues).forEach((key) => {
    updateBooking[key] = updateValues[key];
    })
    await updateBooking.save();
    return res.status(200).send({message:"Booking updated successfully"});

}

const cancelBookingById = async (req,res) =>{
    const id = req.params.id;

    try{
        const savedBooking = await bookingModel.findById(id);

        if(!savedBooking){
            return res.status(404).send({message:"Invalid Booking Id!"});
        }

        if(!savedBooking.userId.equals(req.user._id)){
            return res.status(403).send({message:"User has Insufficient permissions to cancle the booking."});
        }

        savedBooking.status = bookingStatus.cancelled;
        await savedBooking.save();
        return res.status(200).send({message:"Booking cancelled successfully."});

    }catch(err){
        return res.status(500).send({message:"Internal Server Error"+err});
    }

}

const addPaymentToBooking = async(req,res)=>{
    const {bookingId,paymentId} = req.params;
    const savedBooking = await bookingModel.findById(bookingId);
    if(!savedBooking){
        return res.status(404).send({message:"Booking doesn't exists"});
    }
    const savedPayment = await paymentModel.findById(paymentId);
    if(!savedPayment){
        return res.status(404).send({message:"Payment doesn't Exists"})
    }
    savedBooking.payments.push(savedPayment);
    await savedBooking.save();
    return res.status(200).send({message : "Payment added and Booking saved successfully"});
   
}

module.exports = {
    createBooking,
    getAllBookings,
    getAllBookingsById,
    updateBookingById,
    cancelBookingById,
    addPaymentToBooking
}