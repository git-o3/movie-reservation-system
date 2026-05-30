import mongoose from "mongoose"

const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    location: [{
        type: String,
        required: true,
        trim: true
    }],
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
    seats: [{
        type: Schema.Types.ObjectId,
    }]
}, {timestamps: true })

const Theater = mongoose.model("Theater", theaterSchema)

export default Theater;