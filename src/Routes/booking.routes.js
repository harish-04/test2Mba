const {verifyToken} = require('../Middlewares/authJWT')
const { createBooking, getAllBookings, getAllBookingsById, updateBookingById, cancelBookingById, addPaymentToBooking } = require("../Controllers/booking.controllers");


module.exports = function(app){
    app.post('/mba/api/v1/bookings',[verifyToken],createBooking);
    app.get('/mba/api/v1/bookings',[verifyToken],getAllBookings);
    app.get('/mba/api/v1/bookings/:id',[verifyToken],getAllBookingsById);
    app.put('/mba/api/v1/bookings/:id',[verifyToken],updateBookingById);
    app.put('/mba/api/v1/bookings/:id/cancel',[verifyToken],cancelBookingById);
    app.put('/mba/api/v1/booking/:bookingId/payment/:paymentId',[verifyToken],addPaymentToBooking);
}