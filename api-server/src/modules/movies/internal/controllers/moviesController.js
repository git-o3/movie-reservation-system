import movieIngestionService from "../services/movieIngestionService.js";
import movieQueryService from "../services/movieQueryService.js";
import { asyncHandler } from "../../../../shared/error.js";

class MovieController {

    createMovie = asyncHandler(async (req, res) => {
        const newMovie = await movieIngestionService.registerMovie(req.body);

        return res.status(201).json({
            status: "success",
            data: newMovie
        });
    });

    getMovies = asyncHandler(async (req, res) => {
        const { page, limit } = req.query;

        const { records, pagination } = await movieQueryService.findPaginated({ page, limit });

        return res.status(200).json({
            success: true,
            data: records,
            pagination
        });
    });

    getMovieById = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const movie = await movieQueryService.findById(id);

        return res.status(200).json({
            success: true,
            data: movie
        });
    });

    updateMovie = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const updatedMovie = await movieQueryService.update(id, req.body);

        return res.status(200).json({
            success: true,
            data: updatedMovie
        });
    });

    deleteMovie = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await movieQueryService.remove(id);

        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully."
        });
    });
}

export default new MovieController();