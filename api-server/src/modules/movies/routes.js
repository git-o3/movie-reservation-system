import { Router } from "express";
import MovieController from "./internal/controllers/movieController.js";
import { restrict } from "../users/index.js";

const router = Router();

router.get("/", MovieController.getMovies);
router.get("/:id", MovieController.getMovieById);

router.post("/", restrict("admin"), MovieController.createMovie);
router.put("/:id", restrict("admin"), MovieController.updateMovie);
router.delete("/:id", restrict("admin"), MovieController.deleteMovie);

export default router;