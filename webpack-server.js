var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var path = require('path');
var fs = require('fs');
var config = require('./config');

var hotConfig = require('./webpack.hot.config');

module.exports = function() {
  var app = express();
  app.set('view engine','jade');
  // Redirect all non existing files to index.html
  app.get('/', function(req, res) {

      var filename = path.join(__dirname, '/', 'public', req.url);

      if (fs.existsSync(filename)) {
        console.log('static: ', req.url);
        res.sendFile(filename);
      } else {
        console.log('static: index.jade (' + req.url + ')');
        res.render('index',{hostname:config.hostname, port:config.port});
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

  var compiler = webpack(hotConfig);

  var server = new WebpackDevServer(compiler, {
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      watchDelay: 20,
      publicPath: '/assets/',
      stats: { colors: true }
  });

  server.listen(config.port, config.hostname, function() {});
};
