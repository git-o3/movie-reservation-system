import { Router } from "express";
import ShowtimeController from "./internal/controllers/showtimeController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.get("/", ShowtimeController.getShowtimes);
router.get("/:id", ShowtimeController.getShowtime);

router.use(protect)

router.post("/", restrict("admin"), ShowtimeController.createShowtime);
router.put("/:id", restrict("admin"), ShowtimeController.updateShowtime);
router.delete("/:id", restrict("admin"), ShowtimeController.deleteShowtime);

export default router;