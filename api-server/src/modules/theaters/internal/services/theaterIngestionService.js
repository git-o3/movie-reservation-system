import Theater from "../models/theaterModel.js";
import { AppError } from "../../../../shared/error.js";

class TheaterIngestionService {
    async registerTheater(data) {
        const { name, location, carPark, warning, totalSeats, rows, seatsPerRow, vipRows } = data;

        const existingTheater = await Theater.findOne({ name });
        if (existingTheater) {
            throw new AppError("Theater already exists.", 409);
        }

        if (rows * seatsPerRow !== totalSeats) {
            throw new AppError("rows * seatsPerRow must equal totalSeats.", 400);
        }

        const newTheater = await Theater.create({
            name,
            location,
            carPark,
            warning,
            totalSeats,
            rows,
            seatsPerRow,
            vipRows
        });

        await SeatModuleApi.generateSeats({
            theaterId: newTheater._id,
            rows,
            seatsPerRow,
            vipRows
        });

        return newTheater;
    }
}

export default new TheaterIngestionService();