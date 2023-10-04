
const { createTheater, getAllTheater, getTheaterById, addMovieToTheater, checkIfMovieRunningInTheater, deleteMovieFromTheater } = require("../Controllers/theater.controller");
const { verifyToken, verifyAdmin } = require("../Middlewares/authJWT");
const { validateCreateTheaterRequest } = require("../Middlewares/theater.middleware");

module.exports = function(app){

    app.post("/mba/api/v1/theaters",[verifyToken,verifyAdmin,validateCreateTheaterRequest],createTheater);
    app.get("/mba/api/v1/theaters",[verifyToken],getAllTheater);
    app.get("/mba/api/v1/theater/:id",[verifyToken],getTheaterById);
    app.put("/mba/api/v1/theater/:theaterId/movie/:movieId",[verifyToken],addMovieToTheater);
    app.get("/mba/api/v1/theater/:theaterId/movie/:movieId",checkIfMovieRunningInTheater);
    app.put("/mba/api/v1/theater/:theaterId/movie/:movieId/delete",[verifyToken,verifyAdmin],deleteMovieFromTheater);
}