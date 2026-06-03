import { Router } from "express";
import TheaterController from "./internal/controllers/theaterController.js";
import { restrict } from "../users/index.js";

const router = Router();

router.get("/", TheaterController.getTheaters);
router.get("/:id", TheaterController.getTheater);

router.post("/", restrict("admin"), TheaterController.createTheater);
router.put("/:id", restrict("admin"), TheaterController.updateTheater);
router.delete("/:id", restrict("admin"), TheaterController.deleteTheater);

export default router;