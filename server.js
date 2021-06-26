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
    checkAndQueueClient((isExists) => {
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
        clientMap.delete(socket);
        const connectedWith = clientMap[socket];
        clientMap.delete(connectedWith);
        io.sockets[connectedWith].emit("connectedStatus", false);
    })
})

function checkAndQueueClient(cb) {
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
    client.spop('clients', (err, client) => {
        console.log("Popped " + client);
        if (err) {
            console.log(err);
            queueClient(socketId);
            return;
        }
        clientMap[socketId] = client;
        clientMap[client] = socketId;
        return client;
    })
}

function queueClient(socketId) {
    client.sadd('clients', socketId, (err, reply) => {
        if (err) console.log(err);
        console.log("Pushed " + reply);
    })
}