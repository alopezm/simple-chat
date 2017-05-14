const path = require('path');
const express = require('express');
const app = express();

const host = 'localhost';
const port = 3000;
let userNumber = 0;

const server = app.listen(port, host, () => { 
    console.log(`listening on http://${host}:${port}`); 
});
const io = require('socket.io').listen(server);

app.use('/static', express.static('public/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('New user logged');
    ++userNumber;
    const user = `User ${userNumber}`;

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', (data) => {
        const { msg } = data;
        const res = {msg, user};
        console.log(res);
        if (data.msg !== '') {
            io.emit('message', res);
        }
    });
});