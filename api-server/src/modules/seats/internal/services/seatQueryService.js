import Seat from "../models/seatModel.js";
import { AppError } from "../../../../shared/error.js";
import { ShowtimeModuleApi } from "../../../showtime/publicApi.js";

class SeatQueryService {

    async findById(id) {
        const seat = await Seat.findById(id).lean();

        if (!seat) {
            throw new AppError("The requested seat does not exist.", 404);
        }

        return seat;
    }


    async findAvailableByShowtimeId(showtimeId) {
        const showtime = await ShowtimeModuleApi.findById(showtimeId);

        const seats = await Seat.find({
            theaterId: showtime.theaterId,
            status: "available"
        }).lean();

        return seats;
    }


}

export default new SeatQueryService();