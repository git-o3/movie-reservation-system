import Showtime from "../models/showtimeModel.js";
import { AppError } from "../../../../shared/error.js";
import { TheaterModuleApi } from "../../../theaters/publicApi.js";
import { MovieModuleApi } from "../../../movies/publicApi.js";

class ShowtimeIngestionService {

    async registerShowtime(data) {
        const { movieId, theaterId, startsAt, endsAt, format, ticketCost } = data;

        await MovieModuleApi.findById(movieId);
        await TheaterModuleApi.findById(theaterId);
        
       const startTime = new Date(startsAt);
       const endTime = new Date(endsAt);

        if (isNaN(startTime.getTime())) {
            throw new AppError("Invalid startsAt date.", 4000);
        }

        if (isNaN(endTime.getTime())) {
            throw new AppError("Invalid endsAt date.", 4000);
        }
        if (startTime <= new Date()) {
            throw new AppError("Showtime cannot be scheduled in the past.", 400);
        }

        if (endTime <= startTime) {
            throw new AppError("Showtime end time must be after start time.", 400);
        }

        const overlappingShowtime = await Showtime.findOne({
            theaterId,
            startsAt: { $lt: endTime },  // mongoDB query less than
            endsAt: { $gt: startTime }   // greater than
        });

        if (overlappingShowtime) {
            throw new AppError("Theater already has a showtime during this period.", 409)
        }

        if (!ticketCost.regular || !ticketCost.vip) {
            throw new AppError("ticketCost must include regular and vip prices.", 400);
        }

        if (ticketCost.regular <= 0 || ticketCost.vip <= 0) {
            throw new AppError("Ticket prices must be greater than zero.", 400);
        }

        const newShowtime = await Showtime.create({
            movieId,
            theaterId,
            startsAt: startTime,
            endsAt: endTime,
            format,
            ticketCost
        });

        return newShowtime;

    }

    async updateShowtime(id, data) {

        const showtime = await Showtime.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).lean();

        if (!showtime) {
            throw new AppError("The showtime you are trying to update does not exist.", 404);
        }

        return showtime;
    }

}

export default new ShowtimeIngestionService();