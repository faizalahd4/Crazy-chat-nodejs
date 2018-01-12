var express = require("express");
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var fs = require("fs");
var url = require('url');
var os = require("os");
var arr = [], mainArr = [], jsonObj = {};
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/chat.html'));
});
app.get('/smiley', function(req, res) {
  arr = [], mainArr = [], jsonObj = {};
  var filesName = getFiles('smiley');
  var temp = [];
  for (var i = 0; i < mainArr.length; i++) {
     if (mainArr[i].length !== 0) {
       temp.push(mainArr[i]);
     }
  }
  jsonObj.fileName = temp;
  res.send(jsonObj);
});

var portServer = Number(process.env.PORT || 3000);
var server = app.listen(portServer, function () {
  var host = server.address().address
  var port = server.address().port
});

/*Socket Instance*/
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{userName: data.userName, message: data.message , messageDate: data.messageDate, userId: data.userId});
        fs.open('file.txt', 'a', 666, function( e, id ) {
	    	fs.write(id, data.userName + "~" + data.message + "~" + data.messageDate + "~" + data.userId + "~" + os.EOL, null, 'utf8', function() {
	    		fs.close(id);
	   		});
    	});
    });
    socket.on('is_type_server', function(data) {
       io.sockets.emit("is_type_client",{userName: data.userName, typeToken: data.typeToken});
    });
    socket.on('disconnect_user', function(data) {
        io.sockets.emit("user_quit",{userName: data.userName , message: " left the chat"});
    });
    socket.on('user_joined_server', function(data) {
        io.sockets.emit("user_joined_client",{userName: data.userName , message: " joined the chat"});
    });
});

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
      //if (files[i].lastIndexOf(".") !== -1) {
        arr.push(dir + "/" + files[i]);
      //}
    }
    mainArr.push(arr);
    arr = [];
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


