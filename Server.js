const express = require('express');
const app = express();

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// // const express = require('express');
// const http = require('http');
// const path = require('path');
// var cors = require('cors')


// const express = require('express');
// const app = express();
// // If an incoming request uses
// // a protocol other than HTTPS,
// // redirect that request to the
// // same url but with HTTPS
// const forceSSL = function() {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//        ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// }
// // Instruct the app
// // to use the forceSSL
// // middleware
// app.use(forceSSL());



// const app = express();
// // Run the app by serving the static files
// // in the dist directory
// app.use(express.static(__dirname + '/dist'));
// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 8080);

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