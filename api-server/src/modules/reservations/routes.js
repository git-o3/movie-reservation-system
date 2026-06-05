import { Router } from "express";
import ReservationController from "./internal/controllers/reservationController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.use(protect);

router.post("/", ReservationController.createReservation);
router.patch("/:id/cancel", ReservationController.cancelReservation);
router.get("/my", ReservationController.getUserReservations);
router.get("/my/:reservationId", ReservationController.getUserReservationById);
router.get("/showtimes/:showtimeId/seats", ReservationController.getAvailableSeats);

router.use(restrict("admin"));

router.get("/", ReservationController.analysis);
router.get("/:reservationId", ReservationController.analysisById);

export default router;
