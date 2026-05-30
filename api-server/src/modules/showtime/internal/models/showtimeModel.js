import mongoose from "mongoose";
import { type } from "node:os";

const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        required: true
    },
    theater: {
        type: Schema.Types.ObjectId,
        required: true
    },
    showName: {
        type: String,
        required: true
    },
    schedule: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ["2D", "3D", "IMAX"],
        default: "2D"
    },
    ticketCost: {
        type: Number,
        required: true
    },
    movieGenre: {
        type: String,
    },
    movieRating: {
        type: String
    },
    availableSeats: {
        type: Number,
        required: true
    },
    bookedSeats: [{ 
        type: Schema.Types.ObjectId,
    }]

}, { timestamps: true })

const Showtime = mongoose.model("Showtime", showtimeSchema)

export default Showtime;