import * as authService from '../services/authService.js';

const register = async (req, resizeBy, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.register(email, password);

        res.status(201).json({
            status: "success",
            data: result
        })

    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);

        res.status(200).json({
            status: "success",
            data: result
        });

    } catch (error) {
        next(error)
    }
}; 

export default {
    register,
    login
};
