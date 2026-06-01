import Seat from "../models/seatModel.js";
import { AppError } from "../../../../shared/error.js";

class SeatQueryService {

    async findById(id) {
        const seat = await Seat.find(id).lean();

        if (!seat) {
            throw new AppError("The requested seat does not exist.", 404);
        }

        return seat;
    }

}

export default new SeatQueryService();