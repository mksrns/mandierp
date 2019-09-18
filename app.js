const express = require('express');
const app = express();
var fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require("path");
var cors = require('cors');
const http = require('http');
const compression = require('compression');
const orderRoutes = require('./api/routes/orders');
const csvUploadRoutes = require('./api/routes/csvUpload');
const categoryRoutes = require('./api/routes/categories');
const brandRoutes = require('./api/routes/brands');
const productRoutes = require('./api/routes/products');
const merchantRoutes = require('./api/routes/merchants');
const customerRoutes = require('./api/routes/customers');
const dayStaffRoutes = require('./api/routes/dayStaffs');
const stateRoutes = require('./api/routes/states');
const superAdminRoutes = require('./api/routes/superAdmins');
const bijakRoutes = require('./api/routes/bijaks');
const config = require('./config/database');

const port = process.env.PORT || 8080;
app.use(compression());
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

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 86400000,
        setHeaders: function(res, path) {
            res.setHeader("Expires", new Date(Date.now() + 2592000000*30).toUTCString());
      }
}));

//Morgan for testing status
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads', {
    maxAge: 86400000,
    setHeaders: function(res, path) {
        res.setHeader("Expires", new Date(Date.now() + 2592000000*30).toUTCString());
}}));
//Adding middleware-cors
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Allow other single page application(or server) to use our resource
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers', 
//         '*'
//     );
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

//Routes for handling requests
app.use('/customers', customerRoutes);
app.use('/dayStaffs', dayStaffRoutes);
app.use('/csv', csvUploadRoutes);
app.use('/orders', orderRoutes);
app.use('/merchants', merchantRoutes);
app.use('/superAdmin', superAdminRoutes);
app.use('/categories', categoryRoutes);
app.use('/brands', brandRoutes);
app.use('/products', productRoutes);


app.use('/states', stateRoutes);
app.use('/bijaks', bijakRoutes);

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

const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        {id: 'name', title: 'Name'},
        {id: 'surname', title: 'Surname'},
        {id: 'age', title: 'Age'},
        {id: 'gender', title: 'Gender'},
    ]
});

const datas = [
    {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
    }, {
        name: 'Clair',
        surname: 'White',
        age: 33,
        gender: 'F',
    }, {
        name: 'Fancy',
        surname: 'Brown',
        age: 78,
        gender: 'F'
    }
];

csvWriter.writeRecords(datas).then(() => {
    console.log('The CSV file was written successfully');
});
// let path1 = 'exam.txt';
// let buffer = new Buffer("'We was young and we was dumb but we had heart'");

// fs.open(path1, 'w', (err, data) => {
//     if(err) throw 'could not open file: ' + err;
//     fs.write(data, buffer, 0, buffer.length, null, (err) => {
//         if(err) throw 'error writing file: ' + err;
//         fs.close(data, () => {
//             console.log('wrote the file successfully');
//         });
//     });
// });

// //Buffer starts
// fs.readFile('example.txt', 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log("Asynchronously:\n" + data);
// });

// try{
//     var data = fs.readFileSync('example.txt', 'utf8');
//     console.log("Synchronously:\n" + data);
// } catch(e) {
//     console.log('Error: ' + e.stack);
// }
// //Buffer ends

// //Streaming starts
// var data = '';
// var readStream = fs.createReadStream('example.txt', 'utf8');
// readStream.on('data', function(chunk){
//     data += chunk;
// }).on('end', function(){
//     console.log("Streaming:\n" + data);
// });
//Streaming ends

fs.createReadStream('data.csv')
.pipe(csv())
.on('data', (row) => {
    console.log(row);
})
.on('end', () => {
    console.log('CSV file successfully processed');
});

module.exports = app;