import Showtime from "../models/showtimeModel.js";
import { AppError } from "../../../../shared/error.js";

class ShowtimeQueryService {

    async findAll() {
        return await Showtime.find()
            .select("-__v")
            .sort({ createdAt: -1 })
            .lean();
    }

    async findById(id) {
        const showtime = await Showtime.findById(id).lean();

        if (!showtime) {
            throw new AppError("The requested showtime does not exist.", 404);
        }

        return showtime;
    }

}

export default new ShowtimeQueryService();