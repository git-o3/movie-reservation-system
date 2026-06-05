import fs from "fs/promises";
import Movie from "../models/movieModel.js";
import { AppError } from "../../../../shared/error.js";

class MovieQueryService {

    async findById(id) {
        const movie = await Movie.findById(id)
        .select("-__v")
        .lean();

        if (!movie) {
            throw new AppError("The requested movie does not exist.", 404);
        }

        return movie;
    }

    async findPaginated({ page = 1, limit = 10 }) {
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));
        const skip = (parsedPage -1) * parsedLimit;

        const [records, totalCount] = await Promise.all([
            Movie.find()
            .select("-__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parsedLimit)
            .lean(),
            Movie.countDocuments()
        ]);

        return {
            records,
            pagination: {
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                limit: parsedLimit
            }
        };
    }

}

export default new MovieQueryService();
