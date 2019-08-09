const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require("path");
const http = require('http');
const orderRoutes = require('./api/routes/orders');
const merchantRoutes = require('./api/routes/merchants');
const customerRoutes = require('./api/routes/customers');
const dayStaffRoutes = require('./api/routes/dayStaffs');
const stateRoutes = require('./api/routes/states');
const superAdminRoutes = require('./api/routes/superAdmins');
const config = require('./config/database');

const port = process.env.PORT || 8080;

//Database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to local db: ' + config.database);
});

mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Error is: ' +err);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

//Morgan for testing status
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Allow other single page application(or server) to use our resource
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes for handling requests
app.use('/customers', customerRoutes);
app.use('/dayStaffs', dayStaffRoutes);
app.use('/states', stateRoutes);
app.use('/orders', orderRoutes);
app.use('/merchants', merchantRoutes);
app.use('/superAdmin', superAdminRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Error handling for bad requests
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Error handling for other erros(like db and all)
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, ()=>{
    console.log('Server started on port: '+port);
}); 

module.exports = app;