const express = require('express'); 
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting the static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//Run when a client connects
io.on('connection', socket => {
    // console.log('New WS Connection..');

    //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to DT ChatLine!'));// tonp single user

    //Broadcast when a user connects
    socket.broadcast.emit('message',  formatMessage(botName, 'A user has joined!'));// to all the clients expcept the user

    //io.emit() to all the clients with the user 

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message',  formatMessage(botName, 'A user has left the chat :('))
    });

    // Listern for chatMessage
    socket.on('chatMessage', msg => {

        io.emit('message',  formatMessage('USER',msg)); //output on console
        //console.log(msg); //output on terminal
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));