import seatIngestionService from "./internal/services/seatIngestionService.js";
import seatQueryService from "./internal/services/seatQueryService.js";

export const SeatModuleApi = {
    findById: (id) => seatQueryService.findById(id),
    findAvailableByShowtimeId: (showtimeId) => seatQueryService.findAvailableByShowtimeId(showtimeId),
    generateSeats: (data) => seatIngestionService.generateSeats(data),
    reserveSeat: (seatId) => seatIngestionService.reserveSeat(seatId),
    releaseSeat: (seatId) => seatIngestionService.releaseSeat(seatId),
    deleteByTheaterId: (theaterId) => seatIngestionService.deleteByTheaterId(theaterId),
}