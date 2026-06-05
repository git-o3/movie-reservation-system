import Theater from "../models/theaterModel.js";
import { AppError } from "../../../../shared/error.js";
import { SeatModuleApi } from "../../../seats/publicApi.js";

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
        const theater = await Theater.findById({ _id: id });

        if (!theater) {
            throw new AppError("The theater you are trying to delete does not exist.", 404);

        }

        await Theater.deleteOne({ _id: id });
        await SeatModuleApi.deleteByTheaterId(id);
        
        return { message: "Theater deleted successfully." };
    }
}

export default new TheaterIngestionService();