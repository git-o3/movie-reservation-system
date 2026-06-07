import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import User from "./internal/models/userModel.js";
import { AppError } from "../../shared/error.js";

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {

            return next(new AppError("You are not logged in! please log in to get access.", 401));
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {

           return next(new AppError("The user no longer exists.", 401)); 
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(new AppError("Invalid or expired authentication.", 401))
    }
    
}

const restrict = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw new AppError("You do not have permission to perform this action.", 403);
    }
    next();
};

const findUserById = async (id) => {
    return await User.findById(id).lean();
};

export { 
    protect,
    restrict,
    findUserById
};
