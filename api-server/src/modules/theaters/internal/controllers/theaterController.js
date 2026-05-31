import theaterIngestionService from "../services/theaterIngestionService.js";
import theaterQueryService from "../services/theaterQueryService.js";
import { asyncHandler } from "../../../../shared/error.js";


class TheaterController {

    createTheater = asyncHandler(async (req, res) => {
        const newTheater = await theaterIngestionService.registerTheater(req.body);

        return res.status(201).json({
            status: "success",
            data: newTheater
        });
    });

    getTheaters = asyncHandler(async (req, res) => {
        const theaters = await theaterQueryService.findAll();

        return res.status(200).json({
            success: true,
            data: theaters
        });
    });
    
    getTheaterByid = asyncHandler(async (req, res) => {
        const {id } = req.params;;

        const theater = await theaterQueryService.findById(id);

        return res.status(200).json({
            success: true,
            data: theater
        });
    })

    updateTheater = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const updatedTheater = await theaterIngestionService.updateTheater(id, req.body);

        return res.status(200).json({
            success: true,
            data: updatedTheater
        });
    });

    deleteTheater = asyncHandler(async (req, res) => {
        const { id } = req.params;

        await theaterQueryService.remove(id);

        return res.status(200).json({
            success: true,
            message: "Theater deleted successfully."
        });
    });
}

export default new TheaterController();