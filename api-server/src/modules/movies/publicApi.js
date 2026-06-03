import movieQueryService from "./internal/services/movieQueryService.js";

export const MovieModuleApi = {

    findById: (id) => movieQueryService.findById(id)
}