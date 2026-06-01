import seatIngestionService from "./internal/services/seatIngestionService.js";
import seatQueryService from "./internal/services/seatQueryService.js";

export const SeatModuleApi = {
    findById: (id) => seatQueryService.findById(id),
    generateSeats: (data) => seatIngestionService.generateSeats(data),
    reserveSeat: (seatId) => seatIngestionService.reserveSeat(seatId),
    releaseSeat: (seatId) => seatIngestionService.releaseSeat(seatId),
}