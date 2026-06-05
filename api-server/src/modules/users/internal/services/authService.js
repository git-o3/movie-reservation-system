import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/index.js";
import { AppError } from "../../../../shared/error.js";
import mongoose from "mongoose";

const signToken = (id, role) => {
    return jwt.sign({ id, role }, config.JWT_SECRET, { expiresIn: "7d"});
}

export const register = async (name, email, password) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const existingEmail = await User.findOne({ email })
        if (existingEmail) throw new AppError("Email is already registered", 400)

        const [newUser] = await User.create([{ name, email, password}], { session })
        const token = signToken(newUser._id, newUser.role)

        await session.commitTransaction()
        session.endSession()

        return {
            token,
            user: { id: newUser._id, email: newUser.email, role: newUser.role }
        }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
};

export const login = async (email, password) => {
    if (!email || !password) {
        throw new AppError("Incorrect email or password.", 401);
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password, user.password))) {
        throw new AppError("Incorrect email or passoword.", 401);
    }

    const token = signToken(user._id, user.role);
    return {
        token,
        user: { id: user._id, email: user.email, role: user.role }
    }
};