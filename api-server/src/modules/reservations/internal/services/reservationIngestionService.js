import Reservation from "../models/reservationModel.js";
import { findUserById } from "../../../users/publicApi.js";
import { AppError } from "../../../../shared/error.js";
import { ShowtimeModuleApi } from "../../../showtime/publicApi.js";
import { SeatModuleApi } from "../../../seats/publicApi.js";
import { randomUUID } from "crypto";
import { setPipelineState, updatePipelineState } from "../../../../shared/redis.js";
import { publishToQueue } from "../../../../shared/broker.js";

const CREATED_QUEUE = "reservation_created";

class ReservationIngestionService {

    async registerReservation(data) {
        const { userId, showtimeId, seatId } = data;

        const showtime = await ShowtimeModuleApi.findById(showtimeId);
        const seat = await SeatModuleApi.findById(seatId);

        const pricePaid = seat.isVip 
            ? showtime.ticketCost.vip 
            : showtime.ticketCost.regular;

        await SeatModuleApi.reserveSeat(seatId);

        const confirmationDetail = {
            code: randomUUID(),
            generatedAt: new Date(),
            method: "email"
        };
        
        let reservation;             // initialize reservation variable to hold the created reservation

        try {
             reservation = await Reservation.create({
                userId,
                showtimeId,
                seatId,
                pricePaid,
                status: "pending",
                confirmationDetail
            });
        } catch (err) {
            await SeatModuleApi.releaseSeat(seatId);
            throw err;
        }

        const user = await findUserById(reservation.userId)

        const jobId = randomUUID();
        await setPipelineState(jobId, {
            jobId,
            userId: userId.toString(),
            email: user.email,
            reservationId: reservation._id.toString(),
            status: "pending"
        });

        await publishToQueue(CREATED_QUEUE, { jobId });

        return reservation;
    }

    async cancel(reservationId, userId, role) {
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            throw new AppError("Reservation not found.", 404);
        }
        if (reservation.userId.toString() !== userId.toString() && role !== "admin" ){
            throw new AppError("You do not have permission to cancel this reservation")
        }
        if (reservation.status !== "confirmed") {
            throw new AppError("Only confirmed reservations can be cancelled.", 400);
        }

        await SeatModuleApi.releaseSeat(reservation.seatId);

        reservation.status = "cancelled";
        await reservation.save();

        const user = await findUserById(reservation.userId)

        const jobId = randomUUID();
        await setPipelineState(jobId, {
            jobId,
            userId: reservation.userId.toString(),
            email: user.email,
            reservationId: reservation._id.toString(),
            status: "cancelled"
        });

        await publishToQueue("reservation_cancelled", { jobId });

        return reservation;
    }

    async updateStatus(reservationId, status) {
        const reservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: { status } },
            { new: true, runValidators : true }
        ).lean();

        if (!reservation) {
            throw new AppError("Reservation not found.", 404);
        }

        return reservation
    }
}

export default new ReservationIngestionService();