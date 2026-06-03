import Reservation from "../models/reservationModel.js";
import { AppError } from "../../../../shared/error.js";
import { SeatModuleApi } from "../../../seats/publicApi.js";

class ReservationQueryService {

    async findAll() {
        return await Reservation.find()
            .select("-__v")
            .sort({ createdAt: -1 })
            .lean();
    }

    async findById(id) {
        const reservation = await Reservation.findById(id).lean();

        if (!reservation) {
            throw new AppError("The requested reservation does not exist.", 404);
        }

        return reservation;
    }

    async findByUserId(userId) {
        const reservations = await Reservation.find({ userId })
            .select("-__v")
            .sort({ createdAt: -1 })
            .lean();

        return reservations;
    }

    async findByUserAndId(userId, reservationId) {
        const reservation = await Reservation.findOne({ _id: reservationId, userId }).lean();

        if (!reservation) {
            throw new AppError("The requested reservation does not exist or does not belong to the user.", 404);
        }

        return reservation;
    }
}

export default new ReservationQueryService();