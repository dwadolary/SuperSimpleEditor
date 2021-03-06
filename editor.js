var socket = require('socket.io');
var express = require('express');
var ejs = require('ejs');
var docCont = require("./controllers/documentController");

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./assets'));
var serv = app.listen(process.env.PORT || 3000)

var token = docCont(app);
var io = socket(serv);

io.on('connection', function(soc){
  console.log("Connected to " + soc.id);

  soc.on('editor', function(data){
    var token = docCont(app);
  console.log(token + ' : ' + data.url.substr(1));
    if(token != '' && token == data.url.substr(1)) {
       soc.broadcast.emit('editor', data);
    }

  })
});
