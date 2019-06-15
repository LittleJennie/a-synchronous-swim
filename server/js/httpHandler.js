const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if(req.method === 'GET') {
    // movement GET
    if (req.url === '/') {
      var command = messageQueue.dequeue();
      res.writeHead(200, headers);
      if (command) {
        res.end(command);
      } else {
        res.end();
      }
    } 
    // background img GET
    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, {
            'Content-type': 'image/jpeg',
            'Content-Length': data.length
          });
          res.write(data, 'binary');
        }
        res.end();
        next();
      });
    }
  }

  if(req.method === 'POST') {
    if (req.url === '/background.jpg') {
      // need to get the data chunk one by one
      var fileData = Buffer.alloc(0);
      // req.on('data') and req.on('end')
      req.on('data', (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });
      req.on('end', () => {
        var file = multipart.getFile(fileData);
        fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
          res.writeHead(err ? 400 : 201, headers);
          res.end();
          next();
        })
      });
    }
  }
};
