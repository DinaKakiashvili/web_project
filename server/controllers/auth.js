import User from '../models/user.js';
import ErrorResponse from '../errorResponse.js';

export const register = async (req, res, next) => {
    const {username, password, type} = req.body;

    try {
        const user= await User.create({
            username, password, type
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        return next(new ErrorResponse("Please provide a username and a password", 400));
    }

    try {
        const user = await User.findOne({username}).select("+password");

        if(!user) {
            return next(new ErrorResponse("Invalid data", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Incorrect username or password ", 401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
            
        })
    }
}

//addition for type
export const getType = async (req, res, next) => {
    try {
        const users= await User.find()
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


const sendToken = (user, statusCode, res) => {
    const token= user.getSignedToken()
    res.status(statusCode).json({
        success: true,
        token
    })
}