var express = require('express');
var bodyParser  = require('body-parser');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost/dataloader';

var app = express();
app.use(bodyParser());
mongoose.connect(dbUrl);

module.exports = function() {
  // Redirect all non existing files to index.html
  app.get('/', function(req, res) {
      var filename = path.join(__dirname, '/', 'public', req.url);
      if (fs.existsSync(filename)) {
        console.log('static: ', req.url);
        res.sendFile(filename);
      } else {
        console.log('static: index.html (' + req.url + ')');
        res.sendFile(path.join(__dirname, '/', 'public') + '/index.html');
      }
  });

  app.get('/api/*', function(req, res) {
    var filename = path.join(__dirname, '/', 'public', req.url) + ".json";
    if (fs.existsSync(filename)) {
      console.log('static json: ', req.url, filename);
      res.sendFile(filename);
    } else {
      console.log('static json: sample.json', req.url, filename);
      res.sendFile(path.join(__dirname, '/', 'public', '/api') + '/sample.json');
    }
  });

  app.use(express.static('public'));
  app.listen(8081);
};
