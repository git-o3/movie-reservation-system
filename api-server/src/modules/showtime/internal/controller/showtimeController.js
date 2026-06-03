import showtimeIngestionService from "../services/showtimeIngestionService.js";
import showtimeQueryService from "../services/showtimeQueryService.js";
import { asyncHandler } from "../../../../shared/error.js";

class ShowtimeController {

    createShowtime = asyncHandler(async (req, res) => {
        const newShowtime = await showtimeIngestionService.registerShowtime(req.body);

        return res.status(201).json({
            status: "success",
            data: newShowtime
        });
    });

    getShowtimes = asyncHandler(async (req, res) => {
        const showtimes = await showtimeQueryService.findAll();

        return res.status(200).json({
            success: true,
            data: showtimes
        });
    });

    getShowtime = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const showtime = await showtimeQueryService.findById(id);

        return res.status(200).json({
            success: true,
            data: showtime
        });
    });

    updateShowtime = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const updatedShowtime = await showtimeIngestionService.updateShowtime(id, req.body);

        return res.status(200).json({
            success: true,
            data: updatedShowtime
        });
    });

    deleteShowtime = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await showtimeQueryService.remove(id);

        return res.status(200).json({
            success: true,
            message: "Showtime deleted successfully."
        });
    });
}

export default new ShowtimeController();