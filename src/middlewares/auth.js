import {
    verify
} from 'jsonwebtoken';

import {
    SECRET
} from '../config';

import {
    User
} from '../models';

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

    req.isAuth = true;
    req.user = await User.findById(decodedToken.id);
    next();
}

export default AuthMiddleware;