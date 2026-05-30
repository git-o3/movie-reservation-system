import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seatSchema = new Schema({
    theater: {
        type: Schema.Types.ObjectId,
        required: true
    },
    seatLocation: {
        type: String,        //e.g "B 12"
        required: true
    },
    isVip: {
        type: Boolean,
        default: false
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["availiable", "reserved", "maintenance"],
    }
}, { timestamps: true })

const Seat = mongoose.model("Seat", seatSchema)

export default Seat;