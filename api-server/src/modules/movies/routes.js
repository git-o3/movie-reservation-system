import { Router } from "express";
import MovieController from "./internal/controllers/movieController.js";
import { protect, restrict } from "../users/index.js";

const router = Router();

router.get("/", MovieController.getMovies);
router.get("/:id", MovieController.getMovie);

router.use(protect)

router.post("/", restrict("admin"), MovieController.createMovie);
router.put("/:id", restrict("admin"), MovieController.updateMovie);
router.delete("/:id", restrict("admin"), MovieController.deleteMovie);

export default router;