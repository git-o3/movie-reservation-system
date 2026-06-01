import seatIngestionService from "../services/seatIngestionService.js";
import seatQueryService from "../services/seatQueryService.js";
import { asyncHandler } from "../../../../shared/error.js";

class SeatController {

    maintenance = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await seatIngestionService.setMaintenance(id);
        res.status(200).json({ success: true, message: "Seat set to maintenance successfully." });
    });


    releaseMaintenance = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await seatIngestionService.releaseMaintenance(id);
        res.status(200).json({ success: true, message: "Seat released from maintenance successfully." });
    })

    getSeatById = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const seat = await seatQueryService.findById(id);

        res.status(200).json({
            success: true,
            data: seat
        });
    });
}

export default new SeatController();