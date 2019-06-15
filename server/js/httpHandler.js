const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = [];
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'OPTIONS') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }

  if (req.method === 'GET' && req.url !== '/') {
    if (fs.existsSync(req.url) === true) {
        res.writeHead(200, headers);
        res.write(data);
        res.end();
        next();
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
        next();
    }
    // requested from style.css
    // fs.readFile(req.url, function(err, data) {
    //   if (err) {
    //     res.writeHead(404, headers);
    //     res.end(req.url);
    //     next();
    //   } else {
    //     // if exists, then 200
    //     res.writeHead(200, headers);
    //     res.write(data);
    //     res.end();
    //     next();
    //   }
    // })
  }
  
  // fs.readFile('demofile1.html', function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   res.end();
  // });

  if (req.method === 'GET') {
    // var dirArr = ['up', 'down', 'left', 'right'];
    // var randIndex = Math.floor(Math.random() * Math.floor(dirArr.length));
    // to generate a direction index randomly using Math.random()
    var msg = messageQueue.dequeue();
    if(msg === undefined) {
      msg = '';
    }
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.write(msg);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  } 

};

// module.exports.router = function(req, res, function next () {}) {
//   console.log('Serving request type ' + req.method + ' for url ' + req.url);
//   res.writeHead(200, headers);
//   res.end();
//   next(); // invoke next() at the end of a request to help with testing!
// }