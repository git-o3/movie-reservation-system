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
        const showtime = await Showtime.find(id).lean();

        if (!showtime) {
            throw new AppError("The requested showtime does not exist.", 404);
        }

        return showtime;
    }

    async remove(id) {
        const showtime = await Showtime.findOne({ _id: id });

        if (!showtime) {
            throw new AppError("The showtime you are trying to delete does not exist.", 404);   
        }

        await Showtime.deleteOne({ _id: id });
        return { message: "Showtime deleted successfully." };
    }
}

export default new ShowtimeQueryService();