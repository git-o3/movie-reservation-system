import reservationIngestionService from "../services/reservationIngestionService.js";
import reservationQueryService from "../services/reservationQueryService.js";
import { asyncHandler } from "../../../../shared/error.js";
import { SeatModuleApi } from "../../../seats/publicApi.js";

class ReservationController {
    createReservation = asyncHandler(async (req, res) => {
        const newReservation = await reservationIngestionService.registerReservation({
            ...req.body,
            userId: req.user._id        // from protect middleware
        });

        return res.status(201).json({
            status: "success",
            data: newReservation
        });
    });

    cancelReservation = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await reservationIngestionService.cancel(id, req.user._id);

        return res.status(200).json({
            status: "success",
            message: "Reservation cancelled successfully."
        });
    });

    getUserReservations = asyncHandler(async (req, res) => {

        const reservations = await reservationQueryService.findByUserId(req.user._id); 
         // pulling from req.user._id instead of using URL to avoid user fishing query with URL

        return res.status(200).json({
            status: "success",
            data: reservations
        });
    });

    getUserReservationById = asyncHandler(async (req, res) => {
        const { reservationId } = req.params;

        const reservation = await reservationQueryService.findByUserAndId(req.user._id, reservationId);

        return res.status(200).json({
            status: "success",
            data: reservation
        });
    })

    analysis = asyncHandler(async (req, res) => {
        const allReservations = await reservationQueryService.findAll();

        return res.status(200).json({
            status: "success",
            data: allReservations
        });
    });

    analysisById = asyncHandler(async (req, res) => {
        const { reservationId } = req.params;

        const reservation = await reservationQueryService.findById(reservationId)

        return res.status(200).json({
            status: "success",
            data: reservation
        });
    });

    getAvailableSeats = asyncHandler(async (req, res) => {
        const seats = await SeatModuleApi.findAvailableByShowtimeId(req.params.showtimeId);

        res.status(200).json({
            status: "success",
            data: seats
        })
     })
}

export default new ReservationController();