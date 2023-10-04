const movieModel = require("../Models/movies.model");
const theaterModel = require("../Models/theater.model");

const createTheater = async (req,res) => {

    try{
        
        const theater = await theaterModel.create(req.body);

        return res.status(201).send(theater);

    }catch(err){
        return res.status(500).send({message : "Error creating theater" + err});
    }
    

}
const getAllTheater =async (req,res) => {

    try{
        const theaters = await theaterModel.find({});
        return res.status(200).send(theaters);
    }catch(err){
        return res.status(500).send({message : "Error getting theaters" + err.message});
    }


}
const getTheaterById = async(req,res) => {

    const id = req.params.id;

    try{
        const theater = await theaterModel.findById(id).populate("movies");
        if(!theater){
            return res.status(404).send({message : "Theater not found"});
        }
        return res.status(200).send(theater);
    }catch(err){
        return res.status(500).send({message : "Error getting theaters" + err.message});
    }
}

const addMovieToTheater = async(req,res)=>{
    const {theaterId,movieId} = req.params;
    console.log(req.params);
    const savedTheater = await theaterModel.findById(theaterId);
    if(!savedTheater){
        return res.status(404).send({message : "Theater doesn't exists"});
    }
    const savedMovie = await movieModel.findById(movieId);
    if(!savedMovie){
        return res.status(404).send({message:"Movie doesn't exists"})
    }
    savedTheater.movies.push(movieId);
    await savedTheater.save();
    return res.status(200).send({message : "Movie added successfully"});
}

const checkIfMovieRunningInTheater = async(req,res)=>{

    const {theaterId,movieId} = req.params;
    const savedTheater = await theaterModel.findById(theaterId);
    if(!savedTheater){
        return res.status(404).send({message:"Theater doesn't exists"});
    }
    const savedMovie = await movieModel.findById(movieId);
    if(!savedMovie){
        return res.status(404).send({message:"Movie doesn't Exists"})
    }
    const response = {
        isRunning : savedTheater.movies.includes(movieId)
    }
    return res.status(200).send(response);

}

const deleteMovieFromTheater = async(req,res)=>{
    const {theaterId,movieId} = req.params;
    const savedTheater = await theaterModel.findById(theaterId);
    if(!savedTheater){
        return res.status(404).send({message : "Theater doesn't exists"});
    }
    const savedMovie = await movieModel.findByIdAndDelete(movieId);
    if(!savedMovie){
        return res.status(404).send({message:"Movie doesn't exists"})
    }
    savedTheater.movies.pop(movieId);
    await savedTheater.save();
    return res.status(200).send({message : "Movie deleted successfully from theater"});
}

module.exports = {
    createTheater,
    getAllTheater,
    getTheaterById,
    addMovieToTheater,
    checkIfMovieRunningInTheater,
    deleteMovieFromTheater
}