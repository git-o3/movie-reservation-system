import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seatSchema = new Schema({
    theaterId: {
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
    status: {
        type: String,
        enum: ["available", "reserved", "maintenance"],
        default: "available"
    }
}, { timestamps: true })

seatSchema.index({ theaterId: 1, seatLocation: 1 }, { unique: true })

const Seat = mongoose.model("Seat", seatSchema)

export default Seat;