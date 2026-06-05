import Theater from "../models/theaterModel.js";
import { AppError } from "../../../../shared/error.js";


class TheaterQueryService {

    async findAll() {
        return await Theater.find()
            .select("-__v")
            .sort({ createdAt: -1 })
            .lean();
    }

    async findById(id) {
        const theater = await Theater.findById(id).lean();

        if (!theater) {
            throw new AppError("The requested theater does not exist.", 404);
        }

        return theater;
    }

}

export default new TheaterQueryService();