import mongoose from "mongoose";

const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    format: {
        type: String,
        enum: ["2D", "3D", "IMAX"],
        default: "2D"
    },
    ticketCost: {
       regular: { type: Number, required: true },
       vip: { type: Number, required: true }
    }

}, { timestamps: true })

const Showtime = mongoose.model("Showtime", showtimeSchema)

export default Showtime;