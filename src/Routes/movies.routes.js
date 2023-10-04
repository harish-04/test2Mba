const { createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById } = require("../Controllers/movies.controllers");
const { verifyToken, verifyAdmin } = require("../Middlewares/authJWT");
const { validateCreateMovieRequest, validateUpdateMovieRequest } = require("../Middlewares/movies.middleware");

module.exports = function(app){

    app.post("/mba/api/v1/movies",[verifyToken,verifyAdmin,validateCreateMovieRequest],createMovie);
    app.get("/mba/api/v1/movies",[verifyToken],getAllMovies);
    app.get("/mba/api/v1/movie/:id",[verifyToken],getMovieById);
    app.put("/mba/api/v1/movie/:id/update",[verifyToken,verifyAdmin],updateMovieById);
    app.delete("/mba/api/v1/movie/:id/delete",[verifyToken,verifyAdmin],deleteMovieById);

}