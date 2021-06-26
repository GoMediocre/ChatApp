const express = require('express')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server started at :" +  port))

const clients = new Set();
const io = new Server(server);
io.on('connection', (socket) => {
    clients.add(socket.id)

    socket.on('disconnect', () => {
        clients.delete(socket.id)
    })

    socket.on('send', (data) => {
        socket.broadcast.emit('message', data);
    })
})