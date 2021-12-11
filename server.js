const express = require('express'); 
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting the static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//Run when a client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room}) => {
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room);

        //Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to DT ChatLine!'));// to a single user

        //Broadcast when a user connects, specific to a room
        socket.broadcast.to(user.room).emit(
            'message',  formatMessage(botName, ` ${user.username} has joined!`));// to all the clients expcept the user
    });

    // console.log('New WS Connection..');

    //io.emit() to all the clients with the user 

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',  formatMessage(user.username,msg)); //output on console
        //console.log(msg); //output on terminal
    });

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message',  formatMessage(botName, 'A user has left the chat :('))
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));