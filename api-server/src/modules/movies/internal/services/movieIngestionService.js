import Movie from "../models/movieModel.js";
import { AppError } from "../../../../shared/error.js";

class MovieIngestionService {

    async registerMovie(data) {
        const { name, rating, genres, language, availability, releaseDate } = data;
      
        const existingMovie = await Movie.findOne({ name, releaseDate });
        if (existingMovie) {
            throw new AppError("Movie already exists.", 409);
        }

        const newMovie = await Movie.create({
            name,
            rating,
            genres,
            language,
            availability,
            releaseDate
        });

        return newMovie;
    }

      async updateMovie(id, data) {
           const movie = await Movie.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
           )
           .select("-__v")
           .lean();
    
           if (!movie) {
            throw new AppError("The movie you are trying to update does not exist.", 404);
           }
    
            return movie;
        }
}

export default new MovieIngestionService();