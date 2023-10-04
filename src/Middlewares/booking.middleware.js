const {theaterModel} = require('../Routes/theater.routes');
const {movieModel} = require('../Routes/movies.routes');
const validateCreateBookingRequest = async (req,res)=>{

    const {theaterId,MovieId} = req.body;
    
    const savedTheater = await theaterModel.findById(theaterId);
    
    if(!savedTheater){
        return res.status(400).send({message:"Theater doesn't exists"});
    }

    const savedMovie = await movieModel.findById(MovieId);
    
    if(!savedMovie){
        return res.status(400).send({message:"Movie doesn't exist"});
    }

    if(!savedTheater.movies.includes(MovieId)){
        return res.status(400).send({message:"Failed! Selected movie is not available in the Theater"});
    }

    next();


}

module.exports = validateCreateBookingRequest; 