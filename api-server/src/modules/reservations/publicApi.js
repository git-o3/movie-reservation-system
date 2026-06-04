import reservationQueryService from "./internal/services/reservationQueryService.js";
import reservationIngestionService from "./internal/services/reservationIngestionService.js";

export const ReservationModuleApi = {
    findByUserId: (userId) => reservationQueryService.findByUserId(userId),
    findById: (id) => reservationQueryService.findById(id),
    updateStatus: (reservationId, status) => reservationIngestionService.updateStatus(reservationId, status),
}