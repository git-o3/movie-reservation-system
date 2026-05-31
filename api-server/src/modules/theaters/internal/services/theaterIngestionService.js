import Theater from "../models/theaterModel.js";
import { AppError } from "../../../../shared/error.js";

class TheaterIngestionService {
    async registerTheater(data) {
        const { name, location, carPark, warning, totalSeats, seats} = data;

        const existingTheater = await Theater.findOne({ name });
        if (existingTheater) {
            throw new AppError("Theater already exists.", 409);
        }

        const newTheater = await Theater.create({
            name,
            location,
            carPark,
            warning,
            totalSeats,
            seats
        });

        return newTheater;
    }
}

export default new TheaterIngestionService();