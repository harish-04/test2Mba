const { createPayment, getAllPayments, getPaymentById } = require("../Controllers/payment.controller");

module.exports = function(app){
    app.post("/mba/api/v1/payments",createPayment);
    app.get("/mba/api/v1/payments",getAllPayments);
    app.get("/mba/api/v1/payment/:id",getPaymentById);
}