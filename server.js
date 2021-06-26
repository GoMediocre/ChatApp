const express = require('express')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server started at :" +  port))

const io = new Server(server);
io.on('connection', (socket) => {
    socket.on('send', (data) => {
        socket.broadcast.emit('message', data);
    })
})