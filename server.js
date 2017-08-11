/**
 * Created by rishabh on 14-07-2017.
 */
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var socket = require('socket.io');
var io = socket(server);
var chat = [];
var users = [];
var port =process.env.PORT || 8080;
app.use('/', express.static('public_static'));
//io means root and hey here referes to person who is sending you the message only
io.on('connection', function (hey) {
    console.log('connection is on');
    /*hey.on('start',function (data) {
     var x = {id:hey.id, user:data.username, connect: true};
     status.push(x);
     });*/
    hey.on('message', function (data) {
        console.log(data);
    });
    io.emit('all',chat);
    hey.on('disconnect', function () {
        console.log('disconnected');
        delete users[hey.id];
        console.log('user disconnected'+hey.id);
        /*
         status.forEach(client=>{
         if(hey.id===client.id){
         client.connect = false;
         }
         })*/
        //console.log(status);
    })
    hey.on('rec_message', function (data) {
        //hey.emit will send message to that person
        chat.push(data);
        io.emit('get',data);
        console.log(data+"is it so");
    });
    hey.on('users',function (data) {
        users[hey.id] =data;
        console.log(data,hey.id);
    });
    hey.on('del_message', function (data) {
        //hey.emit will send message to that person
        console.log("i am here ");
        /*chat.forEach(client=>{
          if(client.input===data){
              delete chat[client];
          }
        });*/
        for(let i = 0; i< chat.length;i++){
           // console.log(chat.input);
            if(chat[i].input===data){
                chat.splice(i,1);
                console.log("hello");
            }
        }
        console.log(data+"bc");

    });
});

server.listen(port, function () {
    console.log("server is running at 5000")
});