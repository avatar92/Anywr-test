exports.info = (req,res,next)=> {
    res.status(200).send({
        msg: 'Welcome to user info gate'
    })
}