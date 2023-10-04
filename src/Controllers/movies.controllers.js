const movieModel = require("../Models/movies.model")

const createMovie = async (req,res) => {

    try{
        
        const movie = await movieModel.create(req.body);

        return res.status(200).send(movie);

    }catch(err){
        return res.status(500).send({message : "Error creating movie" + err});
    }
    

}
const getAllMovies =async (req,res) => {

    try{
        const movies = await movieModel.find({});
        return res.status(200).send(movies);
    }catch(err){
        return res.status(500).send({message : "Error getting movies" + err.message});
    }


}
const getMovieById = async(req,res) => {

    const id = req.params.id;

    try{
        const movie = await movieModel.findById(id);
        if(!movie){
            return res.status(404).send({message : "Movie not found"});
        }
        return res.status(200).send(movie);
    }catch(err){
        return res.status(500).send({message : "Error getting movies" + err.message});
    }

}

const updateMovieById = async(req,res) =>{
      const movieId = req.params.id;
      var updateMovie = await movieModel.findById(movieId);
      if(!updateMovie){
        return res.status(404).send({message: "Movie Not Found"});
      }
      const updateValues = req.body;
      Object.keys(updateValues).forEach((key) => {
        updateMovie[key] = updateValues[key];
      })
      await updateMovie.save();
      return res.status(200).send({message:"movie updated successfully"});
}

const deleteMovieById = async(req,res) => {
    const movieId =req.params.id;
    const movie = await movieModel.findByIdAndDelete(movieId);
    if(!movie){
        return res.status(404).send({message: "Movie Not Found"});
    }
    await movie.save();
    

    return res.status(200).send({message: `Product with id: ${movieId} has been deleted successfully`});

}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById
}