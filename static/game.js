const socket = io();

socket.emit('new player');

socket.on('message', function (data) {
    console.log(data);
});