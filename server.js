const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting the static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when a client connects
io.on('connection', socket => {
   // console.log('New WS Connection..');

    //Welcome current user
    socket.emit('message', 'Welcome to DT ChatLine!');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined!');// all the clients expcept the user

    //io.emit() to all the clients with the user 

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat :(')
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));