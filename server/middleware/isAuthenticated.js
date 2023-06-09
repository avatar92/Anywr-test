require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const now = Date.now() / 1000;
    
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;

        throw error;
    }
    if(now - decodedToken.iat > decodedToken.exp - decodedToken.iat ){
        const error = new Error('Expired Token.');
        error.statusCode = 401;
        
        throw error;
    }

    res.locals.userId = decodedToken.userId;
    next();
};