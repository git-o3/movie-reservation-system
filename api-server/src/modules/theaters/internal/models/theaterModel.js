import mongoose from "mongoose"

const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    carPark: {
        type: Boolean,
        default: false
    },
    warning: {
        type: String,
        default: null
    },
    totalSeats: {
        type: Number,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    seatsPerRow: {
        type: Number,
        required: true
    },
    vipRows: [{
        type: String
    }],
}, {timestamps: true })

theaterSchema.index({ name: 1 }, { unique: true })


const Theater = mongoose.model("Theater", theaterSchema)

export default Theater;