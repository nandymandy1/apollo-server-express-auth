import {
    SECRET
} from '../config';

import {
    User
} from '../models';

import {
    verify
} from 'jsonwebtoken';


/**
 * Custom User Authentication Middleware
 * Which Finds the user from the database using the request token 
 */
const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    // Extract the token and check for token
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    // Verify token
    let decodedToken;
    try {
        decodedToken = verify(token, SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    // Find the user by decoded token
    let authUser = await User.findById(decodedToken.id);
    if(!authUser){
        req.isAuth = false;
        return next();
    }
    
    req.isAuth = true;
    req.user = authUser;
    next();
}

export default AuthMiddleware;