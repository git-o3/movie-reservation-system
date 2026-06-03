import theaterQueryService from "./internal/services/theaterQueryService.js";

export const TheaterModuleApi = {
    
    findById: (id) => theaterQueryService.findById(id)
}