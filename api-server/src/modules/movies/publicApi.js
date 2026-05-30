import movieQueryService from "./internal/services/movieQueryService.js";

export const MovieModuleApi = {

    findById: async (id) => {
        const record = await movieQueryService.findById(id)
    }
}