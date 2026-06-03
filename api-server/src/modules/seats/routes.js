import { Router } from "express";
import SeatController from "./internal/controllers/seatController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.use(protect);

router.get("/:id", SeatController.getSeat);

router.patch("/:id/maintenance", restrict("admin"), SeatController.maintenance);
router.patch("/:id/release/maintenance", restrict("admin"), SeatController.releaseMaintenance);

export default router;
