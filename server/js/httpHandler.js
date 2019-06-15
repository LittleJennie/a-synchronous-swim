const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = [];
module.exports.initialize = (queue) => {
  messageQueue.push(queue);
};

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'OPTIONS') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  } else if (req.method === 'GET') {
    // validate message
    var dirArr = ['up', 'down', 'left', 'right'];
    var randIndex = Math.floor(Math.random() * Math.floor(dirArr.length));
    // to generate a direction index randomly using Math.random()
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers);
    res.write(dirArr[randIndex]);
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