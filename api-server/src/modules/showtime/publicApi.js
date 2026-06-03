import showtimeQueryService from "./internal/services/showtimeQueryService.js";

export const ShowtimeModuleApi = {

    findById: (id) => showtimeQueryService.findById(id)
}