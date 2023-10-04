const { createPayment, getAllPayments, getPaymentById } = require("../Controllers/payment.controller");
const {verifyToken} = require('../Middlewares/authJWT');


module.exports = function(app){
    app.post('/mba/api/v1/payments',[verifyToken],createPayment);
    app.get('/mba/api/v1/payments',[verifyToken],getAllPayments);
    app.get('/mba/api/v1/payment/:id',[verifyToken],getPaymentById);
}