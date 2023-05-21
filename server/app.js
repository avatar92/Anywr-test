require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const dashRoutes = require('./routes/dash');

const app = express();



app.use(bodyParser.json());
app.use((req,res,next)=>{
    
    res.header('Access-Control-Allow-Origin',process.env.APP_ORIGIN);
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers','content-type, Authorisation');
    next();
});

app.use('/auth',authRoutes);
app.use('/dash',dashRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


mongoose.connect(process.env.CONNECTION_STRING).then((res)=>{
    app.listen(process.env.PORT,()=>{
        console.log('server is running in pot ',process.env.PORT);
    });
}).catch(err=>{
    console.log(err);
})

