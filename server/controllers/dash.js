const User = require('../models/user');

exports.info = (req,res,next)=> {
    
    const userId = res.locals.userId;
    User.findById(userId).then(user=>{
        if(!user){
            const error = new Error('User not found');
            error.statusCode  = 404;
            throw error;
        }
        res.status(200).json({
            email: user.email,
            username: user.username
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}