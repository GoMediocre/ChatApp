const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const redis = require('redis')
const client = redis.createClient()

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server started at :" +  port))

client.on('connect', function() {
    console.log('connected');
});

const clientMap = new Map();
const io = new Server(server);

io.on('connection', (socket) => {
    isClientExists((isExists) => {
        if (isExists) {
            mapClients(socket.id);
        } else {
            queueClient(socket.id);
        }
    });

    socket.on('send', (data) => {
        const connectedWith = clientMap[socket.id];
        socket.to(connectedWith).emit("message", data);
    })

    socket.on('disconnect', (socket) => {
        const connectedWith = clientMap[socket];
        clientMap.delete(socket);
        clientMap.delete(connectedWith);
        io.to(connectedWith).emit("connectedStatus", false);
    })
})

function isClientExists(cb) {
    client.scard('clients', (err, len) => {
        console.log("Length:" + len);
        if (err) {
            console.log(err);
            return false;
        }
        cb(len > 0);
    })
}

function mapClients(socketId) {
    client.spop('clients', (err, connectTo) => {
        console.log("Popped " + connectTo);
        if (err) {
            console.log(err);
            queueClient(socketId);
            return;
        }
        clientMap[socketId] = connectTo;
        clientMap[connectTo] = socketId;
        io.to(connectTo).emit('connectedStatus', true);
        io.to(socketId).emit('connectedStatus', true);
        return connectTo;
    })
}

function queueClient(socketId) {
    client.sadd('clients', socketId, (err, reply) => {
        if (err) console.log(err);
        console.log("Pushed " + reply);
        io.to(socketId).emit('connectedStatus', false);
    })
}