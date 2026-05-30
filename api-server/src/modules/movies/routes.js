import { Router } from "express";
import movieController from "./internal/controllers/movieController.js";
import { restrict } from "../users/index.js";

const router = Router();

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

router.post("/", restrict("admin"), movieController.createMovie);
router.put("/:id", restrict("admin"), movieController.updateMovie);
router.delete("/:id", restrict("admin"), movieController.deleteMovie);

export default router;