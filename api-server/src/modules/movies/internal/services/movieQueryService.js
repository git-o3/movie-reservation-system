import fs from "fs/promises";
import Movie from "../models/movieModel.js";
import { AppError } from "../../../../shared/error.js";

class MovieQueryService {

    async findById(id) {
        const movie = await Movie.find({ _id: id })
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

    async update(id, data) {
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

    async remove(id) {
        const movie = await Movie.findOne({ _id: id });

        if (!movie) {
            throw new AppError("The movie you are trying to delete does not exist.", 404);
        }

        await Movie.deleteOne({ _id: id });
        return { message: "Movie deleted successfully." };
    }
}

export default new MovieQueryService();
