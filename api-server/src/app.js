import express from "express";
import config from "./config/index.js";
import { AppError, errorHandler } from "./shared/error.js";
import { authRouter } from "./modules/users/index.js";
import movieRouter from "./modules/movies/routes.js";
import theaterRouter from "./modules/theaters/routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/theaters", theaterRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(errorHandler);