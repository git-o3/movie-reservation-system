import { Router } from "express";
import reservationController from "./internal/controller/reservationController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.use(protect);

router.post("/", reservationController.createReservation);
router.patch("/:id/cancel", reservationController.cancelReservation);
router.get("/my", reservationController.getUserReservations);
router.get("/my/:reservationId", reservationController.getUserReservationById);
router.get("/showtimes/:showtimeId/seats", reservationController.getAvailableSeats);

router.use(restrict("admin"));

router.get("/", reservationController.analysis);
router.get("/:reservationId", reservationController.analysisById);

export default router;
