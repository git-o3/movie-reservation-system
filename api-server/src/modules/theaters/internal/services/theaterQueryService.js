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
        const theater = await Theater.find(id).lean();

        if (!theater) {
            throw new AppError("The requested theater does not exist.", 404);
        }

        return theater;
    }

    async update(id, data) {
        const theater = await Theater.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).lean();

        if (!theater) {
            throw new AppError("The theater you are trying to update does not exist.", 404);
        }

        return theater;
    }

    async remove(id) {
        const theater = await Theater.findOne({ _id: id });

        if (!theater) {
            throw new AppError("The theater you are trying to delete does not exist.", 404);

        }

        await Theater.deleteOne({ _id: id });
        return { message: "Theater deleted successfully." };
    }
}

export default new TheaterQueryService();