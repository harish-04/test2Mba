const validateCreateMovieRequest = (req,res,next) => {

    if(!req.body.name){
        return res.status(400).send("Failed! Movie Name not Provided");
    }
    if(!req.body.releaseStatus){
        return res.status(400).send("Failed! Release Status Not Required");
    }
    next();
}

// const validateUpdateMovieRequest = (req,res,next) =>{

//     if(!req.body.name){
        
//     }

// }

module.exports = {
    validateCreateMovieRequest
    // validateUpdateMovieRequest
}