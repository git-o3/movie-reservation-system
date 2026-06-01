import Seat from "../models/seatModel.js";
import { AppError } from "../../../../shared/error.js";
import { TheaterModuleApi } from "../../../theaters/publicApi.js";

class SeatIngestionService {

    async generateSeats(data) {
        const { theaterId, rows, seatsPerRow, vipRows } = data

        await TheaterModuleApi.findById(theaterId);

        const seats = [];

        for (let row = 0; row < rows; row++) {
            const rowLabel = String.fromCharCode(65 + row); // 65 "A" in ASCII
            const isVip = vipRows.includes(rowLabel);

            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                seats.push({
                    theater: theaterId,
                    seatLocation: `${rowLabel} ${seatNum}`,
                    isVip,
                })
            }
        }

        await Seat.insertMany(seats);

        return { message: "Seats generated successfully." };
    }

    async reserveSeat(seatId) {
        const seat = await Seat.findById(seatId);

        if (!seat) {
            throw new AppError("Seat does not exist.", 404);
        }

        if (seat.status !== "available") {
            throw new AppError("Seat is not available for reservation.", 400);
        }

        await Seat.findByIdAndUpdate(seatId, { $set: { status: "reserved" } });
    }
   
    async releaseSeat(seatId) {
        const seat = await Seat.findById(seatId);

        if (!seat) {
            throw new AppError("Seat does not exist.", 404);
        }

        if (seat.status !== "reserved") {
            throw new AppError("Seat is not currently reserved.", 400);
        }

        await Seat.findByIdAndUpdate(seatId, { $set: { status: "available" } });
    }

    async setMaintenance(seatId) {
        const seat = await Seat.findById(seatId);

        if (!seat) {
            throw new AppError("Seat does not exist.", 404);
        }

        if (seat.status === "reserved") {
            throw new AppError("Cannot set a reserved seat to maintenance.", 400);
        }

        await Seat.findByIdAndUpdate(seatId, { $set: { status: "maintenance" } });
    }

    async releaseMaintenance(seatId) {
        const seat = await Seat.findById(seatId);

        if (!seat) {
            throw new AppError("Seat does not exist,", 404);
        }

        if (seat.status !== "maintenance") {
            throw new AppError("Seat is not currently under maintenance.", 400);
        }

        await Seat.findByIdAndUpdate(seatId, { $set: { status: "available" } });
    }
    
}

export default new SeatIngestionService();












/**
 * for optimization we can directly update the seat status in one step without 
 * fetching the seat first,but it will not give specific error messages for different failure scenarios
 * (e.g., seat not found vs. seat not available).
 * the current implementation provides more clarity on why a reservation attempt failed, 
 * which can be beneficial for debugging and user feedback.
 * my decision to stick with two queries is also improve human readability 
 */

// async reserveSeat(seatId) {
//     const seat = await Seat.findOneAndUpdate(
//         { _id: seatId, status: "available" },
//         { $set: { status: "reserved" } }
//     );

//     if (!seat) {
//         throw new AppError("Seat does not exist or is not available.", 400);
//     }
// }