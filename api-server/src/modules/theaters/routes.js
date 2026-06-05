import { Router } from "express";
import TheaterController from "./internal/controllers/theaterController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.get("/", TheaterController.getTheaters);
router.get("/:id", TheaterController.getTheater);

router.use(protect)

router.post("/", restrict("admin"), TheaterController.createTheater);
router.put("/:id", restrict("admin"), TheaterController.updateTheater);
router.delete("/:id", restrict("admin"), TheaterController.deleteTheater);

export default router;