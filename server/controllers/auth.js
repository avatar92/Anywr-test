exports.signUp = (req, res, next) => {
    res.status(200).json({
        msg: 'Welcome to sign in gate'
    })
}


exports.login = (req, res, next) => {
    res.status(200).json({
        msg: 'welcome to login gate',
    })
}

