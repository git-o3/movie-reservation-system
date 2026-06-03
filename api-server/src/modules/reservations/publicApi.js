import reservationQueryService from "./internal/services/reservationQueryService.js";

export const ReservationModuleApi = {
    findByUserId: (userId) => reservationQueryService.findByUserId(userId),
    findById: (id) => reservationQueryService.findById(id),
}