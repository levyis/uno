const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);

app.set('port', 3000);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log('server start');
});

let players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
});

io.on('connection', function (socket) {
})

setInterval(function () {
    io.sockets.emit('state', players);
}, 1000 / 60);
