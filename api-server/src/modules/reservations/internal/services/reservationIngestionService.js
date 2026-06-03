import Reservation from "../models/reservationModel.js";
import { AppError } from "../../../../shared/error.js";
import { ShowtimeModuleApi } from "../../../showtime/publicApi.js";
import { SeatModuleApi } from "../../../seats/publicApi.js";
import { randomUUID } from "crypto";
import { NotificationModuleApi } from "../../../notifications/publicApi.js";

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
                status: "confirmed",
                confirmationDetail
            });
        } catch (err) {
            await SeatModuleApi.releaseSeat(seatId);
            throw err;
        }

        NotificationModuleApi.send({
            userId,
            type: "reservation_confirmation",
            payload: { confirmationCode: confirmationDetail.code }
        }).catch(err => console.error("Notification sending failed:", err));

        return reservation;
    }

    async cancel(reservationId) {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            throw new AppError("Reservation not found.", 404);
        }
        if (reservation.userId.toString() !== userId.toString() && req.user.role !== "admin" ){
            throw new AppError("You do not have permission to cancel this reservation")
        }
        if (reservation.status !== "confirmed") {
            throw new AppError("Only confirmed reservations can be cancelled.", 400);
        }

        await SeatModuleApi.releaseSeat(reservation.seatId);

        reservation.status = "cancelled";
        await reservation.save();

        NotificationModuleApi.send({
            userId: reservation.userId,
            type: "reservation_cancellation",
            payload: { reservationId }
        }).catch(err => console.error("Notification sending failed:", err));

        return reservation;

    }

}

export default new ReservationIngestionService();