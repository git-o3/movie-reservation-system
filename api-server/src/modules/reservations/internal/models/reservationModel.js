import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    showtime: {
        type: Schema.Types.ObjectId,
        required: true
    },
    seat: {
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "refunded"],
        default: "pending"
    },
    confirmationDetail: {
        code: {
            type: String
        },
        generatedAt: {
            type: Date
        },
        method: {
            type: String,
            enum: ["email", "sms", "app"],
            default: "email"
        }
    }
}, { timestamps: true })

const Reservation = mongoose.model("Reservation", reservationSchema)

export default Reservation