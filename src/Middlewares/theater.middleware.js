const validateCreateTheaterRequest = (req,res,next) => {

    if(!req.body.name){
        return res.status(400).send("Failed! theater Name not Provided");
    }
    next();
}

module.exports = {
    validateCreateTheaterRequest
}