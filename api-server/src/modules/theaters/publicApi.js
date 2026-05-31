import theaterQueryService from "./internal/services/theaterQueryService.js";

export const TheaterModuleApi = {
    
    findById: async (id) => {
        const record = await theaterQueryService.findById(id)
    } 
}