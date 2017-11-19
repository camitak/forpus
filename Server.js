const express = require('express');
const http = require('http');
const path = require('path');
var cors = require('cors')

const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

// // cors
// var corsOptions = {
//     origin: 'https://forpus.herokuapp.com',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//     preflightContinue: true
// }
  
// app.options('*', cors(corsOptions));

// app.use(cors(corsOptions));
// // app.get('/', cors(corsOptions), function (req, res, next) {
// //     res.json({msg: 'This is CORS-enabled for all origins!'})
// // })
// // app.listen(80, function () {
// //     console.log('CORS-enabled web server listening on port 80')
// // })