import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    genres: [{
        type: String,
    }],
    language: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

movieSchema.index({ name: 1, releaseDate: 1 }, { unique: true })  // compound index to ensure unqiue movie entry

const Movie = mongoose.model("Movie", movieSchema)

export default Movie;